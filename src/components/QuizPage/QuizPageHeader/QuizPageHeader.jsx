export default function QuizPageHeader({ quiz }) {
  return (
    <header className="mb-8 sm:mb-10">
      <p className="text-[11px] font-bold tracking-widest uppercase text-ink-3 mb-2">
        Claude 101 · Lesson {quiz.lesson}
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.5px] mb-1.5">
        {quiz.title}
      </h1>
      <p className="text-sm text-ink-2">
        복습 퀴즈 · 총 {quiz.questions.length}문항 · 단답형 / 빈칸 채우기
      </p>
    </header>
  )
}
