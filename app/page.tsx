"use client";

import { useState } from "react";
import Script from "next/script";
import { newsPosts } from "./news-posts";
import { JournalCovers } from "./journal-covers";
import { sortedCollaborators } from "./collaborators";

type Lang = "en" | "pt";

const nav = ["about", "research", "projects", "team", "publications", "media", "collaborators", "contact"];

const copy = {
  en: {
    eyebrow: "Fungal Bioluminescence Laboratory · IQ–USP",
    hero: "The living light\nof fungi.",
    intro: "We investigate how fungi make light and how this ancient chemistry can illuminate ecology, biotechnology and new analytical tools.",
    explore: "Explore our research",
    heroPhoto: "Neonothopanus gardneri mushrooms · Mata dos Cocais, Brazil",
    aboutTitle: "A natural mystery,\nmade visible.",
    about: "For more than three decades, the scientific journey behind StevaniLab has evolved from pure chemistry to the study of living systems and entire ecosystems. It began with peroxyoxalate chemiluminescence, a purely chemical, in vitro system investigated as a fundamental academic problem. During postdoctoral research, the search for a more applied question and for fieldwork led to studies of polymer degradation caused by dragonfly eggs. At the same time, research and field collections of fireflies opened a path toward biological light. During one of those expeditions, the idea arose to investigate bioluminescent mushrooms, beginning a project that would help reveal the ecological function, luciferin, luciferase and mechanism of fungal bioluminescence. Today, this trajectory extends to other bioluminescent systems and environmental metagenomics, connecting chemistry, biodiversity, ecology, biotechnology and new analytical tools through international collaboration.",
    researchTitle: "From molecule to ecosystem",
    projectsTitle: "Research in motion",
    embassyKicker: "2021 to 2022 · Funded by the U.S. Embassy and Consulates in Brazil",
    embassyTitle: "Green Development Initiative",
    embassyText: "Over one year, the Green Development Initiative strengthened cultural ties between Brazil and the United States while connecting young people in Iporanga with the biodiversity, ecotourism, local culture and potential of their own communities. Through thematic workshops and immersion in nature, participants developed new perspectives on environmental conservation, sustainable tourism and local entrepreneurship.",
    embassyImpact: "The project was funded by the U.S. Embassy and Consulates in Brazil, with the participation of IQ-USP and IPBio.",
    embassyLink: "Watch the final film",
    embassyCallFilm: "The 2021 project call",
    embassyFinalFilm: "The future of Iporanga: project results",
    planetKicker: "Filmed March 2015 · Planet Earth II · Jungles · 2016",
    planetTitle: "One month in the forest with the BBC",
    planetText: "In March 2015, StevaniLab spent one month in the field with a BBC team from Bristol to bring the ecology of bioluminescent fungi to Planet Earth II. Producer Emma Napper, Charlotte Bostock and cameraman Alastair MacEwen joined the laboratory team to film luminous mushrooms, nocturnal insects and the ecological role of fungal light.",
    planetImpact: "The collaboration carried years of ecological field research to a worldwide audience in the episode Jungles.",
    bbcClip: "Watch the official BBC clip",
    fieldFilm: "Ecological research in the Palm Forest",
    documentaryFilm: "Fungal bioluminescence in Planet Earth II",
    teamTitle: "The people behind the light",
    pubsTitle: "Selected publications",
    mediaTitle: "Science beyond the lab",
    videosIntro: "Interviews, field reports and documentaries that bring fungal bioluminescence to a wider audience.",
    videosCount: "13 films & interviews",
    collaboratorsTitle: "A global network\naround living light.",
    collaboratorsIntro: "Longtime collaborators in chemistry, biology, fungal taxonomy, chronobiology and biotechnology.",
    fullProfile: "View Cassius V. Stevani’s full profile",
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
    intro: "Investigamos como os fungos produzem luz e como essa química ancestral pode iluminar a ecologia, a biotecnologia e novas ferramentas analíticas.",
    explore: "Conheça nossa pesquisa",
    heroPhoto: "Cogumelos de Neonothopanus gardneri · Mata dos Cocais, Brasil",
    aboutTitle: "Um mistério natural,\nagora visível.",
    about: "Há mais de três décadas, a trajetória científica que deu origem ao StevaniLab evolui da química pura para o estudo de sistemas vivos e ecossistemas inteiros. O trabalho começou com a quimiluminescência do sistema peróxi oxalato, um sistema puramente químico e in vitro, investigado como um problema acadêmico fundamental. Durante o pós doutoramento, a busca por uma questão mais aplicada e pelo trabalho de campo levou ao estudo da degradação de polímeros causada por ovos de libélulas. Ao mesmo tempo, pesquisas e coletas de vagalumes abriram o caminho para o estudo da luz biológica. Em uma dessas expedições surgiu a ideia de investigar cogumelos bioluminescentes, dando início ao projeto que ajudaria a revelar a função ecológica, a luciferina, a luciferase e o mecanismo da bioluminescência de fungos. Hoje, essa trajetória se estende a outros sistemas bioluminescentes e à metagenômica ambiental, conectando química, biodiversidade, ecologia, biotecnologia e novas ferramentas analíticas por meio de colaborações internacionais.",
    researchTitle: "Da molécula ao ecossistema",
    projectsTitle: "Pesquisa em movimento",
    embassyKicker: "2021 a 2022 · Financiado pela Embaixada e pelos Consulados dos EUA no Brasil",
    embassyTitle: "Iniciativa de Desenvolvimento Verde",
    embassyText: "Ao longo de um ano, a Iniciativa de Desenvolvimento Verde fortaleceu os laços culturais entre o Brasil e os Estados Unidos e aproximou os jovens de Iporanga da biodiversidade, do ecoturismo, da cultura local e das potencialidades de suas próprias comunidades. Por meio de oficinas temáticas e imersões na natureza, os participantes desenvolveram novas perspectivas sobre preservação ambiental, turismo sustentável e empreendedorismo local.",
    embassyImpact: "O projeto foi financiado pela Embaixada e pelos Consulados dos EUA no Brasil, com a participação do IQ-USP e do IPBio.",
    embassyLink: "Assistir ao vídeo final",
    embassyCallFilm: "A chamada do projeto em 2021",
    embassyFinalFilm: "O futuro de Iporanga: resultados do projeto",
    planetKicker: "Filmado em março de 2015 · Planet Earth II · Jungles · 2016",
    planetTitle: "Um mês na floresta com a BBC",
    planetText: "Em março de 2015, o StevaniLab passou um mês em campo com uma equipe da BBC de Bristol para levar a ecologia dos fungos bioluminescentes ao documentário Planet Earth II. A produtora Emma Napper, Charlotte Bostock e o cinegrafista Alastair MacEwen acompanharam a equipe do laboratório no registro dos cogumelos luminosos, dos insetos noturnos e do papel ecológico da luz dos fungos.",
    planetImpact: "A colaboração levou anos de pesquisa ecológica de campo a uma audiência mundial no episódio Jungles.",
    bbcClip: "Assistir ao trecho oficial da BBC",
    fieldFilm: "Pesquisa ecológica na Mata dos Cocais",
    documentaryFilm: "Bioluminescência de fungos em Planet Earth II",
    teamTitle: "As pessoas por trás da luz",
    pubsTitle: "Publicações selecionadas",
    mediaTitle: "Ciência além do laboratório",
    videosIntro: "Entrevistas, reportagens de campo e documentários que levam a bioluminescência de fungos a novos públicos.",
    videosCount: "13 vídeos e entrevistas",
    collaboratorsTitle: "Uma rede global\nem torno da luz viva.",
    collaboratorsIntro: "Colaborações de longa data em química, biologia, taxonomia de fungos, cronobiologia e biotecnologia.",
    fullProfile: "Ver o perfil completo de Cassius V. Stevani",
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
  ["04", "Chemiluminescence", "Mechanisms and chemically excited intermediates in reactions that produce light.", "chemiluminescence"],
  ["05", "Degradation of automotive clearcoat", "Chemical pathways behind polymer damage promoted by dragonfly eggs.", "automotive-clearcoat"],
  ["06", "Marine and other bioluminescent systems", "Proteins and organisms that emit light across marine and terrestrial systems.", "marine-bioluminescence"],
  ["07", "Fungal taxonomy", "Discovery, description and evolutionary placement of luminous fungi.", "fungal-taxonomy"],
  ["08", "Others", "Research across environmental chemistry, biotechnology and related systems.", "others"],
];

const teamMembers = [
  { name: "Cassius V. Stevani", photo: "/cassius-v-stevani-team.jpg", profile: "/cassius-v-stevani", roleEn: "Principal Investigator", rolePt: "Pesquisador principal", projectEn: "Fungal bioluminescence, environmental chemistry and bioanalytical applications.", projectPt: "Bioluminescência de fungos, química ambiental e aplicações bioanalíticas." },
  { name: "Beatriz do Nascimento", roleEn: "Laboratory Technician", rolePt: "Técnica de laboratório", projectEn: "Laboratory operations and technical support.", projectPt: "Operações laboratoriais e suporte técnico.", photo: "/beatriz-do-nascimento.jpg" },
  { name: "Dielle P. Procópio", roleEn: "Postdoctoral Researcher", rolePt: "Pesquisadora de pós-doutorado", projectEn: "Adaptive evolution of Synechocystis sp. PCC6803 that produces PHB, with the goal of improving acetate consumption.", projectPt: "Evolução adaptativa de Synechocystis sp. PCC6803 produtora de PHB para melhor consumo de acetato.", photo: "/dielle-procopio.png" },
  { name: "Carlos Augusto Hruschka Diegues Fogaça", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Production and development of bioluminescent plants.", projectPt: "Produção e desenvolvimento de plantas bioluminescentes." },
  { name: "Gustavo de Rezende", photo: "/gustavo-de-rezende.png", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Bioenergetics and oxidative stress in bioluminescent fungi.", projectPt: "Bioenergética e estresse oxidativo em fungos bioluminescentes." },
  { name: "Pedro Bongiorno Miragaia", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Prospection, cultivation and characterization of bacterial biopolymers.", projectPt: "Prospecção, cultivo e caracterização de biopolímeros bacterianos.", photo: "/pedro-bongiorno-miragaia.png" },
  { name: "Pedro M. Lopes", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Hydroxylase and β-glycosyltransferase involved in equisetumpyrone biosynthesis in plants.", projectPt: "Hidroxilase e β-glicosiltransferase envolvidas na biossíntese de equisetumpirona em plantas.", photo: "/pedro-lopes.png" },
  { name: "Samir V. F. Atum", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Environmental metagenomics and phylogenetic analyses.", projectPt: "Metagenômica ambiental e análises filogenéticas.", photo: "/samir-atum-2026.jpg", profile: "http://lattes.cnpq.br/8022005156291218" },
  { name: "Sophia F. D. de Lima", roleEn: "PhD Researcher", rolePt: "Pesquisadora de doutorado", projectEn: "Protoplasts for genome editing in basidiomycetes.", projectPt: "Protoplastos para edição de genoma em basidiomicetos.", photo: "/sophia-de-lima.png" },
  { name: "Thiago da Mata", roleEn: "PhD Researcher", rolePt: "Pesquisador de doutorado", projectEn: "Mechanisms of triplet carbonyl generation and quenching.", projectPt: "Mecanismos de geração e desativação de carbonilas triplete.", photo: "/thiago-da-mata.jpg", profile: "http://lattes.cnpq.br/7156393132868578" },
  { name: "Dan P. Lima", roleEn: "Undergraduate Researcher", rolePt: "Pesquisador de iniciação científica", projectEn: "Preservation and identification of bioluminescent fungi.", projectPt: "Preservação e identificação de fungos bioluminescentes.", photo: "/dan-p-lima.jpg", profile: "https://lattes.cnpq.br/7308562858328784" },
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
      ["Bianca de Barros Nóbrega", "/alumni/bianca-nobrega.png", "https://www.linkedin.com/in/bianca-de-barros-n%C3%B3brega-167605164/"],
      ["Caio Klocke Zamuner", "/alumni/caio-zamuner.jpg", "https://bv.fapesp.br/pt/pesquisador/707011/caio-klocke-zamuner/"],
      ["Fernanda de Freitas Ventura", "/alumni/fernanda-ventura.jpg", "https://lattes.cnpq.br/3556448023842613"],
      ["Gabriel Nóbrega da Rocha Martins", "/alumni/gabriel-martins.jpg", "https://br.linkedin.com/in/gabrielmartinshplc"],
      ["Hans Eugene Waldenmaier", "/alumni/hans-waldenmaier.jpg", "https://www.linkedin.com/in/hans-waldenmaier-2674a792/?locale=pt"],
      ["Luiz Fernando Mendes", "/alumni/luiz-mendes.jpg", "https://www.linkedin.com/in/dr-luiz-fernando-mendes-phd-usp-0aaab827a/"],
      ["Olivia Domingues", "/alumni/olivia-domingues.jpg", "https://br.linkedin.com/in/olivia-domingues-bazito-23862431"],
      ["Rodrigo Pimenta Carvalho", "/alumni/rodrigo-carvalho.jpg", "https://br.linkedin.com/in/pimentarc"],
      ["Tatiana Araújo Pereira", "/alumni/tatiana-pereira.jpg", "https://br.linkedin.com/in/tatiana-araujo-pereira-b566a713/pt"],
    ],
  },
];

const papers = [
  {
    year: "2026",
    journal: "The FEBS Journal",
    title: "Caffeylpyruvate hydrolase from the bioluminescent fungus Neonothopanus gardneri is the key recycling enzyme in the fungal bioluminescence pathway",
    doi: "10.1111/febs.70554",
  },
  {
    year: "2019",
    journal: "Scientific Reports",
    title: "Neoceroplatus betaryiensis nov. sp. (Diptera: Keroplatidae) is the first record of a bioluminescent fungus-gnat in South America",
    doi: "10.1038/s41598-019-47753-w",
  },
  {
    year: "2018",
    journal: "PNAS",
    title: "A genetically encodable bioluminescent system from fungi",
    doi: "10.1073/pnas.1803615115",
  },
  {
    year: "2017",
    journal: "Science Advances",
    title: "Mechanism and color modulation of fungal bioluminescence",
    doi: "10.1126/sciadv.1602847",
  },
  {
    year: "2015",
    journal: "Current Biology",
    title: "Circadian control sheds light on fungal bioluminescence",
    doi: "10.1016/j.cub.2015.02.021",
  },
  {
    year: "2012",
    journal: "Photochemical & Photobiological Sciences",
    title: "Evidence that a single bioluminescent system is shared by all known bioluminescent fungal lineages",
    doi: "10.1039/c2pp25032b",
  },
  {
    year: "2011",
    journal: "Mycologia",
    title: "Neonothopanus gardneri: a new combination for a bioluminescent agaric from Brazil",
    doi: "10.3852/11-097",
  },
  {
    year: "2010",
    journal: "Mycologia",
    title: "Luminescent Mycena: new and noteworthy species",
    doi: "10.3852/09-197",
  },
  {
    year: "2009",
    journal: "Photochemical & Photobiological Sciences",
    title: "The enzymatic nature of fungal bioluminescence",
    doi: "10.1039/b908982a",
  },
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

const videos = [
  { id: "1ox6LpHwgpo", date: "2022-09-06", title: "Iniciativa de Desenvolvimento Verde: O Futuro de Iporanga", source: "IPBio" },
  { id: "TI_jWUQBbdI", date: "2022", title: "Neoceroplatus betaryiensis: Jornal TV Cultura", source: "FungusLux" },
  { id: "ocOJJ6dqwx4", date: "2021-09-30", title: "Green Development Initiative / Iniciativa de Desenvolvimento Verde", source: "IPBio" },
  { id: "fFBYUu1bgAs", date: "2021", title: "Química É Vida: Cogumelos que brilham no escuro", source: "Instituto de Química da USP" },
  { id: "uEZRVFis688", date: "2019", title: "Cassius Stevani: entrevista completa", source: "Rede Ciência" },
  { id: "sRZI1Kd2bhc", date: "2016", title: "Fungal bioluminescence by BBC’s Planet Earth II", source: "BBC Planet Earth II" },
  { id: "33-3UCTRZWM", date: "2016", title: "A glowing underground network of fungi", source: "BBC" },
  { id: "SiLQFvIDoLg", date: "2015", title: "Bioluminescent mushrooms from Palm Forest", source: "Laboratório de Bioluminescência de Fungos" },
  { id: "Ril7v3BP1dM", date: "2015", title: "Como fungos usam química para brilhar no escuro da mata", source: "Pesquisa FAPESP" },
  { id: "gSPHJBFQy7U", date: "2013", title: "Lost in the Light: the story of N. gardneri", source: "Trailblazer with Josh Garcia" },
  { id: "5HoMuLXxGbk", date: "2012", title: "Nature’s bioluminescent mushrooms", source: "TED Talent Search" },
  { id: "o0OHS-jNJtc", date: "2011-11-18", title: "Globo Repórter PETAR: Pesquisa Noturna", source: "FungusLux" },
  { id: "WSsE7eG-ysU", date: "2011-06-07", title: "Fungo bioluminescente", source: "Leandro Negro" },
].sort((a, b) => b.date.localeCompare(a.date));

function makeAltmetricScoresReadable() {
  document.querySelectorAll<HTMLElement>("#selected-publications .altmetric-embed").forEach((badge) => {
    const description = badge.querySelector<HTMLImageElement>("img")?.alt;
    const score = description?.match(/altmetric score of ([\d,.]+)/i)?.[1];
    if (score) badge.dataset.displayScore = score;
  });
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  return (
    <>
      <Script
        src="https://embed.altmetric.com/assets/embed.js"
        strategy="afterInteractive"
        onReady={() => {
          const altmetricWindow = window as typeof window & { _altmetric_embed_init?: () => void };
          document.querySelectorAll("#selected-publications .altmetric-embed").forEach((badge) => {
            badge.addEventListener("altmetric:show", makeAltmetricScoresReadable);
          });
          altmetricWindow._altmetric_embed_init?.();
          window.requestAnimationFrame(makeAltmetricScoresReadable);
        }}
      />
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
        <p className="figure-note">{t.heroPhoto}</p>
      </section>

      <section className="section about" id="about">
        <p className="kicker">01 / About</p>
        <div className="split">
          <h2>{t.aboutTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <div className="about-copy"><p className="lead">{t.about}</p><p className="signature"><a href="/cassius-v-stevani">Cassius V. Stevani ↗</a><br/><span>{lang === "en" ? "Principal Investigator" : "Pesquisador principal"}</span></p><img className="institutional-seal" src="/stevanilab-logo-color.jpg" alt="StevaniLab: Bioluminescence, Metagenomics, Biotechnology and Environmental Chemistry" /></div>
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
          <article className="project project-embassy">
            <div className="project-embassy-intro">
              <div><p className="project-embassy-kicker">{t.embassyKicker}</p><h3>{t.embassyTitle}</h3></div>
              <div className="project-embassy-copy"><p>{t.embassyText}</p><p>{t.embassyImpact}</p><a href="https://youtu.be/1ox6LpHwgpo" target="_blank" rel="noreferrer">{t.embassyLink} <Arrow /></a></div>
            </div>
            <div className="project-embassy-videos">
              <figure><iframe src="https://www.youtube-nocookie.com/embed/ocOJJ6dqwx4" title={t.embassyCallFilm} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><figcaption><span>2021 · Project call</span>{t.embassyCallFilm}</figcaption></figure>
              <figure><iframe src="https://www.youtube-nocookie.com/embed/1ox6LpHwgpo" title={t.embassyFinalFilm} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><figcaption><span>2022 · Final film</span>{t.embassyFinalFilm}</figcaption></figure>
            </div>
          </article>
          <article className="project project-earth">
            <div className="project-earth-intro">
              <div><p className="project-earth-kicker">{t.planetKicker}</p><h3>{t.planetTitle}</h3></div>
              <div className="project-earth-copy"><p>{t.planetText}</p><p>{t.planetImpact}</p><a href="https://www.bbc.co.uk/programmes/p04fyn79" target="_blank" rel="noreferrer">{t.bbcClip} <Arrow /></a></div>
            </div>
            <div className="project-earth-videos">
              <figure><iframe src="https://www.youtube-nocookie.com/embed/SiLQFvIDoLg" title={t.fieldFilm} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><figcaption><span>2015 · Field research</span>{t.fieldFilm}</figcaption></figure>
              <figure><iframe src="https://www.youtube-nocookie.com/embed/sRZI1Kd2bhc" title={t.documentaryFilm} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><figcaption><span>2016 · BBC Planet Earth II</span>{t.documentaryFilm}</figcaption></figure>
            </div>
          </article>
        </div>
      </section>

      <section className="section team" id="team">
        <p className="kicker">04 / Team</p>
        <div className="split team-head"><h2>{t.teamTitle}</h2><p>We are chemists, biologists and biotechnologists united by curiosity, with work spanning molecular mechanisms and living ecosystems.</p></div>
        <div className="team-grid">{teamMembers.map((member, index) => {
          const portrait = <div className={`portrait portrait-${((index + 1) % 6) || 6}`}>{member.photo && <img src={member.photo} alt={member.name} />}<span>{String(index + 1).padStart(2,"0")}</span>{member.profile && <b className="profile-cue">View profile ↗</b>}</div>;
          return <article key={member.name}>
            {member.profile ? <a href={member.profile} target={member.profile.startsWith("http") ? "_blank" : undefined} rel={member.profile.startsWith("http") ? "noreferrer" : undefined} aria-label={`View ${member.name} profile`}>{portrait}</a> : portrait}
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
        <div className="paper-list" id="selected-publications">
          {papers.map((paper) => {
            const url = `https://doi.org/${paper.doi}`;
            return <article key={paper.doi}>
              <time>{paper.year}</time>
              <a className="paper-copy" href={url} target="_blank" rel="noreferrer">
                <p>{paper.journal}</p>
                <h3>{paper.title}</h3>
              </a>
              <div className="paper-metric" aria-label={`Altmetric attention for ${paper.title}`}>
                <div className="altmetric-embed" data-badge-type="donut" data-badge-popover="right" data-doi={paper.doi} />
              </div>
              <a className="paper-arrow" href={url} target="_blank" rel="noreferrer" aria-label={`Open ${paper.title}`}><Arrow /></a>
            </article>;
          })}
        </div>
        <a className="button-light" href="/publications">{t.allPapers} <Arrow /></a>
      </section>

      <section className="section media" id="media">
        <p className="kicker">06 / Media & News</p>
        <h2>{t.mediaTitle}</h2>
        <div className="video-heading"><p>{t.videosIntro}</p><span>{t.videosCount}</span></div>
        <div className="video-rail" tabIndex={0} aria-label={t.videosCount}>
          {videos.map((video, index) => <article className="video-card" key={video.id}>
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading={index === 0 ? "eager" : "lazy"}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="video-meta"><span>{video.source} · <time dateTime={video.date}>{video.date.slice(0, 4)}</time></span><h3>{video.title}</h3></div>
          </article>)}
        </div>
        <div className="news-list-head"><p>{t.archiveIntro}</p><span>{newsPosts.length} stories · newest to oldest</span></div>
        <div className="news-scroll" tabIndex={0} aria-label="Scrollable news archive">
          {newsItems.map((item) => <a className="news-row" href={item.url} target="_blank" rel="noreferrer" key={item.url}><time>{item.date}</time><div><span>{item.source}</span><h3>{item.title}</h3></div><Arrow /></a>)}
        </div>
      </section>

      <section className="section home-collaborators" id="collaborators">
        <p className="kicker">07 / {lang === "en" ? "Collaborators" : "Colaboradores"}</p>
        <div className="profile-heading"><h2>{t.collaboratorsTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{t.collaboratorsIntro}</p></div>
        <div className="collaborator-grid">{sortedCollaborators.map(([name, detail, url]) => <a href={url} target="_blank" rel="noreferrer" key={name}><article><h3>{name} <span>↗</span></h3><p>{detail}</p></article></a>)}</div>
        <a className="text-link collaborators-profile-link" href="/cassius-v-stevani">{t.fullProfile} <Arrow /></a>
      </section>

      <footer className="contact" id="contact">
        <p className="kicker light">08 / Contact</p>
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
    </>
  );
}
