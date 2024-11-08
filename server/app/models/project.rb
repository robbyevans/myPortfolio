class Project < ApplicationRecord
  has_many_attached :images

  validate :images_type

  private

  def images_type
    images.each do |image|
      if !image.content_type.in?(%w[image/jpeg image/png image/gif])
        errors.add(:images, 'must be JPEG, PNG, or GIF')
      end
    end
  end
end
