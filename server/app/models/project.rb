class Project < ApplicationRecord
  has_many_attached :images

  validates :name, presence: true
  validates :description, presence: true
  validates :live_link, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) }

  validate :images_type

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
