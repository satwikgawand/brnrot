const STATUS_STYLES = {
  shipped: {
    badge: 'bg-lime-400/15 text-lime-400 border-lime-400/30',
    dot: 'bg-lime-400',
    label: 'shipped',
  },
  cooking: {
    badge: 'bg-amber-400/15 text-amber-400 border-amber-400/30',
    dot: 'bg-amber-400',
    label: 'cooking',
  },
  ideation: {
    badge: 'bg-gray-500/15 text-gray-500 border-gray-500/30',
    dot: 'bg-gray-500',
    label: 'still thinking',
  },
}

const CATEGORY_STYLES = {
  'npc-rehab': 'bg-lime-500/10 text-lime-400 border-lime-500/20',
  chaos: 'bg-red-500/10 text-red-400 border-red-500/20',
  tool: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  game: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  other: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

export default function ProjectCard({ project }) {
  const status = STATUS_STYLES[project.status] || STATUS_STYLES.ideation
  const categoryStyle = CATEGORY_STYLES[project.category] || CATEGORY_STYLES.other
  const isIdea = project.status === 'ideation'

  return (
    <article
      className={[
        'group relative flex flex-col rounded-xl border p-5 transition-all duration-200',
        'bg-[#141414] hover:bg-[#1a1a1a]',
        isIdea
          ? 'border-dashed border-[#2a2a2a] opacity-60 hover:opacity-80'
          : 'border-[#252525] hover:border-[#333]',
      ].join(' ')}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="text-white font-semibold text-lg leading-snug">
          {project.name}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-300 transition-colors"
              aria-label="GitHub repo"
            >
              <GithubIcon />
            </a>
          )}
        </div>
      </div>

      {/* Status + Category */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded border ${status.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${project.status === 'shipped' ? 'animate-pulse' : ''}`} />
          {status.label}
        </span>
        <span className={`font-mono text-xs px-2 py-0.5 rounded border ${categoryStyle}`}>
          #{project.category}
        </span>
      </div>

      {/* Tagline */}
      <p className="text-gray-200 font-medium text-sm mb-2 leading-snug">
        {project.tagline}
      </p>

      {/* Creator note */}
      <p className="text-gray-500 text-sm leading-relaxed mb-auto">
        {project.creatorNote}
      </p>

      {/* CTA */}
      {project.status === 'shipped' && project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-lime-400 text-black text-sm font-semibold hover:bg-lime-300 active:bg-lime-500 transition-colors"
        >
          try it
          <span aria-hidden>↗</span>
        </a>
      )}
    </article>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}
