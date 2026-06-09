import { Head, Link, router, usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

interface Article {
  title: string
  slug: string
  publishAt: string
  publishAtIso: string
  bodyHtml: string
}

export default function Show({ article }: { article: Article }) {
  const { auth } = usePage<SharedProps>().props

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://joshpigford.com/articles/${article.slug}`,
    },
    headline: article.title,
    author: {
      '@type': 'Person',
      name: 'Josh Pigford',
      url: 'https://joshpigford.com',
    },
    datePublished: article.publishAtIso,
  }

  return (
    <>
      <Head title={article.title} />

      <div>
        <nav aria-label="breadcrumb">
          <Link href="/articles">Articles</Link> <span className="text-gold-400">⦂⦚</span>
        </nav>
        <h1 className="mt-2 mb-0 font-serif text-4xl">{article.title}</h1>
        <span className="text-sm text-gray-500">{article.publishAt}</span>
        {auth.user && (
          <span className="flex space-x-2">
            <Link href={`/articles/${article.slug}/edit`} className="text-blue-500 no-thick-link">
              Edit
            </Link>
            <span> &bull;</span>
            <button
              className="text-red-500"
              onClick={() => {
                if (confirm('Are you sure?')) router.delete(`/articles/${article.slug}`)
              }}
            >
              Delete
            </button>
          </span>
        )}
      </div>

      <article dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  )
}
