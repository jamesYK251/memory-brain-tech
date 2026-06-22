import { Partner, Card, Difficulty } from "@/types/game";
import { DIFFICULTY_CONFIGS } from "./constants";
import { shuffle } from "./shuffle";

export const PARTNERS: Partner[] = [
  {
    id: "amplitude",
    name: "Amplitude",
    category: "Analytics & BI",
    logoPath: "/logos/amplitude.svg",
    accentColor: "#33C7FF",
  },
  {
    id: "domo",
    name: "DOMO",
    category: "Analytics & BI",
    logoPath: "/logos/domo.svg",
    accentColor: "#C24DFE",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    logoPath: "/logos/hubspot.svg",
    accentColor: "#FF7833",
  },
  {
    id: "braze",
    name: "Braze",
    category: "Customer Engagement",
    logoPath: "/logos/braze.svg",
    accentColor: "#33DCA4",
  },
  {
    id: "onesignal",
    name: "OneSignal",
    category: "Customer Engagement",
    logoPath: "/logos/onesignal.png",
    accentColor: "#33DCA4",
  },
  {
    id: "brandwatch",
    name: "Brandwatch",
    category: "Social",
    logoPath: "/logos/brandwatch.png",
    accentColor: "#F666A7",
  },
  {
    id: "hootsuite",
    name: "Hootsuite",
    category: "Social",
    logoPath: "/logos/hootsuite.png",
    accentColor: "#F666A7",
  },
  {
    id: "rivaliq",
    name: "Rival IQ",
    category: "Social",
    logoPath: "/logos/rivaliq.png",
    accentColor: "#F666A7",
  },
  {
    id: "cisionone",
    name: "CisionOne",
    category: "Research & Insights",
    logoPath: "/logos/cisionone.svg",
    accentColor: "#33C7FF",
  },
  {
    id: "audiense",
    name: "Audiense",
    category: "Research & Insights",
    logoPath: "/logos/audiense.png",
    accentColor: "#C24DFE",
  },
  {
    id: "trajaan",
    name: "Trajaan",
    category: "Search Intelligence",
    logoPath: "/logos/trajaan.png",
    accentColor: "#F5F700",
  },
  {
    id: "gwi",
    name: "GWI",
    category: "Exclusive African Partner",
    logoPath: "/logos/gwi.png",
    accentColor: "#FF7833",
  },
  {
    id: "appsflyer",
    name: "AppsFlyer",
    category: "Mobile Attribution",
    logoPath: "/logos/appsflyer.svg",
    accentColor: "#33DCA4",
  },
  {
    id: "branch",
    name: "Branch",
    category: "Mobile Attribution",
    logoPath: "/logos/branch.svg",
    accentColor: "#C24DFE",
  },
];

export function createDeck(difficulty: Difficulty): Card[] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const selectedPartners = shuffle([...PARTNERS]).slice(0, config.pairs);

  const cards: Card[] = selectedPartners.flatMap((partner) => [
    {
      id: `${partner.id}-a`,
      partnerId: partner.id,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: `${partner.id}-b`,
      partnerId: partner.id,
      isFlipped: false,
      isMatched: false,
    },
  ]);

  return shuffle(cards);
}

export function getPartnerById(id: string): Partner | undefined {
  return PARTNERS.find((p) => p.id === id);
}
