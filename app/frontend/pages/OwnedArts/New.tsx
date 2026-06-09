import { Link } from '@inertiajs/react'
import OwnedArtForm, { type OwnedArtFormValues } from '@/components/OwnedArtForm'

export default function OwnedArtsNew({ ownedArt }: { ownedArt: OwnedArtFormValues }) {
  return (
    <>
      <h1 className="font-serif text-4xl mb-8">Add New NFT</h1>

      <div className="max-w-2xl">
        <OwnedArtForm ownedArt={ownedArt} />
      </div>

      <div className="mt-8">
        <Link href="/art" className="text-gold">
          ← Back to Art
        </Link>
      </div>
    </>
  )
}
