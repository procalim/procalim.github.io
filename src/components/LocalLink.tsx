import { forwardRef } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type LinkProps,
  type NavLinkProps,
} from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { localePath } from "@/i18n/locale-path";

/**
 * React Router's links, kept inside the reader's language: on an English
 * page, "/shop/" points at "/en/shop/". Pages write their links once.
 * روابط تبقى داخل لغة الصفحة؛ في الإنجليزية يصبح "/shop/" هو "/en/shop/".
 */
const localize = (to: LinkProps["to"], lang: "ar" | "en") =>
  typeof to === "string" && to.startsWith("/") ? localePath(to, lang) : to;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...rest }, ref) => {
  const { lang } = useLang();
  return <RouterLink ref={ref} to={localize(to, lang)} {...rest} />;
});
Link.displayName = "Link";

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ to, ...rest }, ref) => {
  const { lang } = useLang();
  return <RouterNavLink ref={ref} to={localize(to, lang)} {...rest} />;
});
NavLink.displayName = "NavLink";
