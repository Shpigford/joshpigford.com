import { Link, router } from '@inertiajs/react'
import OwnedArtForm, { type OwnedArtFormValues } from '@/components/OwnedArtForm'

export default function OwnedArtsEdit({
  ownedArt,
  param,
}: {
  ownedArt: OwnedArtFormValues
  param: string
}) {
  return (
    <>
      <h1 className="font-serif text-4xl mb-8">Edit NFT</h1>

      <div className="max-w-2xl">
        <OwnedArtForm ownedArt={ownedArt} param={param} />
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/art" className="text-gold">
          ← Back to Art
        </Link>
        <a
          href={`/owned_arts/${param}`}
          className="text-red-600"
          onClick={(e) => {
            e.preventDefault()
            if (confirm('Are you sure?')) router.delete(`/owned_arts/${param}`)
          }}
        >
          Delete
        </a>
      </div>
    </>
  )
}
