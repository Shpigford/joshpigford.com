import { useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

export interface InvestmentFormValues {
  id: number
  company: string | null
  link: string | null
  year: number | null
  amount: number | null
  about: string | null
}

function humanize(field: string) {
  const spaced = field.replace(/_/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export default function InvestmentForm({ investment }: { investment?: InvestmentFormValues }) {
  const form = useForm({
    company: investment?.company ?? '',
    link: investment?.link ?? '',
    year: investment?.year?.toString() ?? '',
    amount: investment?.amount?.toString() ?? '',
    about: investment?.about ?? '',
  })

  form.transform((data) => ({ investment: data }))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (investment) {
      form.patch(`/investments/${investment.id}`)
    } else {
      form.post('/investments')
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
        <label htmlFor="investment_company" className="block text-sm font-bold mb-2">
          Company
        </label>
        <input
          type="text"
          id="investment_company"
          value={form.data.company}
          onChange={(e) => form.setData('company', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="investment_link" className="block text-sm font-bold mb-2">
          Link
        </label>
        <input
          type="url"
          id="investment_link"
          value={form.data.link}
          onChange={(e) => form.setData('link', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="investment_year" className="block text-sm font-bold mb-2">
          Year
        </label>
        <input
          type="number"
          id="investment_year"
          value={form.data.year}
          onChange={(e) => form.setData('year', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="investment_amount" className="block text-sm font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          id="investment_amount"
          step={0.01}
          value={form.data.amount}
          onChange={(e) => form.setData('amount', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="investment_about" className="block text-sm font-bold mb-2">
          About
        </label>
        <textarea
          id="investment_about"
          rows={5}
          value={form.data.about}
          onChange={(e) => form.setData('about', e.target.value)}
          className="appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-none focus:ring-0 border-0"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {investment ? 'Update Investment' : 'Add Investment'}
        </button>
      </div>
    </form>
  )
}
