import { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { FileText, Users, Calendar, Award, Gift } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const ORANGE = "var(--color-orange-primary)";
const BG = "var(--color-neutral-black)";
const WHITE = "var(--color-neutral-white)";
const BULGE = 60;
const MOBILE_BREAKPOINT = 768;

const steps = [
  { step: "01", title: "PENDAFTARAN", date: "21 Juli 2026", Icon: FileText },
  { step: "02", title: "TECHNICAL MEETING", date: "12 Agustus 2026", Icon: Users },
  { step: "03", title: "PELAKSANAAN LOMBA", date: "19 Agustus 2026", Icon: Calendar },
  { step: "04", title: "PENGUMUMAN JUARA", date: "20 Agustus 2026", Icon: Award },
  { step: "05", title: "PENYERAHAN HADIAH", date: "21 Agustus 2026", Icon: Gift },
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
  const pillSize = compact ? 60 : 84;
  const innerSize = compact ? 44 : 62;

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
          width: compact ? "100%" : "clamp(360px, 46vw, 480px)",
          padding: compact
            ? "14px 14px 14px 26px"
            : isLeft
            ? "16px 16px 16px 36px"
            : "16px 36px 16px 16px",
          borderRadius: 9999,
          display: "flex",
          alignItems: "center",
          flexDirection: isLeft ? "row" : "row-reverse",
          gap: compact ? 14 : 22,
          minHeight: compact ? 84 : 100,
          marginLeft: -6,
          marginRight: -6
        }}
      >
        {/* Text side */}
        <div style={{ flex: 1, minWidth: 0, textAlign: isLeft ? "left" : "right" }}>
          <p
            style={{
              fontSize: compact ? 18 : "clamp(20px, 2vw, 26px)",
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
              fontSize: compact ? 13 : "clamp(13px, 1.3vw, 16px)",
              color: "var(--color-neutral-gray)",
              fontWeight: 500,
              margin: "6px 0 0",
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
            boxShadow: `0 0 22px ${ORANGE}55`,
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
            <Icon size={compact ? 24 : 32} color={WHITE} />
          </div>
        </div>
      </div>

      {/* Connector bridge pointing toward center line */}
      {!compact && (
        <div
          style={{
            width: 0,
            height: 0,
            flexShrink: 0,
            borderTop: "17px solid transparent",
            borderBottom: "17px solid transparent",
            ...(align === "left"
              ? { borderLeft: `26px solid ${WHITE}` }
              : { borderRight: `26px solid ${WHITE}` }),
              
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
        minWidth: 90,
        alignItems: align === "left" ? "flex-start" : "flex-end",
      }}
    >
      <span
        style={{
          fontSize: "clamp(12px, 1.2vw, 15px)",
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
          fontSize: "clamp(42px, 5.6vw, 58px)",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svg, setSvg] = useState<SvgState | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Untuk animasi line memanjang, mapping scroll 0-1 ke 0-1
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
    const offset = isMobile ? 34 : 56;
    const curveBulge = isMobile ? 30 : BULGE;
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
    <section id="timeline" ref={containerRef} style={{ backgroundColor: BG, padding: "100px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 40px)",
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
              width: 160,
              borderRadius: 99,
              backgroundColor: ORANGE,
              margin: "10px auto 0",
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
              <motion.path
                d={svg.pathD}
                stroke="rgba(255,255,255,0.82)"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: lineProgress }}
              />
              <circle cx={svg.cx} cy={svg.startY} r="10" fill="#fff" />
              <circle cx={svg.cx} cy={svg.endY} r="10" fill="#fff" />
              {svg.nodes.map((pos, i) => (
                <circle
                  key={i}
                  cx={pos.x}
                  cy={pos.y}
                  r="9"
                  fill="#fff"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
              ))}
            </svg>
          )}

          {isMobile ? (
            <div style={{ position: "relative", paddingLeft: 26, paddingTop: 10 }}>
              <div
                style={{
                  position: "absolute",
                  left: 11,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "rgba(255,255,255,0.35)",
                  borderRadius: 99,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                {steps.map((s, idx) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "24px minmax(0, 1fr)",
                      gap: 14,
                      alignItems: "start",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 24,
                        height: 24,
                        marginTop: 18,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 2,
                          top: 2,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: WHITE,
                          border: "2px solid rgba(255,255,255,0.18)",
                        }}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ marginBottom: 10 }}>
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
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div style={{ height: 56 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 30px)" }}>
                {steps.map((s, idx) => {
                  const cardOnLeft = idx % 2 === 0;
                  const rowGap = 16;
                  const stepGap = cardOnLeft ? 44 : 48;
                  const NodeMarker = (
                    <div
                      ref={(el) => {
                        nodeRefs.current[idx] = el;
                      }}
                      style={{
                        width: 1,
                        height: 56,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  );
                  return (
                    <motion.div
                      key={s.step}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr) 80px minmax(0, 1fr)",
                        alignItems: "center",
                        padding: "10px 0",
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
                    </motion.div>
                  );
                })}
              </div>
              <div style={{ height: 56 }} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}