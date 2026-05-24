export type LabType = "medical" | "industrial" | "both";

export type PortfolioItem = {
  id: string;
  title: string;
  labType: LabType;
  category: "deployment" | "configuration" | "training" | "integration";
  description: string;
  /** Path under /public — use PNG/WebP at 2x for retina displays */
  thumbnail: string;
  fullImage: string;
  alt: string;
  tags: string[];
};

export const services = [
  {
    id: "training",
    title: "SENAITE Training",
    description:
      "Hands-on workshops for analysts, lab managers, and IT teams — from sample registration through results release and audit trails.",
    icon: "graduation",
  },
  {
    id: "cloud",
    title: "Cloud Deployment",
    description:
      "Production-ready installs on AWS, Azure, GCP, or VPS — Docker, TLS, backups, monitoring, and scaling for multi-site labs.",
    icon: "cloud",
  },
  {
    id: "config",
    title: "Lab Configuration",
    description:
      "Workflows, instruments, QC rules, COA templates, and compliance mappings tailored to medical diagnostics and industrial QA/QC.",
    icon: "flask",
  },
  {
    id: "shopify",
    title: "Shopify Integration",
    description:
      "Connect consumables ordering, client portals, and billing — sync catalog and fulfillment with your LIMS where it makes sense.",
    icon: "cart",
  },
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: "med-cloud",
    title: "Medical lab — cloud production",
    labType: "medical",
    category: "deployment",
    description:
      "Multi-tenant SENAITE on cloud VMs with reverse proxy, automated backups, and role-based access for clinical workflows.",
    thumbnail: "/screenshots/med-cloud-thumb.svg",
    fullImage: "/screenshots/med-cloud-full.svg",
    alt: "SENAITE medical lab cloud deployment dashboard",
    tags: ["AWS", "Docker", "HIPAA-ready patterns"],
  },
  {
    id: "ind-workflow",
    title: "Industrial QC workflow",
    labType: "industrial",
    category: "configuration",
    description:
      "Batch sampling, specification limits, and certificate of analysis generation for manufacturing QC.",
    thumbnail: "/screenshots/ind-workflow-thumb.svg",
    fullImage: "/screenshots/ind-workflow-full.svg",
    alt: "Industrial laboratory workflow configuration in SENAITE",
    tags: ["QC", "COA", "Instruments"],
  },
  {
    id: "training-session",
    title: "Online training program",
    labType: "both",
    category: "training",
    description:
      "Structured curriculum covering administration, sample lifecycle, and troubleshooting for mixed medical/industrial teams.",
    thumbnail: "/screenshots/training-thumb.svg",
    fullImage: "/screenshots/training-full.svg",
    alt: "SENAITE training session materials and lab interface",
    tags: ["Workshops", "Documentation", "Handover"],
  },
  {
    id: "shopify-sync",
    title: "Shopify ↔ LIMS bridge",
    labType: "both",
    category: "integration",
    description:
      "Webhook-driven sync between Shopify orders and internal reagent stock — reducing manual ordering for high-volume labs.",
    thumbnail: "/screenshots/shopify-thumb.svg",
    fullImage: "/screenshots/shopify-full.svg",
    alt: "Shopify integration architecture with SENAITE",
    tags: ["Shopify API", "Webhooks", "Inventory"],
  },
];

export const shopifyIntegration = {
  headline: "Shopify + SENAITE: when it fits your lab",
  intro:
    "Not every lab needs e-commerce — but when you sell kits, offer client portals, or reorder consumables at scale, tying Shopify to your LIMS can remove double entry and stock surprises.",
  useCases: [
    {
      title: "Consumables storefront",
      description:
        "Clients or internal teams order approved reagents via Shopify; fulfilled quantities can inform stock levels in SENAITE.",
    },
    {
      title: "Client portal & billing",
      description:
        "Package test panels as products; order metadata flows into sample registration via custom app or middleware.",
    },
    {
      title: "B2B catalog sync",
      description:
        "Keep SKU, price, and availability aligned between Shopify collections and your approved materials list.",
    },
  ],
  approach: [
    "Discovery — map order → sample → result flow and compliance constraints",
    "Architecture — Shopify Admin API, webhooks, secure middleware (no secrets in the browser)",
    "Pilot — one product line or site, then expand with monitoring and rollback",
  ],
} as const;

export const processSteps = [
  {
    step: "01",
    title: "Assess",
    detail: "Lab type, regulations, instruments, and hosting constraints.",
  },
  {
    step: "02",
    title: "Design",
    detail:
      "Architecture, workflows, and integration touchpoints (including Shopify if needed).",
  },
  {
    step: "03",
    title: "Deploy",
    detail:
      "Install, harden, migrate data, and validate in a staging environment.",
  },
  {
    step: "04",
    title: "Train & hand over",
    detail: "Documentation, admin training, and support window for go-live.",
  },
] as const;
