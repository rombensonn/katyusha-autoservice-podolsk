import Image from "next/image";
import { Camera, Gauge, PaintBrush } from "@phosphor-icons/react/dist/ssr";
import { sitePath } from "@/lib/site-path";

const photos = [
  {
    title: "Индустриальная зона сервиса",
    text: "Иллюстрация рабочей зоны, где автомобиль принимают, осматривают и объясняют задачу.",
    src: sitePath("/images/katyusha-industrial-hero.png"),
    alt: "Нейтральная индустриальная фотография автосервисной зоны",
    icon: Camera
  },
  {
    title: "Диагностика и механика",
    text: "Иллюстрация диагностики, инструмента и поиска причины неисправности.",
    src: sitePath("/images/katyusha-diagnostics.png"),
    alt: "Нейтральная фотография диагностики и инструментов в автосервисе",
    icon: Gauge
  },
  {
    title: "Кузовной ремонт",
    text: "Иллюстрация подготовки кузовного элемента к ремонту, покраске и полировке.",
    src: sitePath("/images/katyusha-body-repair.png"),
    alt: "Нейтральная фотография кузовного ремонта и подготовки к покраске",
    icon: PaintBrush
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
            className="group bezel-shell relative min-h-72 overflow-hidden p-1"
          >
            <div className="bezel-core relative min-h-72 overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="image-grade object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/52 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-steel-950/70 text-signal-200">
                  <Icon className="h-5 w-5" weight="duotone" aria-hidden />
                </div>
                <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-steel-200">{item.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
