import { Head, Link, router, usePage } from '@inertiajs/react'
import { Fragment, type ReactNode } from 'react'
import Layout from '@/layouts/Layout'
import type { SharedProps } from '@/types'

interface OwnedArtListItem {
  id: number
  param: string
  name: string
  imageUrl: string | null
  animationUrl: string | null
  collectionName: string | null
  visible: boolean
}

const sortOptions = [
  ['random', 'Random'],
  ['name', 'Name'],
  ['collection', 'Collection'],
  ['blockchain', 'Blockchain'],
] as const

export default function ArtIndex({
  sortBy,
  ownedArts,
}: {
  sortBy: string
  ownedArts: OwnedArtListItem[]
}) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Art" />

      <h1 className="font-serif text-6xl mb-12">Art</h1>
      <p className="mt-0 text-lg">
        Digital art and NFTs that I've collected over the years. You can check out art that I've
        made as well as purchase pieces from my collection on{' '}
        <a href="https://objkt.com/@joshpigford" className="text-gold">
          Objkt
        </a>{' '}
        and{' '}
        <a href="https://opensea.io/0xa947a87f204f1f5203bfa6c8a5912d428a6525d7" className="text-gold">
          OpenSea
        </a>
        .
      </p>

      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          {auth.user ? (
            <span>
              <Link href="/owned_arts/new" className="text-gold">
                Add New
              </Link>
            </span>
          ) : (
            <span></span>
          )}

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Sort:</span>
            <div className="flex gap-3 text-sm">
              {sortOptions.map(([key, label], index) => (
                <Fragment key={key}>
                  {index > 0 && <span className="text-gray-300">|</span>}
                  <Link
                    href={`/art?sort=${key}`}
                    className={`${sortBy === key ? 'text-gold font-semibold' : 'text-gray-600 hover:text-gold'} transition-colors`}
                  >
                    {label}
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {ownedArts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ownedArts
              .filter((art) => art.imageUrl)
              .map((art) => (
                <div key={art.id} className={`relative group ${art.visible ? '' : 'opacity-50'}`}>
                  <Link href={`/art/owned/${art.param}`} className="block no-thick-link">
                    {art.animationUrl ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full aspect-square object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow my-2"
                      >
                        <source src={art.animationUrl} type="video/mp4" />
                        <img
                          src={art.imageUrl!}
                          alt={art.name}
                          className="w-full aspect-square object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow my-2"
                        />
                      </video>
                    ) : (
                      <img
                        src={art.imageUrl!}
                        alt={art.name}
                        className="w-full aspect-square object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow my-2"
                      />
                    )}
                  </Link>
                  <div>
                    <h3 className="font-semibold my-0">
                      <Link href={`/art/owned/${art.param}`} className="thick-link">
                        {art.name}
                      </Link>
                    </h3>
                    {art.collectionName && (
                      <p className="text-sm text-gray-600 mt-0.5">{art.collectionName}</p>
                    )}
                  </div>
                  {auth.user && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <a
                        href={`/owned_arts/${art.param}/toggle_visibility`}
                        className="bg-gray-700 text-white px-2 py-1 rounded shadow text-sm hover:bg-gray-600"
                        onClick={(e) => {
                          e.preventDefault()
                          router.patch(`/owned_arts/${art.param}/toggle_visibility`)
                        }}
                      >
                        {art.visible ? 'Hide' : 'Show'}
                      </a>
                      <Link
                        href={`/owned_arts/${art.param}/edit`}
                        className="bg-white px-2 py-1 rounded shadow text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-600">No NFTs to display.</p>
        )}
      </div>
    </>
  )
}

ArtIndex.layout = (page: ReactNode) => <Layout fullWidth>{page}</Layout>
