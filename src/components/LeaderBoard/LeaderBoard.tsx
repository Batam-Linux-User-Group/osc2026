import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import {
  Ellipse,
  Profile,
  JuaraSatu,
  JuaraDua,
  JuaraTiga,
  Union,
  IconLombaMascot,
  IconLombaLsa,
  IconLombaWeb,
  IconLombaNetwork,
} from '@/assets/leaderboard/index';

interface CompetitionSection {
  id: string;
  title: string;
  participants: {
    id: string;
    name: string;
    score: number;
    school?: string;
  } [];
  color: string;
}

interface LeaderboardProps {
  competitions: CompetitionSection[];
}

interface CardConfig {
  title: string;
  displayTitle: string;
  image: string;
}

const CARD_ORDER: CardConfig[] = [
  {
    title: 'web design',
    displayTitle: 'WEB DESIGN',
    image: IconLombaWeb
  },
  {
    title: 'mascot design',
    displayTitle: 'MASCOT DESIGN',
    image: IconLombaMascot
  },
  {
    title: 'network simulation',
    displayTitle: 'NETWORK\nSIMULATION',
    image: IconLombaNetwork
  },
  {
    title: 'linux system administration',
    displayTitle: 'LINUX SYSTEM\nADMIN',
    image: IconLombaLsa
  },
];

const normalizeTitle = (title: string) => title.trim().toLowerCase().replace(/\s+/g, ' ');

const findCompetition = (competitions: CompetitionSection[], title: string) =>
  competitions.find((competition) => normalizeTitle(competition.title) === title);

const createFallbackCompetition = (title: string): CompetitionSection => {
  return {
    id: `fallback-${title}`,
    title,
    color: '#f36f22',
    participants: [],
  };
};

const Leaderboard: React.FC<LeaderboardProps> = ({ competitions }) => {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const detailSectionRef = useRef<HTMLElement | null>(null);

  const selectedCompetition = useMemo(
    () => (selectedTitle ? findCompetition(competitions, selectedTitle) : undefined),
    [competitions, selectedTitle]
  );

  const activeCompetition = useMemo(
    () => {
      if (!selectedTitle) {
        return undefined;
      }

      return selectedCompetition ?? createFallbackCompetition(selectedTitle);
    },
    [selectedCompetition, selectedTitle]
  );

  useEffect(() => {
    if (!activeCompetition) {
      return;
    }

    detailSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [activeCompetition]);

  const orderedParticipants = useMemo(
    () => [...(activeCompetition?.participants ?? [])].sort((left, right) => right.score - left.score),
    [activeCompetition]
  );

  const topThree = orderedParticipants.slice(0, 3);

  const podiumParticipants = [
    topThree[1],
    topThree[0],
    topThree[2],
  ].filter(Boolean);

  return (
    <main className="relative overflow-hidden bg-[#131313] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(233,103,45,0.16),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(83,96,201,0.16),_transparent_32%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl leading-none tracking-wide text-white sm:text-5xl lg:text-6xl">
            PAPAN PERINGKAT OSC 2026
          </h1>
          <div className="mx-auto mt-5 h-3 w-[min(100%,46rem)] rounded-full bg-[#E9672D] shadow-[0_0_18px_rgba(233,103,45,0.45)]" />
          <p className="mt-4 text-sm font-semibold text-white/90 sm:text-base lg:text-lg">
            Berikut adalah recap dari kompetisi yang telah diadakan tahun 2026
          </p>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-12 xl:max-w-6xl">
          {CARD_ORDER.map((card) => {
            const competition = findCompetition(competitions, card.title);
            const participantCount = competition?.participants.length ?? 0;
            const isActive = selectedTitle ? normalizeTitle(selectedTitle) === card.title : false;

            return (
              <article
                key={card.title}
                className="group relative mx-auto flex h-[210px] w-full max-w-[430px] cursor-pointer flex-col overflow-hidden border border-[#ff8a3d]/50 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1"
                style={{ borderRadius: '0 38px 0 38px' }}
                onClick={() => setSelectedTitle(card.title)}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedTitle(card.title);
                  }
                }}
              >
                <div
                  className={`relative flex flex-1 overflow-hidden rounded-bl-[38px] bg-gradient-to-br from-[#f36f22] via-[#ee6624] to-[#bb582d] ${isActive ? 'ring-2 ring-white/50' : ''}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%)]" />
                  <img
                    src={card.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute left-10 top-8 h-[98px] w-[98px] object-contain object-center opacity-95 drop-shadow-[0_10px_14px_rgba(0,0,0,0.18)]"
                  />

                  <div
                    className="absolute right-10 top-5 rounded-md bg-[#5561c5] px-4 py-1.5 text-center w-[200px] h-10 shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
                    style={
                      { borderRadius: "0 20px 0 20px"}
                    }
                  >
                    <span
                      className="block whitespace-pre-line text-lg leading-[0.9] tracking-wide text-white font-semibold"
                      style={{
                        fontFamily: "var(--font-heading)"
                      }}
                    >
                      {card.displayTitle}
                    </span>
                  </div>

                  <div className="absolute right-15 top-[78px] flex items-center gap-3">
                    <img
                      src={Union}
                      alt=""
                      aria-hidden="true"
                      className="absolute right-28 top-8 w-[60px]"
                    />
                    <img
                      src={Ellipse}
                      alt=""
                      aria-hidden="true"
                      className="absolute right-[121.5px] top-[-8px] w-[40px]"
                    />
                    <div className="text-right leading-none">
                      <div className="text-3xl font-black tracking-tight text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.18)]">
                        {participantCount}
                      </div>
                      <div className="mt-1 text-xl font-extrabold tracking-wide text-white">
                        PESERTA
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[54px] rounded-bl-[38px] border-t border-black/15 bg-[#171717] px-6 py-3">
                  <div className="flex h-full items-center justify-center text-center text-base font-black tracking-wide text-white sm:text-lg">
                    LIHAT PAPAN PERINGKAT
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {activeCompetition ? (
          <section
            ref={detailSectionRef}
            className="mt-12 w-full max-w-6xl scroll-mt-24 rounded-[28px] border border-[#ff8a3d]/45 bg-[#111111] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)] sm:p-7 lg:p-8"
          >
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col items-center gap-2 text-center mb-10">
                <h2 className="font-heading text-3xl uppercase tracking-wide text-white sm:text-4xl">
                  {activeCompetition.title}
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {orderedParticipants.length === 0 ? (
                  <div className="py-20 text-center text-gray-500">
                    <p className="text-xl font-medium">Belum ada data peserta untuk lomba ini</p>
                  </div>
                ) : (
                  <>
                    <div className="rounded-3xl bg-transparent px-2 pb-6 pt-5 sm:px-3 sm:pb-7 sm:pt-6">
                      <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:justify-center md:gap-6">
                    {podiumParticipants.map((participant, index) => {
                      const rank = index == 0 ? 2 : index == 1 ? 1 : 3;
                      const medalImage = rank === 1 ? JuaraSatu : rank === 2 ? JuaraDua : JuaraTiga;
                      const cardHeights = {1: 'md:h-[330px]', 2: 'md:h-[300px]', 3: 'md:h-[300px]'};
                      const cardWidth = {1: 'md:w-[290px]', 2: 'md:w-[250px]', 3: 'md:w-[250px]'};

                      return (
                        <div
                          key={participant.id}
                          className={`relative mx-auto flex w-full flex-col rounded-3xl border border-[#ff8a3d] bg-[#242424] px-5 pt-10 pb-6 text-center ${
                            cardHeights[rank]
                          } ${cardWidth[rank]}`}
                        >
                          {/* Medal */}
                          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[88%]">
                            <img
                              src={medalImage}
                              alt=""
                              aria-hidden="true"
                              className="w-[72px] object-contain"
                            />
                          </div>

                          {/* Avatar */}
                          <div className="mx-auto flex items-center justify-center">
                            <img
                              src={Profile}
                              alt=""
                              aria-hidden="true"
                              className="size-18 object-contain"
                            />
                          </div>

                          {/* Nama & Sekolah */}
                          <div className="mt-5">
                            <h3 className="text-[20px] font-bold leading-tight text-[#ff7d3a]">
                              {participant.name}
                            </h3>

                            <p className="mt-2 text-[13px] text-white/70">
                              {participant.school || "-"}
                            </p>
                          </div>

                          {/* Score */}
                          <div className="mt-6">
                            <span className="text-[58px] font-black leading-none text-[#ff7d3a]">
                              {participant.score}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-3xl px-2 py-4 sm:px-3 sm:py-5">
                  <div className="space-y-3.5">
                    {orderedParticipants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between gap-4 rounded-[20px] border border-[#ff8a3d]/25 bg-[#2a2a2a] px-4 py-4"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center text-[#ff7d3a]">
                            <svg viewBox="0 0 24 24" className="h-6.5 w-6.5 fill-current" aria-hidden="true">
                              <path d="M12 2l2.39 4.84 5.34.78-3.86 3.76.91 5.31L12 14.9 7.22 16.69l.91-5.31L4.27 7.62l5.34-.78L12 2z" />
                            </svg>
                          </div>
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-[#d7c9ab]">
                            <img src={Profile} alt="" aria-hidden="true" className="size-15 object-contain" />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-[16px] font-bold text-[#ff7d3a] sm:text-[17px]">
                              {participant.name}
                            </div>
                            <div className="truncate text-[12px] text-white/70">
                              {participant.school || '-'}
                            </div>
                          </div>
                        </div>

                        <div className="text-right leading-none">
                          <div className="text-[3rem] font-black text-[#ff7d3a] sm:text-[3.15rem]">
                            {participant.score}
                          </div>
                          <div className="text-[12px] text-white/70">
                            points
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ) : null}
      </div>
    </main>
  );
};

export default Leaderboard;
