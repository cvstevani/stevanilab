const COOKIE_MAX_AGE = 60 * 60 * 12;

type Scope = "workspace" | "evaluations" | "admin";

const scopeConfig = {
  workspace: {
    codeVariable: "QFL1605_WORKSPACE_CODE",
    cookie: "qfl1605_workspace",
  },
  evaluations: {
    codeVariable: "QFL1605_EVALUATION_CODE",
    cookie: "qfl1605_evaluations",
  },
  admin: {
    codeVariable: "QFL1605_ADMIN_CODE",
    cookie: "qfl1605_admin",
  },
} as const;

function isScope(value: unknown): value is Scope {
  return value === "workspace" || value === "evaluations" || value === "admin";
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return difference === 0;
}

async function signature(scope: Scope, expires: number) {
  const secret = process.env.QFL1605_ACCESS_SECRET;
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${scope}.${expires}`));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function createToken(scope: Scope) {
  const expires = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE;
  return `${expires}.${await signature(scope, expires)}`;
}

async function hasAccess(request: Request, scope: Scope) {
  const cookies = request.headers.get("cookie") ?? "";
  const name = scopeConfig[scope].cookie;
  const token = cookies.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
  if (!token) return false;
  const [expiresText, suppliedSignature] = token.split(".");
  const expires = Number(expiresText);
  if (!expires || expires < Math.floor(Date.now() / 1000) || !suppliedSignature) return false;
  const expectedSignature = await signature(scope, expires);
  return Boolean(expectedSignature) && constantTimeEqual(suppliedSignature, expectedSignature);
}

function protectedResources(scope: Scope) {
  if (scope === "workspace") {
    const url = process.env.QFL1605_WORKSPACE_URL;
    return url ? [{ title: "Área de trabalho da QFL1605", url }] : [];
  }

  if (scope === "admin") {
    return [
      ["Pasta principal da QFL1605", process.env.QFL1605_ADMIN_FOLDER_URL ?? "https://drive.google.com/open?id=19VTN2aGtNBJKqtYcIknyHK9H_wyCw90S&usp=drive_fs"],
      ["Pasta de avaliações", process.env.QFL1605_EVALUATIONS_FOLDER_URL ?? "https://drive.google.com/open?id=1C5G7Qwi1Ypd-IDANYrvLTpPNynvTvQZL&usp=drive_fs"],
      ["Protótipo do aplicativo", "/education/qfl1605/prototipo"],
    ].map(([title, url]) => ({ title, url }));
  }

  return [
    ["Alunos da QFL1605", process.env.QFL1605_FORM_STUDENTS],
    ["Guias e monitores do PETAR", process.env.QFL1605_FORM_GUIDES],
    ["Estudantes de escolas", process.env.QFL1605_FORM_SCHOOLS],
    ["Turistas e visitantes · Português / English", process.env.QFL1605_FORM_VISITORS],
  ].filter((item): item is [string, string] => Boolean(item[1])).map(([title, url]) => ({ title, url }));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { scope?: unknown; code?: unknown } | null;
  if (!body || !isScope(body.scope) || typeof body.code !== "string") {
    return Response.json({ ok: false, message: "Solicitação inválida." }, { status: 400 });
  }

  const expectedCode = process.env[scopeConfig[body.scope].codeVariable];
  if (!expectedCode || !constantTimeEqual(body.code.trim(), expectedCode)) {
    return Response.json({ ok: false, message: "Código de acesso inválido." }, { status: 401 });
  }

  const token = await createToken(body.scope);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": `${scopeConfig[body.scope].cookie}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${COOKIE_MAX_AGE}${secure}` } },
  );
}

export async function GET(request: Request) {
  const scope = new URL(request.url).searchParams.get("scope");
  if (!isScope(scope) || !(await hasAccess(request, scope))) {
    return Response.json({ ok: false }, { status: 401 });
  }
  return Response.json({ ok: true, resources: protectedResources(scope) });
}
