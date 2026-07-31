const personSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Person',
  name: 'Josh Pigford',
  url: 'https://joshpigford.com',
  image: 'https://avatar.joshpigford.com',
  sameAs: [
    'https://twitter.com/Shpigford',
    'https://x.com/Shpigford',
    'https://joshpigford.com',
    'https://github.com/Shpigford',
    'https://www.linkedin.com/in/joshpigford/',
  ],
  jobTitle: 'CEO',
}

export default function Home() {
  return (
    <>
      <div className="font-serif prose dark:prose-invert">
        <p className="text-3xl">Dabbler. Currently building...an offensive number of things.</p>
        <ul className="text-xl mt-4">
          <li>
            <a href="https://granite.co">Granite</a> - A vault that knows your documents
          </li>
          <li>
            <a href="https://keptwell.org">KeptWell</a> - Your family's medical binder, replaced
          </li>
          <li>
            <a href="https://initialcommit.co">Initial Commit</a> - AI-native builder community
          </li>
          <li>
            <a href="https://knockoff.co">Knockoff</a> - Shopping filter for legitimate products
          </li>
          <li>
            <a href="https://superfantastictoys.com">Super Fantastic</a> - Toy store &amp; novelty
            collectibles
          </li>
        </ul>
        <p className="text-2xl">
          You can find me on social media as <a href="https://x.com/Shpigford">@Shpigford</a>.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}
