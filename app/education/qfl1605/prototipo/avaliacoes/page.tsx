import type { Metadata } from "next";
import "../prototype.css";

export const metadata: Metadata = {
  title: "Avaliações PETAR | QFL1605",
  description: "Acesso aos formulários específicos para participantes das atividades no PETAR.",
  robots: { index: false, follow: false },
};

const audiences = [
  {
    title: "Guias e monitores do PETAR",
    language: "Português",
    description: "Formação no Núcleo Santana, visitação noturna e comunicação dos fenômenos de emissão de luz.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScjQKLvgnsdVlmlprsjjt_8M632nowl7QY4BKEopbriPdOH1Q/viewform",
  },
  {
    title: "Estudantes de escolas",
    language: "Português",
    description: "Aprendizagem, interesse científico, cavernas e conservação ambiental.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdeHVUkzW7ZhZ-NNTTJXSzRPytwDsZvSpFyhyPAgm_w7HS1Og/viewform",
  },
  {
    title: "Turistas e visitantes",
    language: "Português / English",
    description: "Experiência educativa, visitação regular ou noturna, mediação e conservação.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeBA9f1F2QG2xKY0Ku5LTcJw3QJqn8_KhP1aZ4XXgTlwOLYWg/viewform",
  },
];

export default function QFL1605PublicEvaluations() {
  return (
    <main className="pwa-shell pwa-public-evaluations">
      <header>
        <p className="pwa-eyebrow">QFL1605 · Projeto de extensão</p>
        <h1>Avaliações das atividades no PETAR</h1>
        <p>Escolha o formulário correspondente ao seu vínculo com a atividade. Envie somente uma avaliação, marcando todos os locais e todas as atividades aplicáveis. As respostas são privadas e não aparecem automaticamente no portal público.</p>
      </header>
      <section className="pwa-audience-grid">
        {audiences.map((audience, index) => (
          <article key={audience.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{audience.title}</h2>
            <small>{audience.language}</small>
            <p>{audience.description}</p>
            <a href={audience.url} target="_blank" rel="noreferrer">Abrir formulário oficial ↗</a>
          </article>
        ))}
      </section>
      <aside>Os QR codes distribuídos pela equipe deverão apontar para esta entrada ou diretamente para o formulário correspondente. Esta página não será indexada pelos mecanismos de busca.</aside>
    </main>
  );
}
