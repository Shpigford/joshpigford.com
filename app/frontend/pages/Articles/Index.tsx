import { Head, Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

interface ArticleListItem {
  title: string
  slug: string
}

export default function Index({ articles }: { articles: ArticleListItem[] }) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Articles" />

      <div className="flex items-start">
        <h1 className="font-serif text-4xl">Articles</h1>
        {auth.user && (
          <span className="mt-2 ml-4">
            <Link href="/articles/new">Add New Article</Link>
          </span>
        )}
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
