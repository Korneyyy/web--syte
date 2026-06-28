"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Имя обязательно (минимум 2 символа)"),
  telegram: z.string().min(1, "Укажите Telegram"),
  email: z.string().email("Некорректный email"),
  description: z.string().min(10, "Опишите проект (минимум 10 символов)"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: ContactForm) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Ошибка отправки");
        return;
      }

      reset();
    } catch {
      setServerError("Ошибка соединения");
    }
  };

  return (
    <Section
      id="contact"
      title="Свяжитесь со мной"
      subtitle="Расскажите о вашем проекте, и я предложу лучшее решение"
    >
      <div className="mx-auto max-w-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
        >
          <div>
            <Input
              placeholder="Ваше имя"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Telegram (@username)"
              {...register("telegram")}
            />
            {errors.telegram && (
              <p className="mt-1 text-sm text-red-400">{errors.telegram.message}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Опишите ваш проект"
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Отправка..."
            ) : (
              <>
                Получить консультацию <Send size={16} />
              </>
            )}
          </Button>

          {serverError && (
            <p className="text-center text-sm text-red-400">{serverError}</p>
          )}

          {isSubmitSuccessful && !serverError && (
            <p className="text-center text-sm text-green-400">
              Спасибо! Я свяжусь с вами в ближайшее время.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}