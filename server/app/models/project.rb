class Project < ApplicationRecord
  has_many_attached :images

  validate :images_type

  # Add default scope to order projects by position
  default_scope { order(:position) }

  private

  def images_type
    images.each do |image|
      unless image.content_type.in?(%w[image/jpeg image/png image/svg+xml image/gif image/webp])
        errors.add(:images, 'must be JPEG, PNG, SVG, GIF, or WEBP')
      end
    end
  end
end
