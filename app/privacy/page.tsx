import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных — Автосервис Катюша",
  description: "Политика обработки персональных данных для формы заявки автосервиса Катюша.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-graphite-50 py-10">
      <article className="container-page rounded-2xl border border-graphite-200 bg-white p-6 shadow-card md:p-10">
        <Link href="/" className="text-sm font-extrabold text-katyusha-700 hover:text-katyusha-900">
          На главную
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold text-graphite-950 md:text-4xl">
          Политика обработки персональных данных
        </h1>
        <p className="mt-4 leading-7 text-graphite-700">
          Настоящая политика описывает, какие данные передаются через форму заявки на сайте
          автосервиса «{business.name}» и как они используются для связи с пользователем.
        </p>

        <section className="mt-8 space-y-4 leading-7 text-graphite-700">
          <h2 className="text-xl font-extrabold text-graphite-950">Какие данные обрабатываются</h2>
          <p>
            Через форму могут передаваться имя, телефон, марка и модель автомобиля, описание
            проблемы, выбранный способ связи, страница отправки заявки, дата и время отправки.
          </p>
          <h2 className="text-xl font-extrabold text-graphite-950">Цель обработки</h2>
          <p>
            Данные используются для обработки обращения, уточнения деталей ремонта, согласования
            записи и обратной связи по заявке.
          </p>
          <h2 className="text-xl font-extrabold text-graphite-950">Передача данных</h2>
          <p>
            Данные могут быть переданы в подключенные владельцем сайта каналы уведомлений:
            Telegram Bot API и email через SMTP, если соответствующие настройки включены.
          </p>
          <h2 className="text-xl font-extrabold text-graphite-950">Хранение</h2>
          <p>
            Заявки могут сохраняться в локальный файл проекта для последующей обработки. Срок
            хранения определяется владельцем сайта с учётом целей обработки.
          </p>
          <h2 className="text-xl font-extrabold text-graphite-950">Отзыв согласия</h2>
          <p>
            Пользователь может обратиться по телефону {business.phoneFormatted}, чтобы уточнить
            вопросы, связанные с обработкой персональных данных.
          </p>
        </section>
      </article>
    </main>
  );
}
