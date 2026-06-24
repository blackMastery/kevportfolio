// Single source of truth for the standalone section pages (one per homepage
// section). Used by the Footer "Quick Links" and the sitemap. The top nav
// intentionally keeps its smooth-scroll anchors and does NOT use these.

export type SectionPage = {
  /** Route path, e.g. "/about" */
  path: string;
  /** Short label for footer links */
  navLabel: string;
};

export const SECTION_PAGES: SectionPage[] = [
  { path: "/about", navLabel: "About" },
  { path: "/resume", navLabel: "Resume" },
  { path: "/services", navLabel: "Services" },
  { path: "/portfolio", navLabel: "Portfolio" },
  { path: "/contact", navLabel: "Contact" },
];
