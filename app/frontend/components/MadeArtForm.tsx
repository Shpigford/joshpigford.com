import { useForm, usePage } from '@inertiajs/react'
import type { FormEvent } from 'react'
import type { SharedProps } from '@/types'

export interface MadeArtFormValues {
  title: string | null
  description: string | null
  seriesName: string | null
  year: number | null
  medium: string | null
  dimensions: string | null
}

const inputClasses = 'w-full px-3 py-2 border border-gray-300 rounded'

// `param` is present when editing an existing record.
export default function MadeArtForm({
  madeArt,
  param,
  currentImages = [],
}: {
  madeArt: MadeArtFormValues
  param?: string
  currentImages?: string[]
}) {
  const { errors } = usePage<SharedProps>().props
  const form = useForm({
    made_art: {
      title: madeArt.title ?? '',
      description: madeArt.description ?? '',
      series_name: madeArt.seriesName ?? '',
      year: madeArt.year != null ? String(madeArt.year) : '',
      medium: madeArt.medium ?? '',
      dimensions: madeArt.dimensions ?? '',
      images: [] as File[],
    },
  })

  const errorMessages = Object.values(errors ?? {}).flat()

  function setField(field: keyof typeof form.data.made_art, value: string | File[]) {
    form.setData('made_art', { ...form.data.made_art, [field]: value })
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (param) {
      form.patch(`/made_arts/${param}`)
    } else {
      form.post('/made_arts')
    }
  }

  return (
    <form onSubmit={submit}>
      {errorMessages.length > 0 && (
        <div className="border border-red-500 bg-red-50 p-4 rounded mb-6">
          <h2 className="text-red-700 font-semibold mb-2">
            {errorMessages.length} {errorMessages.length === 1 ? 'error' : 'errors'} prohibited
            this artwork from being saved:
          </h2>
          <ul className="list-disc list-inside text-red-600">
            {errorMessages.map((message, i) => (
              <li key={i}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="made_art_title" className="block font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="made_art_title"
          value={form.data.made_art.title}
          onChange={(e) => setField('title', e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="made_art_description" className="block font-semibold mb-2">
          Description
        </label>
        <textarea
          id="made_art_description"
          rows={4}
          value={form.data.made_art.description}
          onChange={(e) => setField('description', e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="made_art_series_name" className="block font-semibold mb-2">
          Series name
        </label>
        <input
          type="text"
          id="made_art_series_name"
          value={form.data.made_art.series_name}
          onChange={(e) => setField('series_name', e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="made_art_year" className="block font-semibold mb-2">
            Year
          </label>
          <input
            type="number"
            id="made_art_year"
            value={form.data.made_art.year}
            onChange={(e) => setField('year', e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="made_art_medium" className="block font-semibold mb-2">
            Medium
          </label>
          <input
            type="text"
            id="made_art_medium"
            value={form.data.made_art.medium}
            onChange={(e) => setField('medium', e.target.value)}
            placeholder="e.g., Oil on canvas"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="made_art_dimensions" className="block font-semibold mb-2">
            Dimensions
          </label>
          <input
            type="text"
            id="made_art_dimensions"
            value={form.data.made_art.dimensions}
            onChange={(e) => setField('dimensions', e.target.value)}
            placeholder={'e.g., 24" x 36"'}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="made_art_images" className="block font-semibold mb-2">
          Images
        </label>
        <input
          type="file"
          id="made_art_images"
          multiple
          onChange={(e) => setField('images', Array.from(e.target.files ?? []))}
          className={inputClasses}
        />
        <p className="text-sm text-gray-600 mt-1">You can select multiple images</p>

        {currentImages.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Current images:</p>
            <div className="grid grid-cols-4 gap-2">
              {currentImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} className="rounded" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-gold text-white px-6 py-2 rounded hover:bg-gold-dark transition-colors cursor-pointer"
      >
        {param ? 'Update Artwork' : 'Create Artwork'}
      </button>
    </form>
  )
}
