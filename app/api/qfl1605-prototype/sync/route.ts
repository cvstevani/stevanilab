type SyncRecord = { id?: unknown; revision?: unknown; changedAt?: unknown };
const GOOGLE_FORM_ID = "1eIANuMWyKt_wH2h4dfLBVDWDuDKNrVU6OtgfMaw42yI";

function validRecords(value: unknown): value is SyncRecord[] {
  return Array.isArray(value) && value.every((record) => record && typeof record === "object" && typeof record.id === "string" && Number.isInteger(record.revision) && typeof record.changedAt === "string");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { samples?: unknown; evaluations?: unknown } | null;
  if (!body || !validRecords(body.samples) || !validRecords(body.evaluations)) {
    return Response.json({ ok: false, message: "Lote de sincronização inválido." }, { status: 400 });
  }

  const records = [...body.samples, ...body.evaluations];
  const received = records.map((record) => ({ id: record.id, revision: record.revision }));
  const googleSyncUrl = process.env.QFL1605_GOOGLE_SYNC_URL?.trim();
  if (!googleSyncUrl) {
    return Response.json({
      ok: true,
      prototype: true,
      durable: false,
      received,
      destination: { provider: "Google", formId: GOOGLE_FORM_ID },
      message: "A ponte com o destino Google ainda não está configurada. Os dados continuam na fila local.",
      serverTime: new Date().toISOString(),
    });
  }

  const googleResponse = await fetch(googleSyncUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.QFL1605_GOOGLE_SYNC_SECRET ? { "X-QFL1605-Sync-Secret": process.env.QFL1605_GOOGLE_SYNC_SECRET } : {}),
    },
    body: JSON.stringify({ source: "StevaniLab QFL1605 PWA", formId: GOOGLE_FORM_ID, samples: body.samples, evaluations: body.evaluations }),
  }).catch(() => null);

  if (!googleResponse?.ok) {
    return Response.json({ ok: false, durable: false, message: "O destino Google não confirmou a gravação." }, { status: 502 });
  }

  return Response.json({
    ok: true,
    prototype: true,
    durable: true,
    received,
    destination: { provider: "Google", formId: GOOGLE_FORM_ID },
    serverTime: new Date().toISOString(),
  });
}
