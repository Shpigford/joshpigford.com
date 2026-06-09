import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

export interface ProjectFormValues {
  name: string
  slug: string
  link: string | null
  year: number | null
  description: string | null
  outcome: string | null
  notes: string | null
}

function humanize(field: string) {
  const spaced = field.replace(/_/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export default function ProjectForm({ project }: { project?: ProjectFormValues }) {
  const form = useForm({
    name: project?.name ?? '',
    slug: project?.slug ?? '',
    link: project?.link ?? '',
    year: project?.year?.toString() ?? '',
    description: project?.description ?? '',
    outcome: project?.outcome ?? '',
    notes: project?.notes ?? '',
  })

  form.transform((data) => ({ project: data }))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (project) {
      form.patch(`/projects/${project.slug}`)
    } else {
      form.post('/projects')
    }
  }

  const errors = form.errors as Record<string, string | string[]>

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(errors).map(([field, messages]) =>
        (Array.isArray(messages) ? messages : [messages]).map((message, index) => (
          <div key={`${field}-${index}`}>
            {humanize(field)} {message}
          </div>
        )),
      )}

      <div className="mb-4">
        <label htmlFor="project_name" className="block text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="project_name"
          value={form.data.name}
          onChange={(e) => form.setData('name', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project_slug" className="block text-sm font-bold mb-2">
          Slug
        </label>
        <input
          type="text"
          id="project_slug"
          value={form.data.slug}
          onChange={(e) => form.setData('slug', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project_link" className="block text-sm font-bold mb-2">
          Link
        </label>
        <input
          type="url"
          id="project_link"
          value={form.data.link}
          onChange={(e) => form.setData('link', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project_year" className="block text-sm font-bold mb-2">
          Year
        </label>
        <input
          type="number"
          id="project_year"
          value={form.data.year}
          onChange={(e) => form.setData('year', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project_description" className="block text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          id="project_description"
          rows={5}
          value={form.data.description}
          onChange={(e) => form.setData('description', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project_outcome" className="block text-sm font-bold mb-2">
          Outcome
        </label>
        <textarea
          id="project_outcome"
          rows={5}
          value={form.data.outcome}
          onChange={(e) => form.setData('outcome', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project_notes" className="block text-sm font-bold mb-2">
          Notes
        </label>
        <textarea
          id="project_notes"
          rows={5}
          value={form.data.notes}
          onChange={(e) => form.setData('notes', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {project ? 'Update Project' : 'Add Project'}
        </button>
      </div>
    </form>
  )
}
