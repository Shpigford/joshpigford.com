import { Link, usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'
import type { SharedProps } from '@/types'

export default function Layout({
  children,
  fullWidth = false,
}: {
  children: ReactNode
  fullWidth?: boolean
}) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      {auth.user && (
        <div className="absolute top-0 right-0 px-4 py-2 text-black bg-gold-400">
          <Link href="/session" method="delete" as="button">
            Sign out
          </Link>
        </div>
      )}
      <div className="items-start gap-4 p-8 md:flex md:py-20">
        <Link
          href="/"
          className="text-6xl font-semibold text-right text-gold-500 hover:text-gold-400 w-14"
        >
          {'⦂⦚'}
        </Link>
        <div>
          <header className="mb-10 font-serif prose dark:prose-invert max-w-none">
            <h1 className="mb-3 text-6xl font-light tracking-tight">Josh Pigford</h1>

            <p className="text-xl">
              <Link href="/">Home</Link> / <Link href="/articles">Articles</Link> /{' '}
              <Link href="/projects">Projects</Link> / <Link href="/investments">Investments</Link>{' '}
              / <Link href="/podcasts">Podcasts</Link> / <Link href="/books">Books</Link> /{' '}
              <Link href="/art">Art</Link> / <Link href="/guestbook">Guestbook</Link>
            </p>
          </header>
          <div className={`font-serif prose dark:prose-invert ${fullWidth ? 'max-w-full w-full' : ''}`}>
            {children}
          </div>
          <footer className="my-12 font-serif text-sm prose text-gray-400 dark:prose-invert">
            <p>
              This thing is{' '}
              <a href="https://github.com/Shpigford/joshpigford.com">open source</a>, for better or
              worse.
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
