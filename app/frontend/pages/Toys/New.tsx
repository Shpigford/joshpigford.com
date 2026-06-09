import { Link, useForm, usePage } from '@inertiajs/react'
import type { FormEvent } from 'react'
import type { SharedProps } from '@/types'

const inputClasses =
  'appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0'

const textFields = [
  { field: 'name', label: 'Name' },
  { field: 'description', label: 'Description' },
  { field: 'artist', label: 'Artist' },
  { field: 'manufacturer', label: 'Manufacturer' },
  { field: 'release_date', label: 'Release date' },
  { field: 'size', label: 'Size' },
  { field: 'platform', label: 'Platform' },
  { field: 'color', label: 'Color' },
  { field: 'series', label: 'Series' },
] as const

export default function ToysNew() {
  const { errors } = usePage<SharedProps>().props
  const form = useForm({
    toy: {
      name: '',
      description: '',
      artist: '',
      manufacturer: '',
      release_date: '',
      size: '',
      platform: '',
      color: '',
      series: '',
      images: [] as File[],
    },
  })

  const errorMessages = Object.values(errors ?? {}).flat()

  function setField(field: keyof typeof form.data.toy, value: string | File[]) {
    form.setData('toy', { ...form.data.toy, [field]: value })
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    form.post('/toys')
  }

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/toys">Toys</Link>
        </nav>
        <h1 className="font-serif text-4xl">Add a new toy</h1>
      </div>

      <form onSubmit={submit}>
        {errorMessages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}

        {textFields.map(({ field, label }) => (
          <div className="mb-4" key={field}>
            <label htmlFor={`toy_${field}`} className="block text-sm font-bold mb-2">
              {label}
            </label>
            {field === 'description' ? (
              <textarea
                id="toy_description"
                rows={3}
                value={form.data.toy.description}
                onChange={(e) => setField('description', e.target.value)}
                className={inputClasses}
              />
            ) : (
              <input
                type={field === 'release_date' ? 'date' : 'text'}
                id={`toy_${field}`}
                value={form.data.toy[field]}
                onChange={(e) => setField(field, e.target.value)}
                className={inputClasses}
              />
            )}
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="toy_images" className="block text-sm font-bold mb-2">
            Images
          </label>
          <input
            type="file"
            id="toy_images"
            multiple
            onChange={(e) => setField('images', Array.from(e.target.files ?? []))}
            className={inputClasses}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Toy
          </button>
        </div>
      </form>
    </>
  )
}
