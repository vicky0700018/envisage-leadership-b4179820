import { FALLBACK_IMAGE, resolveImage } from "@/lib/images";

export function Img({ src, alt, className = "", eager = false, width = 1280, height = 864 }: { src: string; alt: string; className?: string; eager?: boolean; width?: number; height?: number }) {
  return (
    <img
      src={resolveImage(src)}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      className={`h-full w-full object-cover ${className}`}
      onError={(e) => { const t = e.currentTarget; if (t.src !== FALLBACK_IMAGE) t.src = FALLBACK_IMAGE; }}
    />
  );
}
