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

const iconMap: Record<string, React.ElementType> = {
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

export function Technologies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section
      id="technologies"
      title="Технологии"
      subtitle="Современный стек для вашего проекта"
    >
      <div
        ref={ref}
        className="flex flex-wrap justify-center gap-4"
      >
        {technologies.map((tech, index) => {
          const Icon = iconMap[tech.icon];
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.05]"
            >
              {Icon && <Icon size={20} className="text-primary" />}
              <span className="text-sm font-medium text-light/80">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}