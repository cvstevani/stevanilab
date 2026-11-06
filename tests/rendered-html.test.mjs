import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/education/qfl1605/page.tsx", import.meta.url);
const cssUrl = new URL("../app/globals.css", import.meta.url);
const publicUrl = new URL("../public/", import.meta.url);

const formUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdB-F5R4XH7b5dVg7VQf9N_B90FV82CQlwrY4MtpX2RuvaPQw/viewform";

test("preserves the implemented QFL1605 modules", async () => {
  const page = await readFile(pageUrl, "utf8");

  for (const id of [
    "disciplina",
    "modulos",
    "locais",
    "recursos",
    "avaliacoes",
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
  assert.match(page, /partners\.map/);
});

test("connects the evaluation area to the published bilingual form", async () => {
  const page = await readFile(pageUrl, "utf8");

  assert.ok(page.includes(formUrl));
  assert.match(page, /Estudantes/);
  assert.match(page, /Guias e monitores/);
  assert.match(page, /Turistas e visitantes/);
  assert.match(page, /Responder avaliação/);
  assert.match(page, /A identificação é opcional/);
  assert.match(page, /planilha privada/);
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
