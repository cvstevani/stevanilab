import { sortedCollaborators } from "../collaborators";

const indicators = [
  ["FAPESP", "https://bv.fapesp.br/pt/pesquisador/2578/"],
  ["Lattes CV", "http://buscatextual.cnpq.br/buscatextual/cv?id=9931178094449488"],
  ["Google Scholar", "https://scholar.google.com/citations?user=-VZKVnoAAAAJ&hl=en"],
  ["Web of Science", "https://www.webofscience.com/wos/author/record/B-9465-2012"],
  ["Scopus", "https://www.scopus.com/authid/detail.uri?authorId=6602610084"],
  ["ORCID", "https://orcid.org/0000-0002-7209-7476"],
  ["Loop / Frontiers", "https://loop.frontiersin.org/people/1236706/overview"],
  ["Selected publications", "/#publications"],
] as const;

export default function CassiusProfile() {
  return <main className="profile-page">
    <header className="profile-nav"><a href="/" className="brand"><img className="brand-logo" src="/stevanilab-logo-white.png" alt=""/><span className="brand-name">STEVANI<strong>LAB</strong></span></a><a href="/#team">← Back to team</a></header>
    <section className="profile-hero"><div><p className="eyebrow">Principal Investigator · IQ–USP</p><h1>Cassius V.<br/><span>Stevani</span></h1><p className="profile-intro">Associate Professor of Organic and Environmental Chemistry. Researching the chemistry, ecology and applications of fungal bioluminescence.</p></div><img src="/cassius-v-stevani.png" alt="Cassius V. Stevani"/></section>
    <section className="profile-section profile-bio"><p className="kicker">01 / Biography · Biografia</p><div><p>Born in São Paulo in 1971, Cassius V. Stevani graduated in Chemistry from the University of São Paulo in 1992 and received his PhD in Organic Chemistry in 1997 under <a href="https://www.iq.usp.br/portaliqusp/?q=en%2Fusers%2Fjosef-wilhelm-baader" target="_blank" rel="noreferrer">Josef W. Baader ↗</a>, investigating the mechanism of the peroxyoxalate chemiluminescent system. His postdoctoral research in Biochemistry with <a href="https://scholar.google.com.br/citations?user=I4oEyhAAAAAJ&hl=en" target="_blank" rel="noreferrer">Etelvino J. H. Bechara ↗</a> focused on the degradation of acrylo-melaminic automotive resins by dragonfly eggs and received an ABRAFATI award in 2000. At IQ–USP, his group investigates academic and applied aspects of fungal bioluminescence.</p><p>Nascido em São Paulo em 1971, graduou-se em Química pela Universidade de São Paulo em 1992 e concluiu o doutorado em Química Orgânica em 1997, sob orientação de <a href="https://www.iq.usp.br/portaliqusp/?q=en%2Fusers%2Fjosef-wilhelm-baader" target="_blank" rel="noreferrer">Josef W. Baader ↗</a>, estudando o sistema quimiluminescente peróxi-oxalato. No pós-doutorado em Bioquímica com <a href="https://scholar.google.com.br/citations?user=I4oEyhAAAAAJ&hl=en" target="_blank" rel="noreferrer">Etelvino J. H. Bechara ↗</a>, pesquisou a degradação de resinas automotivas acrilo-melamínicas por ovos de libélula, trabalho premiado pela ABRAFATI em 2000. No IQ–USP, seu grupo investiga aspectos fundamentais e aplicados da bioluminescência fúngica.</p></div></section>
    <section className="profile-section profile-metrics"><p className="kicker light">02 / CV & Research indicators</p><h2>Academic profiles</h2><div className="indicator-grid">{indicators.map(([label,url])=><a href={url} target={url.startsWith("http")?"_blank":undefined} rel="noreferrer" key={label}><span>{label}</span><b>↗</b></a>)}</div></section>
    <section className="profile-section"><p className="kicker">03 / Collaborators</p><div className="profile-heading"><h2>A global network<br/>around living light.</h2><p>Longtime collaborators in chemistry, biology, fungal taxonomy, chronobiology and biotechnology.</p></div><div className="collaborator-grid">{sortedCollaborators.map(([name,detail,url])=>url?<a href={url} target="_blank" rel="noreferrer" key={name}><article><h3>{name} <span>↗</span></h3><p>{detail}</p></article></a>:<article key={name}><h3>{name}</h3><p>{detail}</p></article>)}</div><div className="institutional-partner"><p className="kicker">Institutional partner</p><a href="https://ipbio.org.br" target="_blank" rel="noreferrer"><strong>IPBio</strong><span>Instituto de Pesquisas da Biodiversidade, Brazil</span><b>↗</b></a></div></section>
    <footer className="profile-footer"><a href="/">StevaniLab</a><a href="mailto:stevani@iq.usp.br">stevani@iq.usp.br ↗</a></footer>
  </main>;
}
