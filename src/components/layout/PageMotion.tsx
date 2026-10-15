import { useLocation } from "react-router-dom";
import { useReveal } from "@/hooks/use-reveal";

/** Re-arms the scroll-in reveal on every page the visitor opens. */
const PageMotion = () => {
  const { pathname } = useLocation();
  useReveal(pathname);
  return null;
};

export default PageMotion;
