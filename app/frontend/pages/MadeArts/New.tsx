import { Link } from '@inertiajs/react'
import MadeArtForm, { type MadeArtFormValues } from '@/components/MadeArtForm'

export default function MadeArtsNew({ madeArt }: { madeArt: MadeArtFormValues }) {
  return (
    <>
      <h1 className="font-serif text-4xl mb-8">Add New Artwork</h1>

      <div className="max-w-2xl">
        <MadeArtForm madeArt={madeArt} />
      </div>

      <div className="mt-8">
        <Link href="/art" className="text-gold">
          ← Back to Art
        </Link>
      </div>
    </>
  )
}
