import "@/css/base.css";
import Link from "next/link";

export default function AboutMePage() {
  return (
    <main className="main-container">
      <Link href="/" className="hover:underline back-arrow">
        ← Back to posts
      </Link>
      <h3 className="heading">about me</h3>
    </main>
  );
}
