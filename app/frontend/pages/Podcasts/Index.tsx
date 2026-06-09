import { Head, Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

interface PodcastListItem {
  id: number
  name: string
  link: string
}

export default function Index({ podcasts }: { podcasts: PodcastListItem[] }) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Podcasts" />

      <div className="flex items-start">
        <h1 className="font-serif text-4xl">Podcasts</h1>
        {auth.user && (
          <span className="mt-2 ml-4">
            <Link href="/podcasts/new">Add New Podcast</Link>
          </span>
        )}
      </div>
      <p className="mt-0 text-lg">
        Here are podcasts I recommend checking out. Some publish regularly, others are short,
        one-off series.
      </p>

      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast.id}>
            <a href={podcast.link}>{podcast.name}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
