"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Scope = "workspace" | "evaluations" | "admin";
type Resource = { title: string; url: string };

export function AccessPortal({ scope }: { scope: Scope }) {
  const [code, setCode] = useState("");
  const [resources, setResources] = useState<Resource[] | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadResources() {
    const response = await fetch(`/api/qfl-access?scope=${scope}`, { cache: "no-store" });
    if (response.ok) {
      const data = await response.json() as { resources: Resource[] };
      setResources(data.resources);
    }
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    fetch(`/api/qfl-access?scope=${scope}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok || !active) return;
        const data = await response.json() as { resources: Resource[] };
        if (active) setResources(data.resources);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [scope]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/qfl-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scope, code }),
    });
    const data = await response.json() as { message?: string };
    if (!response.ok) {
      setMessage(data.message ?? "Não foi possível liberar o acesso.");
      setLoading(false);
      return;
    }
    setCode("");
    await loadResources();
  }

  const isWorkspace = scope === "workspace";
  const isAdmin = scope === "admin";

  return (
    <main className="qfl-access-page">
      <a className="qfl-access-back" href="/education/qfl1605">← Voltar à página da disciplina</a>
      <section className="qfl-access-card">
        <p className="qfl-kicker">Acesso restrito</p>
        <h1>{isAdmin ? "Administração da QFL1605" : isWorkspace ? "Área de trabalho" : "Questionários de avaliação"}</h1>
        <p>{isAdmin
          ? "Acesso temporário reservado aos docentes. A versão definitiva usará autenticação individual e lista de contas autorizadas."
          : isWorkspace
          ? "Conteúdo exclusivo para alunos matriculados na QFL1605 e professores da disciplina."
          : "Acesso reservado aos participantes presentes nas atividades da disciplina ou do PETAR. Use o código fornecido pela equipe responsável."
        }</p>

        {resources ? (
          <div className="qfl-access-resources">
            {resources.length ? resources.map((resource) => (
              <a href={resource.url} target="_blank" rel="noreferrer" key={resource.title}>{resource.title}<span>↗</span></a>
            )) : <p>Os materiais estão sendo preparados para liberação.</p>}
          </div>
        ) : (
          <form onSubmit={submit} className="qfl-access-form">
            <label htmlFor="access-code">Código de acesso</label>
            <input id="access-code" value={code} onChange={(event) => setCode(event.target.value)} autoComplete="one-time-code" required />
            <button type="submit" disabled={loading}>{loading ? "Verificando…" : "Entrar"}</button>
            {message && <p role="alert">{message}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
