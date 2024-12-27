import "@/css/base.css";
import Link from "next/link";
import Footer from "../footer";

export default function AboutMePage() {
  return (
    <main className="main-container">
      <Link href="/" className="hover:underline back-arrow">
        ← Back to posts
      </Link>
      <div className="bio-container">
        <h3 className="heading">about me</h3>
        <p className="intro">Hi there! 👋 I'm Betty. Here's a bit about me: </p>
        <li className="bio">
          👩🏻‍💻 I've been a software engineer for over 4 years now. I'm currently a
          software engineer at Hightouch on the destinations team.
        </li>
        <li className="bio">
          🧠 I love designing and playing with elegant APIs, and creating
          pleasant and seamless user experiences.
        </li>
        <li className="bio">
          🏺 I've been making pottery for almost a full year now! While I've
          learned a lot, the list of pieces I want to make is endless.
        </li>
        <li className="bio">
          ✨ Outside of coding and making pottery, you can find me training for
          a race, at the nearest [solidcore], traveling to a different
          continent, or baking my newest recipe fixation.
        </li>
        <li className="bio">
          You can reach me at caiying.shen526@gmail.com, or any of the links below.
        </li>
      </div>
      <Footer />
    </main>
  );
}
