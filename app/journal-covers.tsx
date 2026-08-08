const journalCovers = [
  ["Journal of Fungi · Volume 11, Issue 1", "https://static.wixstatic.com/media/243f25_283e9b4682a9482c805ab44aa20f46ee~mv2.png", "https://www.mdpi.com/2309-608X/11/1"],
  ["Pharmaceuticals · Volume 15, Issue 10", "https://static.wixstatic.com/media/243f25_4f860676a47f40b286018cb4c213c2e2~mv2.jpg", "https://www.mdpi.com/1424-8247/15/10/1179"],
  ["Photochemistry and Photobiology", "https://static.wixstatic.com/media/243f25_aebc15a4dc9d496b9f36fa763c9a37fa~mv2.png", "https://onlinelibrary.wiley.com/doi/full/10.1111/php.13363?af=R"],
  ["Environmental Toxicology and Chemistry", "https://static.wixstatic.com/media/243f25_1e15024cf3234de8a5aed223c4f361f6~mv2.png", "https://setac.onlinelibrary.wiley.com/doi/10.1002/etc.4740"],
  ["Science Advances · Volume 3, Issue 4", "https://static.wixstatic.com/media/243f25_ff285b51dc764e188ae175e0a235b67e~mv2.png", "https://www.science.org/toc/sciadv/3/4"],
  ["Photochemistry and Photobiology · Volume 93, Issue 2", "https://static.wixstatic.com/media/243f25_b31a1920d212490299cb80d4980791d1~mv2_d_2250_3000_s_2.jpg", "https://onlinelibrary.wiley.com/toc/17511097/2017/93/2"],
  ["Current Biology", "https://static.wixstatic.com/media/243f25_dba625149a2f42f99d3039253b96a8de~mv2.jpg", "https://www.cell.com/current-biology/abstract/S0960-9822(15)00160-8"],
  ["Química Nova · Issue 108", "https://static.wixstatic.com/media/243f25_7d30104f616b47339e9c5b4d60d9adcd~mv2_d_2584_3307_s_4_2.jpg", "https://quimicanova.sbq.org.br/default.asp?ed=108"],
  ["Química Nova · Volume 21, Issue 6", "https://static.wixstatic.com/media/243f25_83cd3048457f46e8bc74f356c93b478d~mv2.jpg", "https://www.scielo.br/j/qn/i/1998.v21n6/"],
  ["Photochemical & Photobiological Sciences", "https://static.wixstatic.com/media/243f25_c7814e7a07194c12b969eda4aa5ea228~mv2.png", "https://pubs.rsc.org/en/content/articlelanding/2009/pp/b908982a"],
  ["Mycologia", "https://static.wixstatic.com/media/243f25_ca28e7d8da034319b1d52d0e866b711d~mv2.png", "https://www.tandfonline.com/doi/full/10.3852/09-197"],
  ["Photochemical & Photobiological Sciences", "https://static.wixstatic.com/media/243f25_65aff4e1e70b4d488199ea7ac49fc189~mv2_d_1241_1635_s_2.png", "https://pubs.rsc.org/en/content/articlelanding/2012/pp/c2pp25032b"],
  ["Pesquisa FAPESP · Issue 168", "https://static.wixstatic.com/media/243f25_41644c02c03a467e8e907e679ab0c7af~mv2.jpeg", "https://revistapesquisa.fapesp.br/revista/ver-edicao-editorias/?e=168"],
  ["Mycologia", "https://static.wixstatic.com/media/243f25_0e8479f3758e415ea4c06c3ac23050cb~mv2.png", "https://www.tandfonline.com/doi/full/10.1080/15572536.2007.11832592"],
] as const;

export function JournalCovers({ light = false }: { light?: boolean }) {
  return <section className={`journal-covers ${light ? "journal-covers-light" : ""}`} aria-label="Journal covers featuring StevaniLab research">
    <div className="journal-covers-head"><p>Featured on journal covers</p><span>Scroll to explore · each cover opens its publication</span></div>
    <div className="journal-covers-track">
      {journalCovers.map(([title, image, url]) => <a href={url} target="_blank" rel="noreferrer" key={image} aria-label={`Open publication featured in ${title}`}>
        <img src={image} alt={title} loading="lazy" />
        <span>{title} ↗</span>
      </a>)}
    </div>
  </section>;
}
