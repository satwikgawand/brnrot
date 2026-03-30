import { Link } from 'react-router-dom'
import projects from '../../data/projects.json'
import updates from '../../data/updates.json'
import { formatDate, getUpdateBadge } from '../utils/updates'

const projectMap = Object.fromEntries(projects.map(p => [p.id, p]))

export default function UpdatesFeed() {
  const recent = [...updates]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  if (recent.length === 0) {
    return (
      <section className="px-4 max-w-4xl mx-auto mb-16">
        <SectionHeader />
        <p className="text-gray-600 font-mono text-sm">nothing yet. check back soon.</p>
      </section>
    )
  }

  return (
    <section className="px-4 max-w-4xl mx-auto mb-16">
      <SectionHeader />
      <div className="border border-[#252525] rounded-xl overflow-hidden">
        {recent.map((update, i) => (
          <UpdateRow
            key={update.id}
            update={update}
            project={projectMap[update.projectId]}
            isLast={i === recent.length - 1}
          />
        ))}
      </div>
      <div className="mt-4 text-right">
        <Link
          to="/updates"
          className="font-mono text-sm text-gray-500 hover:text-lime-400 transition-colors"
        >
          see all updates →
        </Link>
      </div>
    </section>
  )
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
        recent updates
      </h2>
      <div className="flex-1 h-px bg-[#252525]" />
    </div>
  )
}

function UpdateRow({ update, project, isLast }) {
  const badge = getUpdateBadge(update.type)

  return (
    <div className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 px-4 py-3 bg-[#141414] ${!isLast ? 'border-b border-[#1e1e1e]' : ''}`}>
      <span className="font-mono text-xs text-gray-600 whitespace-nowrap pt-0.5 w-24 shrink-0">
        {formatDate(update.date)}
      </span>
      {project && (
        <span className="font-mono text-xs px-2 py-0.5 rounded border bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 whitespace-nowrap shrink-0 self-start">
          {project.name}
        </span>
      )}
      <span className={`font-mono text-xs px-2 py-0.5 rounded border whitespace-nowrap shrink-0 self-start ${badge.style}`}>
        {update.type}
      </span>
      <p className="text-sm text-gray-400 leading-relaxed">
        {update.text}
      </p>
    </div>
  )
}
