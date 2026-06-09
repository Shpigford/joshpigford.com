import { Head, Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

interface BookListItem {
  id: number
  title: string | null
  link: string | null
}

export default function Index({
  fiction,
  nonfiction,
}: {
  fiction: BookListItem[]
  nonfiction: BookListItem[]
}) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Books" />

      <div className="flex items-start">
        <h1 className="font-serif text-4xl">Books</h1>
        {auth.user && (
          <span className="mt-2 ml-4">
            <Link href="/books/new">Add New Book</Link>
          </span>
        )}
      </div>
      <p className="mt-0 text-lg">
        I go in phases with reading...sometimes consuming multiple books a month while other times
        taking months to read one book. This is a list of books I recommend. If Goodreads is your
        jam, <a href="https://www.goodreads.com/shpigford">I'm there as well</a>.
      </p>

      <h2>Fiction</h2>
      <ul>
        {fiction.map((book) => (
          <li key={book.id}>
            <a href={book.link ?? undefined}>{book.title}</a>
          </li>
        ))}
      </ul>

      <h2>Non-Fiction</h2>
      <ul>
        {nonfiction.map((book) => (
          <li key={book.id}>
            <a href={book.link ?? undefined}>{book.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
