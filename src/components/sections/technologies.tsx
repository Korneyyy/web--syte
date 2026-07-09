"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileCode,
  FileType,
  FileJson,
  Atom,
  Hexagon,
  Server,
  Zap,
  Database,
  Container,
  GitBranch,
} from "lucide-react";
import { technologies } from "@/data";
import { Section } from "@/components/ui/section";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileCode,
  FileType,
  FileJson,
  Atom,
  Hexagon,
  Server,
  Zap,
  Database,
  Container,
  GitBranch,
};

const categories = [
  {
    label: "Frontend",
    items: technologies.filter((t) =>
      ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"].includes(t.name)
    ),
  },
  {
    label: "Backend",
    items: technologies.filter((t) =>
      ["Node.js", "Express", "PostgreSQL", "MongoDB"].includes(t.name)
    ),
  },
  {
    label: "Инструменты",
    items: technologies.filter((t) =>
      ["Docker", "Git"].includes(t.name)
    ),
  },
];

export function Technologies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section
      id="technologies"
      title="Технологии"
      subtitle="Современный стек для вашего проекта"
    >
      <div ref={ref} className="space-y-10">
        {categories.map((cat, catIndex) => (
          <div key={cat.label}>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              className="text-sm font-semibold text-light/40 uppercase tracking-widest mb-4 text-center"
            >
              {cat.label}
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-4">
              {cat.items.map((tech, index) => {
                const Icon = iconMap[tech.icon];
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + index * 0.05 }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.05] hover:scale-105"
                  >
                    {Icon && <Icon size={20} className="text-primary" />}
                    <span className="text-sm font-medium text-light/80">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}