import {
    Briefcase,
    Code2,
    CloudCog,
    Database,
    GitBranch,
    Github,
    Globe,
    Layers,
    Linkedin,
    Mail,
    MonitorSmartphone,
    Network,
    ServerCog,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Twitter,
    Wrench,
    Facebook,
    Instagram,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Preset d'icônes lucide sélectionnables depuis l'admin (compétences,
 * catégories, liens sociaux...) sans toucher au code.
 * TODO backend.hermannfomo.dev : la liste pourra être servie par l'API.
 */
export const ICON_PRESET: Record<string, LucideIcon> = {
    Briefcase,
    Code2,
    CloudCog,
    Database,
    GitBranch,
    Github,
    Globe,
    Layers,
    Linkedin,
    Mail,
    MonitorSmartphone,
    Network,
    ServerCog,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Twitter,
    Wrench,
    Facebook,
    Instagram
};

/** Récupère une icône du preset avec repli sûr si le nom est inconnu. */
export const getIconFromPreset = (name?: string): LucideIcon =>
    (name && ICON_PRESET[name]) || Sparkles;
