import { Link } from '@inertiajs/react'
import PodcastForm from './Form'

export default function New() {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/podcasts">Podcasts</Link>
        </nav>
        <h1 className="font-serif text-4xl">Add a new podcast</h1>
      </div>

      <PodcastForm />
    </>
  )
}
