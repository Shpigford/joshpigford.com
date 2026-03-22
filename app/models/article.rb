class Article < ApplicationRecord
  validates :title, :slug, :body, :publish_at, presence: true
  validates :slug, uniqueness: true
  validate :publish_at_year_is_reasonable

  def to_param
    slug
  end

  private

  def publish_at_year_is_reasonable
    if publish_at.present? && publish_at.year < 1900
      errors.add(:publish_at, "year must be 1900 or later")
    end
  end
end
