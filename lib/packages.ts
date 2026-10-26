
export type Package = {
  name: string;
  duration: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
};

export const PACKAGES: Package[] = [
  {
    name: "Opening",
    duration: "15 Days",
    price: 7999,
    description: "Launch your brand with focused visibility.",
    features: [
      "Focused Brand Visibility",
      "Quick Brand Awareness",
      "Standard Ad Rotation",
    ],
  },
  {
    name: "Booster",
    duration: "30 Days",
    price: 17999,
    description: "Build consistent awareness throughout the month.",
    features: [
      "Consistent Brand Exposure",
      "Improved Brand Recall",
      "Balanced Ad Rotation",
    ],
    popular: true,
  },
  {
    name: "Season",
    duration: "90 Days",
    price: 44999,
    description: "Strengthen recognition with extended campaigns.",
    features: [
      "Extended Campaign Reach",
      "Enhanced Brand Recognition",
      "Sustained Public Visibility",
    ],
  },
  {
    name: "Landmark",
    duration: "180 Days",
    price: 74999,
    description: "Establish a lasting presence in the market.",
    features: [
      "Strong Market Presence",
      "Continuous Audience Reach",
      "Maximum Brand Engagement",
    ],
  },
];
