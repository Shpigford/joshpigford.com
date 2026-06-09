import { Link } from '@inertiajs/react'
import BookForm from './Form'

export default function New() {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/books">Books</Link>
        </nav>
        <h1 className="font-serif text-4xl">Add a new book</h1>
      </div>

      <BookForm />
    </>
  )
}
