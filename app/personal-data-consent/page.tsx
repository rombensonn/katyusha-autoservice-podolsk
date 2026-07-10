import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных - Автосервис Катюша",
  description: "Текст согласия на обработку персональных данных для заявки в автосервис Катюша.",
  alternates: {
    canonical: "/personal-data-consent"
  }
};

export default function ConsentPage() {
  return (
    <main className="industrial-surface min-h-[100dvh] py-10 text-white">
      <article className="container-page bezel-shell">
        <div className="bezel-core p-6 md:p-10">
        <Link href="/" className="text-sm font-extrabold text-signal-200 hover:text-signal-100">
          На главную
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold text-white md:text-4xl">
          Согласие на обработку персональных данных
        </h1>
        <div className="mt-6 space-y-4 leading-7 text-steel-200">
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
            <a href={`tel:${business.phone}`} className="font-extrabold text-signal-200 underline-offset-4 hover:underline">
              {business.phoneFormatted}
            </a>
            .
          </p>
        </div>
        </div>
      </article>
    </main>
  );
}
