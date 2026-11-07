import type { Metadata } from "next";
import { AccessPortal } from "../access-portal";

export const metadata: Metadata = { title: "Avaliações QFL1605 e PETAR | StevaniLab", robots: { index: false, follow: false } };

export default function QFL1605EvaluationAccess() {
  return <AccessPortal scope="evaluations" />;
}
