import { useEffect } from "react";
import "./TopSiteBanner.css";

export default function TopSiteBanner() {
  useEffect(() => {
    const header =
      document.querySelector(".elementor-location-header") ||
      document.querySelector("header");

    const banner = document.querySelector(".top-site-banner");

    if (header && banner) {
      header.style.marginTop = `${banner.offsetHeight}px`;
    }

    return () => {
      if (header) header.style.marginTop = "";
    };
  }, []);

  return (
    <div className="top-site-banner">
      <span>
        <span className="special">Use Code: Instant30</span>
        <span className="deal-tag">Special Deal</span>
        <span>Get 30% OFF all Instant Funding Challenges</span>
      </span>
    </div>
  );
}
