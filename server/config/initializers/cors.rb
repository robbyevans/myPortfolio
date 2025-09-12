# Be sure to restart after changing secrets
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*ENV.fetch('CLIENT_ORIGIN', '').split(',').map(&:strip))
    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             expose: %w[Authorization],
             credentials: false
  end
end
