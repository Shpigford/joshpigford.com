import { useForm, usePage } from '@inertiajs/react'
import type { FormEvent } from 'react'
import type { SharedProps } from '@/types'

export default function RegistrationsNew() {
  const { errors } = usePage<SharedProps>().props
  const form = useForm({
    user: { email: '', password: '', password_confirmation: '' },
  })

  function setUserField(field: keyof typeof form.data.user, value: string) {
    form.setData('user', { ...form.data.user, [field]: value })
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    form.post('/registration')
  }

  return (
    <>
      <h1 className="text-3xl font-serif">Sign up</h1>

      <form onSubmit={submit}>
        {Object.values(errors)
          .flat()
          .map((message, index) => (
            <div key={index}>{message}</div>
          ))}

        <div className="mb-4">
          <label htmlFor="user_email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="user[email]"
            id="user_email"
            value={form.data.user.email}
            onChange={(e) => setUserField('email', e.target.value)}
            className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="user_password" className="block text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="user[password]"
            id="user_password"
            value={form.data.user.password}
            onChange={(e) => setUserField('password', e.target.value)}
            className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="user_password_confirmation" className="block text-sm font-bold mb-2">
            Password confirmation
          </label>
          <input
            type="password"
            name="user[password_confirmation]"
            id="user_password_confirmation"
            value={form.data.user.password_confirmation}
            onChange={(e) => setUserField('password_confirmation', e.target.value)}
            className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
          />
        </div>

        <div className="flex items-center justify-between">
          <input
            type="submit"
            value="Sign up"
            className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </>
  )
}
