import { Head, Link, router, usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

interface Project {
  name: string
  slug: string
  year: number | null
  description: string | null
  outcome: string | null
  notes: string | null
  link: string | null
}

export default function Show({ project }: { project: Project }) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title={project.name} />

      <div>
        <nav aria-label="breadcrumb">
          <Link href="/projects">Projects</Link> <span className="text-gold-400">⦂⦚</span>
        </nav>
        <h1 className="flex items-center mt-2 mb-0 font-serif text-4xl gap-x-3">
          {project.name} <span className="text-gray-400">⦚</span>{' '}
          <span className="text-lg text-gray-200">{project.year}</span>
        </h1>
        <p className="mt-1 text-lg">{project.description}</p>
        {auth.user && (
          <span className="flex space-x-2">
            <Link href={`/projects/${project.slug}/edit`} className="text-blue-500 no-thick-link">
              Edit
            </Link>
            <span> &bull;</span>
            <button
              className="text-red-500"
              onClick={() => {
                if (confirm('Are you sure?')) router.delete(`/projects/${project.slug}`)
              }}
            >
              Delete
            </button>
          </span>
        )}
      </div>

      {project.notes && (
        <div>
          <h2 className="mt-8 mb-0 font-serif text-2xl">A bit more background</h2>
          <p className="mt-1 text-lg">{project.notes}</p>
        </div>
      )}

      <h2 className="mt-8 mb-0 font-serif text-2xl">What happened?</h2>
      <p className="mt-1 text-lg">{project.outcome}</p>

      {project.link && (
        <p className="mt-8">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-2xl">
            Check it out →
          </a>
        </p>
      )}
    </>
  )
}
