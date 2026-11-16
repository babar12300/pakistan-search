import {
  Newspaper,
  Landmark,
  GraduationCap,
  Mountain,
  ShoppingBag,
  Banknote,
  Smartphone,
  Trophy,
  HeartPulse,
  Music,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "@/data/directory";

const ICONS: Record<CategoryId, LucideIcon> = {
  news: Newspaper,
  government: Landmark,
  education: GraduationCap,
  travel: Mountain,
  shopping: ShoppingBag,
  finance: Banknote,
  telecom: Smartphone,
  sports: Trophy,
  health: HeartPulse,
  culture: Music,
};

export function CategoryIcon({ id, className }: { id: CategoryId; className?: string }) {
  const Icon = ICONS[id];
  return <Icon className={className} aria-hidden="true" />;
}
