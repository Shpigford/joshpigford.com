import { Head, router, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import GuestbookForm from '@/components/GuestbookForm'
import Reactions from '@/components/Reactions'
import { flagEmoji } from '@/lib/flagEmoji'
import type { GuestbookEntry, PendingGuestbookEntry, SharedProps } from '@/types'

// <marquee> is deprecated (which is the point) so React's types don't know it.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { behavior?: string },
        HTMLElement
      >
    }
  }
}

// Toggles a cheesy 1999 aesthetic on the guestbook, remembered in localStorage.
function useRetroMode() {
  const [retro, setRetro] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('guestbookRetro') === 'on') setRetro(true)
  }, [])

  const toggle = () => {
    const next = !retro
    localStorage.setItem('guestbookRetro', next ? 'on' : 'off')
    setRetro(next)
  }

  return { retro, toggle }
}

interface Props {
  entries: GuestbookEntry[]
  signatureCount: number
  pending?: PendingGuestbookEntry[]
}

export default function Index({ entries, signatureCount, pending }: Props) {
  const page = usePage<SharedProps>()
  const user = page.props.auth.user
  const notice = page.flash?.notice as string | undefined
  const alert = page.flash?.alert as string | undefined

  const { retro, toggle } = useRetroMode()
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Head title="Guestbook" />

      <div ref={rootRef} className={retro ? 'retro-mode' : undefined}>
        <marquee className="retro-only retro-marquee" behavior="alternate">
          ★彡 Welcome to my corner of the web — sign my guestbook! 彡★
        </marquee>

        <div className="flex items-start justify-between">
          <h1 className="font-serif text-4xl">Guestbook</h1>
          <button
            type="button"
            onClick={toggle}
            className="px-2 py-1 text-sm border border-neutral-700 rounded not-prose hover:border-gold-500"
          >
            {retro ? '🛑 Exit Retro Mode' : '🪩 Retro Mode'}
          </button>
        </div>
        <p className="mt-0 text-lg">
          Like it's 1999. Sign the book, leave a note, link your homepage. Be nice — entries are
          checked before they show up.
        </p>

        {notice && (
          <div className="px-4 py-2 mb-6 text-black bg-gold-400 rounded not-prose">{notice}</div>
        )}
        {alert && (
          <div className="px-4 py-2 mb-6 text-white bg-red-600 rounded not-prose">{alert}</div>
        )}

        <div className="p-5 mb-12 border border-neutral-800 rounded not-prose">
          <GuestbookForm />
        </div>

        {user && pending && pending.length > 0 && (
          <>
            <h2>Awaiting review</h2>
            {pending.map((entry) => (
              <div key={entry.id} className="p-3 mb-3 border border-neutral-700 rounded not-prose">
                <p className="font-bold">
                  {entry.name}{' '}
                  <span className="ml-2 text-xs uppercase text-neutral-400">[{entry.status}]</span>
                </p>
                <p className="text-neutral-300">{entry.message}</p>
                {entry.moderationReason && (
                  <p className="text-xs text-neutral-500">Reason: {entry.moderationReason}</p>
                )}
                <div className="flex gap-2 mt-2 text-sm">
                  <button
                    type="button"
                    className="underline"
                    onClick={() => router.patch(`/guestbook/${entry.id}/approve`)}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="underline"
                    onClick={() => router.patch(`/guestbook/${entry.id}/reject`)}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="underline"
                    onClick={() => router.delete(`/guestbook/${entry.id}`)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="flex items-baseline gap-3">
          <h2 className="retro-blink">Signatures</h2>
          <span
            className="px-2 py-1 font-mono text-sm rounded text-gold-400 bg-neutral-900 not-prose"
            title="Total signatures"
          >
            #{String(signatureCount).padStart(6, '0')}
          </span>
        </div>

        {entries.length > 0 ? (
          entries.map((entry, index) => {
            const flag = flagEmoji(entry.countryCode)

            return (
              <div key={entry.id} id={`sig-${entry.id}`} className="pb-4 mb-4 border-b border-neutral-800">
                <p className="mb-1 font-bold">
                  <span className="mr-1 font-mono text-sm text-neutral-600">
                    #{signatureCount - index}
                  </span>{' '}
                  {entry.homepage ? (
                    <a href={entry.homepage} rel="nofollow ugc noopener noreferrer" target="_blank">
                      {entry.name}
                    </a>
                  ) : (
                    entry.name
                  )}
                  {flag && (
                    <>
                      {' '}
                      <span className="ml-1" title={`Signing from ${entry.countryCode}`}>
                        {flag}
                      </span>
                    </>
                  )}{' '}
                  <span className="ml-2 text-sm font-normal text-neutral-500">{entry.createdAt}</span>
                </p>
                <p className="m-0 whitespace-pre-line">{entry.message}</p>

                <div className="flex flex-wrap items-center gap-1 mt-2 not-prose">
                  <Reactions entry={entry} rootRef={rootRef} />
                  {user && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-red-500 underline"
                      onClick={() => router.delete(`/guestbook/${entry.id}`)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )
          })
        ) : (
          <p>No signatures yet. Be the first.</p>
        )}
      </div>
    </>
  )
}
