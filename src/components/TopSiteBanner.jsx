import { useEffect } from "react";
import "./TopSiteBanner.css";

export default function TopSiteBanner() {
  useEffect(() => {
    const banner = document.querySelector(".top-site-banner");
    const header =
      document.querySelector(".elementor-location-header") ||
      document.querySelector("header");

    const updateOffset = () => {
      if (banner && header) {
        header.style.marginTop = `${banner.offsetHeight}px`;
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("resize", updateOffset);
      if (header) header.style.marginTop = "";
    };
  }, []);

  return (
    <div className="top-site-banner">
      <span>
        <span className="deal-tag">Special Deal</span>
        <span className="special">Use Code: Instant30</span>
        <span className="text-black">Get 30% OFF all Instant Funding Challenges</span>
      </span>
    </div>
  );
}
