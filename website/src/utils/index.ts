import { generateMetadata } from "./metadata";
import { NAV_LINKS } from "./nav-links";

export function scrollToAnchor(anchor: string) {
  const id = anchor.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export {
    generateMetadata,
    NAV_LINKS,
};