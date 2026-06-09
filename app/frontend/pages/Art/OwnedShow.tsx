import { Head, Link, router, usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
import Layout from '@/layouts/Layout'
import SimpleFormat from '@/components/SimpleFormat'
import type { SharedProps } from '@/types'

interface OwnedArtAttribute {
  trait_type?: string | null
  name?: string | null
  value?: string | number | null
}

interface OwnedArt {
  param: string
  name: string
  description: string | null
  collectionName: string | null
  blockchain: string | null
  contractSlug: string | null
  contractAddress: string | null
  contractName: string | null
  tokenId: string | null
  tokenType: string | null
  externalUrl: string | null
  imageUrl: string | null
  animationUrl: string | null
  visible: boolean
  attributesList: OwnedArtAttribute[]
}

export default function OwnedShow({ ownedArt }: { ownedArt: OwnedArt }) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title={ownedArt.name} />

      <div className="mb-4">
        <Link href="/art" className="text-gold">
          ← Back to Art
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {ownedArt.animationUrl ? (
            <video controls autoPlay loop muted playsInline className="w-full rounded-lg shadow-xl">
              <source src={ownedArt.animationUrl} type="video/mp4" />
              {ownedArt.imageUrl && (
                <img src={ownedArt.imageUrl} alt={ownedArt.name} className="w-full rounded-lg shadow-xl" />
              )}
            </video>
          ) : ownedArt.imageUrl ? (
            <img src={ownedArt.imageUrl} alt={ownedArt.name} className="w-full rounded-lg shadow-xl" />
          ) : (
            <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">No image available</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-4xl mb-4">{ownedArt.name}</h1>

          {ownedArt.collectionName && (
            <p className="text-xl text-white mb-6">{ownedArt.collectionName}</p>
          )}

          <div className="flex gap-4 mb-6">
            {ownedArt.blockchain === 'tezos' && ownedArt.contractSlug ? (
              <a
                href={`https://objkt.com/tokens/${ownedArt.contractSlug}/${ownedArt.tokenId}`}
                target="_blank"
                rel="noopener"
                className="text-gold"
              >
                View on Objkt →
              </a>
            ) : ownedArt.blockchain === 'ethereum' && ownedArt.contractAddress ? (
              <a
                href={`https://opensea.io/item/ethereum/${ownedArt.contractAddress}/${ownedArt.tokenId}`}
                target="_blank"
                rel="noopener"
                className="text-gold"
              >
                View on OpenSea →
              </a>
            ) : null}
          </div>

          {ownedArt.description && (
            <div className="prose dark:prose-invert mb-8">
              <SimpleFormat text={ownedArt.description} />
            </div>
          )}

          <div className="border-t pt-6">
            <h2 className="font-semibold text-lg mb-4">Details</h2>

            <dl className="grid grid-cols-1 gap-3">
              {ownedArt.tokenId && (
                <div>
                  <dt className="font-semibold text-white">Token ID</dt>
                  <dd>{ownedArt.tokenId}</dd>
                </div>
              )}

              {ownedArt.contractName && (
                <div>
                  <dt className="font-semibold text-white">Contract</dt>
                  <dd>{ownedArt.contractName}</dd>
                </div>
              )}

              {ownedArt.tokenType && (
                <div>
                  <dt className="font-semibold text-white">Type</dt>
                  <dd>{ownedArt.tokenType}</dd>
                </div>
              )}

              {ownedArt.blockchain && (
                <div>
                  <dt className="font-semibold text-white">Blockchain</dt>
                  <dd className="capitalize">{ownedArt.blockchain}</dd>
                </div>
              )}
            </dl>

            {ownedArt.attributesList.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-white mb-3">Attributes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ownedArt.attributesList.map((attr, index) => (
                    <div key={index} className="bg-gray-700/50 rounded p-3">
                      <dt className="text-xs text-white/70 uppercase tracking-wider">
                        {attr.trait_type || attr.name || 'Attribute'}
                      </dt>
                      <dd className="text-sm mt-1 font-medium">{attr.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ownedArt.externalUrl && (
              <div className="mt-6">
                <a
                  href={ownedArt.externalUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-gold hover:underline"
                >
                  View on External Site →
                </a>
              </div>
            )}
          </div>

          {auth.user && (
            <div className="mt-8 pt-8 border-t">
              <a
                href={`/owned_arts/${ownedArt.param}/toggle_visibility`}
                className="inline-block px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 mr-4"
                onClick={(e) => {
                  e.preventDefault()
                  router.patch(`/owned_arts/${ownedArt.param}/toggle_visibility`)
                }}
              >
                {ownedArt.visible ? 'Hide' : 'Show'}
              </a>
              <Link href={`/owned_arts/${ownedArt.param}/edit`} className="text-gold mr-4">
                Edit
              </Link>
              <a
                href={`/owned_arts/${ownedArt.param}`}
                className="text-red-600"
                onClick={(e) => {
                  e.preventDefault()
                  if (confirm('Are you sure?')) router.delete(`/owned_arts/${ownedArt.param}`)
                }}
              >
                Delete
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

OwnedShow.layout = (page: ReactNode) => <Layout fullWidth>{page}</Layout>
