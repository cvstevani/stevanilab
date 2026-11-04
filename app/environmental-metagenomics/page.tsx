type SamplingSite = {
  name: string;
  place: string;
  date: string;
  text: string;
  url?: string;
};

const reservoirs: SamplingSite[] = [
  { name: "Guarapiranga", place: "São Paulo, SP", date: "2020 · 2023 to 2025", text: "The interactive Krona profile from the 2020 sampling is available. Data from the 2023 to 2025 campaigns will be added after publication.", url: "/krona/guarapiranga.html" },
  { name: "Billings", place: "São Paulo Metropolitan Region", date: "2023 to 2025", text: "Metagenomic and environmental data are being organized and will be added after publication of the scientific results." },
  { name: "Cantareira", place: "Águas Claras Reservoir", date: "2023 to 2025", text: "Metagenomic and environmental data are being organized and will be added after publication of the scientific results." },
  { name: "Rio Grande", place: "São Paulo Metropolitan Region", date: "Data in preparation", text: "Information and data from this reservoir will be added after publication of the scientific results." },
];

const ponds: SamplingSite[] = [
  { name: "Lagoa Vermelha", place: "Apiaí, SP · PETAR", date: "May 2021", text: "A millenary natural pond within the Atlantic Forest in Alto Ribeira Touristic State Park.", url: "/krona/lagoa-vermelha.html" },
  { name: "Lagoa Grande", place: "Iporanga, SP", date: "August 2021", text: "A millenary natural pond in the Atlantic Forest near Bairro da Serra.", url: "/krona/lagoa-grande.html" },
  { name: "Lagoa de Furnas", place: "Iporanga, SP", date: "August 2021", text: "An artificial pond created in the 1950s and surrounded by Atlantic Forest.", url: "/krona/lagoa-de-furnas.html" },
];

const team = [
  ["Cassius V. Stevani", "IQ–USP", "/cassius-v-stevani"],
  ["Douglas M. M. Soares", "UNESP", "https://scholar.google.com/citations?user=u0U0SOcAAAAJ&hl=pt-BR"],
  ["Etelvino J. H. Bechara", "IQ–USP", "https://scholar.google.com.br/citations?user=I4oEyhAAAAAJ&hl=en"],
  ["João C. Setubal", "IQ–USP", "https://www.iq.usp.br/setubal/"],
  ["Lara Urban", "Universität Zürich", "https://sites.google.com/view/urban-lab?pli=1&authuser=0"],
  ["Renato S. Freire", "IQ–USP", "https://bv.fapesp.br/en/pesquisador/7677/renato-sanches-freire/"],
  ["Samir V. F. Atum", "Doctoral researcher", "https://scholar.google.com/scholar?q=%22Samir+V.+F.+Atum%22"],
] as const;

function SamplingCard({ site }: { site: SamplingSite }) {
  const content = <><time>{site.date}</time><h3>{site.name}</h3><p><strong>{site.place}</strong><br/>{site.text}</p><span>{site.url ? "Explore Krona ↗" : "Data available after publication"}</span></>;
  return site.url
    ? <a className="sampling-card" href={site.url} target="_blank" rel="noreferrer" aria-label={`Explore the interactive Krona chart for ${site.name}`}>{content}</a>
    : <article className="sampling-card sampling-card-pending">{content}</article>;
}

export default function EnvironmentalMetagenomics() {
  return <main className="meta-page">
    <header className="profile-nav"><a href="/" className="brand"><img className="brand-logo" src="/stevanilab-logo-white.png" alt=""/><span className="brand-name">STEVANI<strong>LAB</strong></span></a><a href="/#projects">← Back to projects</a></header>
    <section className="meta-hero"><div className="meta-hero-copy"><p className="eyebrow">Environmental genomics · Atlantic Forest</p><h1>Life beneath<br/><span>the surface.</span></h1><p>Reading environmental DNA to reveal microbial biodiversity and metabolic potential across freshwater ecosystems.</p></div><div className="meta-hero-image" role="img" aria-label="Atlantic Forest landscape in southeastern Brazil"/></section>

    <section className="profile-section meta-overview"><div><p className="kicker">01 / The project</p><h2>Mapping an invisible ecosystem.</h2></div><div className="meta-overview-copy"><p>Started in 2020, the Environmental Metagenomics project investigates the biodiversity of microorganisms and metabolic genes in freshwater bodies, with a special focus on the Atlantic Forest biome. By sequencing DNA directly from environmental samples, the team can study organisms that cannot easily be cultivated in the laboratory and connect taxonomic diversity with ecological function.</p><p>Iniciado em 2020, o projeto de Metagenômica Ambiental investiga a biodiversidade de microrganismos e genes metabólicos em corpos d’água, principalmente no bioma da Mata Atlântica. O DNA obtido diretamente das amostras ambientais permite revelar organismos de difícil cultivo e relacionar diversidade taxonômica e função ecológica.</p></div></section>

    <section className="profile-section meta-sites">
      <p className="kicker">02 / Sampling sites · Locais</p>
      <h2>Reservoirs and ancient<br/>forest ponds.</h2>

      <div className="sampling-group">
        <div className="sampling-group-head"><p>Reservoirs · Reservatórios</p><h3>Metropolitan water supply systems.</h3></div>
        <div className="sampling-grid">{reservoirs.map((site)=><SamplingCard site={site} key={site.name}/>)}</div>
      </div>

      <section className="data-management" aria-labelledby="data-management-title">
        <p className="data-management-kicker">Gestão e Disponibilização de Dados de Pesquisa</p>
        <h3 id="data-management-title">Estudo metagenômico dos microbiomas de reservatórios de água para abastecimento público da Região Metropolitana de São Paulo</h3>
        <dl>
          <div><dt>Processo FAPESP</dt><dd>2022/03548-6</dd></div>
          <div><dt>Pesquisador responsável</dt><dd>Prof. Dr. Renato Sanches Freire</dd></div>
          <div><dt>Instituição</dt><dd>Instituto de Química · Universidade de São Paulo (IQ-USP)</dd></div>
        </dl>
        <div className="data-management-copy">
          <div><h4>Descrição dos dados</h4><p>O projeto gerou dados de sequenciamento metagenômico de amostras de água coletadas nos reservatórios Águas Claras (Sistema Cantareira), Billings, Guarapiranga e Taiaçupeba, durante campanhas realizadas nos períodos chuvoso e seco de 2023, 2024 e 2025.</p><p>Os conjuntos de dados compreendem sequências de DNA ambiental, montagens metagenômicas, informações de classificação taxonômica e anotação funcional, além de dados físico-químicos e ambientais associados às campanhas de amostragem.</p></div>
          <div><h4>Disponibilidade e acesso aos dados</h4><p>Os dados encontram-se atualmente em fase de organização e preparação para disponibilização pública, prevista para ocorrer após a publicação dos resultados científicos correspondentes.</p><p>Conforme estabelecido no Plano de Gestão de Dados aprovado, os metagenomas serão registrados no Genomes OnLine Database (GOLD), mantido pelo Joint Genome Institute (JGI).</p><p>Repositório previsto: <a href="https://gold.jgi.doe.gov/" target="_blank" rel="noreferrer">gold.jgi.doe.gov ↗</a></p><p>Até a conclusão do depósito público, pesquisadores interessados poderão solicitar informações sobre os conjuntos de dados e suas condições de acesso ao pesquisador responsável pelo email <a href="mailto:rsfreire@iq.usp.br">rsfreire@iq.usp.br</a>. As solicitações serão avaliadas considerando sua finalidade científica e as condições de compartilhamento previstas no Plano de Gestão de Dados do projeto.</p><p>Após a disponibilização pública, esta página será atualizada com os identificadores e links específicos para acesso aos conjuntos de dados depositados.</p></div>
        </div>
      </section>

      <div className="sampling-group sampling-group-ponds">
        <div className="sampling-group-head"><p>Ponds · Lagoas</p><h3>Freshwater environments in the Atlantic Forest.</h3></div>
        <div className="sampling-grid">{ponds.map((site)=><SamplingCard site={site} key={site.name}/>)}</div>
      </div>
    </section>

    <section className="profile-section meta-team"><p className="kicker light">03 / Research network</p><h2>A collaborative view<br/>of microbial diversity.</h2><div className="meta-team-list">{[...team].sort(([a],[b])=>a.localeCompare(b,"en",{sensitivity:"base"})).map(([name,role,url])=><a href={url} target={url.startsWith("http")?"_blank":undefined} rel="noreferrer" key={name}><article><h3>{name} <span>↗</span></h3><p>{role}</p></article></a>)}</div><a className="meta-partner" href="https://ipbio.org.br" target="_blank" rel="noreferrer"><span>Institutional partner</span><strong>IPBio ↗</strong></a></section>

    <section className="profile-section meta-publications"><p className="kicker">04 / Publications</p><h2>Research from the project.</h2><article className="meta-paper"><time>2021</time><div><h3>Exploring the Microbiota of the Guarapiranga Water Reservoir With Long-Read Sequencing Technology</h3><p>D. M. M. Soares, S. V. F. Atum, E. J. H. Bechara, J. C. Setubal, C. V. Stevani &amp; R. S. Freire · <em>Frontiers in Marine Science</em> 8:791101 · DOI 10.3389/fmars.2021.791101</p></div><div className="meta-paper-links"><a href="https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2021.791101/full" target="_blank" rel="noreferrer">Full article ↗</a><a href="https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2021.791101/pdf" target="_blank" rel="noreferrer">PDF ↗</a></div></article></section>
    <footer className="profile-footer"><a href="/">StevaniLab</a><a href="mailto:stevani@iq.usp.br">stevani@iq.usp.br ↗</a></footer>
  </main>;
}
