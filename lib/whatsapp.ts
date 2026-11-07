import type { Package } from "./packages";

// TODO: replace with your real business number (country code, no + or leading 0)
export const PHONE = "917907758595";
export const LOCATION = "Cravio, Mannarkad";

export function waLink(pkg?: Package): string {
  const message = pkg
    ? `Hello Advex Digital! I'm interested in the ${pkg.name} Package. Package: ${pkg.name}. Duration: ${pkg.duration}. Price: ₹${pkg.price.toLocaleString(
        "en-IN"
      )}. Location: ${LOCATION}. Please share the available start dates and booking details.`
    : `Hello Advex Digital! I'd like to know more about advertising on your LED screen in ${LOCATION}.`;

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
