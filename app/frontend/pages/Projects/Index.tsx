import { Head, Link, usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
import Layout from '@/layouts/Layout'
import type { SharedProps } from '@/types'

interface ProjectListItem {
  name: string
  slug: string
  year: number | null
  description: string | null
  outcome: string | null
}

export default function Index({ projects }: { projects: ProjectListItem[] }) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Projects" />

      <div className="flex items-start mb-0">
        <h1 className="font-serif text-4xl">Projects</h1>
        {auth.user && (
          <span className="mt-2 ml-4">
            <Link href="/projects/new">Add New Project</Link>
          </span>
        )}
      </div>
      <p className="mt-0 text-lg">
        I&apos;ve worked on (and continue to work on) an absurd number of things. Current tally?{' '}
        {projects.length} projects.
      </p>

      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Started</th>
            <th>Description</th>
            <th>What Happened</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.slug}>
              <td className="px-2 py-3">
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </td>
              <td>{project.year}</td>
              <td>{project.description}</td>
              <td>{project.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

Index.layout = (page: ReactNode) => <Layout fullWidth>{page}</Layout>
