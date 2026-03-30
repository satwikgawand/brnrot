import projects from '../../data/projects.json'

export default function Hero() {
  const total = projects.length
  const live = projects.filter(p => p.status === 'shipped').length
  const building = projects.filter(p => p.status === 'cooking').length
  const idea = projects.filter(p => p.status === 'ideation').length

  const statParts = [
    `${total} project${total !== 1 ? 's' : ''}`,
    `${live} shipped`,
    building > 0 ? `${building} cooking` : null,
    idea > 0 ? `probably ${idea} abandoned` : null,
  ].filter(Boolean)

  return (
    <section className="pt-16 pb-12 px-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <span className="font-mono text-xs text-lime-400 bg-lime-400/10 border border-lime-400/20 px-2 py-1 rounded">
          brnrot.fun
        </span>
      </div>

      <h1 className="font-mono text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
        building stupid shit that actually helps<br className="hidden sm:block" /> (sometimes) 🧠⚡
      </h1>

      <div className="mt-6 max-w-xl space-y-2 text-gray-400 text-base leading-relaxed">
        <p>
          home of the chronically online trying to heal. just a person building weird little tools
          and putting them on the internet. some are useful. some are not. all were worth making 💀
        </p>
        <p>
          no vc funding, no growth hacking, no linkedin posts about "learnings."
          just shipping stuff and seeing what sticks. current vibe: grass-touching era 🌿
        </p>
      </div>

      <div className="mt-8 font-mono text-sm text-gray-500 flex items-center gap-2">
        <span className="text-lime-400">→</span>
        <span>{statParts.join(' · ')}</span>
      </div>
    </section>
  )
}
