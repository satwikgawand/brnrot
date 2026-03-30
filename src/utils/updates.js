export const UPDATE_BADGES = {
  launch: { style: 'bg-lime-400/15 text-lime-400 border-lime-400/30' },
  feature: { style: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  fix: { style: 'bg-amber-400/15 text-amber-400 border-amber-400/30' },
  idea: { style: 'bg-gray-500/15 text-gray-400 border-gray-500/30' },
  note: { style: 'bg-gray-700/30 text-gray-500 border-gray-700/30' },
}

export function getUpdateBadge(type) {
  return UPDATE_BADGES[type] || UPDATE_BADGES.note
}

export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatMonth(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function getMonthKey(dateStr) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
