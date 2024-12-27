import "../css/base.css";
import PostsCarousel from "./carousel";
import potteryfolio from "../../welcome-to-potteryfolio.gif"
import Footer from "./footer";

export default function IndexPage() {
  return (
    <main className="main-container">
      {/* <img className="heading" src={potteryfolio.src} alt="welcome to my potteryfolio" /> */}
      <h3 className="heading">studio 沈 shen</h3>
      <PostsCarousel options={{ slidesToScroll: 1 }} />
      <Footer />
    </main>
  );
}
