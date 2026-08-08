import { permanentRedirect } from "next/navigation";

export default function LegacyPapersPage() {
  permanentRedirect("/publications");
}
