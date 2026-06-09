class GuestbookEntry < ApplicationRecord
  attr_accessor :nickname # honeypot, never persisted

  # A deliberately absurd pool. Each entry draws its own fixed set from it.
  EMOJI_POOL = %w[
    🦖 🧦 🫠 🥒 🦆 🪿 🛹 🧅 🦷 🪦 🐌 🧂 🚽 🦴 🪳 🥏 🪤 🧌 🫧 🪼
    🦑 🥄 🪣 🧫 🩴 🪥 🚜 🛟 🦠 🥟 🪗 🦩 🧇 🪕 🫚 🧸 🪈 🦔 🥽 🪺
  ].freeze

  REACTION_COUNT = 5

  # One signature per IP per this window.
  RATE_LIMIT = 1.minute

  enum :status, { pending: "pending", approved: "approved", rejected: "rejected" }, default: :pending

  validates :name, presence: true, length: { maximum: 80 }
  validates :message, presence: true, length: { maximum: 1000 }
  validates :homepage, length: { maximum: 200 }

  scope :visible, -> { approved.order(created_at: :desc) }

  # Salted one-way hash so we throttle by IP without storing raw addresses.
  def self.digest_ip(ip)
    Digest::SHA256.hexdigest("guestbook:#{ip}:#{Rails.application.secret_key_base}")
  end

  def self.posted_recently?(ip_hash)
    where(ip_hash: ip_hash).where(created_at: RATE_LIMIT.ago..).exists?
  end

  # Stable per-entry set: seeded by id, so the same five emojis stick forever.
  def reaction_emojis
    return [] unless id

    EMOJI_POOL.shuffle(random: Random.new(id)).first(REACTION_COUNT)
  end

  def react!(emoji)
    return unless reaction_emojis.include?(emoji)

    with_lock do
      counts = reactions.dup
      counts[emoji] = counts.fetch(emoji, 0) + 1
      update!(reactions: counts)
    end
  end
end
