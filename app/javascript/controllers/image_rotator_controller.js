import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["image"]

  connect() {
    super.connect() // Ensure the original connect logic is maintained
    this.currentIndex = 0
    this.showCurrentImage()
    this.startRotation()
    this.element.addEventListener('mouseenter', () => {
      this.pauseRotation()
      this.showStopIcon() // Show stop icon
    })
    this.element.addEventListener('mouseleave', () => {
      this.resumeRotation()
      this.hideStopIcon() // Hide stop icon
    })
  }

  startRotation() {
    this.rotationInterval = setInterval(() => {
      this.nextImage()
    }, 1000) // Corrected to rotate images every 3 seconds
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.imageTargets.length
    this.showCurrentImage()
  }

  showCurrentImage() {
    this.imageTargets.forEach((el, index) => {
      el.classList.toggle('hidden', index !== this.currentIndex)
    })
  }

  pauseRotation() {
    clearInterval(this.rotationInterval)
  }

  resumeRotation() {
    this.startRotation()
  }

  showStopIcon() {
    this.element.querySelector('.stop-icon').classList.remove('hidden')
  }

  hideStopIcon() {
    this.element.querySelector('.stop-icon').classList.add('hidden')
  }
}