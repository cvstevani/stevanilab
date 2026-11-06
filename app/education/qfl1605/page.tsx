import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QFL1605 · Química Ambiental em Campo | StevaniLab",
  description:
    "Portal acadêmico da disciplina QFL1605 do Instituto de Química da Universidade de São Paulo.",
};

const modules = [
  {
    number: "01",
    place: "PETAR",
    title: "Água, cavernas e Mata Atlântica",
    text: "Integra observação de campo, qualidade da água, geologia, biodiversidade e impactos ambientais no Vale do Ribeira.",
    status: "Estrutura inicial disponível",
  },
  {
    number: "02",
    place: "Caverna do Diabo",
    title: "Paisagem cárstica e conservação",
    text: "Conecta sistemas aquáticos, cavernas, uso do território e conservação ambiental no Parque Estadual Caverna do Diabo, em Eldorado, SP.",
    status: "Conteúdo em preparação",
  },
  {
    number: "03",
    place: "CEBIMAR",
    title: "Química do ambiente marinho",
    text: "Explora processos costeiros, parâmetros ambientais e relações entre química, organismos e dinâmica marinha.",
    status: "Pontos de estudo a definir",
  },
];

const fieldSteps = [
  ["01", "Preparar", "Perguntas, contexto ambiental, segurança e planejamento da amostragem."],
  ["02", "Observar e coletar", "Registro do local, condições de campo, amostras e medições ambientais."],
  ["03", "Processar", "Organização das amostras, análises laboratoriais e controle de qualidade."],
  ["04", "Interpretar", "Leitura crítica dos resultados e integração entre química, ambiente e território."],
  ["05", "Comunicar", "Relatórios, visualizações e reflexão sobre as implicações ambientais dos dados."],
];

const collectionSites = [
  ["01", "Rio Ribeira de Iguape", "Sistema fluvial regional"],
  ["02", "Rio Iporanga", "Bacia do Alto Ribeira"],
  ["03", "Rio Betari", "Núcleo Santana · PETAR"],
  ["04", "Caverna Santana", "Núcleo Santana · PETAR"],
  ["05", "Caverna do Couto", "Núcleo Santana · PETAR"],
  ["06", "Caverna Alambari de Baixo", "Núcleo Ouro Grosso · PETAR"],
  ["07", "Caverna do Diabo", "Parque Estadual Caverna do Diabo · Eldorado, SP"],
];

const resources = [
  ["Caderno de campo", "Roteiros para observação, registro de amostras e anotações durante as atividades."],
  ["Caderno de laboratório", "Organização de análises, cálculos, resultados e controle de qualidade."],
  ["Protocolos", "Procedimentos de coleta, preservação, medição e análise, liberados após revisão."],
  ["Dados ambientais", "Conjuntos de dados aprovados para exercícios, interpretação e comparação."],
  ["Materiais de apoio", "Textos, mapas, referências e orientações para cada módulo da disciplina."],
  ["Relatórios e resultados", "Sínteses produzidas ao longo da disciplina após avaliação e autorização."],
];

const dashboardLinks = [
  ["book", "Caderno de atividades", "Protocolos de campo e laboratório", "#recursos"],
  ["database", "Dados ambientais", "Coletas, análises e resultados", "#locais"],
  ["education", "Materiais educativos", "Recursos para estudantes, escolas, guias e visitantes", "#recursos"],
  ["clipboard", "Avaliações", "Questionários e contribuições", "#publicacao"],
  ["location", "Locais de coleta", "Mapas e pontos de amostragem", "#locais"],
  ["chart", "Resultados e relatórios", "Gráficos, comparações e publicações", "#recursos"],
] as const;

function PortalIcon({ name }: { name: (typeof dashboardLinks)[number][0] }) {
  if (name === "book") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5a3 3 0 0 1 3-1.2c2 0 3.7.8 5 2.2v13c-1.3-1.4-3-2.2-5-2.2a3 3 0 0 0-3 1.2zM20 5.5a3 3 0 0 0-3-1.2c-2 0-3.7.8-5 2.2v13c1.3-1.4 3-2.2 5-2.2a3 3 0 0 1 3 1.2z"/></svg>;
  if (name === "database") return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>;
  if (name === "education") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5zM7 12v4c2.8 2.3 7.2 2.3 10 0v-4M21 9v6"/></svg>;
  if (name === "clipboard") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5H6a2 2 0 0 0-2 2v13h16V7a2 2 0 0 0-2-2h-3M9 3h6v4H9zM8 13l2 2 5-5"/></svg>;
  if (name === "location") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v7M9 7a3 3 0 1 1 6 0 3 3 0 0 1-6 0zM12 11c-5 0-9 2-9 4.5S7 20 12 20s9-2 9-4.5c0-1.5-1.6-2.8-4-3.6"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V10h4v9zM10 19V5h4v14zM16 19v-7h4v7z"/></svg>;
}

export default function QFL1605Page() {
  return (
    <main className="qfl-page">
      <header className="qfl-topbar">
        <Link href="/" className="brand" aria-label="Voltar ao StevaniLab">
          <img className="brand-logo" src="/stevanilab-logo-white.png" alt="" />
          <span className="brand-name">STEVANI<strong>LAB</strong></span>
        </Link>
        <nav className="qfl-nav" aria-label="Navegação da disciplina">
          <a href="#disciplina">Disciplina</a>
          <a href="#modulos">Módulos</a>
          <a href="#locais">Locais</a>
          <a href="#recursos">Recursos</a>
        </nav>
        <div className="qfl-top-actions">
          <a className="qfl-teacher" href="https://drive.google.com/drive/folders/19VTN2aGtNBJKqtYcIknyHK9H_wyCw90S" target="_blank" rel="noreferrer">Área docente ↗</a>
          <Link className="qfl-back" href="/">Voltar ao site</Link>
        </div>
      </header>

      <section className="qfl-dashboard" aria-labelledby="qfl-dashboard-title">
        <div className="qfl-dashboard-shell">
          <header className="qfl-dashboard-heading">
            <p>Portal acadêmico</p>
            <h1 id="qfl-dashboard-title">Química Ambiental em Campo</h1>
            <span>QFL1605 · Instituto de Química · USP</span>
          </header>

          <div className="qfl-environment-grid" aria-label="Ambientes de estudo">
            <a className="qfl-environment-card" href="#modulos">
              <div className="qfl-environment-visual qfl-environment-visual-petar" role="img" aria-label="Mata Atlântica no Vale do Ribeira" />
              <div><h2>PETAR</h2><p>Águas continentais, cavernas, química ambiental e educação</p></div>
            </a>
            <a className="qfl-environment-card" href="#modulos">
              <div className="qfl-environment-visual qfl-environment-visual-diabo" role="img" aria-label="Representação de uma caverna no Parque Estadual Caverna do Diabo" />
              <div><h2>Caverna do Diabo</h2><p>Parque Estadual Caverna do Diabo · Eldorado, SP</p></div>
            </a>
            <a className="qfl-environment-card" href="#modulos">
              <div className="qfl-environment-visual qfl-environment-visual-cebimar" role="img" aria-label="Representação da costa marinha estudada no CEBIMAR"><span className="qfl-sea-sun"/><span className="qfl-sea-land"/><span className="qfl-sea-shore"/></div>
              <div><h2>CEBIMAR</h2><p>Química marinha, águas costeiras e análises ambientais</p></div>
            </a>
          </div>

          <div className="qfl-dashboard-divider" />
          <nav className="qfl-dashboard-links" aria-label="Áreas do portal">
            {dashboardLinks.map(([icon, title, description, href]) => (
              <a href={href} key={title}><PortalIcon name={icon}/><h2>{title}</h2><p>{description}</p></a>
            ))}
          </nav>
          <a className="qfl-dashboard-down" href="#disciplina" aria-label="Continuar para a apresentação da disciplina">↓</a>
        </div>
      </section>

      <section className="qfl-section qfl-overview" id="disciplina">
        <div>
          <p className="qfl-kicker">01 / A disciplina</p>
          <h2>Do território<br/>ao dado ambiental.</h2>
        </div>
        <div className="qfl-overview-copy">
          <p>A QFL1605 transforma o campo em uma extensão do laboratório. A observação do ambiente, a coleta de amostras e as análises químicas são organizadas como partes de uma mesma investigação.</p>
          <p>Este portal reunirá os roteiros, registros, dados e resultados da disciplina. A estrutura pública será ampliada gradualmente, sempre após revisão e aprovação do conteúdo.</p>
          <div className="qfl-principles">
            <article><strong>3</strong><span>ambientes de estudo</span></article>
            <article><strong>7</strong><span>locais já mapeados</span></article>
            <article><strong>1</strong><span>percurso integrado</span></article>
          </div>
        </div>
      </section>

      <section className="qfl-section qfl-modules" id="modulos">
        <p className="qfl-kicker qfl-kicker-light">02 / Módulos de campo</p>
        <div className="qfl-section-heading">
          <h2>Três paisagens.<br/>Uma investigação.</h2>
          <p>Os módulos organizam os diferentes contextos ambientais sem misturar materiais, registros ou resultados.</p>
        </div>
        <div className="qfl-module-grid">
          {modules.map((module) => (
            <article key={module.number}>
              <div><span>{module.number}</span><p>{module.place}</p></div>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
              <small>{module.status}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="qfl-section qfl-journey">
        <p className="qfl-kicker">03 / Percurso de aprendizagem</p>
        <h2>Da pergunta<br/>à comunicação.</h2>
        <div className="qfl-step-list">
          {fieldSteps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="qfl-section qfl-sites" id="locais">
        <p className="qfl-kicker">04 / Locais de estudo</p>
        <div className="qfl-section-heading">
          <h2>Uma rede de rios,<br/>cavernas e mar.</h2>
          <p>Os pontos do CEBIMAR serão incorporados quando a programação de campo estiver definida.</p>
        </div>
        <div className="qfl-site-list">
          {collectionSites.map(([number, name, place]) => (
            <article key={number}><span>{number}</span><h3>{name}</h3><p>{place}</p></article>
          ))}
          <article className="qfl-site-pending"><span>08</span><h3>CEBIMAR</h3><p>Pontos de estudo em definição</p></article>
        </div>
      </section>

      <section className="qfl-section qfl-resources" id="recursos">
        <p className="qfl-kicker qfl-kicker-light">05 / Área de trabalho</p>
        <div className="qfl-section-heading">
          <h2>Materiais organizados<br/>por finalidade.</h2>
          <p>Os recursos serão liberados por etapas. Itens em preparação permanecem identificados e sem dados pessoais.</p>
        </div>
        <div className="qfl-resource-grid">
          {resources.map(([title, text], index) => (
            <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p><small>Em preparação</small></article>
          ))}
        </div>
      </section>

      <section className="qfl-section qfl-governance" id="publicacao">
        <div><p className="qfl-kicker">06 / Publicação responsável</p><h2>Aprender também é cuidar dos dados.</h2></div>
        <div><p>Registros de campo, avaliações, comentários e trabalhos de estudantes não serão publicados automaticamente. Todo material passará por revisão acadêmica e autorização antes de aparecer nesta área.</p><p>Comentários críticos legítimos poderão contribuir para o aprimoramento da disciplina. Conteúdo ofensivo ou dados pessoais permanecerão fora da área pública.</p></div>
      </section>

      <footer className="qfl-footer">
        <div><img src="/stevanilab-logo-white.png" alt="StevaniLab"/><p>QFL1605 · Química Ambiental em Campo<br/>Instituto de Química · Universidade de São Paulo</p></div>
        <a href="mailto:stevani@iq.usp.br">stevani@iq.usp.br ↗</a>
      </footer>
    </main>
  );
}
