import { site } from "@/data/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "Haider Alwaqfi SENAITE LIMS Consultant",
      description: site.description,
      inLanguage: "en",
      publisher: {
        "@id": `${site.url}/#person`,
      },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.owner,
      url: site.url,
      email: site.email,
      jobTitle: "SENAITE LIMS Consultant",
      sameAs: [site.linkedin, site.github],
      knowsAbout: [
        "SENAITE LIMS",
        "senaitelims",
        "Laboratory information management systems",
        "Medical laboratory workflows",
        "Industrial quality control workflows",
        "SENAITE cloud deployment",
        "SENAITE training",
        "SENAITE configuration",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: "SENAITE LIMS Consulting by Haider Alwaqfi",
      url: site.url,
      description: site.description,
      provider: {
        "@id": `${site.url}/#person`,
      },
      areaServed: "Worldwide",
      serviceType: [
        "SENAITE LIMS training",
        "SENAITE LIMS cloud deployment",
        "SENAITE LIMS configuration",
        "Laboratory workflow integration",
      ],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
