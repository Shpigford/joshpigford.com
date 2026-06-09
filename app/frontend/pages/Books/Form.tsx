import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

export interface BookFormValues {
  id: number
  title: string | null
  link: string | null
  category: string | null
}

function humanize(field: string) {
  const spaced = field.replace(/_/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export default function BookForm({ book }: { book?: BookFormValues }) {
  const form = useForm({
    title: book?.title ?? '',
    link: book?.link ?? '',
    category: book?.category ?? 'Fiction',
  })

  form.transform((data) => ({ book: data }))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (book) {
      form.patch(`/books/${book.id}`)
    } else {
      form.post('/books')
    }
  }

  const errors = form.errors as Record<string, string | string[]>

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(errors).map(([field, messages]) =>
        (Array.isArray(messages) ? messages : [messages]).map((message, index) => (
          <div key={`${field}-${index}`}>
            {humanize(field)} {message}
          </div>
        )),
      )}

      <div className="mb-4">
        <label htmlFor="book_title" className="block text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="book_title"
          value={form.data.title}
          onChange={(e) => form.setData('title', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="book_link" className="block text-sm font-bold mb-2">
          Link
        </label>
        <input
          type="url"
          id="book_link"
          value={form.data.link}
          onChange={(e) => form.setData('link', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="book_category" className="block text-sm font-bold mb-2">
          Category
        </label>
        <select
          id="book_category"
          value={form.data.category}
          onChange={(e) => form.setData('category', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        >
          <option value="Fiction">Fiction</option>
          <option value="Nonfiction">Nonfiction</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {book ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  )
}
