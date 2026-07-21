"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/data";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section
      id="services"
      title="Услуги"
      subtitle="Подберу решение под ваши задачи и бюджет"
    >
      <div
        ref={ref}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.03] overflow-hidden"
          >
            {/* Preview image */}
            <div
              className="h-28 sm:h-40 bg-dark-light/50"
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <div className="p-6">
              <h3 className="text-lg font-semibold text-light">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-light/60 leading-relaxed">
                {service.description}
              </p>
              <ul className="mt-4 space-y-1">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-light/40 flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                size="sm"
                className="mt-6 w-full"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Заказать
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}