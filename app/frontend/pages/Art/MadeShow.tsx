import { Head, Link, router, usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
import Layout from '@/layouts/Layout'
import SimpleFormat from '@/components/SimpleFormat'
import { useImageRotator } from '@/hooks/useImageRotator'
import type { SharedProps } from '@/types'

interface MadeArt {
  param: string
  title: string
  description: string | null
  seriesName: string | null
  year: number | null
  medium: string | null
  dimensions: string | null
  images: string[]
}

export default function MadeShow({ madeArt }: { madeArt: MadeArt }) {
  const { auth } = usePage<SharedProps>().props
  const rotator = useImageRotator(madeArt.images.length)

  return (
    <>
      <Head title={madeArt.title} />

      <div className="mb-4">
        <Link href="/art" className="text-gold">
          ← Back to Art
        </Link>
      </div>

      <h1 className="font-serif text-5xl mb-8">{madeArt.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {madeArt.images.length > 0 ? (
            madeArt.images.length > 1 ? (
              <div onMouseEnter={rotator.pause} onMouseLeave={rotator.resume}>
                {madeArt.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={madeArt.title}
                    className={`w-full rounded-lg shadow-xl ${index === rotator.currentIndex ? '' : 'hidden'}`}
                  />
                ))}

                <div className="flex justify-center mt-4 gap-2">
                  {madeArt.images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => rotator.show(index)}
                      className={`w-3 h-3 rounded-full bg-gray-400 hover:bg-gold ${index === 0 ? 'bg-gold' : ''}`}
                    ></button>
                  ))}
                </div>
              </div>
            ) : (
              <img src={madeArt.images[0]} alt={madeArt.title} className="w-full rounded-lg shadow-xl" />
            )
          ) : (
            <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">No image available</span>
            </div>
          )}
        </div>

        <div>
          {madeArt.seriesName && (
            <p className="text-xl text-white mb-4">
              Part of the <em>{madeArt.seriesName}</em> series
            </p>
          )}

          {madeArt.description && (
            <div className="prose dark:prose-invert mb-8">
              <SimpleFormat text={madeArt.description} />
            </div>
          )}

          <div className="border-t pt-6">
            <h2 className="font-semibold text-lg mb-4">Details</h2>

            <dl className="grid grid-cols-1 gap-3">
              {madeArt.year != null && (
                <div>
                  <dt className="font-semibold text-white">Year</dt>
                  <dd>{madeArt.year}</dd>
                </div>
              )}

              {madeArt.medium && (
                <div>
                  <dt className="font-semibold text-white">Medium</dt>
                  <dd>{madeArt.medium}</dd>
                </div>
              )}

              {madeArt.dimensions && (
                <div>
                  <dt className="font-semibold text-white">Dimensions</dt>
                  <dd>{madeArt.dimensions}</dd>
                </div>
              )}
            </dl>
          </div>

          {auth.user && (
            <div className="mt-8 pt-8 border-t">
              <Link href={`/made_arts/${madeArt.param}/edit`} className="text-gold mr-4">
                Edit
              </Link>
              <a
                href={`/made_arts/${madeArt.param}`}
                className="text-red-600"
                onClick={(e) => {
                  e.preventDefault()
                  if (confirm('Are you sure?')) router.delete(`/made_arts/${madeArt.param}`)
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

MadeShow.layout = (page: ReactNode) => <Layout fullWidth>{page}</Layout>
