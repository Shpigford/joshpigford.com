import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

const inputClasses =
  'appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0'

export default function GuestbookForm() {
  const form = useForm({ name: '', homepage: '', message: '', nickname: '' })

  const submit = (event: FormEvent) => {
    event.preventDefault()
    form.transform((data) => ({ guestbook_entry: data }))
    form.post('/guestbook', { onSuccess: () => form.reset() })
  }

  // Server errors arrive as arrays of full messages keyed by attribute.
  const errorMessages = Object.values(form.errors)
    .flat()
    .filter((message): message is string => typeof message === 'string')

  return (
    <form onSubmit={submit}>
      {errorMessages.length > 0 && (
        <div className="mb-4 text-red-400">
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="guestbook_entry_name" className="block text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="guestbook_entry_name"
          className={inputClasses}
          value={form.data.name}
          onChange={(event) => form.setData('name', event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="guestbook_entry_homepage" className="block text-sm font-bold mb-2">
          Homepage (optional)
        </label>
        <input
          type="url"
          id="guestbook_entry_homepage"
          placeholder="https://"
          className={inputClasses}
          value={form.data.homepage}
          onChange={(event) => form.setData('homepage', event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="guestbook_entry_message" className="block text-sm font-bold mb-2">
          Message
        </label>
        <textarea
          id="guestbook_entry_message"
          rows={4}
          className={inputClasses}
          value={form.data.message}
          onChange={(event) => form.setData('message', event.target.value)}
        />
      </div>

      {/* Honeypot: hidden from humans, bots tend to fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="guestbook_entry_nickname">Leave this field empty</label>
        <input
          type="text"
          id="guestbook_entry_nickname"
          tabIndex={-1}
          autoComplete="off"
          value={form.data.nickname}
          onChange={(event) => form.setData('nickname', event.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={form.processing}
          className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign the Guestbook
        </button>
      </div>
    </form>
  )
}
