import { Link } from '@inertiajs/react'
import InvestmentForm, { type InvestmentFormValues } from './Form'

export default function Edit({ investment }: { investment: InvestmentFormValues }) {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/investments">Investments</Link>
        </nav>
        <h1 className="font-serif text-4xl">Edit '{investment.company}'</h1>
      </div>

      <InvestmentForm investment={investment} />
    </>
  )
}
