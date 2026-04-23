import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { sidebarSections } from '@/lib/quizzes'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claude Courses Quiz',
  description: 'Claude Academy 강의 본문 요약과 종합 기출 퀴즈',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AppShell sections={sidebarSections}>{children}</AppShell>
      </body>
    </html>
  )
}
