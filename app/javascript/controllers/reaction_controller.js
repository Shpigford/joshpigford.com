import { Controller } from "@hotwired/stimulus"

// Handles emoji reactions: optimistic count bump + fire-and-forget persist,
// plus an absurdly dramatic eruption of the clicked emoji.
// Fetch (not a Turbo form) so concurrent clicks never abort each other and
// nothing re-renders the whole bar — only the clicked emoji's count changes.
export default class extends Controller {
  fire(event) {
    const button = event.currentTarget
    const emoji = button.dataset.emoji
    if (!emoji) return

    // Optimistic: bump this emoji's count immediately, independent of the server.
    const count = button.querySelector("[data-reaction-count]")
    if (count) count.textContent = (parseInt(count.textContent, 10) || 0) + 1

    this.#persist(button.dataset.url)
    this.#blast(emoji, button)
  }

  #persist(url) {
    const token = document.querySelector('meta[name="csrf-token"]')?.content
    fetch(url, {
      method: "POST",
      headers: { "X-CSRF-Token": token || "" },
      credentials: "same-origin"
    }).catch(() => {})
  }

  #blast(emoji, button) {
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.#giant(emoji, x, y, 600)
      return
    }

    this.#shake()
    this.#giant(emoji, x, y, 1100)
    for (let i = 0; i < 48; i++) this.#particle(emoji, x, y)
  }

  // A swarm member that rockets off in a random direction, spinning and fading.
  #particle(emoji, x, y) {
    const el = this.#sprite(emoji, x, y, 18 + Math.random() * 36)
    const angle = Math.random() * Math.PI * 2
    const distance = 160 + Math.random() * 480
    const dx = Math.cos(angle) * distance
    const dy = Math.sin(angle) * distance - 120
    const spin = (Math.random() * 1440 - 720)

    const anim = el.animate(
      [
        { transform: "translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(0.2)", opacity: 1 },
        { transform: `translate(-50%, -50%) translate(${dx}px, ${dy + 260}px) rotate(${spin}deg) scale(1)`, opacity: 0 }
      ],
      { duration: 900 + Math.random() * 900, easing: "cubic-bezier(.17,.67,.36,1)" }
    )
    anim.onfinish = () => el.remove()
  }

  // One enormous emoji that punches in over the whole screen, wobbles, then vanishes.
  #giant(emoji, x, y, duration) {
    const el = this.#sprite(emoji, x, y, 80)
    el.style.zIndex = "10000"
    const anim = el.animate(
      [
        { transform: "translate(-50%, -50%) scale(0.1) rotate(-20deg)", opacity: 0, offset: 0 },
        { transform: "translate(-50%, -50%) scale(6) rotate(12deg)", opacity: 1, offset: 0.35 },
        { transform: "translate(-50%, -50%) scale(5) rotate(-8deg)", opacity: 1, offset: 0.6 },
        { transform: "translate(-50%, -50%) scale(9) rotate(0deg)", opacity: 0, offset: 1 }
      ],
      { duration, easing: "cubic-bezier(.18,.89,.32,1.28)" }
    )
    anim.onfinish = () => el.remove()
  }

  #sprite(emoji, x, y, size) {
    const el = document.createElement("div")
    el.textContent = emoji
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:${size}px;line-height:1;pointer-events:none;z-index:9999;will-change:transform,opacity;user-select:none;`
    document.body.appendChild(el)
    return el
  }

  // Shake the guestbook itself — NOT document.body. A transform on an ancestor
  // of the sprites would make it their containing block and break fixed positioning.
  #shake() {
    this.element.animate(
      [
        { transform: "translate(0,0)" },
        { transform: "translate(-8px, 6px) rotate(-1deg)" },
        { transform: "translate(7px, -5px) rotate(1deg)" },
        { transform: "translate(-5px, 4px) rotate(-0.5deg)" },
        { transform: "translate(4px, -3px)" },
        { transform: "translate(0,0)" }
      ],
      { duration: 450, easing: "ease-in-out" }
    )
  }
}
