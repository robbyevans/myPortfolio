# db/migrate/20241108153454_remove_image_url_from_projects.rb
class RemoveImageUrlFromProjects < ActiveRecord::Migration[7.0]
  def up
    # On brand-new databases, this column doesn't exist yet — guard it.
    return unless column_exists?(:projects, :image_url)

    remove_column :projects, :image_url, :string
  end

  def down
    # Recreate it only if missing
    add_column :projects, :image_url, :string unless column_exists?(:projects, :image_url)
  end
end
