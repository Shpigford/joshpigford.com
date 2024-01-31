class Project < ApplicationRecord
  validates :name, :slug, :year, :description, :outcome, presence: true
  validates :slug, uniqueness: true

  def to_param
    slug
  end
end
