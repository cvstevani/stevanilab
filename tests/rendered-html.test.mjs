import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/education/qfl1605/page.tsx", import.meta.url);
const accessRouteUrl = new URL("../app/api/qfl-access/route.ts", import.meta.url);
const cssUrl = new URL("../app/globals.css", import.meta.url);
const publicUrl = new URL("../public/", import.meta.url);

test("preserves the implemented QFL1605 modules", async () => {
  const page = await readFile(pageUrl, "utf8");

  for (const id of [
    "disciplina",
    "modulos",
    "locais",
    "recursos",
    "avaliacoes",
    "resultados",
    "publicacao",
    "parceiros",
  ]) {
    assert.match(page, new RegExp(`id=["']${id}["']`));
  }

  assert.match(page, /PETAR/);
  assert.match(page, /Caverna do Diabo/);
  assert.match(page, /CEBIMAR/);
  assert.match(page, /mapPoints\.map/);
  assert.match(page, /cebimarMapPoints\.map/);
  assert.match(page, /Centro de Biologia Marinha da USP/);
  assert.match(page, /quatro locais identificados no mapa/);
  assert.match(page, /partners\.map/);
});

test("describes every evaluation audience without exposing forms", async () => {
  const page = await readFile(pageUrl, "utf8");

  assert.doesNotMatch(page, /docs\.google\.com\/forms/);
  assert.doesNotMatch(page, /\/education\/qfl1605\/avaliacoes/);
  assert.match(page, /Alunos da QFL1605/);
  assert.match(page, /Guias e monitores do PETAR/);
  assert.match(page, /Estudantes de escolas/);
  assert.match(page, /Turistas e visitantes/);
  assert.match(page, /Somente o formulário para turistas e visitantes é bilíngue/);
  assert.match(page, /Distribuição pela equipe e por QR code/);
  assert.match(page, /A identificação é opcional/);
  assert.match(page, /planilha privada/);
});

test("keeps protected QFL1605 destinations out of the public page", async () => {
  const [page, accessRoute] = await Promise.all([
    readFile(pageUrl, "utf8"),
    readFile(accessRouteUrl, "utf8"),
  ]);

  assert.doesNotMatch(page, /docs\.google\.com\/forms|drive\.google\.com\/drive\/folders/);
  assert.match(accessRoute, /QFL1605_WORKSPACE_CODE/);
  assert.match(accessRoute, /QFL1605_EVALUATION_CODE/);
  assert.match(accessRoute, /QFL1605_ADMIN_CODE/);
  assert.match(accessRoute, /HttpOnly; SameSite=Strict/);
});

test("keeps the evaluation layout responsive", async () => {
  const css = await readFile(cssUrl, "utf8");

  assert.match(css, /\.qfl-evaluation-grid\s*\{/);
  assert.match(css, /grid-template-columns:repeat\(3,1fr\)/);
  assert.match(css, /\.qfl-evaluation-note\s*\{/);
  assert.match(
    css,
    /\.qfl-module-grid,\.qfl-resource-grid,\.qfl-evaluation-grid \{ grid-template-columns:1fr; \}/,
  );
  assert.match(css, /\.qfl-evaluation-note \{ grid-template-columns:1fr;/);
});

test("keeps the principal QFL1605 images available", async () => {
  await Promise.all(
    [
      "education/qfl1605/petar-river.jpeg",
      "education/qfl1605/caverna-do-diabo.jpeg",
      "education/qfl1605/cebimar-coast.jpeg",
      "education/qfl1605/cebimar-locais.jpg",
      "education/qfl1605/bacias-hidrograficas-petar-petcv.jpg",
      "education/qfl1605/instructors/renato-sanches-freire.png",
      "education/qfl1605/instructors/guilherme-c-bechara.png",
    ].map((path) => access(new URL(path, publicUrl))),
  );
});
