import { Controller } from "@hotwired/stimulus"

// Toggles a cheesy 1999 aesthetic on the guestbook, remembered in localStorage.
export default class extends Controller {
  static targets = ["root", "button"]

  connect() {
    if (localStorage.getItem("guestbookRetro") === "on") this.enable()
  }

  toggle() {
    this.rootTarget.classList.contains("retro-mode") ? this.disable() : this.enable()
  }

  enable() {
    this.rootTarget.classList.add("retro-mode")
    localStorage.setItem("guestbookRetro", "on")
    if (this.hasButtonTarget) this.buttonTarget.textContent = "🛑 Exit Retro Mode"
  }

  disable() {
    this.rootTarget.classList.remove("retro-mode")
    localStorage.setItem("guestbookRetro", "off")
    if (this.hasButtonTarget) this.buttonTarget.textContent = "🪩 Retro Mode"
  }
}
