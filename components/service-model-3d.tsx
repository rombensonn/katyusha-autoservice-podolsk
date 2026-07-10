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
};

const assetByVariant: Record<ServiceModelVariant, string> = {
  maintenance: "/images/3d/service-maintenance.png",
  engine: "/images/3d/service-engine.png",
  chassis: "/images/3d/service-chassis.png",
  electrical: "/images/3d/service-electrical.png",
  body: "/images/3d/service-body.png",
  exhaust: "/images/3d/service-exhaust.png",
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
  sizes = "(min-width: 1024px) 320px, 220px"
}: ServiceModel3DProps) {
  return (
    <div className={cn("model3d", className)} aria-hidden="true">
      <Image
        src={sitePath(assetByVariant[variant])}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className="model3d-img object-contain"
      />
    </div>
  );
}
