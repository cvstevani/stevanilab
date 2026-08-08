"use client";

import { useState } from "react";
import { newsPosts } from "./news-posts";
import { JournalCovers } from "./journal-covers";

type Lang = "en" | "pt";

const nav = ["about", "research", "projects", "team", "publications", "media", "contact"];

const copy = {
  en: {
    eyebrow: "Fungal Bioluminescence Laboratory · IQ–USP",
    hero: "The living light\nof fungi.",
    intro: "We investigate how fungi make light — and how this ancient chemistry can illuminate ecology, biotechnology and new analytical tools.",
    explore: "Explore our research",
    aboutTitle: "A natural mystery,\nmade visible.",
    about: "Bioluminescent mushrooms have been observed since Aristotle, yet their chemistry remained unexplained for millennia. Since 2015, our group has helped reveal the ecological function, luciferin, luciferase and mechanism behind fungal light — working with collaborators across Brazil, Russia, Japan, the United Kingdom and the United States.",
    researchTitle: "From molecule to ecosystem",
    projectsTitle: "Research in motion",
    teamTitle: "The people behind the light",
    pubsTitle: "Selected publications",
    mediaTitle: "Science beyond the lab",
    contactTitle: "Let’s make something glow.",
    contactCopy: "For research collaborations, student opportunities, press and scientific outreach, get in touch with us in São Paulo.",
    allPapers: "View all papers",
    visit: "Visit project",
    archive: "Complete news archive",
    archiveIntro: "Every story preserved from the original StevaniLab website.",
    archiveOpen: "Browse all stories",
  },
  pt: {
    eyebrow: "Laboratório de Bioluminescência de Fungos · IQ–USP",
    hero: "A luz viva\ndos fungos.",
    intro: "Investigamos como os fungos produzem luz — e como essa química ancestral pode iluminar a ecologia, a biotecnologia e novas ferramentas analíticas.",
    explore: "Conheça nossa pesquisa",
    aboutTitle: "Um mistério natural,\nagora visível.",
    about: "Cogumelos bioluminescentes são observados desde Aristóteles, mas sua química permaneceu sem explicação por milênios. Desde 2015, nosso grupo participa da elucidação da função ecológica, luciferina, luciferase e mecanismo da luz fúngica — em colaboração com pesquisadores do Brasil, Rússia, Japão, Reino Unido e Estados Unidos.",
    researchTitle: "Da molécula ao ecossistema",
    projectsTitle: "Pesquisa em movimento",
    teamTitle: "As pessoas por trás da luz",
    pubsTitle: "Publicações selecionadas",
    mediaTitle: "Ciência além do laboratório",
    contactTitle: "Vamos fazer algo brilhar.",
    contactCopy: "Para colaborações de pesquisa, oportunidades para estudantes, imprensa e divulgação científica, fale conosco em São Paulo.",
    allPapers: "Ver todos os artigos",
    visit: "Visitar projeto",
    archive: "Arquivo completo de notícias",
    archiveIntro: "Todas as matérias preservadas do site original do StevaniLab.",
    archiveOpen: "Ver todas as matérias",
  },
};

const research = [
  ["01", "Fungal bioluminescence", "Mechanism, evolution and ecological function of light emission in fungi.", "fungal-bioluminescence"],
  ["02", "Environmental metagenomics", "Microbial biodiversity and metabolic genes in Atlantic Forest water bodies.", "environmental-metagenomics"],
  ["03", "Bioanalytical tools", "Living biosensors and analytical tools built from bioluminescent systems.", "bioanalytical-tools"],
  ["04", "Chemiluminescence", "Mechanisms and high-energy intermediates in light-producing chemical reactions.", "chemiluminescence"],
  ["05", "Degradation of automotive clearcoat", "Chemical pathways behind polymer damage promoted by dragonfly eggs.", "automotive-clearcoat"],
  ["06", "Marine and other bioluminescent systems", "Light-emitting proteins and organisms across marine and terrestrial systems.", "marine-bioluminescence"],
  ["07", "Fungal taxonomy", "Discovery, description and evolutionary placement of luminous fungi.", "fungal-taxonomy"],
  ["08", "Others", "Research across environmental chemistry, biotechnology and related systems.", "others"],
];

const teamMembers = [
  { name: "Cassius V. Stevani", photo: "/cassius-v-stevani.png", profile: "/cassius-v-stevani", roleEn: "Principal Investigator", rolePt: "Pesquisador principal", projectEn: "Fungal bioluminescence, environmental chemistry and bioanalytical applications.", projectPt: "Bioluminescência de fungos, química ambiental e aplicações bioanalíticas." },
  { name: "Dielle P. Procópio", roleEn: "Postdoctoral Researcher", rolePt: "Pesquisadora de pós-doutorado", projectEn: "Adaptive evolution of PHB-producing Synechocystis sp. PCC6803 for improved acetate consumption.", projectPt: "Evolução adaptativa de Synechocystis sp. PCC6803 produtora de PHB para melhor consumo de acetato.", photo: "/dielle-procopio.png" },
  { name: "Carlos Augusto Hruschka Diegues Fogaça", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Production and development of bioluminescent plants.", projectPt: "Produção e desenvolvimento de plantas bioluminescentes." },
  { name: "Gustavo de Rezende", photo: "/gustavo-de-rezende.png", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Bioenergetics and oxidative stress in bioluminescent fungi.", projectPt: "Bioenergética e estresse oxidativo em fungos bioluminescentes." },
  { name: "Pedro Bongiorno Miragaia", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Prospection, cultivation and characterization of bacterial biopolymers.", projectPt: "Prospecção, cultivo e caracterização de biopolímeros bacterianos.", photo: "/pedro-bongiorno-miragaia.png" },
  { name: "Pedro M. Lopes", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Hydroxylase and β-glycosyltransferase involved in equisetumpyrone biosynthesis in plants.", projectPt: "Hidroxilase e β-glicosiltransferase envolvidas na biossíntese de equisetumpirona em plantas.", photo: "/pedro-lopes.png" },
  { name: "Samir V. F. Atum", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Environmental metagenomics and phylogenetic analyses.", projectPt: "Metagenômica ambiental e análises filogenéticas.", photo: "/samir-atum.png" },
  { name: "Sophia F. D. de Lima", roleEn: "PhD Researcher", rolePt: "Pesquisadora de doutorado", projectEn: "Protoplasts for genome editing in basidiomycetes.", projectPt: "Protoplastos para edição de genoma em basidiomicetos.", photo: "/sophia-de-lima.png" },
  { name: "Dan P. Lima", roleEn: "Undergraduate Researcher", rolePt: "Pesquisador de iniciação científica", projectEn: "Preservation and identification of bioluminescent fungi.", projectPt: "Preservação e identificação de fungos bioluminescentes." },
  { name: "Emily Kathrin Ribeiro Silva", roleEn: "Undergraduate Researcher", rolePt: "Pesquisadora de iniciação científica", projectEn: "Bioinformatics and genome assembly.", projectPt: "Bioinformática e montagem de genomas." },
];

const alumniGroups = [
  {
    en: "Former postdoctoral researchers", pt: "Ex-pesquisadores de pós-doutorado",
    members: [
      ["Douglas M. M. Soares", "/alumni/douglas-soares.png", "https://scholar.google.com/citations?user=u0U0SOcAAAAJ&hl=pt-BR"],
      ["Kevin A. J. Bayle", "/alumni/kevin-bayle.jpeg", "https://pe.linkedin.com/in/kevin-bayle-5b026487"],
    ],
  },
  {
    en: "Former group members", pt: "Ex-integrantes do grupo",
    members: [
      ["Anderson Garbuglio de Oliveira", "/alumni/anderson-oliveira.jpg", "https://www.theoliveiralab.com"],
      ["Bianca de Barros Nóbrega", "/alumni/bianca-nobrega.png", ""],
      ["Caio Klocke Zamuner", "/alumni/caio-zamuner.png", ""],
      ["Fernanda de Freitas Ventura", "/alumni/fernanda-ventura.jpg", ""],
      ["Gabriel Nóbrega da Rocha Martins", "/alumni/gabriel-martins.jpg", "https://br.linkedin.com/in/gabrielmartinshplc"],
      ["Hans Eugene Waldenmaier", "/alumni/hans-waldenmaier.jpg", "https://app.dimensions.ai/discover/publication?and_facet_researcher=ur.0665353726.04"],
      ["Luiz Fernando Mendes", "/alumni/luiz-mendes.jpg", "https://www.bioativosgroup.com.br"],
      ["Olivia Domingues", "/alumni/olivia-domingues.jpg", "https://br.linkedin.com/in/olivia-domingues-bazito-23862431"],
      ["Rodrigo Pimenta Carvalho", "/alumni/rodrigo-carvalho.jpg", "https://br.linkedin.com/in/pimentarc"],
      ["Tatiana Araújo Pereira", "/alumni/tatiana-pereira.jpg", "https://br.linkedin.com/in/tatiana-araujo-pereira-b566a713/pt"],
    ],
  },
];

const papers = [
  ["2026", "A Fungal Bioluminescent Pathway-based yeast biosensor for caffeic acid quantification", "ACS Sensors"],
  ["2026", "Caffeylpyruvate hydrolase is the key recycling enzyme in fungal bioluminescence", "The FEBS Journal"],
  ["2025", "Diversity, distribution and evolution of bioluminescent fungi", "Journal of Fungi"],
  ["2024", "The living light from fungi", "Journal of Photochemistry & Photobiology C"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function newsMeta(post: (typeof newsPosts)[number]) {
  const [year, month, day] = post.date.split("-");
  return {
    url: post.link,
    title: post.title,
    source: post.source,
    stamp: Number(`${year}${month}${day}`),
    year,
    date: `${day}.${month}.${year}`,
  };
}

const newsItems = newsPosts
  .map(newsMeta)
  .sort((a, b) => b.stamp - a.stamp || a.title.localeCompare(b.title));

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  return (
    <main>
      <header className="topbar">
        <a href="#top" className="brand" aria-label="StevaniLab home">
          <img className="brand-logo" src="/stevanilab-logo-white.png" alt="" />
          <span className="brand-name">STEVANI<strong>LAB</strong></span>
        </a>
        <nav aria-label="Section navigation">
          {nav.map((item) => <a key={item} href={`#${item}`}>{item === "publications" ? "Publications" : item[0].toUpperCase() + item.slice(1)}</a>)}
        </nav>
        <button className="lang" onClick={() => setLang(lang === "en" ? "pt" : "en")} aria-label="Switch language">{lang === "en" ? "PT" : "EN"}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-content">
          <h1>{t.hero.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <div className="hero-bottom">
            <div className="hero-copy">
              <p>{t.intro}</p>
              <p className="eyebrow">{t.eyebrow}</p>
            </div>
            <a href="#research" className="round-link" aria-label={t.explore}><span>↓</span></a>
          </div>
        </div>
        <img className="hero-seal" src="/stevanilab-logo-white.png" alt="StevaniLab official logo" />
        <p className="figure-note">Bioluminescent fungi · Visual interpretation</p>
      </section>

      <section className="section about" id="about">
        <p className="kicker">01 / About</p>
        <div className="split">
          <h2>{t.aboutTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <div className="about-copy"><p className="lead">{t.about}</p><p className="signature">Cassius V. Stevani<br/><span>{lang === "en" ? "Principal Investigator" : "Pesquisador principal"}</span></p><img className="institutional-seal" src="/stevanilab-logo-color.jpg" alt="StevaniLab — Bioluminescence, Metagenomics, Biotechnology and Environmental Chemistry" /></div>
        </div>
      </section>

      <section className="section research" id="research">
        <p className="kicker light">02 / Research</p>
        <h2>{t.researchTitle}</h2>
        <div className="research-list">
          {research.map(([n, title, text, slug]) => <a href={`/research#${slug}`} key={n}><article><span>{n}</span><h3>{title}</h3><p>{text}</p><Arrow /></article></a>)}
        </div>
      </section>

      <section className="section projects" id="projects">
        <p className="kicker">03 / Projects</p>
        <h2>{t.projectsTitle}</h2>
        <div className="project-grid">
          <article className="project project-lumm"><div className="project-image" /><div className="project-copy"><p>Living database · 130+ species</p><h3>LUMM</h3><p>The Luminescent Mushroom Database connects taxonomy, ecology, morphology, genomics and evolution.</p><a href="https://lumm.uneb.br/en" target="_blank" rel="noreferrer">{t.visit} <Arrow /></a></div></article>
          <article className="project project-meta"><div className="project-image" /><div className="project-copy"><p>Atlantic Forest · Since 2020</p><h3>Environmental metagenomics</h3><p>Mapping microorganisms and metabolic genes across reservoirs and ancient forest lagoons.</p><a href="/environmental-metagenomics">{t.visit} <Arrow /></a></div></article>
        </div>
      </section>

      <section className="section team" id="team">
        <p className="kicker">04 / Team</p>
        <div className="split team-head"><h2>{t.teamTitle}</h2><p>We are chemists, biologists and biotechnologists united by curiosity — from molecular mechanisms to living ecosystems.</p></div>
        <div className="team-grid">{teamMembers.map((member, index) => {
          const portrait = <div className={`portrait portrait-${((index + 1) % 6) || 6}`}>{member.photo && <img src={member.photo} alt={member.name} />}<span>{String(index + 1).padStart(2,"0")}</span>{member.profile && <b className="profile-cue">View profile ↗</b>}</div>;
          return <article key={member.name}>
            {member.profile ? <a href={member.profile} aria-label={`View ${member.name} profile`}>{portrait}</a> : portrait}
            <h3>{member.name}</h3><p className="member-role">{lang === "en" ? member.roleEn : member.rolePt}</p>
            {(lang === "en" ? member.projectEn : member.projectPt) && <p className="member-project">{lang === "en" ? member.projectEn : member.projectPt}</p>}
          </article>;
        })}</div>
        <details className="alumni-disclosure" id="alumni">
          <summary>Alumni <span>＋</span></summary>
          <div className="alumni-content">
            {alumniGroups.map((group) => <section className="alumni-group" key={group.en}>
              <h3>{group[lang]}</h3>
              <div className="alumni-grid">{group.members.map(([name, photo, url]) => {
                const content = <><img src={photo} alt={name} /><span>{name}</span>{url && <Arrow />}</>;
                return url ? <a href={url} target="_blank" rel="noreferrer" key={name}>{content}</a> : <article key={name}>{content}</article>;
              })}</div>
            </section>)}
          </div>
        </details>
      </section>

      <section className="section publications" id="publications">
        <p className="kicker light">05 / Publications</p>
        <h2>{t.pubsTitle}</h2>
        <JournalCovers light />
        <div className="paper-list">{papers.map(([year,title,journal]) => <article key={title}><time>{year}</time><h3>{title}</h3><p>{journal}</p><Arrow /></article>)}</div>
        <a className="button-light" href="/publications">{t.allPapers} <Arrow /></a>
      </section>

      <section className="section media" id="media">
        <p className="kicker">06 / Media & News</p>
        <h2>{t.mediaTitle}</h2>
        <div className="news-list-head"><p>{t.archiveIntro}</p><span>{newsPosts.length} stories · newest to oldest</span></div>
        <div className="news-scroll" tabIndex={0} aria-label="Scrollable news archive">
          {newsItems.map((item) => <a className="news-row" href={item.url} target="_blank" rel="noreferrer" key={item.url}><time>{item.date}</time><div><span>{item.source}</span><h3>{item.title}</h3></div><Arrow /></a>)}
        </div>
      </section>

      <footer className="contact" id="contact">
        <p className="kicker light">07 / Contact</p>
        <div className="contact-grid"><h2>{t.contactTitle}</h2><div><p>{t.contactCopy}</p><a className="email" href="mailto:stevani@iq.usp.br">stevani@iq.usp.br <Arrow /></a></div></div>
        <div className="footer-meta"><p>Laboratório de Bioluminescência de Fungos<br/>Instituto de Química · Universidade de São Paulo<br/>Av. Prof. Lineu Prestes, 748 · São Paulo, Brazil</p><p>+55 11 3091-1194<br/><a href="https://www.iq.usp.br" target="_blank">IQ–USP ↗</a></p><img className="footer-logo" src="/stevanilab-logo-white.png" alt="StevaniLab" /></div>
        <div className="funding-strip"><p>Institutional support & funding</p><div>
          <a href="https://www.usp.br" target="_blank" rel="noreferrer"><img src="/partners/usp-crest.png" alt="Universidade de São Paulo" /></a>
          <a href="https://www.iq.usp.br" target="_blank" rel="noreferrer"><img src="/partners/iq-usp.png" alt="Instituto de Química da Universidade de São Paulo" /></a>
          <a href="https://fapesp.br" target="_blank" rel="noreferrer"><img src="/partners/fapesp.jpg" alt="FAPESP" /></a>
          <a href="https://www.gov.br/cnpq" target="_blank" rel="noreferrer"><img src="/partners/cnpq.png" alt="CNPq" /></a>
          <a href="https://www.nre.navy.mil" target="_blank" rel="noreferrer"><img src="/partners/onr.png" alt="Office of Naval Research" /></a>
        </div></div>
      </footer>
    </main>
  );
}
