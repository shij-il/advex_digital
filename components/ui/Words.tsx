import type { ElementType } from "react";

/**
 * Headline whose words slide up out of a mask when it scrolls into view
 * (animated by ScrollFX via the data-words attribute).
 *  text   - use "\n" for a line break
 *  accent - trailing words (on the last line) painted with the brand gradient
 *  hero   - wait for the loading intro instead of the scroll position
 */
export default function Words({
  text, accent, as = "h2", className = "", hero = false,
}: { text: string; accent?: string; as?: ElementType; className?: string; hero?: boolean }) {
  const Tag = as;
  const lines = text.split("\n").map((l) => l.split(" "));
  const accentCount = accent ? accent.split(" ").length : 0;
  return (
    <Tag className={className} data-words data-words-hero={hero ? "" : undefined}>
      {lines.map((words, li) => (
        <span key={li} className="block">
          {words.map((w, wi) => {
            const isAccent = li === lines.length - 1 && wi >= words.length - accentCount && accentCount > 0;
            return (
              <span key={wi}>
                <span className="w">
                  <span className={`wi ${isAccent ? "gtext" : ""}`}>{w}</span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
