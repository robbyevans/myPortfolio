Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Replace with env variable 
    origins 'https://portfolio-frontend-q4sa.onrender.com', 'https://evans-99l.pages.dev', 'http://localhost:5173/'
   

    resource '*',
      headers: :any,
      expose: ['Content-Disposition', 'Content-Type'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
