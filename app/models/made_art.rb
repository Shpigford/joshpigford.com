class MadeArt < ApplicationRecord
  has_many_attached :images
  
  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true
  
  before_validation :generate_slug, on: :create
  
  scope :by_series, -> { order(:series_name, :year) }
  
  def to_param
    slug
  end
  
  private
  
  def generate_slug
    return if slug.present?
    return unless title.present?
    
    base_slug = title.parameterize
    counter = 1
    
    loop do
      candidate_slug = counter == 1 ? base_slug : "#{base_slug}-#{counter}"
      unless MadeArt.exists?(slug: candidate_slug)
        self.slug = candidate_slug
        break
      end
      counter += 1
    end
  end
end