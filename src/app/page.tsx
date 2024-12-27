import "../css/base.css";
import PostsCarousel from "./carousel";
import Footer from "./footer";

export default function IndexPage() {
  return (
    <main className="main-container">
      <h3 className="heading">studio 沈 shen</h3>
      <span className="menu">
        <a className="menu-button hover:underline" href={"/about-me"}>about me</a>
        <a className="menu-button hover:underline" href={"/updates-log"}>updates</a>
      </span>
      <PostsCarousel options={{ slidesToScroll: 1 }} />
      <Footer />
    </main>
  );
}
