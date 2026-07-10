import Image from "next/image";
import { sitePath } from "@/lib/site-path";
import { cn } from "@/lib/utils";

export type ServiceModelVariant =
  | "maintenance"
  | "engine"
  | "chassis"
  | "electrical"
  | "body"
  | "exhaust"
  | "rating"
  | "reviewDiagnostics"
  | "reviewSpeed"
  | "reviewBody"
  | "reviewAppointment"
  | "reviewElectric"
  | "reviewClean";

type ServiceModel3DProps = {
  variant: ServiceModelVariant;
  className?: string;
  priority?: boolean;
  sizes?: string;
  animated?: boolean;
};

const assetByVariant: Record<ServiceModelVariant, string> = {
  maintenance: "/images/3d/service-maintenance.webp",
  engine: "/images/3d/service-engine.webp",
  chassis: "/images/3d/service-chassis.webp",
  electrical: "/images/3d/service-electrical.webp",
  body: "/images/3d/service-body.webp",
  exhaust: "/images/3d/service-exhaust.webp",
  rating: "/images/3d/service-rating.png",
  reviewDiagnostics: "/images/3d/review-diagnostics.png",
  reviewSpeed: "/images/3d/review-speed.png",
  reviewBody: "/images/3d/review-body.png",
  reviewAppointment: "/images/3d/review-appointment.png",
  reviewElectric: "/images/3d/review-electric.png",
  reviewClean: "/images/3d/review-clean.png"
};

export function ServiceModel3D({
  variant,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 320px, 220px",
  animated = true
}: ServiceModel3DProps) {
  return (
    <div className={cn("model3d", className)} aria-hidden="true">
      <Image
        src={sitePath(assetByVariant[variant])}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={cn("model3d-img object-contain", !animated && "model3d-img-static")}
      />
    </div>
  );
}
