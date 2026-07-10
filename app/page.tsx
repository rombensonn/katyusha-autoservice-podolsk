import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import {
  ArrowSquareOut,
  CalendarCheck,
  CarProfile,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  NavigationArrow,
  PaintBrush,
  Phone,
  Star,
  Wheelchair
} from "@phosphor-icons/react/dist/ssr";
import { FAQ } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { MotionCard, MotionSection } from "@/components/motion-section";
import { PhotoPlaceholders } from "@/components/photo-placeholders";
import { ServiceModel3D, type ServiceModelVariant } from "@/components/service-model-3d";
import { SiteHeader } from "@/components/site-header";
import { SmoothScrollShell } from "@/components/smooth-scroll-shell";
import { Badge, ButtonLink, SectionHeading } from "@/components/ui";
import { getServicePageByGroupTitle } from "@/lib/service-pages";
import { sitePath } from "@/lib/site-path";
import {
  bodyRepairItems,
  business,
  carTypes,
  priceNotes,
  processSteps,
  quickFacts,
  reviews,
  serviceGroups
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<IconProps>;

const yandexMapWidgetUrl =
  "https://yandex.ru/map-widget/v1/?ll=37.581335%2C55.411363&mode=search&oid=242675947070&ol=biz&z=17";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <SmoothScrollShell className="industrial-surface overflow-hidden pb-24 text-white md:pb-0">
        <Hero />
        <ReputationRail />
        <ServicesSection />
        <GallerySection />
        <BodyRepairSection />
        <ProcessSection />
        <PriceSection />
        <ReviewsSection />
        <CarsSection />
        <AddressSection />
        <LeadSection />
        <FAQSection />
        <SiteFooter />
      </SmoothScrollShell>
      <MobileStickyCta />
    </>
  );
}

function Hero() {
  return (
    <section id="top" data-scroll-section className="relative min-h-[88dvh] overflow-hidden border-b border-white/10 pt-24 md:min-h-[92dvh]">
      <Image
        src={sitePath("/images/katyusha-industrial-hero.png")}
        alt="Иллюстрация индустриальной зоны автосервиса с автомобилем на подъёмнике"
        fill
        priority
        sizes="100vw"
        className="image-grade object-cover object-[64%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,13,16,0.96),rgba(9,13,16,0.82)_42%,rgba(9,13,16,0.38)),linear-gradient(180deg,rgba(9,13,16,0.25),rgba(9,13,16,0.92))]" aria-hidden />

      <div className="container-page relative grid min-h-[calc(88dvh-6rem)] gap-8 pb-12 md:min-h-[calc(92dvh-6rem)] lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
        <div className="max-w-4xl">
          <Badge>{business.rating} на Яндекс.Картах, {business.ratingsCount} оценки</Badge>
          <h1 className="mt-6 max-w-4xl text-balance text-[3rem] font-black leading-[0.96] text-white sm:text-6xl lg:text-[4rem]">
            Автосервис “Катюша” в Подольске
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-extrabold leading-7 text-steel-100 sm:text-xl">
            Диагностика, ремонт и кузовные работы: объясняем причину, согласовываем объём, не давим лишними услугами.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#lead" icon={CalendarCheck}>
              Записаться
            </ButtonLink>
            <ButtonLink href={`tel:${business.phone}`} variant="secondary" icon={Phone} ariaLabel={`Позвонить ${business.phoneFormatted}`}>
              Позвонить
            </ButtonLink>
          </div>
        </div>

        <aside className="bezel-shell hidden lg:block" data-scroll data-scroll-speed="-0.35">
          <div className="bezel-core overflow-hidden">
            <div className="relative h-56">
              <Image
                src={sitePath("/images/katyusha-diagnostics.png")}
                alt="Иллюстрация диагностики автомобиля в сервисной зоне"
                fill
                sizes="430px"
                className="image-grade object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/24 to-transparent" aria-hidden />
            </div>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-signal-300/25 bg-signal-300/12 text-signal-200">
                  <MapPin className="h-5 w-5" weight="duotone" aria-hidden />
                </span>
                <div>
                  <p className="font-black text-white">{business.addressFull}</p>
                  <p className="mt-1 text-sm leading-6 text-steel-300">Ориентир: {business.landmark}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniFact label="График" value="каждый день" />
                <MiniFact label="Оплата" value="картой" />
              </div>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-3 text-sm font-extrabold text-white transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-signal-300/50 hover:bg-white/12"
              >
                Маршрут
                <NavigationArrow className="h-4 w-4" weight="bold" aria-hidden />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ReputationRail() {
  return (
    <MotionSection className="relative z-10 -mt-8 pb-12" ariaLabelledby="reputation-title">
      <div className="container-page">
        <div className="bezel-shell">
          <div className="bezel-core grid overflow-hidden md:grid-cols-4">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;

              return (
                <div key={fact.label} className="border-b border-white/10 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <Icon className="h-6 w-6 text-signal-300" weight="duotone" aria-hidden />
                  <p className="mono-label mt-5 text-[0.7rem] font-bold text-steel-400">{fact.label}</p>
                  <p className="mt-2 text-lg font-black text-white">{fact.value}</p>
                </div>
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
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="services-title"
            tone="light"
            eyebrow="Сервисные модули"
            title="Услуги собраны по реальным задачам"
            text="Каждое направление помогает быстро понять, с чем приехать: плановое обслуживание, мотор, ходовая, электрика, кузов или выхлоп."
          />
          <ButtonLink href="#lead" className="w-fit" icon={CarProfile}>
            Записаться
          </ButtonLink>
        </div>

        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceGroups.map((group, index) => (
            <ServiceCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function ServiceCard({
  group,
  index
}: {
  group: (typeof serviceGroups)[number];
  index: number;
}) {
  const Icon = group.icon;
  const model = getServiceModelVariant(index);
  const servicePage = getServicePageByGroupTitle(group.title);
  const href = servicePage ? `/services/${servicePage.slug}` : "#lead";

  return (
    <MotionCard className="bezel-shell h-full border-white/10 bg-white/5 p-1">
      <Link href={href} className="block h-full cursor-pointer rounded-[calc(2rem-0.375rem)] focus-visible:outline-signal-300">
        <div className="bezel-core flex h-full min-h-[520px] flex-col overflow-hidden p-4 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.035] sm:p-5">
          <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045] sm:h-48">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,201,71,0.16),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" aria-hidden />
            <ServiceModel3D
              variant={model}
              className="relative z-10 h-full w-full max-w-[285px] opacity-95"
              sizes="(min-width: 1280px) 285px, (min-width: 768px) 240px, 220px"
            />
          </div>

          <div className="mt-5 flex min-h-0 flex-1 flex-col">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-signal-300/25 bg-signal-300/12 text-signal-200">
              <Icon className="h-6 w-6" weight="duotone" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-black leading-tight text-white">{group.title}</h3>
            <p className="mt-4 text-sm leading-6 text-steel-300">{group.description}</p>

            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
              {group.services.slice(0, 5).map((service) => (
                <li key={service} className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-sm font-bold text-steel-200">
                  {service}
                </li>
              ))}
            </ul>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-signal-200">
              Подробнее об услуге
              <ArrowSquareOut className="h-4 w-4" weight="bold" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </MotionCard>
  );
}

function GallerySection() {
  const galleryPhotos = [
    {
      src: "/images/yandex-gallery/katyusha-interior-wide.jpg",
      alt: "Рабочая зона автосервиса Катюша с подъёмниками и автомобилями",
      title: "Рабочая зона",
      className: "md:col-span-2 md:row-span-2"
    },
    {
      src: "/images/yandex-gallery/katyusha-yard.jpg",
      alt: "Въезд и фасад автосервиса Катюша в Подольске",
      title: "Въезд",
      className: ""
    },
    {
      src: "/images/yandex-gallery/katyusha-lift-red-car.jpg",
      alt: "Красный автомобиль на подъёмнике в сервисном боксе",
      title: "Подъёмник",
      className: "md:row-span-2"
    },
    {
      src: "/images/yandex-gallery/katyusha-service-bay.jpg",
      alt: "Автомобили внутри сервисной зоны Катюша",
      title: "Бокс",
      className: ""
    },
    {
      src: "/images/yandex-gallery/katyusha-rear-body.jpg",
      alt: "Кузовная деталь автомобиля перед ремонтом",
      title: "Кузов",
      className: ""
    }
  ];

  return (
    <MotionSection className="section-pad bg-steel-950" ariaLabelledby="gallery-title">
      <div className="container-page">
        <SectionHeading id="gallery-title" tone="light" title="Фотографии с карточки сервиса" />

        <div className="mt-10 grid auto-rows-[190px] gap-4 md:grid-cols-4 md:auto-rows-[210px]">
          {galleryPhotos.map((photo) => (
            <figure key={photo.src} className={cn("group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045]", photo.className)}>
              <Image
                src={sitePath(photo.src)}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
                className="image-grade object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950/82 via-steel-950/16 to-transparent" aria-hidden />
              <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/12 bg-steel-950/68 px-4 py-2 text-sm font-extrabold text-white backdrop-blur-md">
                {photo.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function BodyRepairSection() {
  return (
    <MotionSection id="body" className="section-pad border-y border-white/10 bg-steel-950" ariaLabelledby="body-title">
      <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="bezel-shell" data-scroll data-scroll-speed="0.25">
          <div className="bezel-core relative min-h-[460px] overflow-hidden">
            <Image
              src={sitePath("/images/katyusha-body-repair.png")}
              alt="Иллюстрация кузовного ремонта и подготовки детали к покраске"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="image-grade object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/22 to-transparent" aria-hidden />
          </div>
        </div>

        <div>
          <SectionHeading
            id="body-title"
            tone="light"
            title="Кузовной ремонт без визуального компромисса"
            text="Бампер, крыло, покраска, полировка и восстановление после ДТП. Повреждение можно описать в заявке и приехать на осмотр."
          />
          <div className="mt-7 grid grid-cols-2 gap-3">
            {bodyRepairItems.slice(0, 6).map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/7 p-4 text-sm font-extrabold text-white">
                {item}
              </div>
            ))}
          </div>
          <ButtonLink href="#lead" className="mt-7" icon={PaintBrush}>
            Записаться
          </ButtonLink>
        </div>
      </div>
    </MotionSection>
  );
}

function ProcessSection() {
  return (
    <MotionSection className="section-pad light-industrial-surface" ariaLabelledby="process-title">
      <div className="container-page grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            id="process-title"
            tone="light"
            title="Понятный маршрут от заявки до выдачи"
            text="Процесс держится на согласовании. Сначала задача и диагностика, затем варианты ремонта и только потом выполнение работ."
          />
        </div>

        <div className="grid gap-4">
          {processSteps.map((step) => (
            <div key={step.title} className="bezel-shell">
              <div className="bezel-core flex flex-col gap-5 p-5 sm:flex-row sm:items-start">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-signal-300/25 bg-signal-300/12 text-signal-200">
                  <CheckCircle className="h-6 w-6" weight="duotone" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-black text-white">{step.title}</h3>
                  <p className="mt-2 leading-7 text-steel-300">{step.text}</p>
                </div>
              </div>
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
      <div className="container-page grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            id="price-title"
            tone="light"
            title="Сначала причина, потом стоимость"
            text="В отзывах часто отмечают честное объяснение неисправности и отсутствие лишнего давления. Итог зависит от состояния автомобиля, сложности и запчастей."
          />

          <div className="mt-8 grid gap-4">
            <div className="bezel-shell">
              <div className="bezel-core p-5">
                <CheckCircle className="h-6 w-6 text-signal-300" weight="duotone" aria-hidden />
                <p className="mt-5 text-2xl font-black leading-tight text-white">{priceNotes[0]}</p>
                <p className="mt-3 text-sm leading-6 text-steel-300">Работы обсуждаются до ремонта, чтобы не появлялись неожиданности при выдаче автомобиля.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
                <Phone className="h-6 w-6 text-signal-300" weight="duotone" aria-hidden />
                <p className="mt-5 font-black leading-6 text-white">{priceNotes[1]}</p>
              </div>

              <div className="rounded-[1.5rem] border border-signal-300/25 bg-signal-300/10 p-5">
                <CarProfile className="h-6 w-6 text-signal-200" weight="duotone" aria-hidden />
                <p className="mt-5 font-black leading-6 text-white">{priceNotes[2]}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 shrink-0 text-signal-300" weight="duotone" aria-hidden />
                <p className="font-black text-white">{priceNotes[3]}</p>
              </div>
              <p className="text-sm leading-6 text-steel-300">Удобно закрыть заказ на месте после согласования работ.</p>
            </div>
          </div>
        </div>

        <div className="bezel-shell" data-scroll data-scroll-speed="-0.2">
          <div className="bezel-core relative min-h-[440px] overflow-hidden">
            <Image
              src={sitePath("/images/katyusha-diagnostics.png")}
              alt="Иллюстрация диагностики и инструментов в автосервисе"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="image-grade object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/18 to-transparent" aria-hidden />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function ReviewsSection() {
  const [leadReview, ...secondaryReviews] = reviews;

  return (
    <MotionSection id="reviews" className="section-pad bg-steel-950" ariaLabelledby="reviews-title">
      <div className="container-page">
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="reviews-title"
            tone="light"
            title="Отзывы звучат спокойно и по делу"
            text="Клиенты чаще всего отмечают объяснения, сроки, кузовные работы, электрику, механику и вежливое общение."
          />
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-12 w-fit cursor-pointer items-center justify-center gap-3 rounded-full border border-white/16 bg-white/8 px-3 py-2 pl-6 text-sm font-extrabold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-signal-300/50 hover:bg-white/12 active:scale-[0.98]"
          >
            Отзывы на Яндекс.Картах
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-signal-200 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <ArrowSquareOut className="h-4 w-4" weight="bold" aria-hidden />
            </span>
          </a>
        </div>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="bezel-shell h-full">
            <div className="bezel-core flex h-full min-h-[340px] flex-col p-5">
              <div className="relative flex h-36 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,201,71,0.18),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" aria-hidden />
                <ServiceModel3D variant="rating" className="relative z-10 h-full w-full max-w-[230px] opacity-95" sizes="230px" />
              </div>
              <div className="mt-auto pt-7">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-signal-300 text-signal-300" weight="fill" aria-hidden />
                  ))}
                </div>
                <p className="text-6xl font-black text-white">{business.rating}</p>
                <p className="mt-3 text-lg font-extrabold text-steel-200">
                  {business.ratingsCount} оценки, {business.reviewsCount} отзыва
                </p>
              </div>
            </div>
          </div>
          <MotionCard className="bezel-shell h-full p-1">
            {leadReview ? <ReviewCard review={leadReview} variant="reviewDiagnostics" featured /> : null}
          </MotionCard>
        </div>

        <div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-2">
          {secondaryReviews.map((review, index) => (
            <MotionCard key={`${review.author}-${review.date}`} className="bezel-shell h-full p-1">
              <ReviewCard review={review} variant={getReviewModelVariant(index + 1)} />
            </MotionCard>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function ReviewCard({
  review,
  variant,
  featured = false
}: {
  review: (typeof reviews)[number];
  variant: ServiceModelVariant;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "bezel-core flex h-full min-h-[220px] flex-col gap-5 overflow-hidden p-5 sm:flex-row sm:items-center",
        featured && "min-h-[340px] gap-6 p-6"
      )}
    >
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045]",
          featured ? "h-48 w-full sm:h-56 sm:w-[280px]" : "h-32 w-full sm:h-36 sm:w-36"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,201,71,0.16),transparent_54%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" aria-hidden />
        <ServiceModel3D
          variant={variant}
          className={cn("relative z-10 h-full w-full opacity-95", featured ? "max-w-[280px]" : "max-w-[150px]")}
          sizes={featured ? "(min-width: 1024px) 280px, 240px" : "150px"}
        />
      </div>
      <div className="min-w-0">
        <p className={cn("leading-7 text-steel-200", featured ? "text-xl font-extrabold text-white" : "text-base")}>{review.text}</p>
        <div className="mt-5 grid gap-1 text-sm">
          <span className="font-extrabold text-white">{review.author}</span>
          <span className="text-steel-300">{review.date}</span>
        </div>
      </div>
    </div>
  );
}

function CarsSection() {
  return (
    <MotionSection className="section-pad light-industrial-surface" ariaLabelledby="cars-title">
      <div className="container-page">
        <SectionHeading
          id="cars-title"
          tone="light"
          title="Можно приехать с разной машиной"
          text="В карточке сервиса указаны отечественные, европейские, японские, корейские, китайские, коммерческие и грузовые автомобили."
        />
        <div className="no-scrollbar mt-9 flex snap-x gap-3 overflow-x-auto pb-2">
          {carTypes.map((type) => (
            <div key={type} className="snap-start rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-black text-white">
              {type}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <PhotoPlaceholders />
        </div>
      </div>
    </MotionSection>
  );
}

function AddressSection() {
  return (
    <MotionSection id="contacts" className="section-pad border-y border-white/10 bg-steel-950" ariaLabelledby="contacts-title">
      <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
        <div>
          <SectionHeading
            id="contacts-title"
            tone="light"
            title="Адрес должен считываться сразу"
            text="Главный ориентир для приезда: ворота 6Д на ул. Машиностроителей, 44Д в Подольске."
          />

          <div className="mt-7 grid gap-4">
            <ContactPrimaryCard />
            <ContactCallCard />
            <div className="grid gap-3 sm:grid-cols-3">
              <ContactMetaItem icon={Clock} title="График" text={`${business.schedule.weekdays}; ${business.schedule.sunday}`} />
              <ContactMetaItem icon={CreditCard} title="Оплата" text="Картой доступна" />
              <ContactMetaItem icon={Wheelchair} title="Доступность" text="Вход на коляске доступен" />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={business.mapsUrl} variant="secondary" icon={NavigationArrow} external>
              Маршрут
            </ButtonLink>
          </div>
        </div>

        <div className="bezel-shell min-h-[430px]">
          <div className="bezel-core h-full min-h-[430px] overflow-hidden">
            <iframe
              src={yandexMapWidgetUrl}
              title="Локация автосервиса Катюша на Яндекс.Картах"
              className="h-full min-h-[430px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function LeadSection() {
  return (
    <MotionSection id="lead" className="section-pad bg-steel-950" ariaLabelledby="lead-title">
      <div className="container-page grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            id="lead-title"
            tone="light"
            eyebrow="Запись"
            title="Опишите проблему, сервис свяжется"
            text="Форма короткая: имя, телефон, автомобиль, проблема и удобный способ связи. После отправки сервис уточнит детали и время."
          />
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
          title="Коротко о записи, цене, кузове и адресе"
          text="Ответы основаны только на данных карточки сервиса и отзывах."
        />
        <FAQ />
      </div>
    </MotionSection>
  );
}

function SiteFooter() {
  return (
    <footer data-scroll-section className="border-t border-white/10 bg-steel-950 py-10 text-white">
      <div className="container-page grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xl font-black">Катюша</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-steel-300">
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

function MiniFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/7 p-4">
      <p className="mono-label text-[0.68rem] font-bold text-steel-400">{label}</p>
      <p className="mt-2 font-black text-white">{value}</p>
    </div>
  );
}

function ContactPrimaryCard() {
  return (
    <div className="bezel-shell">
      <div className="bezel-core p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-signal-300/25 bg-signal-300/12 text-signal-200">
            <MapPin className="h-6 w-6" weight="duotone" aria-hidden />
          </span>
          <div>
            <p className="mono-label text-[0.68rem] font-bold text-steel-400">Адрес</p>
            <p className="mt-2 text-2xl font-black leading-tight text-white">{business.addressShort}</p>
            <p className="mt-3 text-sm leading-6 text-steel-300">Ориентир для въезда: {business.landmark}.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCallCard() {
  return (
    <a href={`tel:${business.phone}`} className="group block cursor-pointer">
      <div className="bezel-shell">
        <div className="bezel-core flex items-center justify-between gap-4 p-5 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.045]">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-signal-200">
              <Phone className="h-6 w-6" weight="duotone" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="mono-label text-[0.68rem] font-bold text-steel-400">Телефон</p>
              <p className="mt-2 text-xl font-black text-white">{business.phoneFormatted}</p>
            </div>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal-300 text-steel-950 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
            <NavigationArrow className="h-5 w-5" weight="bold" aria-hidden />
          </span>
        </div>
      </div>
    </a>
  );
}

function ContactMetaItem({ icon: Icon, title, text }: { icon: IconComponent; title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4">
      <Icon className="h-5 w-5 text-signal-300" weight="duotone" aria-hidden />
      <p className="mono-label mt-4 text-[0.68rem] font-bold text-steel-400">{title}</p>
      <p className="mt-2 text-sm font-extrabold leading-6 text-white">{text}</p>
    </div>
  );
}

function getServiceModelVariant(index: number): ServiceModelVariant {
  const variants: ServiceModelVariant[] = ["maintenance", "engine", "chassis", "electrical", "body", "exhaust"];
  return variants[index] ?? "maintenance";
}

function getReviewModelVariant(index: number): ServiceModelVariant {
  const variants: ServiceModelVariant[] = [
    "reviewSpeed",
    "reviewBody",
    "reviewAppointment",
    "reviewElectric",
    "reviewClean",
    "reviewDiagnostics"
  ];
  return variants[index - 1] ?? "reviewClean";
}
