const sites = [
  ["Guarapiranga Reservoir", "São Paulo, SP", "December 2020", "Metagenomic analysis of water from a major urban reservoir that supplies the São Paulo metropolitan region."],
  ["Lagoa Vermelha", "Apiaí, SP · PETAR", "May 2021", "A millenary natural pond within the Atlantic Forest in Alto Ribeira Touristic State Park."],
  ["Lagoa Grande", "Iporanga, SP", "August 2021", "A millenary natural pond in the Atlantic Forest near Bairro da Serra."],
  ["Lagoa de Furnas", "Iporanga, SP", "August 2021", "An artificial pond created in the 1950s and surrounded by Atlantic Forest."],
] as const;

const team = [
  ["Cassius V. Stevani", "IQ–USP", "/cassius-v-stevani"],
  ["Douglas M. M. Soares", "UNESP", "https://scholar.google.com/citations?user=u0U0SOcAAAAJ&hl=pt-BR"],
  ["Etelvino J. H. Bechara", "IQ–USP", "https://scholar.google.com.br/citations?user=I4oEyhAAAAAJ&hl=en"],
  ["João C. Setubal", "IQ–USP", "https://www.iq.usp.br/setubal/"],
  ["Renato S. Freire", "IQ–USP", "https://bv.fapesp.br/en/pesquisador/7677/renato-sanches-freire/"],
  ["Samir V. F. Atum", "Doctoral researcher", "https://scholar.google.com/scholar?q=%22Samir+V.+F.+Atum%22"],
] as const;

export default function EnvironmentalMetagenomics() {
  return <main className="meta-page">
    <header className="profile-nav"><a href="/" className="brand"><img className="brand-logo" src="/stevanilab-logo-white.png" alt=""/><span className="brand-name">STEVANI<strong>LAB</strong></span></a><a href="/#projects">← Back to projects</a></header>
    <section className="meta-hero"><div className="meta-hero-copy"><p className="eyebrow">Environmental genomics · Atlantic Forest</p><h1>Life beneath<br/><span>the surface.</span></h1><p>Reading environmental DNA to reveal microbial biodiversity and metabolic potential across freshwater ecosystems.</p></div><div className="meta-hero-image" role="img" aria-label="Atlantic Forest landscape in southeastern Brazil"/></section>

    <section className="profile-section meta-overview"><div><p className="kicker">01 / The project</p><h2>Mapping an invisible ecosystem.</h2></div><div className="meta-overview-copy"><p>Started in 2020, the Environmental Metagenomics project investigates the biodiversity of microorganisms and metabolic genes in freshwater bodies, with a special focus on the Atlantic Forest biome. By sequencing DNA directly from environmental samples, the team can study organisms that cannot easily be cultivated in the laboratory and connect taxonomic diversity with ecological function.</p><p>Iniciado em 2020, o projeto de Metagenômica Ambiental investiga a biodiversidade de microrganismos e genes metabólicos em corpos d’água, principalmente no bioma da Mata Atlântica. O DNA obtido diretamente das amostras ambientais permite revelar organismos de difícil cultivo e relacionar diversidade taxonômica e função ecológica.</p></div></section>

    <section className="profile-section meta-sites"><p className="kicker">02 / Sampling sites · Locais</p><h2>From an urban reservoir<br/>to ancient forest ponds.</h2><div className="sampling-grid">{sites.map(([name,place,date,text])=><article key={name}><time>{date}</time><h3>{name}</h3><p><strong>{place}</strong><br/>{text}</p></article>)}</div></section>

    <section className="profile-section meta-team"><p className="kicker light">03 / Research network</p><h2>A collaborative view<br/>of microbial diversity.</h2><div className="meta-team-list">{[...team].sort(([a],[b])=>a.localeCompare(b,"en",{sensitivity:"base"})).map(([name,role,url])=><a href={url} target={url.startsWith("http")?"_blank":undefined} rel="noreferrer" key={name}><article><h3>{name} <span>↗</span></h3><p>{role}</p></article></a>)}</div><a className="meta-partner" href="https://ipbio.org.br" target="_blank" rel="noreferrer"><span>Institutional partner</span><strong>IPBio ↗</strong></a></section>

    <section className="profile-section meta-publications"><p className="kicker">04 / Publications</p><h2>Research from the project.</h2><article className="meta-paper"><time>2021</time><div><h3>Exploring the Microbiota of the Guarapiranga Water Reservoir With Long-Read Sequencing Technology</h3><p>D. M. M. Soares, S. V. F. Atum, E. J. H. Bechara, J. C. Setubal, C. V. Stevani &amp; R. S. Freire · <em>Frontiers in Marine Science</em> 8:791101 · DOI 10.3389/fmars.2021.791101</p></div><div className="meta-paper-links"><a href="https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2021.791101/full" target="_blank" rel="noreferrer">Full article ↗</a><a href="https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2021.791101/pdf" target="_blank" rel="noreferrer">PDF ↗</a></div></article></section>
    <footer className="profile-footer"><a href="/">StevaniLab</a><a href="mailto:stevani@iq.usp.br">stevani@iq.usp.br ↗</a></footer>
  </main>;
}
