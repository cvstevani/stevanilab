import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const appUrl = new URL("../app/education/qfl1605/prototipo/prototype-app.tsx", import.meta.url);
const syncUrl = new URL("../app/api/qfl1605-prototype/sync/route.ts", import.meta.url);
const publicUrl = new URL("../public/", import.meta.url);
const publicEvaluationsUrl = new URL("../app/education/qfl1605/prototipo/avaliacoes/page.tsx", import.meta.url);
const adminUrl = new URL("../app/education/qfl1605/prototipo/admin/page.tsx", import.meta.url);

test("prototype contains the first offline field workflow", async () => {
  const app = await readFile(appUrl, "utf8");
  assert.match(app, /indexedDB\.open/);
  assert.match(app, /Dureza total da água/);
  assert.match(app, /calculateHardness/);
  assert.match(app, /sample\.created/);
  assert.match(app, /Avaliação Final da Disciplina/);
  assert.match(app, /Parque Estadual Caverna do Diabo/);
  assert.match(app, /Nome do outro local/);
  assert.match(app, /Marque todos os que se aplicam/);
  assert.match(app, /Instituição ou curso, opcional/);
  assert.match(app, /Microplásticos/);
  assert.match(app, /Quanto a visita ajudou a compreender/);
  assert.match(app, /integrou conhecimentos de química, biologia, geologia e meio ambiente/);
  assert.match(app, /contribuiu para sua formação acadêmica/);
  assert.match(app, /Em qual momento você considera que compreendeu melhor/);
  assert.match(app, /Qual melhoria considera mais importante para as próximas atividades/);
  assert.doesNotMatch(app, /Qualidade da experiência de campo/);
  assert.match(app, /1FAIpQLSdB-F5R4XH7b5dVg7VQf9N_B90FV82CQlwrY4MtpX2RuvaPQw/);
  assert.match(app, /Sincronizar agora/);
});

test("prototype sync endpoint declares its non durable limit", async () => {
  const route = await readFile(syncUrl, "utf8");
  assert.match(route, /durable: false/);
  assert.match(route, /validRecords/);
  assert.match(route, /QFL1605_GOOGLE_SYNC_URL/);
  assert.match(route, /1eIANuMWyKt_wH2h4dfLBVDWDuDKNrVU6OtgfMaw42yI/);
});

test("prototype PWA assets are available", async () => {
  await Promise.all(["qfl1605-prototype.webmanifest", "qfl1605-prototype-sw.js"].map((path) => access(new URL(path, publicUrl))));
});

test("separates the three PETAR evaluation audiences", async () => {
  const page = await readFile(publicEvaluationsUrl, "utf8");
  assert.match(page, /Guias e monitores do PETAR/);
  assert.match(page, /Estudantes de escolas/);
  assert.match(page, /Turistas e visitantes/);
  assert.match(page, /Português \/ English/);
  assert.match(page, /robots: \{ index: false, follow: false \}/);
});

test("provides a separate non indexed teaching administration route", async () => {
  const page = await readFile(adminUrl, "utf8");
  assert.match(page, /scope="admin"/);
  assert.match(page, /robots: \{ index: false, follow: false \}/);
});
