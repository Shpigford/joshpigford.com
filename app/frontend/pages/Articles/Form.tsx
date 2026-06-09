import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

export interface ArticleFormValues {
  title: string
  slug: string
  body: string
  publishAt: string
}

function humanize(field: string) {
  const spaced = field.replace(/_/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export default function ArticleForm({ article }: { article?: ArticleFormValues }) {
  const form = useForm({
    title: article?.title ?? '',
    slug: article?.slug ?? '',
    body: article?.body ?? '',
    publish_at: article?.publishAt ?? '',
  })

  form.transform((data) => ({ article: data }))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (article) {
      form.patch(`/articles/${article.slug}`)
    } else {
      form.post('/articles')
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
        <label htmlFor="article_title" className="block text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="article_title"
          value={form.data.title}
          onChange={(e) => form.setData('title', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="article_slug" className="block text-sm font-bold mb-2">
          Slug
        </label>
        <input
          type="text"
          id="article_slug"
          value={form.data.slug}
          onChange={(e) => form.setData('slug', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="article_body" className="block text-sm font-bold mb-2">
          Body
        </label>
        <textarea
          id="article_body"
          rows={10}
          value={form.data.body}
          onChange={(e) => form.setData('body', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="article_publish_at" className="block text-sm font-bold mb-2">
          Publish at
        </label>
        <input
          type="datetime-local"
          id="article_publish_at"
          value={form.data.publish_at}
          onChange={(e) => form.setData('publish_at', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {article ? 'Update Article' : 'Add Article'}
        </button>
      </div>
    </form>
  )
}
