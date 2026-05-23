import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowUpRight,
  CalendarCheck,
  CarFront,
  CheckCircle2,
  Clock3,
  CreditCard,
  ExternalLink,
  MapPinned,
  Navigation,
  Phone,
  Star,
  Wrench
} from "lucide-react";
import { FAQ } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { MotionCard, MotionSection } from "@/components/motion-section";
import { PhotoPlaceholders } from "@/components/photo-placeholders";
import { Badge, ButtonLink, SectionHeading } from "@/components/ui";
import {
  bodyRepairItems,
  business,
  carTypes,
  priceNotes,
  processSteps,
  quickFacts,
  reviewSnippets,
  serviceGroups,
  trustCards
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <main className="industrial-surface overflow-hidden pb-24 md:pb-0">
      <SiteHeader />
      <Hero />
      <TrustSection />
      <ServicesSection />
      <BodyRepairSection />
      <ProcessSection />
      <PriceSection />
      <ReviewsSection />
      <CarsSection />
      <AddressSection />
      <LeadSection />
      <FAQSection />
      <SiteFooter />
      <MobileStickyCta />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-steel-950/88 backdrop-blur-xl">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <a href="#top" className="flex cursor-pointer items-center gap-3" aria-label="Катюша, к началу страницы">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/14 bg-katyusha-700 text-white shadow-inner-line">
            <Wrench className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block text-base font-extrabold text-white">Катюша</span>
            <span className="hidden text-xs font-bold text-steel-300 sm:block">индустриальный автосервис</span>
          </span>
        </a>
        <nav className="hidden items-center gap-5 text-sm font-bold text-steel-200 lg:flex" aria-label="Основная навигация">
          <a href="#services" className="cursor-pointer hover:text-signal-200">
            Услуги
          </a>
          <a href="#body" className="cursor-pointer hover:text-signal-200">
            Кузов
          </a>
          <a href="#reviews" className="cursor-pointer hover:text-signal-200">
            Отзывы
          </a>
          <a href="#contacts" className="cursor-pointer hover:text-signal-200">
            Адрес
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phone}`}
            className="hidden min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-white/16 bg-white/8 px-4 py-2 text-sm font-extrabold text-white transition-colors hover:border-signal-300/50 hover:bg-white/12 sm:inline-flex"
            aria-label={`Позвонить ${business.phoneFormatted}`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            {business.phoneFormatted}
          </a>
          <a
            href="#lead"
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg bg-katyusha-700 px-4 py-2 text-sm font-extrabold text-white transition-colors hover:bg-katyusha-800"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden />
            <span className="hidden min-[430px]:inline">Записаться</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[calc(100vh-64px)] border-b border-white/10 text-white">
      <Image
        src="/images/katyusha-industrial-hero.png"
        alt="Нейтральное тематическое фото индустриального автосервиса"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,14,18,0.94),rgba(10,14,18,0.78)_43%,rgba(10,14,18,0.38)),linear-gradient(180deg,rgba(10,14,18,0.38),rgba(10,14,18,0.9))]" aria-hidden />
      <div className="absolute inset-0 bg-technical-grid bg-[length:42px_42px] opacity-45" aria-hidden />

      <div className="container-page relative grid min-h-[calc(100vh-64px)] gap-10 py-10 lg:grid-cols-[1fr_430px] lg:items-center">
        <div className="max-w-4xl">
          <nav className="mb-6 text-sm text-steel-300" aria-label="Хлебные крошки">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="#top" className="font-bold text-white hover:text-signal-200">
                  Главная
                </a>
              </li>
              <li aria-hidden>/</li>
              <li>Автосервис Катюша Подольск</li>
            </ol>
          </nav>
          <Badge>5,0 на Яндекс.Картах · 43 оценки · 32 отзыва</Badge>
          <h1 className="mt-6 max-w-3xl text-[2.55rem] font-black leading-[1.02] tracking-[-0.01em] text-white sm:text-5xl lg:text-7xl">
            Автосервис “Катюша” в Подольске
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-extrabold leading-8 text-signal-100">
            Ремонт, обслуживание и кузовные работы в понятном формате: причина, объяснение, согласование.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-steel-200">
            Диагностика неисправностей, ремонт двигателя, ходовой, электрики, кузовной ремонт,
            покраска и развал-схождение. Находим причину, объясняем простым языком и согласовываем
            работы до ремонта.
          </p>
          <div className="mt-7 flex max-w-2xl items-start gap-3 rounded-lg border border-white/14 bg-white/9 p-4 shadow-inner-line backdrop-blur">
            <MapPinned className="mt-1 h-5 w-5 shrink-0 text-signal-300" aria-hidden />
            <div>
              <p className="font-extrabold">{business.addressFull}</p>
              <p className="mt-1 text-sm text-steel-300">Ориентир для приезда: {business.landmark}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#lead" icon={CalendarCheck}>
              Записаться на ремонт
            </ButtonLink>
            <ButtonLink href={`tel:${business.phone}`} variant="secondary" icon={Phone} ariaLabel={`Позвонить ${business.phoneFormatted}`}>
              Позвонить
            </ButtonLink>
            <ButtonLink href={business.mapsUrl} variant="ghost" icon={Navigation} external>
              Построить маршрут
            </ButtonLink>
          </div>
        </div>

        <aside className="glass-panel rounded-xl p-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-signal-300">Панель сервиса</p>
          <div className="mt-5 grid gap-3">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;

              return (
                <div key={fact.label} className="flex items-center gap-3 rounded-lg border border-white/12 bg-steel-950/55 p-4">
                  <Icon className="h-5 w-5 shrink-0 text-signal-300" aria-hidden />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-steel-400">{fact.label}</p>
                    <p className="mt-1 text-sm font-extrabold text-white">{fact.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 rounded-lg border border-signal-300/25 bg-hazard-stripe p-4">
            <p className="text-sm font-extrabold text-white">График работы</p>
            <p className="mt-2 text-sm text-steel-200">
              {business.schedule.weekdays}
              <br />
              {business.schedule.sunday}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <MotionSection className="section-pad border-b border-white/10 bg-steel-950" ariaLabelledby="trust-title">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeading
            id="trust-title"
            tone="light"
            eyebrow="Почему обращаются"
            title="Индустриальный вид, человеческий подход"
            text="Новый визуальный язык делает сайт похожим на рабочую сервисную станцию, а не на шаблонную визитку. Смыслы остаются теми же: объяснить проблему, не давить лишними работами, помочь быстро сориентироваться."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {trustCards.map((card) => {
              const Icon = card.icon;

              return (
                <MotionCard key={card.title} className="metal-panel p-5 text-white">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-signal-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-steel-200">{card.text}</p>
                </MotionCard>
              );
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function ServicesSection() {
  return (
    <MotionSection id="services" className="section-pad light-industrial-surface" ariaLabelledby="services-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Сервисные модули"
            title="Услуги собраны по реальным ситуациям с автомобилем"
            text="Вместо хаотичного списка - промышленная сетка направлений: обслуживание, двигатель, ходовая, электрика, кузов и выхлоп."
          />
          <ButtonLink href="#lead" variant="light" icon={CarFront}>
            Уточнить по моей машине
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {serviceGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <MotionCard key={group.title} className="light-glass-panel overflow-hidden p-0">
                <div className="flex items-start gap-4 border-b border-steel-200/70 bg-steel-950 p-5 text-white">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/14 bg-white/8 text-signal-300">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-300">
                      Пост {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold">{group.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="leading-7 text-steel-700">{group.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.services.map((service) => (
                      <li key={service} className="rounded-md border border-steel-200 bg-white px-3 py-1.5 text-sm font-bold text-steel-700">
                        {service}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#lead"
                    className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-extrabold text-katyusha-700 hover:text-katyusha-900"
                  >
                    Уточнить по моей машине
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </MotionCard>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function BodyRepairSection() {
  return (
    <MotionSection id="body" className="section-pad border-y border-white/10 bg-steel-950 text-white" ariaLabelledby="body-title">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionHeading
              id="body-title"
              tone="light"
              eyebrow="Кузовное направление"
              title="Кузовной ремонт, покраска и полировка"
              text="Клиенты отмечают в отзывах ремонт бамперов и крыльев, сложную покраску с попаданием в цвет, восстановление после ДТП и полировку кузова. Если нужно вернуть автомобилю аккуратный внешний вид - можно описать повреждение и записаться на осмотр."
            />
            <p className="mt-5 rounded-lg border border-signal-300/24 bg-signal-400/10 p-4 text-sm leading-6 text-signal-100">
              Стоимость зависит от повреждения, модели автомобиля и объёма работ.
            </p>
            <ButtonLink href="#lead" className="mt-7" icon={PaintIcon}>
              Описать повреждение и записаться
            </ButtonLink>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/12 bg-steel-900 shadow-soft">
            <Image
              src="/images/katyusha-body-repair.png"
              alt="Нейтральное тематическое фото кузовного ремонта и подготовки к покраске"
              width={1200}
              height={800}
              className="h-full min-h-[420px] w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 grid gap-2 sm:grid-cols-2">
              {bodyRepairItems.slice(0, 4).map((item) => (
                <div key={item} className="rounded-lg border border-white/14 bg-steel-950/72 p-3 text-sm font-extrabold text-white backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <h3 className="text-xl font-extrabold">Тематические фото для нового визуального языка</h3>
            <p className="max-w-xl text-sm leading-6 text-steel-300">
              Это нейтральные сгенерированные изображения. Их можно заменить реальными фото сервиса, работ и зоны приёмки.
            </p>
          </div>
          <PhotoPlaceholders />
        </div>
      </div>
    </MotionSection>
  );
}

function ProcessSection() {
  return (
    <MotionSection className="section-pad light-industrial-surface" ariaLabelledby="process-title">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="Маршрут обращения"
          title="Что происходит после заявки"
          text="Процесс описан без обещаний о конкретном сроке: сначала задача, затем уточнение, согласование и выполнение работ."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="light-glass-panel relative rounded-lg p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-steel-950 text-sm font-black text-signal-200">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-steel-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-steel-700">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function PriceSection() {
  return (
    <MotionSection className="section-pad border-y border-white/10 bg-steel-950" ariaLabelledby="price-title">
      <div className="container-page grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative overflow-hidden rounded-xl border border-white/12 shadow-soft">
          <Image
            src="/images/katyusha-diagnostics.png"
            alt="Нейтральное тематическое фото диагностики и механического сервиса"
            width={1200}
            height={800}
            className="h-full min-h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/28 to-transparent" aria-hidden />
          <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/14 bg-steel-950/72 p-4 text-white backdrop-blur">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-signal-300">Подход к ремонту</p>
            <p className="mt-2 text-sm leading-6 text-steel-200">Сначала понять причину, затем согласовать работы.</p>
          </div>
        </div>

        <div>
          <SectionHeading
            id="price-title"
            tone="light"
            eyebrow="Честный подход к цене"
            title="Сначала объясняем проблему - потом согласовываем ремонт"
            text="В отзывах клиенты часто отмечают, что в “Катюше” не навязывают лишние услуги, объясняют причину неисправности и предлагают адекватное решение. Итоговая стоимость зависит от состояния автомобиля, сложности работ и запчастей."
          />
          <div className="mt-7 grid gap-3">
            {priceNotes.map((note) => (
              <div key={note} className="metal-panel flex items-center gap-3 rounded-lg p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-signal-300" aria-hidden />
                <p className="font-bold text-steel-100">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function ReviewsSection() {
  return (
    <MotionSection id="reviews" className="section-pad bg-steel-950" ariaLabelledby="reviews-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            id="reviews-title"
            tone="light"
            eyebrow="Отзывы клиентов"
            title="Социальное доказательство без выдуманных обещаний"
            text="Краткие смысловые выдержки из отзывов: про честность, объяснения, кузовные работы, электрику, механику и вежливое общение."
          />
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/16 bg-white/8 px-5 py-3 text-sm font-extrabold text-white transition-colors hover:border-signal-300/60 hover:bg-white/12"
          >
            Посмотреть отзывы на Яндекс.Картах
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
        <div className="mt-8 rounded-lg border border-signal-300/30 bg-signal-400/12 p-5 text-white md:p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-signal-300 text-signal-300" aria-hidden />
              ))}
            </div>
            <p className="text-lg font-extrabold">
              {business.rating} · {business.ratingsCount} оценки · {business.reviewsCount} отзыва
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviewSnippets.map((review) => (
            <MotionCard key={review} className="metal-panel text-white">
              <p className="leading-7 text-steel-200">{review}</p>
            </MotionCard>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function CarsSection() {
  return (
    <MotionSection className="section-pad light-industrial-surface" ariaLabelledby="cars-title">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            id="cars-title"
            eyebrow="Автомобили"
            title="Работаем с разными марками автомобилей"
            text="В карточке сервиса указаны отечественные, европейские, японские, корейские, китайские, коммерческие и грузовые автомобили. Если сомневаетесь, подходит ли ваш автомобиль - уточните по телефону или в заявке."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {carTypes.map((type) => (
              <div key={type} className="light-glass-panel rounded-lg p-4 text-center font-extrabold text-steel-900">
                {type}
              </div>
            ))}
          </div>
        </div>
        <ButtonLink href="#lead" className="mt-7" variant="light" icon={CarFront}>
          Уточнить по моей модели
        </ButtonLink>
      </div>
    </MotionSection>
  );
}

function AddressSection() {
  return (
    <MotionSection id="contacts" className="section-pad border-y border-white/10 bg-steel-950" ariaLabelledby="contacts-title">
      <div className="container-page grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div>
          <SectionHeading
            id="contacts-title"
            tone="light"
            eyebrow="Адрес и график"
            title="Найти сервис должно быть проще, чем искать въезд"
            text="Главный ориентир для приезда - ворота 6Д на ул. Машиностроителей, 44Д в Подольске."
          />
          <div className="mt-7 grid gap-3">
            <InfoRow icon={MapPinned} title="Адрес" text={business.addressShort} />
            <InfoRow icon={Navigation} title="Ориентир" text={business.landmark} />
            <InfoRow icon={Phone} title="Телефон" text={business.phoneFormatted} href={`tel:${business.phone}`} />
            <InfoRow icon={Clock3} title="График" text={`${business.schedule.weekdays}; ${business.schedule.sunday}`} />
            <InfoRow icon={CreditCard} title="Оплата картой" text="доступна" />
            <InfoRow icon={Accessibility} title="Доступность входа на инвалидной коляске" text="доступно" />
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`tel:${business.phone}`} icon={Phone} ariaLabel={`Позвонить ${business.phoneFormatted}`}>
              Позвонить
            </ButtonLink>
            <ButtonLink href={business.mapsUrl} variant="secondary" icon={Navigation} external>
              Построить маршрут
            </ButtonLink>
          </div>
        </div>

        <div className="glass-panel flex min-h-[420px] flex-col justify-between rounded-xl p-6">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-signal-300">Яндекс.Карты</p>
            <h3 className="mt-4 text-3xl font-black leading-tight text-white">{business.addressFull}</h3>
            <p className="mt-4 max-w-md leading-7 text-steel-200">
              Для маршрута используется карточка на Яндекс.Картах. Координаты на сайт не добавлены, потому что во входных данных их нет.
            </p>
          </div>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-steel-950 transition-colors hover:bg-signal-100"
          >
            Открыть в Яндекс.Картах
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </MotionSection>
  );
}

function LeadSection() {
  return (
    <MotionSection id="lead" className="section-pad bg-steel-950" ariaLabelledby="lead-title">
      <div className="container-page grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <SectionHeading
            id="lead-title"
            tone="light"
            eyebrow="Запись"
            title="Опишите проблему - с вами свяжутся для записи"
            text="Форма короткая: имя, телефон, автомобиль, проблема и удобный способ связи. После отправки сервис уточнит детали и время."
          />
          <div className="mt-6 rounded-lg border border-katyusha-300/25 bg-katyusha-500/12 p-4 text-sm leading-6 text-katyusha-100">
            Если форма не отправилась, позвоните напрямую:{" "}
            <a href={`tel:${business.phone}`} className="font-extrabold underline-offset-4 hover:underline">
              {business.phoneFormatted}
            </a>
            .
          </div>
        </div>
        <LeadForm />
      </div>
    </MotionSection>
  );
}

function FAQSection() {
  return (
    <MotionSection className="section-pad bg-steel-950" ariaLabelledby="faq-title">
      <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-title"
          tone="light"
          eyebrow="FAQ"
          title="Коротко о записи, цене, кузове и адресе"
          text="Ответы основаны только на данных карточки и отзывах."
        />
        <FAQ />
      </div>
    </MotionSection>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-steel-950 py-10 text-white">
      <div className="container-page grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xl font-extrabold">Катюша</p>
          <p className="mt-2 text-sm leading-6 text-steel-300">
            Автосервис в Подольске: ремонт авто, кузовной ремонт, покраска авто, развал-схождение,
            ремонт двигателя, ходовой, генераторов, стартеров и замена масла.
          </p>
          <p className="mt-3 text-sm font-bold text-steel-300">Не является публичной офертой.</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm font-bold text-steel-200 md:text-right" aria-label="Юридические документы">
          <Link href="/privacy" className="hover:text-white">
            Политика обработки персональных данных
          </Link>
          <Link href="/personal-data-consent" className="hover:text-white">
            Согласие на обработку персональных данных
          </Link>
          <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-white">
            Карточка на Яндекс.Картах
          </a>
        </nav>
      </div>
    </footer>
  );
}

function InfoRow({
  icon: Icon,
  title,
  text,
  href
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="metal-panel flex items-start gap-4 rounded-lg p-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-signal-300" aria-hidden />
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.1em] text-steel-400">{title}</p>
        <p className="mt-1 font-extrabold text-white">{text}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="cursor-pointer transition-opacity hover:opacity-85">
        {content}
      </a>
    );
  }

  return content;
}

function PaintIcon(props: { className?: string; "aria-hidden"?: boolean }) {
  return <CarFront {...props} />;
}
