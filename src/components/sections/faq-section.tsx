import { faqItems } from "@/data";
import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <Section
      id="faq"
      title="Часто задаваемые вопросы"
      subtitle="Ответы на самые популярные вопросы"
    >
      <div className="mx-auto max-w-2xl">
        <Accordion items={faqItems} />
      </div>
    </Section>
  );
}