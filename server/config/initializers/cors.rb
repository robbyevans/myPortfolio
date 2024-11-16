Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Split the CLIENT_ORIGIN environment variable by commas and strip any whitespace
    origins ENV['CLIENT_ORIGIN'].split(',').map(&:strip)
    
    resource '*',
      headers: :any,
      expose: ['Content-Disposition', 'Content-Type'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
