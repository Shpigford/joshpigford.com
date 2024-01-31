class Podcast < ApplicationRecord
  validates :name, :link, presence: true
end
