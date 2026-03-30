import { useState, useMemo } from 'react'
import ProjectCard from './ProjectCard'

const STATUS_ORDER = { live: 0, building: 1, idea: 2 }

const ALL_CATEGORIES = ['all', 'productivity', 'tool', 'game', 'chaos', 'other']
const ALL_STATUSES = ['all', 'live', 'building', 'idea']

export default function ProjectGrid({ projects }) {
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const availableCategories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category))
    return ALL_CATEGORIES.filter(c => c === 'all' || cats.has(c))
  }, [projects])

  const filtered = useMemo(() => {
    return projects
      .filter(p => statusFilter === 'all' || p.status === statusFilter)
      .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
      .sort((a, b) => {
        const statusDiff = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99)
        if (statusDiff !== 0) return statusDiff
        return new Date(b.addedDate) - new Date(a.addedDate)
      })
  }, [projects, statusFilter, categoryFilter])

  return (
    <section className="px-4 max-w-4xl mx-auto mb-16">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <FilterGroup
          label="status"
          options={ALL_STATUSES}
          active={statusFilter}
          onChange={setStatusFilter}
        />
        {availableCategories.length > 2 && (
          <FilterGroup
            label="category"
            options={availableCategories}
            active={categoryFilter}
            onChange={setCategoryFilter}
          />
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-600 font-mono text-sm py-12 text-center">
          nothing here yet. filters too tight?
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}

function FilterGroup({ label, options, active, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-xs text-gray-600 mr-1">{label}:</span>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={[
            'font-mono text-xs px-2.5 py-1 rounded border transition-colors',
            active === opt
              ? 'bg-white/10 border-white/20 text-white'
              : 'border-[#252525] text-gray-600 hover:text-gray-400 hover:border-[#333]',
          ].join(' ')}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
