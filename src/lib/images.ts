import hero from "@/assets/hero-executive-boardroom.jpg";
import aboutTeam from "@/assets/about-team-collaboration.jpg";
import aboutOffice from "@/assets/about-office-interior.jpg";
import strategy from "@/assets/services-strategy-meeting.jpg";
import planning from "@/assets/services-corporate-planning.jpg";
import orgdev from "@/assets/services-organizational-development.jpg";
import execdev from "@/assets/services-executive-development.jpg";
import coaching from "@/assets/coaching-one-on-one.jpg";
import training from "@/assets/coaching-leadership-training.jpg";
import workshop from "@/assets/coaching-strategy-workshop.jpg";
import reading from "@/assets/insights-leadership-reading.jpg";
import mentoring from "@/assets/insights-professional-growth.jpg";

export const IMAGES = {
  hero, aboutTeam, aboutOffice, strategy, planning, orgdev, execdev,
  coaching, training, workshop, reading, mentoring,
} as const;

export type ImageKey = keyof typeof IMAGES;

export const IMAGE_LABELS: Record<ImageKey, string> = {
  hero: "Executive boardroom",
  aboutTeam: "Team collaboration",
  aboutOffice: "Consultancy office",
  strategy: "Strategy meeting",
  planning: "Corporate planning",
  orgdev: "Organisational workshop",
  execdev: "Executive leader",
  coaching: "One-on-one coaching",
  training: "Leadership training",
  workshop: "Strategy workshop",
  reading: "Leadership reading",
  mentoring: "Mentoring conversation",
};

export const FALLBACK_IMAGE = aboutOffice;

/** Accepts a library key or an absolute/relative URL. */
export function resolveImage(v: string | undefined): string {
  if (!v) return FALLBACK_IMAGE;
  if (v in IMAGES) return IMAGES[v as ImageKey];
  return v;
}
