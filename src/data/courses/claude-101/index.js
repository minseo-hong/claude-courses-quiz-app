import sections from './sections'

import q01 from './01-what-is-claude'
import q02 from './02-first-conversation'
import q03 from './03-getting-better-results'
import q04 from './04-desktop-app-chat-cowork-code'
import q05 from './05-introduction-to-projects'
import q06 from './06-creating-with-artifacts'
import q07 from './07-working-with-skills'
import q08 from './08-connecting-your-tools'
import q09 from './09-enterprise-search'
import q10 from './10-research-mode-for-deep-dives'
import q11 from './11-claude-in-action-use-cases-by-role'
import q12 from './12-other-ways-to-work-with-claude'
import q13 from './13-whats-next'
import s1 from './s1-meet-claude-review'
import s2 from './s2-organizing-knowledge-review'
import s3 from './s3-expanding-reach-review'
import s4 from './s4-putting-it-together-review'
import final_ from './final-review'

const quizModules = [
  q01, q02, q03, q04, q05, q06, q07, q08, q09, q10,
  q11, q12, q13,
  s1, s2, s3, s4,
  final_,
]

export default { sections, quizModules }
