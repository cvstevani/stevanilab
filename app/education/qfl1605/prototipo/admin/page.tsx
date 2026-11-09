import type { Metadata } from "next";
import { AccessPortal } from "../../access-portal";

export const metadata: Metadata = {
  title: "Administração QFL1605 | StevaniLab",
  robots: { index: false, follow: false },
};

export default function QFL1605PrototypeAdmin() {
  return <AccessPortal scope="admin" />;
}
