import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

export default function SessionsNew() {
  const form = useForm({ email: '', password: '' })

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    form.post('/session')
  }

  return (
    <>
      <h1 className="text-3xl font-serif">Log in</h1>

      <form onSubmit={submit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
            className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
            className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
          />
        </div>

        <div className="flex items-center justify-between">
          <input
            type="submit"
            value="Sign in"
            className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </>
  )
}
