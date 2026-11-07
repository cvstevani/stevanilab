import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/education/qfl1605/page.tsx", import.meta.url);
const cssUrl = new URL("../app/globals.css", import.meta.url);
const publicUrl = new URL("../public/", import.meta.url);

const formUrls = [
  "https://docs.google.com/forms/d/e/1FAIpQLSdB-F5R4XH7b5dVg7VQf9N_B90FV82CQlwrY4MtpX2RuvaPQw/viewform",
  "https://docs.google.com/forms/d/e/1FAIpQLScjQKLvgnsdVlmlprsjjt_8M632nowl7QY4BKEopbriPdOH1Q/viewform",
  "https://docs.google.com/forms/d/e/1FAIpQLSdeHVUkzW7ZhZ-NNTTJXSzRPytwDsZvSpFyhyPAgm_w7HS1Og/viewform",
  "https://docs.google.com/forms/d/e/1FAIpQLSeBA9f1F2QG2xKY0Ku5LTcJw3QJqn8_KhP1aZ4XXgTlwOLYWg/viewform",
];

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

test("connects each audience to its specific evaluation form", async () => {
  const page = await readFile(pageUrl, "utf8");

  for (const formUrl of formUrls) assert.ok(page.includes(formUrl));
  assert.match(page, /Alunos da QFL1605/);
  assert.match(page, /Guias e monitores do PETAR/);
  assert.match(page, /Estudantes de escolas/);
  assert.match(page, /Turistas e visitantes/);
  assert.match(page, /Somente o formulário para turistas e visitantes é bilíngue/);
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
