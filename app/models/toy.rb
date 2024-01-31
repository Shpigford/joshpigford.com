class Toy < ApplicationRecord
  has_many_attached :images

  def to_param
    "#{id}-#{name.parameterize}"
  end
end
