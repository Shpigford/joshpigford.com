import { Link } from '@inertiajs/react'
import ArticleForm from './Form'

export default function New() {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/articles">Articles</Link>
        </nav>
        <h1 className="font-serif text-4xl">Add a new article</h1>
      </div>

      <ArticleForm />
    </>
  )
}
