import { z } from "zod";

export const contactMethods = ["Звонок", "WhatsApp", "Telegram"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80, "Имя слишком длинное"),
  phone: z
    .string()
    .trim()
    .min(6, "Укажите телефон")
    .max(40, "Телефон слишком длинный")
    .refine((value) => value.replace(/\D/g, "").length >= 10, "Укажите корректный телефон"),
  car: z.string().trim().max(120, "Марка и модель слишком длинные").optional().or(z.literal("")),
  problem: z
    .string()
    .trim()
    .min(5, "Кратко опишите проблему")
    .max(1000, "Описание слишком длинное"),
  contactMethod: z.enum(contactMethods),
  consent: z.literal(true),
  sourcePage: z.string().trim().max(500).optional().or(z.literal("")),
  submittedAt: z.string().trim().max(80).optional().or(z.literal("")),
  company: z.string().optional().or(z.literal(""))
});

export type LeadInput = z.infer<typeof leadSchema>;

export type StoredLead = Omit<LeadInput, "company" | "consent"> & {
  phoneNormalized: string;
  receivedAt: string;
  ip: string;
  userAgent: string;
};
