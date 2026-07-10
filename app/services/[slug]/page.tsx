import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowSquareOut,
  CalendarCheck,
  CheckCircle,
  ClipboardText,
  ListChecks,
  MapPin,
  Phone,
  Question,
  ShieldCheck,
  WarningCircle,
  Wrench
} from "@phosphor-icons/react/dist/ssr";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { MotionCard, MotionSection } from "@/components/motion-section";
import { ServiceModel3D } from "@/components/service-model-3d";
import { SiteHeader } from "@/components/site-header";
import { SmoothScrollShell } from "@/components/smooth-scroll-shell";
import { Badge, ButtonLink, SectionHeading } from "@/components/ui";
import { getServicePageBySlug, servicePages } from "@/lib/service-pages";
import { business } from "@/lib/site-data";
import { sitePath } from "@/lib/site-path";
import { cn } from "@/lib/utils";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rombensonn.github.io/katyusha-autoservice-podolsk").replace(/\/$/, "");

export function generateStaticParams() {
  return servicePages.map((page) => ({
    slug: page.slug
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);

  if (!page) {
    return {};
  }

  const canonical = `/services/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
      siteName: "Автосервис Катюша",
      locale: "ru_RU",
      type: "article",
      images: [
        {
          url: `${siteUrl}${page.heroImage}`,
          width: 1200,
          height: 675,
          alt: page.heroImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [`${siteUrl}${page.heroImage}`]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);

  if (!page) {
    notFound();
  }

  const serviceUrl = `${siteUrl}/services/${page.slug}`;
  const relatedPages = page.related
    .map((relatedSlug) => getServicePageBySlug(relatedSlug))
    .filter((relatedPage): relatedPage is NonNullable<typeof relatedPage> => Boolean(relatedPage));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.groupTitle,
    description: page.metaDescription,
    url: serviceUrl,
    provider: {
      "@type": "AutoRepair",
      name: business.name,
      telephone: business.phoneFormatted,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Машиностроителей, 44Д",
        addressLocality: "Подольск",
        addressCountry: "RU"
      }
    },
    areaServed: [
      {
        "@type": "City",
        name: "Подольск"
      },
      {
        "@type": "AdministrativeArea",
        name: "Московская область"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: page.groupTitle,
      itemListElement: page.included.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.text
        },
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        url: serviceUrl
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Услуги",
        item: `${siteUrl}/#services`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.groupTitle,
        item: serviceUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <SiteHeader hrefPrefix="/" />
      <SmoothScrollShell className="industrial-surface overflow-hidden pb-24 text-white md:pb-0">
        <JsonLd data={[serviceSchema, breadcrumbSchema, faqSchema]} />
        <section id="top" data-scroll-section className="relative overflow-hidden border-b border-white/10 pt-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(255,201,71,0.09),transparent_28rem)]" aria-hidden />
          <div className="container-page relative grid gap-12 py-8 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center lg:gap-14 lg:py-10">
            <div className="service-hero-copy max-w-[760px] lg:-mt-8">
              <div className="flex flex-wrap items-center gap-3 text-sm font-extrabold">
                <Link
                  href="/#services"
                  className="group inline-flex cursor-pointer items-center gap-2 text-steel-300 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/[0.055] transition-colors duration-500 group-hover:border-signal-300/45 group-hover:bg-white/10">
                    <ArrowLeft className="h-4 w-4" weight="bold" aria-hidden />
                  </span>
                  Все услуги
                </Link>
                <span className="h-4 w-px bg-white/14" aria-hidden />
                <span className="text-signal-200">{page.eyebrow} в Подольске</span>
              </div>
              <h1 className="mt-8 max-w-[760px] text-balance text-[2.75rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.1rem] xl:text-[3.25rem]">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-[58ch] text-base font-semibold leading-7 text-steel-200 sm:text-lg">
                {page.heroLead}
              </p>
              <div className="mt-8 hidden flex-col gap-3 md:flex md:flex-row">
                <ButtonLink href="/#lead" icon={CalendarCheck}>
                  Записаться
                </ButtonLink>
                <ButtonLink href={`tel:${business.phone}`} variant="secondary" icon={Phone} ariaLabel={`Позвонить ${business.phoneFormatted}`}>
                  Позвонить
                </ButtonLink>
              </div>
            </div>

            <aside
              className="service-hero-visual relative isolate overflow-hidden rounded-[2rem] border border-white/12 bg-steel-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_32px_90px_rgba(3,7,10,0.38)] lg:translate-y-4"
              data-scroll
              data-scroll-speed="-0.14"
            >
              <div className="relative flex h-[350px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_44%,rgba(255,201,71,0.18),transparent_39%),linear-gradient(155deg,rgba(255,255,255,0.075),transparent_56%)] sm:h-[420px] lg:h-[430px]">
                <div className="absolute bottom-10 left-1/2 h-10 w-56 -translate-x-1/2 rounded-full bg-signal-300/9 blur-3xl" aria-hidden />
                <ServiceModel3D
                  variant={page.model}
                  priority
                  animated={false}
                  className="relative z-10 h-full w-full max-w-[350px] opacity-100 sm:max-w-[400px] lg:max-w-[410px]"
                  sizes="(min-width: 1024px) 390px, (min-width: 640px) 400px, 350px"
                />
              </div>
              <div className="grid grid-cols-[1.18fr_0.82fr] divide-x divide-white/10 border-t border-white/10 bg-steel-950/58">
                <HeroFact label="Адрес" value={business.addressShort} icon={MapPin} />
                <HeroFact label="Рейтинг" value={`${business.rating}, ${business.ratingsCount} оценки`} icon={ShieldCheck} />
              </div>
            </aside>
          </div>
        </section>

        <MotionSection className="section-pad bg-steel-950" ariaLabelledby="service-answer-title">
          <div className="container-page grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="service-answer-title"
                tone="light"
                eyebrow="Короткий ответ"
                title="Когда эта услуга действительно нужна"
                text={page.intro.join(" ")}
              />
            </div>

            <div className="grid gap-4">
              <div className="bezel-shell">
                <div className="bezel-core p-5 sm:p-6">
                  <ClipboardText className="h-7 w-7 text-signal-300" weight="duotone" aria-hidden />
                  <p className="mt-5 text-2xl font-black leading-tight text-white">{page.answer}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {page.whenToVisit.map((item) => (
                  <ReasonCard key={item} text={item} />
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="section-pad light-industrial-surface" ariaLabelledby="symptoms-title">
          <div className="container-page">
            <SectionHeading
              id="symptoms-title"
              tone="light"
              eyebrow="Симптомы"
              title="По каким признакам пора записаться"
              text="Эти признаки не являются диагнозом, но помогают мастеру быстрее понять направление проверки."
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.symptoms.map((symptom, index) => (
                <MotionCard key={symptom} className="bezel-shell h-full border-white/10 bg-white/5 p-1">
                  <div className="bezel-core flex h-full min-h-[132px] flex-col justify-between p-5">
                    <span className="mono-label text-[0.68rem] font-bold text-steel-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-5 text-lg font-black leading-tight text-white">{symptom}</p>
                  </div>
                </MotionCard>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="section-pad border-y border-white/10 bg-steel-950" ariaLabelledby="included-title">
          <div className="container-page grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
            <SectionHeading
              id="included-title"
              tone="light"
              eyebrow="Состав работ"
              title="Что входит в направление"
              text="Список не означает, что автомобилю сразу нужны все работы. Он показывает, какие задачи закрывает это направление и что обсуждается после осмотра."
            />
            <div className="grid gap-4">
              {page.included.map((item, index) => (
                <div key={item.title} className={cn("bezel-shell", index % 2 === 1 && "lg:ml-12")}>
                  <div className="bezel-core grid gap-5 p-5 sm:grid-cols-[64px_minmax(0,1fr)] sm:p-6">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-signal-300/25 bg-signal-300/12 text-signal-200">
                      <Wrench className="h-7 w-7" weight="duotone" aria-hidden />
                    </span>
                    <div>
                      <h2 className="text-2xl font-black leading-tight text-white">{item.title}</h2>
                      <p className="mt-3 leading-7 text-steel-300">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="section-pad light-industrial-surface" ariaLabelledby="visual-explainer-title">
          <div className="container-page">
            <div className="bezel-shell">
              <div className="bezel-core grid gap-8 overflow-hidden p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <figure className="relative min-h-[300px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] sm:min-h-[390px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(255,201,71,0.2),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" aria-hidden />
                  <Image
                    src={sitePath(page.visualExplainer.image)}
                    alt={page.visualExplainer.alt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-contain p-5 drop-shadow-[0_28px_54px_rgba(0,0,0,0.34)] sm:p-8"
                  />
                </figure>

                <div>
                  <Badge>3D-разбор</Badge>
                  <h2 id="visual-explainer-title" className="mt-6 text-balance text-[2.25rem] font-black leading-[1] text-white md:text-5xl">
                    {page.visualExplainer.title}
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-steel-200">{page.visualExplainer.text}</p>
                  <ul className="mt-7 grid gap-3">
                    {page.visualExplainer.points.map((point) => (
                      <li key={point} className="flex gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-4">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-signal-300" weight="duotone" aria-hidden />
                        <span className="font-extrabold leading-6 text-white">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="section-pad bg-steel-950" ariaLabelledby="diagnostics-title">
          <div className="container-page">
            <SectionHeading
              id="diagnostics-title"
              tone="light"
              eyebrow="Диагностика"
              title="Как сервис подходит к причине"
              text="Сначала важно понять причину и риски, затем согласовать объём работ именно для этого автомобиля."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {page.diagnostics.map((item) => (
                <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5">
                  <ListChecks className="h-7 w-7 text-signal-300" weight="duotone" aria-hidden />
                  <h2 className="mt-6 text-xl font-black leading-tight text-white">{item.title}</h2>
                  <p className="mt-3 leading-7 text-steel-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="section-pad light-industrial-surface" ariaLabelledby="process-title">
          <div className="container-page grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="process-title"
                tone="light"
                eyebrow="Процесс"
                title="Как проходит работа"
                text="Страница помогает заранее понять маршрут: от описания симптомов до согласования работ и проверки результата."
              />
            </div>
            <ol className="grid gap-4">
              {page.process.map((step, index) => (
                <li key={step.title} className="bezel-shell">
                  <div className="bezel-core flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-signal-300 text-lg font-black text-steel-950">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-2xl font-black leading-tight text-white">{step.title}</h2>
                      <p className="mt-3 leading-7 text-steel-300">{step.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </MotionSection>

        <MotionSection className="section-pad border-y border-white/10 bg-steel-950" ariaLabelledby="important-title">
          <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <SectionHeading
              id="important-title"
              tone="light"
              eyebrow="Важно знать"
              title="Что лучше не откладывать"
              text="Эти блоки закрывают частые сомнения: можно ли ездить дальше, с чего начать и почему простой симптом иногда приводит к большему ремонту."
            />
            <div className="grid gap-4">
              {page.important.map((item) => (
                <div key={item.title} className="rounded-[1.75rem] border border-signal-300/20 bg-signal-300/10 p-5">
                  <WarningCircle className="h-7 w-7 text-signal-200" weight="duotone" aria-hidden />
                  <h2 className="mt-5 text-xl font-black leading-tight text-white">{item.title}</h2>
                  <p className="mt-3 leading-7 text-steel-200">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="section-pad bg-steel-950" ariaLabelledby="faq-title">
          <div className="container-page grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionHeading
              id="faq-title"
              tone="light"
              eyebrow="FAQ"
              title="Частые вопросы по услуге"
              text="Собрали ответы на вопросы, которые чаще всего появляются перед записью и осмотром."
            />
            <div className="grid gap-3">
              {page.faq.map((item) => (
                <details key={item.question} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-lg font-black leading-tight text-white">
                    {item.question}
                    <Question className="mt-0.5 h-5 w-5 shrink-0 text-signal-300 transition-transform duration-500 group-open:rotate-12" weight="duotone" aria-hidden />
                  </summary>
                  <p className="mt-4 leading-7 text-steel-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="section-pad light-industrial-surface" ariaLabelledby="related-title">
          <div className="container-page">
            <div className="bezel-shell">
              <div className="bezel-core grid gap-8 overflow-hidden p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <Badge>{business.addressFull}</Badge>
                  <h2 id="related-title" className="mt-6 text-balance text-[2.35rem] font-black leading-[1] text-white md:text-5xl">
                    {page.ctaTitle}
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-steel-200">{page.ctaText}</p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="/#lead" icon={CalendarCheck}>
                      Оставить заявку
                    </ButtonLink>
                    <a
                      href={`tel:${business.phone}`}
                      className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-full border border-white/16 bg-white/9 px-3 py-2 pl-6 text-sm font-extrabold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-signal-300/50 hover:bg-white/13 active:scale-[0.98]"
                    >
                      <span className="whitespace-nowrap">Позвонить</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-signal-200">
                        <Phone className="h-4 w-4" weight="bold" aria-hidden />
                      </span>
                    </a>
                  </div>
                </div>

                <div className="grid gap-3">
                  <p className="mono-label text-[0.68rem] font-bold text-steel-400">Связанные услуги</p>
                  {relatedPages.map((relatedPage) => (
                    <Link
                      key={relatedPage.slug}
                      href={`/services/${relatedPage.slug}`}
                      className="group flex cursor-pointer items-center justify-between gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4 text-white transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-signal-300/35 hover:bg-white/[0.075]"
                    >
                      <span className="font-black leading-tight">{relatedPage.groupTitle}</span>
                      <ArrowSquareOut className="h-5 w-5 shrink-0 text-signal-300 transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-0.5" weight="bold" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <ServiceFooter />
      </SmoothScrollShell>
      <MobileStickyCta href="/#lead" />
    </>
  );
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function HeroFact({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: typeof MapPin;
}) {
  return (
    <div className="min-w-0 p-5 sm:p-6">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-signal-300/20 bg-signal-300/10 text-signal-300">
        <Icon className="h-[1.125rem] w-[1.125rem]" weight="duotone" aria-hidden />
      </span>
      <p className="mono-label mt-5 text-[0.68rem] font-bold text-steel-400">{label}</p>
      <p className="mt-2 text-sm font-black leading-5 text-white">{value}</p>
    </div>
  );
}

function ReasonCard({ text }: { text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
      <CheckCircle className="h-6 w-6 text-signal-300" weight="duotone" aria-hidden />
      <p className="mt-5 font-extrabold leading-7 text-white">{text}</p>
    </div>
  );
}

function ServiceFooter() {
  return (
    <footer data-scroll-section className="border-t border-white/10 bg-steel-950 py-10 text-white">
      <div className="container-page grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xl font-black">Катюша</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-steel-300">
            Автосервис в Подольске: обслуживание, диагностика, ремонт авто, кузовные работы, электрика,
            ходовая, тормоза, двигатель и выхлопная система.
          </p>
          <p className="mt-3 text-sm font-bold text-steel-300">Не является публичной офертой.</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm font-bold text-steel-200 md:text-right" aria-label="Навигация по сайту">
          <Link href="/#services" className="hover:text-white">
            Все услуги
          </Link>
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
