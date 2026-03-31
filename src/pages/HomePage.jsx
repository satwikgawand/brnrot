import Hero from '../components/Hero'
import ProjectGrid from '../components/ProjectGrid'
import Footer from '../components/Footer'
import projects from '../../data/projects.json'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-gray-100 animate-fade-in">
      <Hero />
      <ProjectGrid projects={projects} />
      <Footer />
    </div>
  )
}
