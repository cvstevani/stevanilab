export const collaborators = [
  ["Josef W. Baader", "Chemist · IQ–USP, Brazil", "https://www.iq.usp.br/portaliqusp/?q=en%2Fusers%2Fjosef-wilhelm-baader"],
  ["Etelvino J. H. Bechara", "Chemist · IQ–USP, Brazil", "https://scholar.google.com.br/citations?user=I4oEyhAAAAAJ&hl=en"],
  ["Erick L. Bastos", "Chemist · IQ–USP, Brazil", "http://bastoslab.com/v7/"],
  ["Renato Sanches Freire", "Chemist · IQ–USP, Brazil", "https://bv.fapesp.br/en/pesquisador/7677/renato-sanches-freire/"],
  ["Paolo Di Mascio", "Chemist · IQ–USP, Brazil", "http://www.iq.usp.br/napredoxoma/equipe/paolo/index.html"],
  ["Nelson Menolli Jr.", "Biologist · IFSP, Brazil", "https://integra.ifsp.edu.br/busca/%22NELSON%20MENOLLI%20JUNIOR%22"],
  ["Anderson G. de Oliveira", "Chemist · Yeshiva University, USA", "https://www.theoliveiralab.com"],
  ["Patrícia Sartorelli", "Chemist · UNIFESP, Brazil", "https://unifesp.br/prodmais/profile.php?lattesID=6836392358779448"],
  ["Vadim Viviani", "Biologist · UFSCar, Brazil", "https://scholar.google.com/citations?user=1ASG2SgAAAAJ&hl=pt-BR"],
  ["Lara Urban", "Biologist · Helmholtz Pioneer Campus, Germany", "https://www.helmholtz-munich.de/en/helmholtz-pioneer-campus/lara-urban"],
  ["Yuichi Oba", "Biologist · Chubu University, Japan", "https://research-db.chubu.ac.jp/chbhp/KgApp/k03/resid/S002254?lang=en"],
  ["Karen Sarkisyan", "Biologist · Imperial College London, UK", "https://www.designing.bio/team"],
  ["Ilia V. Yampolsky", "Chemist · IBCh RAS, Russia", "https://yampolsky.ibch.ru"],
  ["Dennis E. Desjardin", "Biologist · San Francisco State University, USA", "https://en.wikipedia.org/wiki/Dennis_E._Desjardin"],
  ["Diego Cunha Zied", "UNESP Dracena, Brazil", "https://www.dracena.unesp.br/#!/laboratorios-de-pesquisa/centro-de-estudos-em-cogumelos/"],
  ["Jay C. Dunlap", "Biologist · Dartmouth Geisel School of Medicine, USA", "https://geiselmed.dartmouth.edu/dunlaploros/"],
  ["Jennifer J. Loros", "Biologist · Dartmouth Geisel School of Medicine, USA", "https://geiselmed.dartmouth.edu/faculty/facultydb/view.php/?uid=127"],
  ["Paul Marek", "Biologist · Virginia Tech, USA", "https://millipedes.ento.vt.edu/people/"],
  ["Brian A. Perry", "Biologist · Cal State East Bay, USA", "https://www.perrymycolab.com"],
  ["Xianfa Xie", "Biologist · Virginia State University, USA", "https://xiexianfa.wixsite.com/xielab"],
] as const;

export const sortedCollaborators = [...collaborators].sort(([nameA], [nameB]) =>
  nameA.localeCompare(nameB, "en", { sensitivity: "base" }),
);
