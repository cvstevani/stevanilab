"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

type Session = { student: string; studentId: string; group: string };
type Replica = { id: string; volume: string };
type Sample = {
  id: string;
  revision: number;
  sampleCode: string;
  location: string;
  activity: string;
  collectedAt: string;
  notes: string;
  sampleVolume: number;
  edtaConcentration: number;
  dilutionFactor: number;
  replicas: Array<{ id: string; volume: number }>;
  hardness: number[];
  mean: number;
  standardDeviation: number;
  createdBy: Session;
  changedAt: string;
  syncStatus: "pending" | "synced";
};
type Evaluation = {
  id: string;
  revision: number;
  locations: string[];
  otherLocation: string;
  activities: string[];
  themes: string[];
  otherTheme: string;
  theoryConnection: number | null;
  practicalUnderstanding: number | null;
  interdisciplinaryIntegration: number | null;
  conservationUnderstanding: number | null;
  academicContribution: number | null;
  learningMoment: string;
  theoryExample: string;
  improvement: string;
  optionalName: string;
  institutionOrCourse: string;
  changedAt: string;
  syncStatus: "pending" | "synced";
};
type AuditEvent = { id: string; entityId: string; revision: number; type: string; at: string; snapshot: Sample | Evaluation };
type View = "protocol" | "samples" | "evaluation" | "sync";

const DB_NAME = "qfl1605-prototype";
const DB_VERSION = 1;
const SESSION_KEY = "qfl1605-prototype-session";
const FINAL_EVALUATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdB-F5R4XH7b5dVg7VQf9N_B90FV82CQlwrY4MtpX2RuvaPQw/viewform";
const LOCATIONS = ["PETAR · Núcleo Santana", "PETCV · Caverna do Diabo", "CEBIMAR · Praia do Cabelo Gordo", "CEBIMAR · Praia do Segredo", "Canal de São Sebastião"];
const EVALUATION_LOCATIONS = ["PETAR", "Parque Estadual Caverna do Diabo", "CEBIMAR", "Outro local"];
const EVALUATION_ACTIVITIES = ["Curso de amostragem", "Coleta de amostras", "Determinação dos analitos e uso dos equipamentos", "Visitação noturna ao PETAR"];
const EVALUATION_THEMES = ["Formação das cavernas", "Química da água e das rochas", "Bioluminescência", "Fluorescência", "Fosforescência", "Triboluminescência", "Microplásticos", "Biodiversidade", "Conservação ambiental", "Outro tema"];
const LEARNING_MOMENTS = ["Principalmente durante as aulas", "Principalmente durante a atividade de campo", "Pela combinação entre aulas e campo", "Ainda não compreendi suficientemente", "Prefiro não responder"];

function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`;
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const store of ["samples", "evaluations", "audit"]) {
        if (!db.objectStoreNames.contains(store)) db.createObjectStore(store, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAll<T>(storeName: string): Promise<T[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, "readonly").objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error);
  });
}

async function putRecord<T>(storeName: string, value: T) {
  const db = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const request = db.transaction(storeName, "readwrite").objectStore(storeName).put(value);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function calculateHardness(titrantMl: number, concentration: number, sampleMl: number, dilution: number) {
  if (!titrantMl || !concentration || !sampleMl || !dilution) return 0;
  return titrantMl * concentration * 100.0869 * 1000 * dilution / sampleMl;
}

function standardDeviation(values: number[], mean: number) {
  if (values.length < 2) return 0;
  return Math.sqrt(values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1));
}

function Stars({ value, onChange, label }: { value: number | null; onChange: (value: number) => void; label: string }) {
  return (
    <fieldset className="pwa-stars">
      <legend>{label}</legend>
      <div>{[0, 1, 2, 3, 4, 5].map((star) => (
        <button type="button" key={star} className={value === star ? "selected" : ""} onClick={() => onChange(star)} aria-label={`${star} de 5 estrelas`}>
          {star === 0 ? "0" : "★"}
        </button>
      ))}</div>
      <output>{value === null ? "Não respondido" : `${value} de 5`}</output>
    </fieldset>
  );
}

export function QFL1605Prototype() {
  const [session, setSession] = useState<Session | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) as Session : null;
  });
  const [view, setView] = useState<View>("protocol");
  const [samples, setSamples] = useState<Sample[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [online, setOnline] = useState(() => typeof navigator === "undefined" ? true : navigator.onLine);
  const [syncMessage, setSyncMessage] = useState("Nenhuma sincronização realizada nesta sessão.");
  const [replicas, setReplicas] = useState<Replica[]>([{ id: "r1", volume: "" }, { id: "r2", volume: "" }, { id: "r3", volume: "" }]);
  const [preview, setPreview] = useState({ values: [] as number[], mean: 0, standardDeviation: 0 });
  const [theoryConnection, setTheoryConnection] = useState<number | null>(null);
  const [practicalUnderstanding, setPracticalUnderstanding] = useState<number | null>(null);
  const [interdisciplinaryIntegration, setInterdisciplinaryIntegration] = useState<number | null>(null);
  const [conservationUnderstanding, setConservationUnderstanding] = useState<number | null>(null);
  const [academicContribution, setAcademicContribution] = useState<number | null>(null);
  const [evaluationLocations, setEvaluationLocations] = useState<string[]>([]);
  const [evaluationActivities, setEvaluationActivities] = useState<string[]>([]);
  const [evaluationThemes, setEvaluationThemes] = useState<string[]>([]);
  const [evaluationMessage, setEvaluationMessage] = useState("");

  async function refresh() {
    const [storedSamples, storedEvaluations] = await Promise.all([getAll<Sample>("samples"), getAll<Evaluation>("evaluations")]);
    setSamples(storedSamples.sort((a, b) => b.changedAt.localeCompare(a.changedAt)));
    setEvaluations(storedEvaluations.sort((a, b) => b.changedAt.localeCompare(a.changedAt)));
  }

  useEffect(() => {
    let active = true;
    Promise.all([getAll<Sample>("samples"), getAll<Evaluation>("evaluations")]).then(([storedSamples, storedEvaluations]) => {
      if (!active) return;
      setSamples(storedSamples.sort((a, b) => b.changedAt.localeCompare(a.changedAt)));
      setEvaluations(storedEvaluations.sort((a, b) => b.changedAt.localeCompare(a.changedAt)));
    }).catch(() => undefined);
    const updateOnline = () => setOnline(navigator.onLine);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/qfl1605-prototype-sw.js", { scope: "/education/qfl1605/prototipo/" }).catch(() => undefined);
    return () => {
      active = false;
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  const pendingCount = useMemo(() => [...samples, ...evaluations].filter((item) => item.syncStatus === "pending").length, [samples, evaluations]);

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = { student: String(data.get("student")), studentId: String(data.get("studentId")), group: String(data.get("group")) };
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setSession(next);
  }

  function updatePreview(form: HTMLFormElement, nextReplicas = replicas) {
    const data = new FormData(form);
    const sampleVolume = Number(data.get("sampleVolume"));
    const concentration = Number(data.get("edtaConcentration"));
    const dilution = Number(data.get("dilutionFactor"));
    const values = nextReplicas.map((replica) => Number(replica.volume)).filter((value) => value > 0).map((volume) => calculateHardness(volume, concentration, sampleVolume, dilution));
    const mean = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    setPreview({ values, mean, standardDeviation: standardDeviation(values, mean) });
  }

  async function saveSample(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    const data = new FormData(event.currentTarget);
    const sampleVolume = Number(data.get("sampleVolume"));
    const edtaConcentration = Number(data.get("edtaConcentration"));
    const dilutionFactor = Number(data.get("dilutionFactor"));
    const validReplicas = replicas.map((replica) => ({ id: replica.id, volume: Number(replica.volume) })).filter((replica) => replica.volume > 0);
    const hardness = validReplicas.map((replica) => calculateHardness(replica.volume, edtaConcentration, sampleVolume, dilutionFactor));
    const mean = hardness.reduce((sum, value) => sum + value, 0) / hardness.length;
    const changedAt = new Date().toISOString();
    const sample: Sample = {
      id: uid("sample"), revision: 1, sampleCode: String(data.get("sampleCode")), location: String(data.get("location")), activity: "Dureza total da água",
      collectedAt: String(data.get("collectedAt")), notes: String(data.get("notes")), sampleVolume, edtaConcentration, dilutionFactor, replicas: validReplicas,
      hardness, mean, standardDeviation: standardDeviation(hardness, mean), createdBy: session, changedAt, syncStatus: "pending",
    };
    await Promise.all([putRecord("samples", sample), putRecord("audit", { id: uid("audit"), entityId: sample.id, revision: 1, type: "sample.created", at: changedAt, snapshot: sample } satisfies AuditEvent)]);
    event.currentTarget.reset();
    setReplicas([{ id: "r1", volume: "" }, { id: "r2", volume: "" }, { id: "r3", volume: "" }]);
    setPreview({ values: [], mean: 0, standardDeviation: 0 });
    await refresh();
    setView("sync");
  }

  async function saveEvaluation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const otherLocation = String(data.get("otherLocation") ?? "").trim();
    const otherTheme = String(data.get("otherTheme") ?? "").trim();
    if (!evaluationLocations.length || !evaluationActivities.length) {
      setEvaluationMessage("Marque todos os locais e todas as atividades dos quais participou.");
      return;
    }
    if (evaluationLocations.includes("Outro local") && !otherLocation) {
      setEvaluationMessage("Informe o nome do outro local.");
      return;
    }
    if (evaluationThemes.includes("Outro tema") && !otherTheme) {
      setEvaluationMessage("Informe o nome do outro tema.");
      return;
    }
    const changedAt = new Date().toISOString();
    const evaluation: Evaluation = {
      id: uid("evaluation"), revision: 1, locations: evaluationLocations, otherLocation, activities: evaluationActivities, themes: evaluationThemes, otherTheme,
      theoryConnection, practicalUnderstanding, interdisciplinaryIntegration, conservationUnderstanding, academicContribution,
      learningMoment: String(data.get("learningMoment") ?? ""), theoryExample: String(data.get("theoryExample") ?? ""), improvement: String(data.get("improvement") ?? ""),
      optionalName: String(data.get("optionalName") ?? ""), institutionOrCourse: String(data.get("institutionOrCourse") ?? ""), changedAt, syncStatus: "pending",
    };
    await Promise.all([putRecord("evaluations", evaluation), putRecord("audit", { id: uid("audit"), entityId: evaluation.id, revision: 1, type: "evaluation.created", at: changedAt, snapshot: evaluation } satisfies AuditEvent)]);
    event.currentTarget.reset();
    setTheoryConnection(null);
    setPracticalUnderstanding(null);
    setInterdisciplinaryIntegration(null);
    setConservationUnderstanding(null);
    setAcademicContribution(null);
    setEvaluationLocations([]);
    setEvaluationActivities([]);
    setEvaluationThemes([]);
    setEvaluationMessage("");
    await refresh();
    setView("sync");
  }

  async function synchronize() {
    if (!navigator.onLine) {
      setSyncMessage("Sem conexão. Os registros continuam preservados neste dispositivo.");
      return;
    }
    setSyncMessage("Sincronizando…");
    try {
      const pendingSamples = samples.filter((item) => item.syncStatus === "pending");
      const pendingEvaluations = evaluations.filter((item) => item.syncStatus === "pending");
      const response = await fetch("/api/qfl1605-prototype/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ samples: pendingSamples, evaluations: pendingEvaluations }) });
      const result = await response.json() as { durable?: boolean; message?: string };
      if (!response.ok) throw new Error("sync failed");
      if (!result.durable) {
        setSyncMessage(result.message ?? "O destino Google ainda não está configurado. Os dados continuam na fila local.");
        return;
      }
      for (const sample of pendingSamples) await putRecord("samples", { ...sample, syncStatus: "synced" });
      for (const evaluation of pendingEvaluations) await putRecord("evaluations", { ...evaluation, syncStatus: "synced" });
      await refresh();
      setSyncMessage(`${pendingSamples.length + pendingEvaluations.length} registro(s) confirmado(s) pelo servidor de teste.`);
    } catch {
      setSyncMessage("A sincronização não foi concluída. Os dados continuam na fila local.");
    }
  }

  if (!session) {
    return <main className="pwa-shell pwa-login"><section><p className="pwa-eyebrow">Protótipo local · não publicado</p><h1>Química Ambiental em Campo</h1><p>Identificação simulada para testar o fluxo. Não use dados pessoais ou científicos reais.</p><form onSubmit={signIn}><label>Nome do estudante<input name="student" required /></label><label>Número USP ou identificador de teste<input name="studentId" required /></label><label>Grupo<select name="group" required><option value="">Selecione</option><option>Grupo 1</option><option>Grupo 2</option><option>Grupo 3</option><option>Docentes</option></select></label><button>Entrar no protótipo</button></form><details className="pwa-install-help"><summary>Como instalar no celular</summary><p>No iPhone, abra no Safari, toque em Compartilhar e escolha Adicionar à Tela de Início. No Android, abra no Chrome, acesse o menu e escolha Instalar aplicativo ou Adicionar à tela inicial.</p></details></section></main>;
  }

  return (
    <main className="pwa-shell">
      <header className="pwa-header"><div><p>QFL1605 · Protótipo PWA</p><strong>Química Ambiental em Campo</strong></div><div className={online ? "online" : "offline"}>{online ? "Online" : "Offline"} · {pendingCount} pendente(s)</div></header>
      <nav className="pwa-nav" aria-label="Navegação do aplicativo">{(["protocol", "samples", "sync", "evaluation"] as View[]).map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>{({ protocol: "Protocolo", samples: "Amostras", sync: "Sincronizar", evaluation: "Avaliação Final da Disciplina" })[item]}</button>)}</nav>

      {view === "protocol" && <section className="pwa-panel"><p className="pwa-eyebrow">Protocolo experimental 01</p><h1>Dureza total da água por titulação com EDTA</h1><div className="pwa-protocol-grid"><article><span>01</span><h2>Preparar</h2><p>Neste experimento será determinada a dureza total de uma amostra de água por titulação complexométrica com EDTA. Os íons cálcio e magnésio presentes na amostra reagem com o titulante, permitindo estimar sua concentração conjunta e expressar o resultado como CaCO₃. Antes da análise, identifique e homogeneíze a amostra e registre o local, a data e o horário da coleta.</p></article><article><span>02</span><h2>Medir</h2><p>Pipetar a alíquota, adicionar tampão pH 10 e indicador apropriado.</p></article><article><span>03</span><h2>Titular</h2><p>Titular com EDTA até a mudança de cor. Registrar pelo menos três réplicas.</p></article><article><span>04</span><h2>Calcular</h2><p>Dureza = V<sub>EDTA</sub> × C<sub>EDTA</sub> × 100,0869 × 1000 × diluição ÷ V<sub>amostra</sub>.</p></article></div><aside>Resultado expresso em mg L⁻¹ como CaCO₃. A versão final do protocolo deverá ser aprovada pelos docentes antes do uso em campo.</aside></section>}

      {view === "samples" && <section className="pwa-panel"><p className="pwa-eyebrow">Cadastro e cálculo</p><h1>Nova amostra</h1><form className="pwa-form" onSubmit={saveSample} onInput={(event) => updatePreview(event.currentTarget)}><div className="pwa-fields"><label>Código da amostra<input name="sampleCode" placeholder="Ex.: PETAR G1 001" required /></label><label>Local<select name="location" required><option value="">Selecione</option>{LOCATIONS.map((item) => <option key={item}>{item}</option>)}</select></label><label>Data e hora da coleta<input name="collectedAt" type="datetime-local" required /></label><label>Volume da amostra, mL<input name="sampleVolume" type="number" min="0.01" step="0.01" defaultValue="50" required /></label><label>Concentração do EDTA, mol L⁻¹<input name="edtaConcentration" type="number" min="0.000001" step="0.000001" defaultValue="0.01" required /></label><label>Fator de diluição<input name="dilutionFactor" type="number" min="0.0001" step="0.0001" defaultValue="1" required /></label></div><fieldset className="pwa-replicas"><legend>Volume de EDTA nas réplicas, mL</legend>{replicas.map((replica, index) => <label key={replica.id}>R{index + 1}<input type="number" min="0.001" step="0.001" value={replica.volume} onChange={(event) => { const next = replicas.map((item) => item.id === replica.id ? { ...item, volume: event.target.value } : item); setReplicas(next); updatePreview(event.currentTarget.form!, next); }} required /></label>)}</fieldset><label>Observações<textarea name="notes" rows={3} /></label><div className="pwa-result"><span>Média calculada</span><strong>{preview.mean.toFixed(2)} mg L⁻¹ como CaCO₃</strong><small>Desvio padrão: {preview.standardDeviation.toFixed(2)} · {preview.values.length} réplica(s)</small></div><button>Salvar no dispositivo</button></form><div className="pwa-list"><h2>Amostras neste dispositivo</h2>{samples.length ? samples.map((sample) => <article key={sample.id}><div><strong>{sample.sampleCode}</strong><span>{sample.location}</span></div><b>{sample.mean.toFixed(2)} mg L⁻¹</b><small>Revisão {sample.revision} · {sample.syncStatus === "synced" ? "sincronizada" : "pendente"}</small></article>) : <p>Nenhuma amostra cadastrada.</p>}</div></section>}

      {view === "evaluation" && <section className="pwa-panel"><p className="pwa-eyebrow">Formulário dos estudantes</p><h1>Avaliação Final da Disciplina</h1><p className="pwa-intro">Avaliação anônima das atividades da disciplina QFL1605. Envie somente uma avaliação e marque todos os locais e todas as atividades aplicáveis.</p><a className="pwa-google-link" href={FINAL_EVALUATION_URL} target="_blank" rel="noreferrer">Abrir o formulário oficial no Google ↗</a><p className="pwa-google-note">Informar seu nome é opcional. Não coletamos e mail, telefone ou documento. Respostas registradas sem internet permanecem neste aparelho até a confirmação de gravação no destino Google.</p><form className="pwa-form" onSubmit={saveEvaluation}><div className="pwa-fields"><label>Nome, opcional<input name="optionalName" /></label><label>Instituição ou curso, opcional<input name="institutionOrCourse" /></label></div><fieldset className="pwa-check-group"><legend>Locais visitados ou avaliados. Marque todos os que se aplicam.</legend>{EVALUATION_LOCATIONS.map((item) => <label key={item}><input type="checkbox" checked={evaluationLocations.includes(item)} onChange={(event) => setEvaluationLocations((current) => event.target.checked ? [...current, item] : current.filter((value) => value !== item))} />{item}</label>)}</fieldset>{evaluationLocations.includes("Outro local") && <label>Nome do outro local<input name="otherLocation" required /></label>}<fieldset className="pwa-check-group"><legend>Atividades realizadas. Marque todas as que se aplicam.</legend>{EVALUATION_ACTIVITIES.map((item) => <label key={item}><input type="checkbox" checked={evaluationActivities.includes(item)} onChange={(event) => setEvaluationActivities((current) => event.target.checked ? [...current, item] : current.filter((value) => value !== item))} />{item}</label>)}</fieldset><fieldset className="pwa-check-group"><legend>Quais temas foram relacionados à atividade? Marque os que se aplicam.</legend>{EVALUATION_THEMES.map((item) => <label key={item}><input type="checkbox" checked={evaluationThemes.includes(item)} onChange={(event) => setEvaluationThemes((current) => event.target.checked ? [...current, item] : current.filter((value) => value !== item))} />{item}</label>)}</fieldset>{evaluationThemes.includes("Outro tema") && <label>Nome do outro tema<input name="otherTheme" required /></label>}<Stars label="Quanto você percebeu relação entre os conteúdos estudados em sala e a atividade de campo?" value={theoryConnection} onChange={setTheoryConnection} /><Stars label="Quanto a visita ajudou a compreender, na prática, conceitos discutidos em sala?" value={practicalUnderstanding} onChange={setPracticalUnderstanding} /><Stars label="Quanto a atividade integrou conhecimentos de química, biologia, geologia e meio ambiente?" value={interdisciplinaryIntegration} onChange={setInterdisciplinaryIntegration} /><Stars label="Quanto a experiência ampliou sua compreensão sobre conservação ambiental?" value={conservationUnderstanding} onChange={setConservationUnderstanding} /><Stars label="Quanto a atividade contribuiu para sua formação acadêmica?" value={academicContribution} onChange={setAcademicContribution} /><label>Em qual momento você considera que compreendeu melhor os conteúdos?<select name="learningMoment" defaultValue=""><option value="">Selecione, se desejar</option>{LEARNING_MOMENTS.map((item) => <option key={item}>{item}</option>)}</select></label><label>Cite, se desejar, um exemplo de relação entre a teoria e uma observação feita no campo.<textarea name="theoryExample" rows={4} /></label><label>Qual melhoria considera mais importante para as próximas atividades?<textarea name="improvement" rows={4} /></label>{evaluationMessage && <p className="pwa-form-message" role="alert">{evaluationMessage}</p>}<button>Salvar avaliação no dispositivo</button></form></section>}

      {view === "sync" && <section className="pwa-panel"><p className="pwa-eyebrow">Fila offline</p><h1>Sincronização segura</h1><div className="pwa-sync-card"><strong>{pendingCount}</strong><span>registro(s) aguardando confirmação</span><p>{syncMessage}</p><button onClick={synchronize} disabled={!pendingCount}>Sincronizar agora</button></div><p className="pwa-warning">A ponte segura com o destino Google ainda será configurada. Até lá, o protótipo preserva os registros no IndexedDB e não os apresenta como sincronizados. Não use dados reais.</p></section>}

      <footer className="pwa-footer"><span>{session.student} · {session.group}</span><button onClick={() => { localStorage.removeItem(SESSION_KEY); setSession(null); }}>Sair</button></footer>
    </main>
  );
}
