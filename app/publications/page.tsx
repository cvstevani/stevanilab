"use client";

import { useMemo, useState } from "react";
import { publications } from "./data";
import { JournalCovers } from "../journal-covers";

export default function PublicationsPage() {
  const [query,setQuery] = useState("");
  const filtered = useMemo(()=>{
    const term=query.trim().toLocaleLowerCase();
    return term ? publications.filter(p=>`${p.number} ${p.year} ${p.citation}`.toLocaleLowerCase().includes(term)) : publications;
  },[query]);
  return <main className="pubs-page">
    <header className="profile-nav"><a href="/" className="brand"><img className="brand-logo" src="/stevanilab-logo-white.png" alt=""/><span className="brand-name">STEVANI<strong>LAB</strong></span></a><a href="/#publications">← Back to selected publications</a></header>
    <section className="pubs-hero"><p className="eyebrow">Complete scientific record · 1996–2026</p><h1>All<br/><span>publications.</span></h1><p>Research spanning fungal and marine bioluminescence, chemiluminescence, environmental chemistry, taxonomy, metagenomics and bioanalytical tools.</p></section>
    <JournalCovers />
    <div className="pubs-tools"><label><span className="sr-only">Search publications</span><input className="pubs-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by author, title, journal or year…"/></label><span className="pubs-count">{filtered.length} of {publications.length} papers</span></div>
    <section className="pubs-list" aria-live="polite">{filtered.length ? filtered.map(p=><a className="pub-record" href={p.url} target="_blank" rel="noreferrer" key={p.number}><span className="pub-number">#{String(p.number).padStart(2,"0")}</span><time>{p.year}</time><p>{p.citation}</p><b>↗</b></a>) : <p className="pubs-empty">No publications match this search.</p>}</section>
    <footer className="profile-footer"><a href="/">StevaniLab</a><a href="mailto:stevani@iq.usp.br">stevani@iq.usp.br ↗</a></footer>
  </main>;
}
