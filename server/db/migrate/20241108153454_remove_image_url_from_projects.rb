# db/migrate/20241108153454_remove_image_url_from_projects.rb
class RemoveImageUrlFromProjects < ActiveRecord::Migration[7.0]
  def change
    remove_column :projects, :image_url, :string if column_exists?(:projects, :image_url)
  end
end
