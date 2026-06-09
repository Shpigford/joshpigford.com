import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

export interface PodcastFormValues {
  id: number
  name: string
  link: string
}

function humanize(field: string) {
  const spaced = field.replace(/_/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export default function PodcastForm({ podcast }: { podcast?: PodcastFormValues }) {
  const form = useForm({
    name: podcast?.name ?? '',
    link: podcast?.link ?? '',
  })

  form.transform((data) => ({ podcast: data }))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (podcast) {
      form.patch(`/podcasts/${podcast.id}`)
    } else {
      form.post('/podcasts')
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
        <label htmlFor="podcast_name" className="block text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="podcast_name"
          value={form.data.name}
          onChange={(e) => form.setData('name', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="podcast_link" className="block text-sm font-bold mb-2">
          Link
        </label>
        <input
          type="url"
          id="podcast_link"
          value={form.data.link}
          onChange={(e) => form.setData('link', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {podcast ? 'Update Podcast' : 'Add Podcast'}
        </button>
      </div>
    </form>
  )
}
