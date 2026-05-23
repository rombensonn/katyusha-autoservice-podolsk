import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных — Автосервис Катюша",
  description: "Текст согласия на обработку персональных данных для заявки в автосервис Катюша.",
  alternates: {
    canonical: "/personal-data-consent"
  }
};

export default function ConsentPage() {
  return (
    <main className="min-h-screen bg-graphite-50 py-10">
      <article className="container-page rounded-2xl border border-graphite-200 bg-white p-6 shadow-card md:p-10">
        <Link href="/" className="text-sm font-extrabold text-katyusha-700 hover:text-katyusha-900">
          На главную
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold text-graphite-950 md:text-4xl">
          Согласие на обработку персональных данных
        </h1>
        <div className="mt-6 space-y-4 leading-7 text-graphite-700">
          <p>
            Отправляя форму заявки на сайте автосервиса «{business.name}», пользователь подтверждает
            согласие на обработку персональных данных, указанных в форме.
          </p>
          <p>
            Обрабатываемые данные: имя, телефон, марка и модель автомобиля, описание проблемы,
            выбранный способ связи, страница отправки заявки, дата и время отправки.
          </p>
          <p>
            Цель обработки: обратная связь по заявке, уточнение деталей обращения и запись в
            автосервис.
          </p>
          <p>
            Пользователь подтверждает, что данные предоставлены добровольно. Согласие действует до
            достижения целей обработки или до отзыва пользователем.
          </p>
          <p>
            Для вопросов по заявке и обработке данных можно использовать телефон:
            {" "}
            <a href={`tel:${business.phone}`} className="font-extrabold text-katyusha-700 underline-offset-4 hover:underline">
              {business.phoneFormatted}
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
