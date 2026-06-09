import './application.css'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import type { ComponentType, ReactNode } from 'react'
import Layout from '@/layouts/Layout'

type Page = ComponentType & {
  layout?: (page: ReactNode) => ReactNode
}

const pages = import.meta.glob<{ default: Page }>('../pages/**/*.tsx')

void createInertiaApp({
  title: (title) => (title ? `${title} - Josh Pigford` : 'Josh Pigford'),

  resolve: async (name) => {
    const loader = pages[`../pages/${name}.tsx`]
    if (!loader) throw new Error(`Unknown Inertia page: ${name}`)
    const { default: page } = await loader()
    page.layout ??= (children) => <Layout>{children}</Layout>
    return page
  },

  setup({ el, App, props }) {
    const app = <App {...props} />
    // Server-side: el is null. Return the element so the plugin can render it
    // to a string. Client-side: hydrate if SSR HTML is present, otherwise mount.
    if (!el) return app
    if (el.hasChildNodes()) {
      hydrateRoot(el, app)
    } else {
      createRoot(el).render(app)
    }
    return app
  },
})
