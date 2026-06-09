import { Head, Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

interface InvestmentListItem {
  id: number
  company: string | null
  link: string | null
  year: number | null
  amount: string | null
  about: string | null
}

export default function Index({ investments }: { investments: InvestmentListItem[] }) {
  const { auth } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Investments" />

      <div className="flex items-start">
        <h1 className="font-serif text-4xl">Investments</h1>
        {auth.user && (
          <span className="mt-2 ml-4">
            <Link href="/investments/new">Add New Investment</Link>
          </span>
        )}
      </div>
      <p className="mt-0 text-lg">
        I've been doing tiny investments in startups since 2021, primarily to just get my feet wet
        and to diversify my high-level personal finance holdings. Here are the investments I've
        made.
      </p>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Year</th>
            <th>Amount</th>
            <th>About</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {investments.map((investment) => (
            <tr key={investment.id}>
              <td className="px-2 py-3">
                <a href={investment.link ?? undefined} className="thick-link">
                  {investment.company}
                </a>
              </td>
              <td>{investment.year}</td>
              <td>{investment.amount}</td>
              <td>{investment.about}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
