export type Package = {
  name: string;
  duration: string;
  price: number;
  features: string[];
  popular?: boolean;
};

export const PACKAGES: Package[] = [
  {
    name: "Opening",
    duration: "15 Days",
    price: 7999,
    features: [
      "Focused short-term visibility",
      "Quick awareness setup",
      "Standard rotation",
    ],
  },
  {
    name: "Booster",
    duration: "30 Days",
    price: 17999,
    features: [
      "Repeated monthly exposure",
      "Improved brand recall",
      "Balanced rotation cycle",
    ],
    popular: true,
  },
  {
    name: "Season",
    duration: "90 Days",
    price: 44999,
    features: [
      "Extended campaign reach",
      "High recognition value",
      "Sustained public presence",
    ],
  },
  {
    name: "Landmark",
    duration: "180 Days",
    price: 74999,
    features: [
      "Strongest market presence",
      "Continuous audience reach",
      "Maximum engagement",
    ],
  },
];
