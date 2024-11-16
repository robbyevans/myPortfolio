Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Fetch and parse the CLIENT_ORIGIN environment variable
    parsed_origins = ENV['CLIENT_ORIGIN'].to_s.split(',').map(&:strip)

    # Log the parsed origins for debugging purposes
    Rails.logger.info "CORS Allowed Origins: #{parsed_origins.join(', ')}"

    # Configure Rack::Cors with the parsed origins
    origins parsed_origins

    resource '*',
      headers: :any,
      expose: ['Content-Disposition', 'Content-Type'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
