import { Link } from '@inertiajs/react'
import BookForm, { type BookFormValues } from './Form'

export default function Edit({ book }: { book: BookFormValues }) {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/books">Books</Link>
        </nav>
        <h1 className="font-serif text-4xl">Edit '{book.title}'</h1>
      </div>

      <BookForm book={book} />
    </>
  )
}
