class Article < ApplicationRecord
  validates :title, :slug, :body, :publish_at, presence: true
  validates :slug, uniqueness: true

  def to_param
    slug
  end
end
