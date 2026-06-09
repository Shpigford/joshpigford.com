import { Link } from '@inertiajs/react'
import InvestmentForm from './Form'

export default function New() {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <Link href="/investments">Investments</Link>
        </nav>
        <h1 className="font-serif text-4xl">Add a new investment</h1>
      </div>

      <InvestmentForm />
    </>
  )
}
