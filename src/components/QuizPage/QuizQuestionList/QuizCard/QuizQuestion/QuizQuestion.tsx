export default function QuizQuestion({ html }: { html: string }) {
  return (
    <p
      className="text-[15px] sm:text-base font-medium text-ink leading-[1.65] mb-4 sm:mb-5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
