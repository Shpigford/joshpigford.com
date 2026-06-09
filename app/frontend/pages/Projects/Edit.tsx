import { Link } from '@inertiajs/react'
import ProjectForm, { type ProjectFormValues } from './Form'

export default function Edit({ project }: { project: ProjectFormValues }) {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/projects">Projects</Link>
        </nav>
        <h1 className="font-serif text-4xl">Edit '{project.name}'</h1>
      </div>

      <ProjectForm project={project} />
    </>
  )
}
