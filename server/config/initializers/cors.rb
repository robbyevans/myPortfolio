# Be safe if CLIENT_ORIGIN is empty: no origins allowed instead of crashing.
origins_list = ENV.fetch('CLIENT_ORIGIN', '')
origins_arr  = origins_list.split(',').map(&:strip).reject(&:empty?)

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*origins_arr)
    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             expose: %w[Authorization]
  end
end
