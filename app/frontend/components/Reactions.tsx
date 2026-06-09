import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import type { GuestbookEntry } from '@/types'

// Handles emoji reactions: optimistic count bump + fire-and-forget persist,
// plus an absurdly dramatic eruption of the clicked emoji.
// Plain fetch (not an Inertia visit) so concurrent clicks never abort each
// other and nothing re-renders the page — only the clicked emoji's count changes.

function persist(url: string) {
  const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content
  fetch(url, {
    method: 'POST',
    headers: { 'X-CSRF-Token': token || '' },
    credentials: 'same-origin',
  }).catch(() => {})
}

function sprite(emoji: string, x: number, y: number, size: number) {
  const el = document.createElement('div')
  el.textContent = emoji
  el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:${size}px;line-height:1;pointer-events:none;z-index:9999;will-change:transform,opacity;user-select:none;`
  document.body.appendChild(el)
  return el
}

// A swarm member that rockets off in a random direction, spinning and fading.
function particle(emoji: string, x: number, y: number) {
  const el = sprite(emoji, x, y, 18 + Math.random() * 36)
  const angle = Math.random() * Math.PI * 2
  const distance = 160 + Math.random() * 480
  const dx = Math.cos(angle) * distance
  const dy = Math.sin(angle) * distance - 120
  const spin = Math.random() * 1440 - 720

  const anim = el.animate(
    [
      { transform: 'translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(0.2)', opacity: 1 },
      {
        transform: `translate(-50%, -50%) translate(${dx}px, ${dy + 260}px) rotate(${spin}deg) scale(1)`,
        opacity: 0,
      },
    ],
    { duration: 900 + Math.random() * 900, easing: 'cubic-bezier(.17,.67,.36,1)' }
  )
  anim.onfinish = () => el.remove()
}

// One enormous emoji that punches in over the whole screen, wobbles, then vanishes.
function giant(emoji: string, x: number, y: number, duration: number) {
  const el = sprite(emoji, x, y, 80)
  el.style.zIndex = '10000'
  const anim = el.animate(
    [
      { transform: 'translate(-50%, -50%) scale(0.1) rotate(-20deg)', opacity: 0, offset: 0 },
      { transform: 'translate(-50%, -50%) scale(6) rotate(12deg)', opacity: 1, offset: 0.35 },
      { transform: 'translate(-50%, -50%) scale(5) rotate(-8deg)', opacity: 1, offset: 0.6 },
      { transform: 'translate(-50%, -50%) scale(9) rotate(0deg)', opacity: 0, offset: 1 },
    ],
    { duration, easing: 'cubic-bezier(.18,.89,.32,1.28)' }
  )
  anim.onfinish = () => el.remove()
}

// Shake the guestbook itself — NOT document.body. A transform on an ancestor
// of the sprites would make it their containing block and break fixed positioning.
function shake(root: HTMLElement | null) {
  root?.animate(
    [
      { transform: 'translate(0,0)' },
      { transform: 'translate(-8px, 6px) rotate(-1deg)' },
      { transform: 'translate(7px, -5px) rotate(1deg)' },
      { transform: 'translate(-5px, 4px) rotate(-0.5deg)' },
      { transform: 'translate(4px, -3px)' },
      { transform: 'translate(0,0)' },
    ],
    { duration: 450, easing: 'ease-in-out' }
  )
}

function blast(emoji: string, button: HTMLElement, root: HTMLElement | null) {
  const rect = button.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    giant(emoji, x, y, 600)
    return
  }

  shake(root)
  giant(emoji, x, y, 1100)
  for (let i = 0; i < 48; i++) particle(emoji, x, y)
}

export default function Reactions({
  entry,
  rootRef,
}: {
  entry: GuestbookEntry
  rootRef: RefObject<HTMLDivElement | null>
}) {
  // Optimistic bumps layered on top of the server counts; fresh props
  // (after any full Inertia visit) reset to what the server has.
  const [bumps, setBumps] = useState<Record<string, number>>({})

  useEffect(() => setBumps({}), [entry.reactions])

  const fire = (emoji: string, button: HTMLButtonElement) => {
    setBumps((prev) => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }))
    persist(`/guestbook/${entry.id}/react?emoji=${encodeURIComponent(emoji)}`)
    blast(emoji, button, rootRef.current)
  }

  return (
    <div id={`reactions-${entry.id}`} className="flex flex-wrap items-center gap-1 not-prose">
      {entry.reactionEmojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className="px-1 py-0.5 text-sm rounded hover:bg-neutral-800"
          onClick={(event) => fire(emoji, event.currentTarget)}
        >
          {emoji}{' '}
          <span className="text-neutral-500">
            {(entry.reactions[emoji] || 0) + (bumps[emoji] || 0)}
          </span>
        </button>
      ))}
    </div>
  )
}
