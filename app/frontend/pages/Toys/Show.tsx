import { Head, Link, router, usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
import Layout from '@/layouts/Layout'
import { useImageRotator } from '@/hooks/useImageRotator'
import type { SharedProps } from '@/types'

interface Toy {
  param: string
  name: string
  artist: string | null
  manufacturer: string | null
  platform: string | null
  series: string | null
  size: string | null
  color: string | null
  releaseYear: string
  originalPrice: number | null
  images: string[]
}

export default function ToysShow({ toy }: { toy: Toy }) {
  const { auth } = usePage<SharedProps>().props
  const rotator = useImageRotator(toy.images.length)

  return (
    <>
      <Head title={toy.name} />

      <div>
        <nav aria-label="breadcrumb">
          <Link href="/toys">Toys</Link> <span className="text-gold-400">⦂⦚</span>
        </nav>
        <h1 className="flex items-center mt-2 mb-0 font-serif text-4xl gap-x-3">{toy.name}</h1>
        {auth.user && (
          <span className="flex space-x-2">
            <Link href={`/toys/${toy.param}/edit`} className="text-blue-500 no-thick-link">
              Edit
            </Link>
            <span> &bull;</span>
            <button
              type="button"
              className="text-red-500"
              onClick={() => {
                if (confirm('Are you sure?')) router.delete(`/toys/${toy.param}`)
              }}
            >
              Delete
            </button>
          </span>
        )}
      </div>

      <div className="flex items-start space-x-12">
        <div
          className="w-3/5 max-h-[800px] relative overflow-hidden"
          onMouseEnter={rotator.pause}
          onMouseLeave={rotator.resume}
        >
          <div
            className={`absolute z-10 ${rotator.paused ? '' : 'hidden'} text-3xl text-black stop-icon top-8 right-5`}
          >
            ⏹
          </div>
          {toy.images.map((image, index) => (
            <p key={index} className={index === rotator.currentIndex ? '' : 'hidden'}>
              <img
                src={image}
                className="w-full h-auto max-h-[800px] object-contain transition-opacity duration-500 ease-in-out rounded-md"
              />
            </p>
          ))}
        </div>
        <table className="w-2/5">
          <tbody>
            <tr>
              <th>Artist</th>
              <td>{toy.artist}</td>
            </tr>
            <tr>
              <th>Manufacturer</th>
              <td>{toy.manufacturer}</td>
            </tr>
            <tr>
              <th>Platform</th>
              <td>{toy.platform}</td>
            </tr>
            {toy.series && (
              <tr>
                <th>Series</th>
                <td>{toy.series}</td>
              </tr>
            )}
            <tr>
              <th>Size</th>
              <td>{toy.size}"</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{toy.color}</td>
            </tr>
            <tr>
              <th>Released</th>
              <td>{toy.releaseYear}</td>
            </tr>
            {toy.originalPrice != null && (
              <tr>
                <th>Original Price</th>
                <td>{toy.originalPrice}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

ToysShow.layout = (page: ReactNode) => <Layout fullWidth>{page}</Layout>
