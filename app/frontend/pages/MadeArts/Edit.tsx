import { Link, router } from '@inertiajs/react'
import MadeArtForm, { type MadeArtFormValues } from '@/components/MadeArtForm'

export default function MadeArtsEdit({
  madeArt,
  param,
  currentImages,
}: {
  madeArt: MadeArtFormValues
  param: string
  currentImages: string[]
}) {
  return (
    <>
      <h1 className="font-serif text-4xl mb-8">Edit Artwork</h1>

      <div className="max-w-2xl">
        <MadeArtForm madeArt={madeArt} param={param} currentImages={currentImages} />
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/art" className="text-gold">
          ← Back to Art
        </Link>
        <a
          href={`/made_arts/${param}`}
          className="text-red-600"
          onClick={(e) => {
            e.preventDefault()
            if (confirm('Are you sure?')) router.delete(`/made_arts/${param}`)
          }}
        >
          Delete
        </a>
      </div>
    </>
  )
}
