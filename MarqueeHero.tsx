const imgPanoramicFrame = "https://www.figma.com/api/mcp/asset/600dfb88-ecf8-41f4-aa08-17bc499aad55";
const imgProductScreenshot = "https://www.figma.com/api/mcp/asset/9c6958f7-4390-49b0-b7e5-d191fb44c8ce";
const imgEyebrowIcon = "https://www.figma.com/api/mcp/asset/643f6ede-cbe6-44ae-9306-845f65a6eb20";

interface MarqueeHeroProps {
  eyebrow?: string;
  headlineStart?: string;
  headlineAccent?: string;
  headlineEnd?: string;
  body?: string;
  primaryCta?: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function MarqueeHero({
  eyebrow = "Agentforce 360 for Communications",
  headlineStart = "Increase revenue and lower churn with ",
  headlineAccent = "Agentforce 360",
  headlineEnd = " for Communications.",
  body = "Boost B2B and B2C communications with humans and agents working together. Generate quotes in real time, resolve service issues faster, fulfill orders seamlessly, and personalize every touchpoint with Agentforce.",
  primaryCta = "Learn more",
  secondaryCta = "Try for free",
  onPrimaryClick,
  onSecondaryClick,
}: MarqueeHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 773 }}
      aria-label={eyebrow}
    >
      {/* Panoramic background */}
      <img
        src={imgPanoramicFrame}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Content grid */}
      <div className="relative mx-auto flex items-center gap-10 px-20 py-16 max-w-[1440px] min-h-[773px]">

        {/* ── Left panel ── */}
        <div className="flex flex-1 flex-col gap-12 min-w-0">

          {/* Content: eyebrow + headline + body */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <img
                src={imgEyebrowIcon}
                alt=""
                aria-hidden="true"
                className="shrink-0 w-12 h-12"
              />
              <span
                className="text-white text-base font-bold leading-6 tracking-[0.02px]"
                style={{ fontFamily: "'Salesforce Sans', sans-serif" }}
              >
                {eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-white w-[620px] leading-[64px] tracking-[-0.19px]"
              style={{
                fontFamily: "'Avant Garde for Salesforce', 'ITC Avant Garde Gothic', sans-serif",
                fontWeight: 600,
                fontSize: 56,
                fontFeatureSettings: "'lnum' 1, 'pnum' 1",
              }}
            >
              {headlineStart}
              <span style={{ color: "#90d0fe" }}>{headlineAccent}</span>
              {headlineEnd}
            </h1>

            {/* Body copy */}
            <p
              className="text-white text-xl leading-[30px] tracking-[0.02px] pr-[110px]"
              style={{ fontFamily: "'Salesforce Sans', sans-serif", fontWeight: 400 }}
            >
              {body}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-6">
            {/* Primary — frosted glass */}
            <button
              onClick={onPrimaryClick}
              className="relative flex items-center justify-center px-8 py-3 h-[52px] rounded-full border-2 border-white/25 whitespace-nowrap transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              style={{ boxShadow: "0px 2px 4px 0px rgba(6,106,254,0.3), inset 0px 2px 16px 0px rgba(3,45,96,0.05)" }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "rgba(255,255,255,0.75)" }}
              />
              <span
                className="relative text-base font-bold leading-6 tracking-[0.02px]"
                style={{
                  fontFamily: "'Salesforce Sans', sans-serif",
                  color: "#002775",
                }}
              >
                {primaryCta}
              </span>
            </button>

            {/* Secondary — electric blue */}
            <button
              onClick={onSecondaryClick}
              className="relative flex items-center justify-center px-8 py-3 h-[52px] rounded-full border-2 border-white/25 overflow-hidden whitespace-nowrap transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              style={{ boxShadow: "0px 2px 4px 0px rgba(6,106,254,0.3), inset 0px 2px 16px 0px rgba(3,45,96,0.05)" }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "#066afe" }}
              />
              <span
                className="relative text-base font-bold leading-6 tracking-[0.02px] text-white"
                style={{ fontFamily: "'Salesforce Sans', sans-serif" }}
              >
                {secondaryCta}
              </span>
            </button>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="shrink-0 w-[510px] flex items-center justify-end self-stretch">
          <div className="relative w-[700px] h-[467px] shrink-0">
            <img
              src={imgProductScreenshot}
              alt="Agentforce 360 product screenshot"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
