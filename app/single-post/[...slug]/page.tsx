import { permanentRedirect } from "next/navigation";

export default function LegacyNewsPostPage() {
  permanentRedirect("/#media");
}
