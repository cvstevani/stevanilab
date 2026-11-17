import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homeUrl = new URL("../app/page.tsx", import.meta.url);
const routes = [
  ["../app/education/qfl1605/page.tsx", "https://ambiental.iq.usp.br"],
  ["../app/education/qfl1605/acesso/page.tsx", "https://ambiental.iq.usp.br/education/qfl1605/acesso"],
  ["../app/education/qfl1605/avaliacoes/page.tsx", "https://ambiental.iq.usp.br/education/qfl1605/avaliacoes"],
  ["../app/education/qfl1605/prototipo/page.tsx", "https://ambiental.iq.usp.br/education/qfl1605/prototipo"],
  ["../app/education/qfl1605/prototipo/admin/page.tsx", "https://ambiental.iq.usp.br/education/qfl1605/prototipo/admin"],
  ["../app/education/qfl1605/prototipo/avaliacoes/page.tsx", "https://ambiental.iq.usp.br/education/qfl1605/prototipo/avaliacoes"],
];

test("removes Education from the StevaniLab navigation", async () => {
  const home = await readFile(homeUrl, "utf8");
  assert.doesNotMatch(home, /className="education-link"/);
  assert.ok(!home.includes('href="/education/qfl1605"'));
});

test("permanently redirects every former QFL1605 page to IQ USP", async () => {
  for (const [relativePath, destination] of routes) {
    const source = await readFile(new URL(relativePath, import.meta.url), "utf8");
    assert.match(source, /permanentRedirect/);
    assert.ok(source.includes(destination));
  }
});
