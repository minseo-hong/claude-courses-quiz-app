import { useRef, useState } from "react";
import QuizPage from "./components/QuizPage";
import SECTIONS from "./data/sections";

const modules = import.meta.glob("./data/*.js", { eager: true });
const quizzes = Object.values(modules)
  .filter((m) => m.default?.lesson)
  .map((m) => m.default)
  .sort((a, b) => {
    const na = Number(a.lesson), nb = Number(b.lesson);
    if (isNaN(na) && isNaN(nb)) return a.lesson.localeCompare(b.lesson);
    if (isNaN(na)) return 1;
    if (isNaN(nb)) return -1;
    return na - nb;
  });

const quizByLesson = Object.fromEntries(quizzes.map((q) => [q.lesson, q]));

const grouped = SECTIONS.map((sec) => ({
  ...sec,
  quizzes: sec.lessons.map((l) => quizByLesson[l]).filter(Boolean),
})).filter((sec) => sec.quizzes.length > 0);

const flat = grouped.flatMap((sec) => sec.quizzes);

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="5"  width="16" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="2" y="9.25" width="16" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="2" y="13.5" width="16" height="1.5" rx="0.75" fill="currentColor"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  );
}

export default function App() {
  const [idx, setIdx] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mainRef = useRef(null);

  function selectQuiz(i) {
    setIdx(i);
    setDrawerOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }

  const current = flat[idx];

  const navContent = (
    <>
      <div className="px-5 py-5 border-b border-stroke flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-widest uppercase text-ink-3">Claude Courses</p>
        <button
          className="md:hidden p-1 -mr-1 text-ink-3 hover:text-ink cursor-pointer"
          onClick={() => setDrawerOpen(false)}
        >
          <CloseIcon />
        </button>
      </div>
      <nav className="flex flex-col p-3 flex-1 gap-4 overflow-y-auto">
        {grouped.map((sec) => (
          <div key={sec.title || 'root'}>
            {sec.title && (
              <p className="px-3 mb-1 text-[10px] font-bold tracking-widest uppercase text-ink-3">
                {sec.title}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {sec.quizzes.map((q) => {
                const i = flat.indexOf(q);
                return (
                  <button
                    key={q.lesson}
                    onClick={() => selectQuiz(i)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] cursor-pointer transition-colors duration-150
                      ${i === idx
                        ? "bg-tint-2 text-ink font-semibold"
                        : "text-ink-2 hover:bg-tint hover:text-ink font-medium"
                      }`}
                  >
                    <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5 text-ink-3">
                      Lesson {q.lesson}
                    </span>
                    {q.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">

      {/* ── 모바일 상단 바 ── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-card border-b border-stroke flex items-center gap-3 px-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="shrink-0 p-1.5 -ml-1.5 rounded-lg text-ink-2 hover:bg-lift hover:text-ink transition-colors cursor-pointer"
          aria-label="메뉴 열기"
        >
          <HamburgerIcon />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold tracking-widest uppercase text-ink-3 leading-none mb-0.5">
            Lesson {current.lesson}
          </p>
          <p className="text-[13px] font-semibold text-ink truncate leading-tight">
            {current.title}
          </p>
        </div>
      </div>

      {/* ── 모바일 드로어 백드롭 ── */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ── 사이드바 (데스크톱: sticky / 모바일: 드로어) ── */}
      <aside className={`
        fixed md:sticky top-0 inset-y-0 left-0 z-50
        w-72 md:w-64 h-screen shrink-0
        border-r border-stroke bg-card flex flex-col
        transition-transform duration-300 ease-in-out
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        {navContent}
      </aside>

      {/* ── 본문 ── */}
      <main ref={mainRef} className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <QuizPage key={current.lesson} quiz={current} />
      </main>

    </div>
  );
}
