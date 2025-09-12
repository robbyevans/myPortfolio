# db/seeds.rb
# Creates basic Project records without assuming exact column names.
# It will:
#  - Prefer a unique key on :title (fallback to :name if that's what your model uses)
#  - Only set attributes that actually exist on your Project model
#  - Be safely re-runnable (first_or_initialize when a key column is present)

raise 'Project model not found' unless defined?(Project)

# Figure out which column your model uses for the title/name
key_col = (%w[title name] & Project.column_names).first

def apply_attrs(record, attrs)
  # If your model uses :name instead of :title, this maps it automatically
  alias_attrs = attrs.dup
  alias_attrs[:name]  = attrs[:title] if attrs[:title]
  alias_attrs[:title] = attrs[:name]  if attrs[:name]

  alias_attrs.each do |k, v|
    setter = "#{k}="
    record.public_send(setter, v) if record.respond_to?(setter)
  end
end

projects = [
  {
    title: 'Kodi (Property Management System)',
    description: 'Multi-tenant property management platform for landlords to manage properties, units, tenants, and rent payments. Real-time payment notifications with ActionCable/Redis; automated monthly billing with Sidekiq.',
    live_url: 'https://kodi-2ti.pages.dev/',
    tech_stack: %w[React TypeScript Styled-Components Ruby-on-Rails Redis Sidekiq ActionCable]
  },
  {
    title: 'TurfZone',
    description: 'Booking marketplace for football pitches with search filters, booking workflows, and payment integration.',
    live_url: 'https://turfzone.vercel.app/#',
    tech_stack: %w[React Ruby-on-Rails PostgreSQL]
  },
  {
    title: 'Rick-Morty Explorer',
    description: 'Single-page app consuming the Rick and Morty API with infinite scroll, character filtering, and dynamic routing.',
    live_url: 'https://rickmorty.pages.dev/',
    tech_stack: %w[React JavaScript SCSS]
  },
  {
    title: 'Personal Portfolio',
    description: 'Personal portfolio showcasing projects and posts; optimized for SEO and mobile-first performance.',
    live_url: 'https://kiprop.pages.dev/',
    tech_stack: %w[React JavaScript]
  }
]

projects.each do |attrs|
  record =
    if key_col
      Project.where(key_col => attrs[:title]).first_or_initialize
    else
      Project.new
    end

  apply_attrs(record, attrs)
  record.save!
end

puts "Seeded #{projects.size} projects."
