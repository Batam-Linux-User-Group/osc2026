import {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  FileText,
  Users,
  Calendar,
  Award,
  Gift,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const ORANGE = "var(--color-orange-primary)";
const BG = "var(--color-neutral-black)";
const WHITE = "var(--color-neutral-white)";
const BULGE = 60;
const MOBILE_BREAKPOINT = 768;

const steps = [
  {
    step: "01",
    title: "PENDAFTARAN",
    date: "21 Juli 2026",
    Icon: FileText,
  },
  {
    step: "02",
    title: "TECHNICAL MEETING",
    date: "16 Agustus 2026",
    noteTitle: "TECHNICAL NOTE",
    note: "Penjelasan teknis pengerjaan maskot dan ketentuan lomba dilakukan h-5 TM dan akan diinfo di Whatsapp Grup.",
    Icon: Users,
  },
  {
    step: "03",
    title: "PELAKSANAAN LOMBA",
    date: "19 Agustus 2026",
    noteTitle: "COMPETITION DAY",
    note: "Pengerjaan maskot dilakukan secara online (dari rumah), kemudian presentasi karya pada hari pelaksanaan lomba.",
    Icon: Calendar,
  },
  {
    step: "04",
    title: "PENGUMUMAN JUARA",
    date: "28 Agustus 2026",
    Icon: Award,
  },
  {
    step: "05",
    title: "PENYERAHAN HADIAH",
    date: "2 Agustus 2026",
    Icon: Gift,
  },
];

/* =========================================================
   CARD
========================================================= */

function Card({
  title,
  date,
  noteTitle,
  note,
  Icon,
  align,
  compact = false,
}: {
  title: string;
  date: string;
  noteTitle?: string;
  note?: string;
  Icon: React.ComponentType<{
    size?: number;
    color?: string;
  }>;
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
        flexDirection: isLeft
          ? "row"
          : "row-reverse",
        width: compact ? "100%" : "auto",
      }}
    >
      {/* ================= CARD ================= */}
      <div
        style={{
          background: WHITE,
          width: compact
            ? "100%"
            : "clamp(360px, 46vw, 480px)",

          padding: compact
            ? "16px 14px 16px 26px"
            : isLeft
              ? "16px 16px 16px 36px"
              : "16px 36px 16px 16px",

          borderRadius: 50,

          display: "flex",
          alignItems: "center",

          flexDirection: isLeft
            ? "row"
            : "row-reverse",

          gap: compact ? 14 : 22,

          minHeight: compact
            ? 84
            : note
              ? 160
              : 100,

          boxSizing: "border-box",

          boxShadow: compact
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "none",
        }}
      >
        {/* ================= TEXT ================= */}
        <div
          style={{
            flex: 1,
            minWidth: 0,

            textAlign: isLeft
              ? "left"
              : "right",
          }}
        >
          {/* TITLE */}
          <p
            style={{
              fontSize: compact
                ? "clamp(17px, 4vw, 20px)"
                : "clamp(20px, 2vw, 26px)",

              fontWeight: 700,

              color:
                "var(--color-neutral-black)",

              margin: 0,

              textTransform: "uppercase",

              letterSpacing: "0.04em",

              lineHeight: 1.05,

              fontFamily:
                "var(--font-heading)",
            }}
          >
            {title}
          </p>

          {/* DATE */}
          <p
            style={{
              fontSize: compact
                ? 13
                : "clamp(13px, 1.3vw, 16px)",

              color:
                "var(--color-neutral-gray)",

              fontWeight: 500,

              margin: "7px 0 0",

              lineHeight: 1.25,

              fontFamily:
                "var(--font-body)",

              textAlign: isLeft
                ? "left"
                : "right",
            }}
          >
            {date}
          </p>

          {/* ================= NOTE ================= */}
          {note && (
            <div
              style={{
                marginTop: compact ? 10 : 12,

                padding:
                  compact
                    ? "8px 10px"
                    : "9px 12px",
                borderLeft: `3px solid ${ORANGE}`,
                borderRight: `3px solid ${ORANGE}`,
                background:
                  "rgba(0,0,0,0.055)",

                borderRadius:
                  "0 8px 8px 0",

                width: "100%",

                boxSizing: "border-box",

                textAlign: "left",
              }}
            >
              {/* NOTE TITLE */}
              <p
                style={{
                  margin: 0,

                  fontSize: compact
                    ? 10
                    : 11,

                  fontWeight: 700,

                  color: ORANGE,

                  letterSpacing:
                    "0.08em",

                  lineHeight: 1.2,

                  textTransform:
                    "uppercase",

                  fontFamily:
                    "var(--font-heading)",
                }}
              >
                {noteTitle}
              </p>

              {/* NOTE DESCRIPTION */}
              <p
                style={{
                  margin:
                    "5px 0 0",

                  fontSize: compact
                    ? 11
                    : 12,

                  fontWeight: 400,

                  color:
                    "var(--color-neutral-gray)",

                  lineHeight: 1.45,

                  fontFamily:
                    "var(--font-body)",
                  textAlign: "left",

                  maxWidth: "100%",
                }}
              >
                {note}
              </p>
            </div>
          )}
        </div>

        {/* ================= ICON ================= */}
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

            boxShadow:
              `0 0 20px ${ORANGE}55`,
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
            <Icon
              size={compact ? 24 : 32}
              color={WHITE}
            />
          </div>
        </div>
      </div>

      {/* ================= CONNECTOR ================= */}
      {!compact && (
        <div
          style={{
            width: 0,
            height: 0,
            flexShrink: 0,

            borderTop:
              "17px solid transparent",

            borderBottom:
              "17px solid transparent",

            ...(align === "left"
              ? {
                  borderLeft:
                    `26px solid ${WHITE}`,
                }
              : {
                  borderRight:
                    `26px solid ${WHITE}`,
                }),
          }}
        />
      )}
    </div>
  );
}

/* =========================================================
   STEP LABEL
========================================================= */

function StepLabel({
  step,
  align,
  compact = false,
}: {
  step: string;
  align: "left" | "right";
  compact?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        lineHeight: 1,

        alignItems:
          align === "left"
            ? "flex-start"
            : "flex-end",
      }}
    >
      <span
        style={{
          fontSize: compact
            ? 11
            : "clamp(12px, 1.2vw, 15px)",

          fontWeight: 400,

          letterSpacing:
            "0.15em",

          color:
            "rgba(255,255,255,0.72)",

          fontFamily:
            "var(--font-heading)",
        }}
      >
        STEP
      </span>

      <span
        style={{
          fontSize: compact
            ? 36
            : "clamp(42px, 5.6vw, 58px)",

          fontWeight: 400,

          color: ORANGE,

          lineHeight: 1,

          fontFamily:
            "var(--font-heading)",
        }}
      >
        {step}
      </span>
    </div>
  );
}

/* =========================================================
   SVG STATE
========================================================= */

interface SvgState {
  w: number;
  h: number;
  pathD: string;
  nodes: {
    x: number;
    y: number;
  }[];
  startY: number;
  endY: number;
  cx: number;
  midY: number;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TimelineSection() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const nodeRefs =
    useRef<(HTMLDivElement | null)[]>(
      []
    );

  const [svg, setSvg] =
    useState<SvgState | null>(null);

  const [isMobile, setIsMobile] =
    useState(false);

  /* =====================================================
     SCROLL ANIMATION
  ===================================================== */

  const { scrollYProgress } = useScroll({
    target: containerRef,

    offset: [
      "start center",
      "end center",
    ],
  });

  const lineProgress =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, 1]
    );

  /* =====================================================
     MOBILE DETECTION
  ===================================================== */

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(
        window.innerWidth <
          MOBILE_BREAKPOINT
      );
    };

    updateMobile();

    window.addEventListener(
      "resize",
      updateMobile
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateMobile
      );
    };
  }, []);

  /* =====================================================
     MEASURE SVG PATH
  ===================================================== */

  const measure = useCallback(() => {
    const wrapper =
      wrapperRef.current;

    if (!wrapper) return;

    const wRect =
      wrapper.getBoundingClientRect();

    const positions =
      nodeRefs.current
        .map((ref) => {
          if (!ref) return null;

          const r =
            ref.getBoundingClientRect();

          return {
            x:
              r.left -
              wRect.left +
              r.width / 2,

            y:
              r.top -
              wRect.top +
              r.height / 2,
          };
        })
        .filter(
          (
            p
          ): p is {
            x: number;
            y: number;
          } => p !== null
        );

    if (positions.length < 2)
      return;

    const cx =
      positions[0].x;

    const offset = isMobile
      ? 34
      : 56;

    const curveBulge =
      isMobile
        ? 30
        : BULGE;

    const startY =
      positions[0].y -
      offset;

    const endY =
      positions[
        positions.length - 1
      ].y + offset;

    let d =
      `M ${cx} ${startY} ` +
      `L ${cx} ${positions[0].y}`;

    for (
      let i = 0;
      i <
      positions.length - 1;
      i++
    ) {
      const midY =
        (positions[i].y +
          positions[i + 1].y) /
        2;

      const dir =
        i % 2 === 0
          ? 1
          : -1;

      d +=
        ` C ${
          cx +
          dir *
            curveBulge
        } ${midY}, ` +
        `${
          cx +
          dir *
            curveBulge
        } ${midY}, ` +
        `${cx} ${
          positions[i + 1]
            .y
        }`;
    }

    d +=
      ` L ${cx} ${endY}`;

    setSvg((prev) => {
      if (
        prev &&
        prev.pathD === d &&
        prev.w ===
          wRect.width
      ) {
        return prev;
      }

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

  /* =====================================================
     RESIZE
  ===================================================== */

  useLayoutEffect(() => {
    measure();

    window.addEventListener(
      "resize",
      measure
    );

    return () => {
      window.removeEventListener(
        "resize",
        measure
      );
    };
  }, [measure]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      id="timeline"
      ref={containerRef}
      style={{
        backgroundColor: BG,
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* ================= HEADER ================= */}

        <div
          style={{
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              fontSize:
                "clamp(32px, 4vw, 40px)",

              fontWeight: 400,

              letterSpacing:
                "0.3em",

              color: WHITE,

              margin: 0,

              fontFamily:
                "var(--font-heading)",
            }}
          >
            TIMELINE
          </h2>

          <div
            style={{
              height: 3,
              width: 160,

              borderRadius: 99,

              backgroundColor:
                ORANGE,

              margin:
                "10px auto 0",

              boxShadow:
                `0 0 16px ${ORANGE}cc`,
            }}
          />
        </div>

        {/* ================= BODY ================= */}

        <div
          ref={wrapperRef}
          style={{
            position: "relative",
          }}
        >
          {/* ================= SVG ================= */}

          {!isMobile && svg && (
            <svg
              style={{
                position:
                  "absolute",

                top: 0,
                left: 0,

                pointerEvents:
                  "none",

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
                style={{
                  pathLength:
                    lineProgress,
                }}
              />

              {/* Start dot */}
              <circle
                cx={svg.cx}
                cy={svg.startY}
                r="10"
                fill="#fff"
              />

              {/* End dot */}
              <circle
                cx={svg.cx}
                cy={svg.endY}
                r="10"
                fill="#fff"
              />

              {/* Timeline dots */}
              {svg.nodes.map(
                (pos, i) => (
                  <circle
                    key={i}
                    cx={pos.x}
                    cy={pos.y}
                    r="9"
                    fill="#fff"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                )
              )}
            </svg>
          )}

          {/* =================================================
              MOBILE
          ================================================= */}

          {isMobile ? (
            <div
              style={{
                position:
                  "relative",

                paddingLeft: 26,
                paddingTop: 10,
              }}
            >
              {/* Vertical line */}
              <div
                style={{
                  position:
                    "absolute",

                  left: 11,

                  top: 10,
                  bottom: 10,

                  width: 2,

                  background:
                    "rgba(255,255,255,0.2)",

                  borderRadius: 99,
                }}
              />

              <div
                style={{
                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap: 26,
                }}
              >
                {steps.map(
                  (s, idx) => (
                    <motion.div
                      key={s.step}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        margin:
                          "-50px",
                      }}
                      transition={{
                        duration: 0.5,
                        delay:
                          idx * 0.1,
                      }}
                      style={{
                        display:
                          "flex",

                        gap: 16,

                        alignItems:
                          "flex-start",
                      }}
                    >
                      {/* Node */}
                      <div
                        style={{
                          position:
                            "relative",

                          flexShrink: 0,

                          width: 24,
                          height: 24,

                          marginTop: 16,
                        }}
                      >
                        <div
                          style={{
                            position:
                              "absolute",

                            left: 2,
                            top: 2,

                            width: 20,
                            height: 20,

                            borderRadius:
                              "50%",

                            background:
                              WHITE,

                            border:
                              "2px solid rgba(255,255,255,0.18)",

                            boxShadow:
                              `0 0 10px ${ORANGE}44`,
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            marginBottom:
                              8,

                            paddingLeft:
                              4,
                          }}
                        >
                          <StepLabel
                            step={
                              s.step
                            }
                            align="left"
                            compact
                          />
                        </div>

                        <Card
                          title={
                            s.title
                          }
                          date={
                            s.date
                          }
                          noteTitle={
                            s.noteTitle
                          }
                          note={
                            s.note
                          }
                          Icon={
                            s.Icon
                          }
                          align="left"
                          compact
                        />
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          ) : (
            /* =================================================
               DESKTOP
            ================================================= */

            <>
              <div
                style={{
                  height: 56,
                }}
              />

              <div
                style={{
                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap:
                    "clamp(20px, 2.4vw, 30px)",
                }}
              >
                {steps.map(
                  (s, idx) => {
                    const cardOnLeft =
                      idx % 2 ===
                      0;

                    const rowGap = 16;

                    const stepGap =
                      cardOnLeft
                        ? 44
                        : 48;

                    const NodeMarker = (
                      <div
                        ref={(el) => {
                          nodeRefs.current[
                            idx
                          ] = el;
                        }}
                        style={{
                          width: 1,
                          height: 56,

                          flexShrink: 0,

                          display:
                            "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",
                        }}
                      />
                    );

                    return (
                      <motion.div
                        key={
                          s.step
                        }
                        initial={{
                          opacity: 0,
                          y: 50,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          margin:
                            "-100px",
                        }}
                        transition={{
                          duration: 0.6,
                          delay:
                            idx *
                            0.15,
                        }}
                        style={{
                          display:
                            "grid",

                          gridTemplateColumns:
                            "minmax(0, 1fr) 80px minmax(0, 1fr)",

                          alignItems:
                            "center",

                          padding:
                            "10px 0",

                          position:
                            "relative",

                          zIndex: 2,
                        }}
                      >
                        {cardOnLeft ? (
                          <>
                            {/* Card LEFT */}
                            <div
                              style={{
                                display:
                                  "flex",

                                justifyContent:
                                  "flex-end",

                                paddingRight:
                                  rowGap,

                                minWidth:
                                  0,
                              }}
                            >
                              <Card
                                title={
                                  s.title
                                }
                                date={
                                  s.date
                                }
                                noteTitle={
                                  s.noteTitle
                                }
                                note={
                                  s.note
                                }
                                Icon={
                                  s.Icon
                                }
                                align="left"
                              />
                            </div>

                            {/* CENTER */}
                            <div
                              style={{
                                display:
                                  "flex",

                                justifyContent:
                                  "center",
                              }}
                            >
                              {
                                NodeMarker
                              }
                            </div>

                            {/* STEP RIGHT */}
                            <div
                              style={{
                                display:
                                  "flex",

                                justifyContent:
                                  "flex-start",

                                paddingLeft:
                                  stepGap,

                                minWidth:
                                  0,
                              }}
                            >
                              <StepLabel
                                step={
                                  s.step
                                }
                                align="right"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {/* STEP LEFT */}
                            <div
                              style={{
                                display:
                                  "flex",

                                justifyContent:
                                  "flex-end",

                                paddingRight:
                                  stepGap,

                                minWidth:
                                  0,
                              }}
                            >
                              <StepLabel
                                step={
                                  s.step
                                }
                                align="left"
                              />
                            </div>

                            {/* CENTER */}
                            <div
                              style={{
                                display:
                                  "flex",

                                justifyContent:
                                  "center",
                              }}
                            >
                              {
                                NodeMarker
                              }
                            </div>

                            {/* CARD RIGHT */}
                            <div
                              style={{
                                display:
                                  "flex",

                                justifyContent:
                                  "flex-start",

                                paddingLeft:
                                  rowGap,

                                minWidth:
                                  0,
                              }}
                            >
                              <Card
                                title={
                                  s.title
                                }
                                date={
                                  s.date
                                }
                                noteTitle={
                                  s.noteTitle
                                }
                                note={
                                  s.note
                                }
                                Icon={
                                  s.Icon
                                }
                                align="right"
                              />
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  }
                )}
              </div>

              <div
                style={{
                  height: 56,
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}