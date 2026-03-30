import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import projects from '../../data/projects.json'
import updates from '../../data/updates.json'
import { formatDate, formatMonth, getMonthKey, getUpdateBadge } from '../utils/updates'

const projectMap = Object.fromEntries(projects.map(p => [p.id, p]))

export default function UpdatesPage() {
  const [projectFilter, setProjectFilter] = useState('all')

  const sorted = useMemo(() => {
    return [...updates]
      .filter(u => projectFilter === 'all' || u.projectId === projectFilter)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [projectFilter])

  // Group by month
  const grouped = useMemo(() => {
    const groups = {}
    for (const u of sorted) {
      const key = getMonthKey(u.date)
      if (!groups[key]) groups[key] = { label: formatMonth(u.date), items: [] }
      groups[key].items.push(u)
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
  }, [sorted])

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-gray-100 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back nav */}
        <div className="pt-10 pb-6">
          <Link
            to="/"
            className="font-mono text-xs text-gray-600 hover:text-lime-400 transition-colors inline-flex items-center gap-1.5"
          >
            ← brnrot.fun
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold text-white mb-2">updates</h1>
          <p className="text-gray-500 text-sm">everything that's happened. in order.</p>
        </div>

        {/* Project filter */}
        {projects.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="font-mono text-xs text-gray-600 self-center mr-1">project:</span>
            <FilterButton active={projectFilter === 'all'} onClick={() => setProjectFilter('all')}>
              all
            </FilterButton>
            {projects.map(p => (
              <FilterButton
                key={p.id}
                active={projectFilter === p.id}
                onClick={() => setProjectFilter(p.id)}
              >
                {p.name}
              </FilterButton>
            ))}
          </div>
        )}

        {/* Timeline */}
        {sorted.length === 0 ? (
          <p className="font-mono text-sm text-gray-600 py-16 text-center">
            nothing yet. check back soon.
          </p>
        ) : (
          <div className="space-y-8 pb-16">
            {grouped.map(([monthKey, group]) => (
              <div key={monthKey}>
                {/* Month divider */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-[#1e1e1e]" />
                </div>

                {/* Updates in this month */}
                <div className="space-y-0 border border-[#252525] rounded-xl overflow-hidden">
                  {group.items.map((update, i) => {
                    const project = projectMap[update.projectId]
                    const badge = getUpdateBadge(update.type)
                    const isLast = i === group.items.length - 1

                    return (
                      <div
                        key={update.id}
                        className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 px-4 py-3 bg-[#141414] ${!isLast ? 'border-b border-[#1e1e1e]' : ''}`}
                      >
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
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        'font-mono text-xs px-2.5 py-1 rounded border transition-colors',
        active
          ? 'bg-white/10 border-white/20 text-white'
          : 'border-[#252525] text-gray-600 hover:text-gray-400 hover:border-[#333]',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
