"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { portfolioItems } from "@/data";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section
      id="portfolio"
      title="Портфолио"
      subtitle="Примеры моих работ"
    >
      <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-dark-light/50 aspect-video"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />

            {/* Оверлей при hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-dark/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-6 text-center">
              <h3 className="text-lg font-semibold text-light">
                {item.title}
              </h3>
              <p className="text-sm text-light/60">{item.description}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {item.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <a
                href={item.link}
                className="mt-2 inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
              >
                Посмотреть <ExternalLink size={14} />
              </a>
            </div>

            {/* Название снизу (видно всегда) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/80 to-transparent">
              <h3 className="text-sm font-medium text-light">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}