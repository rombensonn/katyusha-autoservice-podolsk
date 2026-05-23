import Image from "next/image";
import { Camera, Gauge, Paintbrush } from "lucide-react";
import { sitePath } from "@/lib/site-path";

const photos = [
  {
    title: "Индустриальная зона сервиса",
    text: "Нейтральное тематическое фото для визуального языка сайта. Реальные фото сервиса можно поставить вместо него.",
    src: sitePath("/images/katyusha-industrial-hero.png"),
    alt: "Нейтральная индустриальная фотография автосервисной зоны",
    icon: Camera
  },
  {
    title: "Диагностика и механика",
    text: "Тематический кадр про поиск неисправностей, инструменты и работу с автомобилем.",
    src: sitePath("/images/katyusha-diagnostics.png"),
    alt: "Нейтральная фотография диагностики и инструментов в автосервисе",
    icon: Gauge
  },
  {
    title: "Кузовной ремонт",
    text: "Тематическое фото про подготовку кузовного элемента к ремонту и покраске.",
    src: sitePath("/images/katyusha-body-repair.png"),
    alt: "Нейтральная фотография кузовного ремонта и подготовки к покраске",
    icon: Paintbrush
  }
];

export function PhotoPlaceholders() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {photos.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group relative min-h-72 overflow-hidden rounded-lg border border-white/12 bg-steel-900 shadow-card"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/48 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-white/14 bg-white/10 text-signal-200 backdrop-blur">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-steel-200">{item.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
