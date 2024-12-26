import "../css/base.css";
import PostsCarousel from "./carousel";
import potteryfolio from "../../welcome-to-potteryfolio.gif"

export default function IndexPage() {
  return (
    <main className="main-container">
      <img className="heading" src={potteryfolio.src} alt="welcome to my potteryfolio" />
      <PostsCarousel options={{ slidesToScroll: 1 }} />
    </main>
  );
}
