import { Link } from '@inertiajs/react'
import ArticleForm, { type ArticleFormValues } from './Form'

export default function Edit({ article }: { article: ArticleFormValues }) {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/articles">Articles</Link>
        </nav>
        <h1 className="font-serif text-4xl">Edit '{article.title}'</h1>
      </div>

      <ArticleForm article={article} />
    </>
  )
}
