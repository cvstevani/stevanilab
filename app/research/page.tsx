"use client";

import { useEffect, useState } from "react";
import { newsPosts } from "../news-posts";

type Article = readonly [string,string,string,string];
type Topic = { title:string; intro:string; articles:readonly Article[] };

const topics: Record<string, Topic> = {
  "fungal-bioluminescence": { title:"Fungal bioluminescence", intro:"From ecological function and circadian control to luciferin, luciferase and the complete genetically encodable pathway.", articles:[
    ["2024","The living light from fungi","Journal of Photochemistry & Photobiology C","https://doi.org/10.1016/j.jphotochemrev.2024.100654"],
    ["2017","Mechanism and color modulation of fungal bioluminescence","Science Advances","https://doi.org/10.1126/sciadv.1602847"],
    ["2015","Circadian control sheds light on fungal bioluminescence","Current Biology","https://doi.org/10.1016/j.cub.2015.02.021"],
  ]},
  "environmental-metagenomics": { title:"Environmental metagenomics", intro:"Environmental DNA reveals microbial biodiversity, community structure and metabolic genes across freshwater and cultivated ecosystems.", articles:[
    ["2022","Metaprofiling of the bacterial community in colonized compost extracts by Agaricus subrufescens","Journal of Fungi","https://doi.org/10.3390/jof8090995"],
    ["2021","Exploring the microbiota of the Guarapiranga water reservoir with long-read sequencing technology","Frontiers in Marine Science","https://doi.org/10.3389/fmars.2021.791101"],
  ]},
  "bioanalytical-tools": { title:"Bioanalytical tools", intro:"Bioluminescent organisms and pathways become sensitive tools for quantification, toxicity assessment and environmental monitoring.", articles:[
    ["2026","A Fungal Bioluminescent Pathway-based yeast biosensor for caffeic acid quantification","ACS Sensors","https://www.stevanilab.com/papers"],
    ["2022","Fungal bioassays for environmental monitoring","Frontiers in Bioengineering and Biotechnology","https://doi.org/10.3389/fbioe.2022.954579"],
    ["2021","Toxicity of metal cations and phenolic compounds to Neonothopanus gardneri","Environmental Advances","https://doi.org/10.1016/j.envadv.2021.100044"],
  ]},
  "chemiluminescence": { title:"Chemiluminescence", intro:"Mechanistic studies of peroxyoxalate systems, triplet carbonyls and chemical reactions that generate electronically excited states.", articles:[
    ["2023","Mining reactive triplet carbonyls in biological systems","Journal of Photochemistry and Photobiology B","https://doi.org/10.1016/j.jphotobiol.2023.112712"],
    ["2015","Photo chemistry without light?","Journal of the Brazilian Chemical Society","https://www.stevanilab.com/papers"],
    ["2002","Kinetic studies on the peroxyoxalate chemiluminescence reaction","Luminescence","https://www.stevanilab.com/papers"],
  ]},
  "automotive-clearcoat": { title:"Degradation of automotive clearcoat", intro:"The chemical origin of coating damage caused by dragonfly eggs, connecting biological deposition, amino-acid oxidation and polymer degradation.", articles:[
    ["2001","Cysteic acid is the chemical mediator of automotive clearcoat damage promoted by dragonfly eggs","Journal of Applied Polymer Science","https://www.stevanilab.com/papers"],
  ]},
  "marine-bioluminescence": { title:"Marine and other bioluminescent systems", intro:"Photoproteins, luciferases and luminous organisms beyond fungi, from deep-sea coral, ctenophores, annelids and squid to bioluminescent insects.", articles:[
    ["2026","A coelenterazine-dependent luciferase from the deep-sea coral Anthoptilum murrayi","Biochemical and Biophysical Research Communications","https://www.stevanilab.com/papers"],
    ["2025","Velamins: green-light-emitting calcium-regulated photoproteins isolated from Velamen parallelum","The FEBS Journal","https://doi.org/10.1111/febs.70096"],
    ["2021","Bioluminescence in polynoid scale worms","Frontiers in Marine Science","https://doi.org/10.3389/fmars.2021.643197"],
    ["2019","Neoceroplatus betaryiensis is the first record of a bioluminescent fungus-gnat in South America","Scientific Reports","https://doi.org/10.1038/s41598-019-47753-w"],
  ]},
  "fungal-taxonomy": { title:"Fungal taxonomy", intro:"Discovery, description, classification and evolutionary relationships of luminous mushroom-forming fungi.", articles:[
    ["2025","Diversity, distribution and evolution of bioluminescent fungi","Journal of Fungi","https://doi.org/10.3390/jof11010019"],
    ["2023","Eoscyphella luciurceolata gen. and sp. nov. sheds light on Cyphellopsidaceae","Journal of Fungi","https://doi.org/10.3390/jof9101004"],
    ["2016","New luminescent mycenoid fungi from São Paulo State, Brazil","Mycologia","https://www.stevanilab.com/papers"],
  ]},
  "others": { title:"Others", intro:"Research beyond the principal themes, spanning environmental chemistry, oxidative processes, biotechnology and organismal bioluminescence.", articles:[
    ["2022","Patent landscape of polyhydroxyalkanoates production by algae and cyanobacteria","Recent Patents on Biotechnology","https://www.stevanilab.com/papers"],
    ["2021","Oxidative modification of proteins: from damage to catalysis, signaling and beyond","Antioxidants & Redox Signaling","https://www.stevanilab.com/papers"],
  ]},
};

const order = Object.keys(topics);

function newsMeta(post:(typeof newsPosts)[number]) {
  const year = post.date.slice(0, 4);
  const slug = `${post.title} ${post.link}`.toLowerCase();
  return {url:post.link,title:post.title,year,slug};
}

function newsTopic(slug:string) {
  if (/(marinho|marine|polynoid|squid|antonina|neoceroplatus|inseto-sul-americano|larva-brilhante|mosquito-brilhante)/.test(slug)) return "marine-bioluminescence";
  if (/(montadoras|libélula|libelula|clearcoat|automotive)/.test(slug)) return "automotive-clearcoat";
  if (/(peróxido|peroxido|chemilum|triplet|célula-solar|celula-solar)/.test(slug)) return "chemiluminescence";
  if (/(chip|biosensor|petunia|trees-lighting|glowing-organisms|brilho-construído|brilho-construido|sustentável|sustentavel)/.test(slug)) return "bioanalytical-tools";
  if (/(nova-espécie|nova-especie|new-species|rediscover|rediscovered|encontrado|descobrem-sete|fungo-brasileiro|top-ten|top-10)/.test(slug)) return "fungal-taxonomy";
  if (/(metagenom|microbiota|reservoir|guarapiranga)/.test(slug)) return "environmental-metagenomics";
  if (/(mushroom|fung|cogum|pilz|hongos|champignon|bioluminesc|leucht)/.test(slug)) return "fungal-bioluminescence";
  return "others";
}

const categorizedNews = newsPosts.map(newsMeta).reduce<Record<string,ReturnType<typeof newsMeta>[]>>((all,item)=>{
  (all[newsTopic(item.slug)] ||= []).push(item); return all;
},{});

export default function ResearchTopics() {
  const [active,setActive] = useState("fungal-bioluminescence");
  useEffect(()=>{ const sync=()=>{const slug=location.hash.slice(1); if(topics[slug]) setActive(slug)}; sync(); addEventListener("hashchange",sync); return()=>removeEventListener("hashchange",sync); },[]);
  const topic = topics[active];
  const stories = categorizedNews[active] || [];
  const choose=(slug:string)=>{setActive(slug); history.replaceState(null,"",`#${slug}`)};
  return <main className="topics-page">
    <header className="profile-nav"><a href="/" className="brand"><img className="brand-logo" src="/stevanilab-logo-white.png" alt=""/><span className="brand-name">STEVANI<strong>LAB</strong></span></a><a href="/#research">← Back to research</a></header>
    <section className="topics-hero"><p className="eyebrow">Research library · Articles &amp; news</p><h1>From molecule<br/>to <span>ecosystem.</span></h1><p>Explore StevaniLab research through scientific publications and stories from the international media.</p></section>
    <nav className="topic-tabs" aria-label="Research topics">{order.map((slug,i)=><button className={active===slug?"active":""} onClick={()=>choose(slug)} key={slug}>{String(i+1).padStart(2,"0")} · {topics[slug].title}</button>)}</nav>
    <section className="topic-content"><div className="topic-title"><h2>{topic.title}</h2><p>{topic.intro}</p></div><div className="topic-columns">
      <div className="topic-column"><h3>Scientific articles</h3>{topic.articles.map(([year,title,journal,url])=><a className="topic-item" href={url} target="_blank" rel="noreferrer" key={title}><time>{year}</time><h4>{title} ↗</h4><p>{journal}</p></a>)}<a className="topic-all-papers" href="https://www.stevanilab.com/papers" target="_blank" rel="noreferrer">Browse complete publication list ↗</a></div>
      <div className="topic-column"><h3>News &amp; media</h3>{stories.length?stories.map(story=><a className="topic-item" href={story.url} target="_blank" rel="noreferrer" key={story.url}><span className="item-type">{story.year} · News</span><h4>{story.title} ↗</h4></a>):<p className="empty-topic">No archived news has been assigned to this topic yet. Scientific articles are available in the adjacent list.</p>}</div>
    </div></section>
    <footer className="profile-footer"><a href="/">StevaniLab</a><a href="mailto:stevani@iq.usp.br">stevani@iq.usp.br ↗</a></footer>
  </main>;
}
