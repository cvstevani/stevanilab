import { permanentRedirect } from "next/navigation";

export default function LegacyTeamPage() {
  permanentRedirect("/#team");
}
