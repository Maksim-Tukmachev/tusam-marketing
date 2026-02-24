import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectCaseContent } from "@/components/projects/ProjectCaseContent";
import { PROJECTS, SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Кейс не найден" };
  const description =
    project.excerpt ??
    `${project.name} — ${project.sector}. ${project.categories.join(", ")}.`;
  const title = `${project.name} | Кейс Tusam Group`;
  const url = `${SITE_URL}/projects/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: project.imageUrl
        ? [{ url: project.imageUrl, width: 1200, height: 630, alt: project.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
}

function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const paragraphs = project.description
    ? project.description.trim().split(/\n\n+/).filter(Boolean)
    : [];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Кейсы",
        item: `${SITE_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${SITE_URL}/projects/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <main className="flex-1 min-h-0">
        <ProjectCaseContent project={project} paragraphs={paragraphs} />
      </main>
      <Footer variant="compact" />
    </div>
  );
}
