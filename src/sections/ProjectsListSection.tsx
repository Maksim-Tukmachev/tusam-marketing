"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/lib/constants";
import { ProjectCardInteractive } from "@/components/projects/ProjectCardInteractive";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsListSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".project-card-wrap", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="px-4 md:px-9 py-12 md:py-16">
      <div className="max-w-[1520px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project) => (
            <div key={project.slug} className="project-card-wrap">
              <ProjectCardInteractive project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
