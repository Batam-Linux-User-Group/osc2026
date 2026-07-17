import { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { FileText, Users, Calendar, Award, Gift } from "lucide-react";

const ORANGE = "var(--color-orange-primary)";
const BG = "var(--color-neutral-black)";
const WHITE = "var(--color-neutral-white)";
const BULGE = 50;
const MOBILE_BREAKPOINT = 768;

const steps = [
  { step: "01", title: "PENDAFTARAN", date: "TBA", Icon: FileText },
  { step: "02", title: "TECHNICAL MEETING", date: "TBA", Icon: Users },
  { step: "03", title: "PELAKSANAAN LOMBA", date: "TBA", Icon: Calendar },
  { step: "04", title: "PENGUMUMAN JUARA", date: "TBA", Icon: Award },
  { step: "05", title: "PENYERAHAN HADIAH", date: "TBA", Icon: Gift },
];

/* ── Pill card with icon badge & connector bridge ── */
function Card({
  title,
  date,
  Icon,
  align,
  compact = false,
}: {
  title: string;
  date: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  align: "left" | "right";
  compact?: boolean;
}) {
  const isLeft = align === "left";
  const pillSize = compact ? 48 : 60;
  const innerSize = compact ? 34 : 42;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: isLeft ? "row" : "row-reverse",
      }}
    >
      {/* Card pill */}
      <div
        style={{
          background: WHITE,
          width: compact ? "100%" : "clamp(280px, 38vw, 380px)",
          padding: compact
            ? "10px 10px 10px 20px"
            : isLeft
            ? "10px 10px 10px 28px"
            : "10px 28px 10px 10px",
          borderRadius: 9999,
          boxShadow: "0 6px 28px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          flexDirection: isLeft ? "row" : "row-reverse",
          gap: compact ? 10 : 16,
          minHeight: compact ? 64 : 72,
        }}
      >
        {/* Text side */}
        <div style={{ flex: 1, minWidth: 0, textAlign: isLeft ? "left" : "right" }}>
          <p
            style={{
              fontSize: compact ? 14 : "clamp(14px, 1.4vw, 18px)",
              fontWeight: 700,
              color: "var(--color-neutral-black)",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
              fontFamily: "var(--font-heading)",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: compact ? 11 : "clamp(10px, 1vw, 13px)",
              color: "var(--color-neutral-gray)",
              fontWeight: 500,
              margin: "4px 0 0",
              lineHeight: 1.25,
              fontFamily: "var(--font-body)",
            }}
          >
            {date}
          </p>
        </div>

        {/* Icon badge */}
        <div
          style={{
            width: pillSize,
            height: pillSize,
            borderRadius: "50%",
            flexShrink: 0,
            backgroundColor: ORANGE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 18px ${ORANGE}55`,
          }}
        >
          <div
            style={{
              width: innerSize,
              height: innerSize,
              borderRadius: "50%",
              backgroundColor: "#2A2A2A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={compact ? 18 : 22} color={WHITE} />
          </div>
        </div>
      </div>

      {/* Connector bridge pointing toward center line */}
      {!compact && (
        <div
          style={{
            width: 18,
            height: 26,
            background: WHITE,
            flexShrink: 0,
            borderRadius: isLeft ? "0 10px 10px 0" : "10px 0 0 10px",
          }}
        />
      )}
    </div>
  );
}

/* ── STEP label ── */
function StepLabel({ step, align }: { step: string; align: "left" | "right" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        lineHeight: 1,
        minWidth: 70,
        alignItems: align === "left" ? "flex-start" : "flex-end",
      }}
    >
      <span
        style={{
          fontSize: "clamp(10px, 1vw, 12px)",
          fontWeight: 400,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.72)",
          fontFamily: "var(--font-heading)",
        }}
      >
        STEP
      </span>
      <span
        style={{
          fontSize: "clamp(32px, 4.2vw, 44px)",
          fontWeight: 400,
          color: ORANGE,
          lineHeight: 1,
          fontFamily: "var(--font-heading)",
        }}
      >
        {step}
      </span>
    </div>
  );
}

interface SvgState {
  w: number;
  h: number;
  pathD: string;
  nodes: { x: number; y: number }[];
  startY: number;
  endY: number;
  cx: number;
  midY: number;
}

export default function TimelineSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svg, setSvg] = useState<SvgState | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const wRect = wrapper.getBoundingClientRect();

    const positions = nodeRefs.current
      .map((ref) => {
        if (!ref) return null;
        const r = ref.getBoundingClientRect();
        return {
          x: r.left - wRect.left + r.width / 2,
          y: r.top - wRect.top + r.height / 2,
        };
      })
      .filter((p): p is { x: number; y: number } => p !== null);

    if (positions.length < 2) return;

    const cx = positions[0].x;
    const offset = isMobile ? 28 : 44;
    const curveBulge = isMobile ? 26 : BULGE;
    const startY = positions[0].y - offset;
    const endY = positions[positions.length - 1].y + offset;

    let d = `M ${cx} ${startY} L ${cx} ${positions[0].y}`;
    for (let i = 0; i < positions.length - 1; i++) {
      const midY = (positions[i].y + positions[i + 1].y) / 2;
      const dir = i % 2 === 0 ? 1 : -1;
      d += ` C ${cx + dir * curveBulge} ${midY}, ${cx + dir * curveBulge} ${midY}, ${cx} ${positions[i + 1].y}`;
    }
    d += ` L ${cx} ${endY}`;

    setSvg((prev) => {
      if (prev && prev.pathD === d && prev.w === wRect.width) return prev;
      return {
        w: wRect.width,
        h: wRect.height,
        pathD: d,
        nodes: positions,
        startY,
        endY,
        cx,
        midY: 0,
      };
    });
  }, [isMobile]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <section id="timeline" style={{ backgroundColor: BG, padding: "80px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.4vw, 32px)",
              fontWeight: 400,
              letterSpacing: "0.3em",
              color: WHITE,
              margin: 0,
              fontFamily: "var(--font-heading)",
            }}
          >
            TIMELINE
          </h2>
          <div
            style={{
              height: 3,
              width: 140,
              borderRadius: 99,
              backgroundColor: ORANGE,
              margin: "8px auto 0",
              boxShadow: `0 0 16px ${ORANGE}cc`,
            }}
          />
        </div>

        {/* Timeline body */}
        <div ref={wrapperRef} style={{ position: "relative" }}>
          {!isMobile && svg && (
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 1,
                display: "block",
              }}
              width={svg.w}
              height={svg.h}
            >
              <path
                d={svg.pathD}
                stroke="rgba(255,255,255,0.82)"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx={svg.cx} cy={svg.startY} r="9" fill="#fff" />
              <circle cx={svg.cx} cy={svg.endY} r="9" fill="#fff" />
              {svg.nodes.map((pos, i) => (
                <circle
                  key={i}
                  cx={pos.x}
                  cy={pos.y}
                  r="8"
                  fill="#fff"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
              ))}
            </svg>
          )}

          {isMobile ? (
            <div style={{ position: "relative", paddingLeft: 22, paddingTop: 8 }}>
              <div
                style={{
                  position: "absolute",
                  left: 10,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "rgba(255,255,255,0.35)",
                  borderRadius: 99,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {steps.map((s, idx) => (
                  <div
                    key={s.step}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "20px minmax(0, 1fr)",
                      gap: 12,
                      alignItems: "start",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 20,
                        height: 20,
                        marginTop: 16,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 2,
                          top: 2,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: WHITE,
                          border: "2px solid rgba(255,255,255,0.18)",
                        }}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ marginBottom: 8 }}>
                        <StepLabel step={s.step} align="left" />
                      </div>
                      <Card
                        title={s.title}
                        date={s.date}
                        Icon={s.Icon}
                        align={idx % 2 === 0 ? "left" : "right"}
                        compact
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div style={{ height: 44 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.6vw, 18px)" }}>
                {steps.map((s, idx) => {
                  const cardOnLeft = idx % 2 === 0;
                  const rowGap = 12;
                  const stepGap = cardOnLeft ? 36 : 40;
                  const NodeMarker = (
                    <div
                      ref={(el) => {
                        nodeRefs.current[idx] = el;
                      }}
                      style={{
                        width: 1,
                        height: 40,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  );
                  return (
                    <div
                      key={s.step}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr) 64px minmax(0, 1fr)",
                        alignItems: "center",
                        padding: "6px 0",
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      {cardOnLeft ? (
                        <>
                          <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: rowGap, minWidth: 0 }}>
                            <Card title={s.title} date={s.date} Icon={s.Icon} align="left" />
                          </div>
                          <div style={{ display: "flex", justifyContent: "center" }}>{NodeMarker}</div>
                          <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: stepGap, minWidth: 0 }}>
                            <StepLabel step={s.step} align="right" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: stepGap, minWidth: 0 }}>
                            <StepLabel step={s.step} align="left" />
                          </div>
                          <div style={{ display: "flex", justifyContent: "center" }}>{NodeMarker}</div>
                          <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: rowGap, minWidth: 0 }}>
                            <Card title={s.title} date={s.date} Icon={s.Icon} align="right" />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ height: 44 }} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
