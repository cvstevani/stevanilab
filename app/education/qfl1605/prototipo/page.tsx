import { QFL1605Prototype } from "./prototype-app";
import "./prototype.css";

export const metadata = {
  title: "Protótipo QFL1605 · Química Ambiental em Campo",
  description: "Protótipo instalável para registro de amostras, cálculos e avaliações em campo.",
  manifest: "/qfl1605-prototype.webmanifest",
};

export default function QFL1605PrototypePage() {
  return <QFL1605Prototype />;
}
