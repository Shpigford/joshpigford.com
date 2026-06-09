import { Link } from '@inertiajs/react'
import PodcastForm, { type PodcastFormValues } from './Form'

export default function Edit({ podcast }: { podcast: PodcastFormValues }) {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/podcasts">Podcasts</Link>
        </nav>
        <h1 className="font-serif text-4xl">Edit '{podcast.name}'</h1>
      </div>

      <PodcastForm podcast={podcast} />
    </>
  )
}
