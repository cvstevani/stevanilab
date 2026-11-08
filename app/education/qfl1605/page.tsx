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
    status: "Três pontos de estudo definidos",
  },
];

const fieldSteps = [
  ["01", "Preparar", "Perguntas, contexto ambiental, segurança e planejamento da amostragem."],
  ["02", "Observar e coletar", "Registro do local, condições de campo, amostras e medições ambientais."],
  ["03", "Processar", "Organização das amostras, análises laboratoriais e controle de qualidade."],
  ["04", "Interpretar", "Leitura crítica dos resultados e integração entre química, ambiente e território."],
  ["05", "Comunicar", "Relatórios, visualizações e reflexão sobre as implicações ambientais dos dados."],
];

const cebimarMapPoints = [
  ["11", "Praia do Cabelo Gordo", "39.4%", "36.7%", "https://maps.app.goo.gl/N4Jry6N7BotYAmVb8"],
  ["12", "Praia do Segredo", "46.6%", "23.6%", "https://maps.app.goo.gl/QHcfEKePy9yRcb1aA"],
  ["13", "Canal de São Sebastião", "71.9%", "44.6%", "https://maps.app.goo.gl/g2q6h5EQAFSVFGv79"],
] as const;

const mapPoints = [
  ["01", "Rio Ribeira de Iguape", "78.1%", "65.2%", "https://maps.app.goo.gl/apq31baAduCFmu4o9"],
  ["02", "Rio Iporanga", "69.6%", "59.0%", "https://maps.app.goo.gl/ixLHdhnjAoqySwDj7"],
  ["03", "Iporanga", "66.2%", "71.0%", ""],
  ["04", "Rio Betari", "54.2%", "66.4%", "https://maps.app.goo.gl/B1UREK1ZDJri74v7A"],
  ["05", "Rio Alambari", "51.4%", "55.2%", ""],
  ["06", "Caverna Alambari de Baixo", "46.7%", "57.0%", "https://maps.app.goo.gl/7n1pN2fpT1v3XcQp8"],
  ["07", "Bairro da Serra", "41.3%", "58.4%", ""],
  ["08", "Caverna Santana", "35.2%", "49.0%", "https://maps.app.goo.gl/JtsJy2Rki8Wyzczt8"],
  ["09", "Caverna do Diabo", "97.0%", "40.5%", "https://maps.app.goo.gl/VqA4RqgJW4jeJHz19"],
] as const;

const resources = [
  ["Caderno de campo", "Roteiros para observação, registro de amostras e anotações durante as atividades."],
  ["Caderno de laboratório", "Organização de análises, cálculos, resultados e controle de qualidade."],
  ["Protocolos", "Procedimentos de coleta, preservação, medição e análise, liberados após revisão."],
  ["Dados ambientais", "Conjuntos de dados aprovados para exercícios, interpretação e comparação."],
  ["Materiais de apoio", "Textos, mapas, referências e orientações para cada módulo da disciplina."],
  ["Relatórios e resultados", "Sínteses produzidas ao longo da disciplina após avaliação e autorização."],
];

const evaluationAudiences = [
  {
    number: "01",
    title: "Alunos da QFL1605",
    language: "Português",
    text: "Avalie todas as atividades e locais da disciplina, incluindo a relação entre os conteúdos estudados em sala e as observações de campo.",
  },
  {
    number: "02",
    title: "Guias e monitores do PETAR",
    language: "Português",
    text: "Avalie as ações de formação no Núcleo Santana, a visitação noturna e a aplicação dos conhecimentos científicos durante as visitas.",
  },
  {
    number: "03",
    title: "Estudantes de escolas",
    language: "Português",
    text: "Avalie as atividades educativas no PETAR de acordo com sua etapa de ensino e conte o que aprendeu sobre ciência e conservação.",
  },
  {
    number: "04",
    title: "Turistas e visitantes",
    language: "Português / English",
    text: "Conte como foi sua experiência educativa nas cavernas e na visitação noturna. Este é o único formulário disponível também em inglês.",
  },
];

const dashboardLinks = [
  ["book", "Caderno de atividades", "Acesso exclusivo para alunos e professores", "/education/qfl1605/acesso"],
  ["database", "Dados ambientais", "Coletas, análises e resultados", "#locais"],
  ["education", "Materiais educativos", "Recursos para estudantes, escolas, guias e visitantes", "#recursos"],
  ["clipboard", "Avaliações", "Acesso por código distribuído pela equipe", "/education/qfl1605/avaliacoes"],
  ["location", "Locais de coleta", "Mapas e pontos de amostragem", "#locais"],
  ["chart", "Resultados e relatórios", "Gráficos, comparações e publicações", "#recursos"],
] as const;

const partners: Array<{ name: string; logo: string; url: string; tone?: "dark"; style?: "planeta" | "usp" }> = [
  { name: "CEBIMAR USP", logo: "/education/qfl1605/partners/cebimar.jpg", url: "https://cebimar.usp.br" },
  { name: "GeoIntegra", logo: "/education/qfl1605/partners/geointegra.jpg", url: "https://geointegra.com.br" },
  { name: "Instituto de Química da USP", logo: "/partners/iq-usp.png", url: "https://www.iq.usp.br/portaliqusp/" },
  { name: "IPBio", logo: "/education/qfl1605/partners/ipbio.png", url: "https://ipbio.org.br", tone: "dark" },
  { name: "Metrohm", logo: "/education/qfl1605/partners/metrohm.png", url: "https://www.metrohm.com/pt_br.html" },
  { name: "Planeta Trilha", logo: "/education/qfl1605/partners/planeta-trilha.png", url: "https://www.planetatrilha.com.br", style: "planeta" },
  { name: "Pousada das Cavernas", logo: "/education/qfl1605/partners/pousada-das-cavernas.png", url: "https://pousadadascavernas.com.br", tone: "dark" },
  { name: "Universidade de São Paulo", logo: "/partners/usp-crest.png", url: "https://www5.usp.br", style: "usp" },
];

const instructors = [
  { name: "Cassius V. Stevani", affiliation: "Instituto de Química · Universidade de São Paulo", photo: "/cassius-v-stevani-team.jpg", style: "cassius", profile: "/cassius-v-stevani" },
  { name: "Renato S. Freire", affiliation: "Instituto de Química · Universidade de São Paulo", photo: "/education/qfl1605/instructors/renato-sanches-freire.png", style: "renato", profile: "https://bv.fapesp.br/pt/pesquisador/7677/renato-sanches-freire/" },
  { name: "Guilherme C. Bechara", affiliation: "GeoIntegra", photo: "/education/qfl1605/instructors/guilherme-c-bechara.png", style: "guilherme", profile: "https://geointegra.com.br" },
];

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
          <a href="#avaliacoes">Avaliações</a>
          <a href="#parceiros">Parceiros</a>
        </nav>
        <div className="qfl-top-actions">
          <a className="qfl-teacher" href="/education/qfl1605/acesso">Área de trabalho ↗</a>
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
              <div className="qfl-environment-visual qfl-environment-visual-petar" role="img" aria-label="Rio em área de Mata Atlântica no PETAR" />
              <div><h2>PETAR</h2><p>Águas continentais, cavernas, química ambiental e educação</p></div>
            </a>
            <a className="qfl-environment-card" href="#modulos">
              <div className="qfl-environment-visual qfl-environment-visual-diabo" role="img" aria-label="Interior da Caverna do Diabo" />
              <div><h2>Caverna do Diabo</h2><p>Parque Estadual Caverna do Diabo · Eldorado, SP</p></div>
            </a>
            <a className="qfl-environment-card" href="#mapa-cebimar">
              <div className="qfl-environment-visual qfl-environment-visual-cebimar" role="img" aria-label="Ambiente costeiro associado ao CEBIMAR" />
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

      <section className="qfl-section qfl-instructors" aria-labelledby="qfl-instructors-title">
        <div className="qfl-instructors-heading">
          <p className="qfl-kicker">Docentes</p>
          <h2 id="qfl-instructors-title">Quem conduz<br/>a disciplina.</h2>
        </div>
        <div className="qfl-instructor-grid">
          {instructors.map((instructor) => (
            <a
              href={instructor.profile}
              target={instructor.profile.startsWith("http") ? "_blank" : undefined}
              rel={instructor.profile.startsWith("http") ? "noreferrer" : undefined}
              key={instructor.name}
              aria-label={`Abrir perfil de ${instructor.name}`}
            >
              <div className={`qfl-instructor-photo qfl-instructor-${instructor.style}`}>
                <img src={instructor.photo} alt={instructor.name} />
              </div>
              <h3>{instructor.name}</h3>
              <p>{instructor.affiliation}</p>
            </a>
          ))}
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
            <article><strong>13</strong><span>locais de estudo definidos</span></article>
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
        <figure className="qfl-process-figure">
          <figcaption><span>03</span><strong>Percurso de aprendizagem</strong><p>Da pergunta de campo à comunicação dos resultados.</p></figcaption>
          <div className="qfl-step-list">
          {fieldSteps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
          </div>
        </figure>
      </section>

      <section className="qfl-section qfl-sites" id="locais">
        <p className="qfl-kicker">04 / Locais de estudo</p>
        <div className="qfl-section-heading">
          <h2>Do Vale do Ribeira<br/>ao Canal de São Sebastião.</h2>
          <p>Os pontos de estudo conectam rios, cavernas e ambientes costeiros em uma investigação integrada da química ambiental.</p>
        </div>

        <figure className="qfl-site-map">
          <div className="qfl-site-map-stage">
            <img src="/education/qfl1605/bacias-hidrograficas-petar-petcv.jpg" alt="Mapa das bacias hidrográficas, drenagens e nove pontos de coleta no PETAR e PETCV" />
            {mapPoints.map(([number, name, left, top, target]) => target ? (
              <a className="qfl-map-point" href={target} target="_blank" rel="noreferrer" style={{ left, top }} key={number} aria-label={`Abrir o ponto ${Number(number)}, ${name}, no Google Maps`} title={`${Number(number)}. ${name}`} />
            ) : (
              <span className="qfl-map-point qfl-map-point-disabled" style={{ left, top }} key={number} aria-hidden="true" />
            ))}
          </div>
          <figcaption>
            <span>Distribuição das bacias hidrográficas, principais drenagens e pontos de coleta de água no PETAR e no PETCV. Selecione um ponto vermelho para abrir sua localização no Google Maps ou consultar sua descrição. Base cartográfica: Google Satellite. Sistema de referência: SIRGAS 2000, UTM 23S.</span>
          </figcaption>
        </figure>

        <div className="qfl-location-group" id="mapa-cebimar">
          <div className="qfl-location-heading qfl-cebimar-heading"><div><h3>CEBIMAR e Canal de São Sebastião</h3><p>Selecione um dos três marcadores para abrir diretamente sua localização no Google Maps.</p></div></div>
          <figure className="qfl-site-map qfl-cebimar-map">
            <div className="qfl-site-map-stage">
              <img src="/education/qfl1605/cebimar-locais.jpg" alt="Imagem de satélite com os três locais de estudo no CEBIMAR e no Canal de São Sebastião" />
              {cebimarMapPoints.map(([number, name, left, top, url]) => (
                <a
                  className="qfl-map-point qfl-cebimar-map-point"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ left, top }}
                  key={number}
                  aria-label={`Abrir ${name} no Google Maps`}
                  title={`${number}. ${name}`}
                />
              ))}
            </div>
            <figcaption><span>Praia do Cabelo Gordo, Praia do Segredo e Canal de São Sebastião. Selecione somente um dos marcadores para abrir sua localização no Google Maps.</span></figcaption>
          </figure>
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

      <section className="qfl-section qfl-evaluations" id="avaliacoes">
        <p className="qfl-kicker">06 / Avaliações</p>
        <div className="qfl-section-heading">
          <h2>Escutar para<br/>aprimorar.</h2>
          <div className="qfl-evaluation-intro">
            <p>Há formulários específicos para cada público. Os formulários de alunos, estudantes de escolas, guias e monitores estão em português. Somente o formulário para turistas e visitantes é bilíngue.</p>
            <p>A identificação é opcional. As respostas serão analisadas de forma agregada e comentários só poderão aparecer publicamente após revisão.</p>
          </div>
        </div>
        <div className="qfl-evaluation-grid">
          {evaluationAudiences.map((audience) => (
            <article key={audience.number}>
              <span>{audience.number}</span>
              <div>
                <h3>{audience.title}</h3>
                <small>{audience.language}</small>
                <p>{audience.text}</p>
              </div>
              <a href="/education/qfl1605/avaliacoes">Acessar com código →</a>
            </article>
          ))}
        </div>
        <div className="qfl-evaluation-note">
          <strong>Privacidade e uso responsável</strong>
          <p>O formulário não inclui o endereço de e mail nem a Conta Google na resposta. Os dados ficam em uma planilha privada, destinada à avaliação acadêmica e ao aprimoramento da disciplina.</p>
        </div>
      </section>

      <section className="qfl-section qfl-governance" id="publicacao">
        <div><p className="qfl-kicker">07 / Publicação responsável</p><h2>Aprender também é cuidar dos dados.</h2></div>
        <div><p>Registros de campo, avaliações, comentários e trabalhos de estudantes não serão publicados automaticamente. Todo material passará por revisão acadêmica e autorização antes de aparecer nesta área.</p><p>Comentários críticos legítimos poderão contribuir para o aprimoramento da disciplina. Conteúdo ofensivo ou dados pessoais permanecerão fora da área pública.</p></div>
      </section>

      <section className="qfl-section qfl-partners" id="parceiros">
        <p className="qfl-kicker">08 / Parceiros e colaboradores</p>
        <div className="qfl-section-heading">
          <h2>Conhecimento construído<br/>em colaboração.</h2>
          <p>Instituições e empresas que apoiam as atividades acadêmicas, científicas e de campo da QFL1605.</p>
        </div>
        <div className="qfl-partner-grid">
          {partners.map((partner) => (
            <a
              className={[partner.tone === "dark" ? "qfl-partner-dark" : "", partner.style ? `qfl-partner-${partner.style}` : ""].filter(Boolean).join(" ")}
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              key={partner.name}
            >
              <img src={partner.logo} alt={`Logo ${partner.name}`} />
              <span>{partner.name}</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="qfl-footer">
        <div><img src="/stevanilab-logo-white.png" alt="StevaniLab"/><p>QFL1605 · Química Ambiental em Campo<br/>Instituto de Química · Universidade de São Paulo</p></div>
        <a href="mailto:stevani@iq.usp.br">stevani@iq.usp.br ↗</a>
      </footer>
    </main>
  );
}
