Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch('CLIENT_ORIGIN', '').split(',').map(&:strip)
    
    # Temporary Logging
    Rails.logger.info "Allowed Origins: #{ENV.fetch('CLIENT_ORIGIN', '').split(',').map(&:strip)}"

    resource '*',
      headers: :any,
      expose: ['Content-Disposition', 'Content-Type'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
