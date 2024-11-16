require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Code is not reloaded between requests.
  config.cache_classes = true

  # Cache store
  config.cache_store = :memory_store, { size: 128.megabytes }

  # Eager load code on boot.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local = false

  # Serve static files from `/public` and `/rails/active_storage`.
  config.public_file_server.enabled = ENV["RAILS_SERVE_STATIC_FILES"].present?

  # Add middleware for Active Storage local file serving.
  config.middleware.use Rack::Static, urls: ["/rails/active_storage"], root: "storage"

  # Use local storage for Active Storage.
  config.active_storage.service = :local

  # Default URL options for Active Storage and other helpers.
  config.action_controller.default_url_options = { host: 'portfolio-f0i5.onrender.com', protocol: 'https' }

  # Enable SSL for secure connections.
  config.force_ssl = true

  # Set log level to :info for production.
  config.log_level = :info

  # Prepend all log lines with request IDs.
  config.log_tags = [:request_id]

  # Enable I18n locale fallbacks.
  config.i18n.fallbacks = true

  # Suppress deprecation notices.
  config.active_support.report_deprecations = false

  # Use default logging formatter.
  config.log_formatter = ::Logger::Formatter.new

  # Log to STDOUT if `RAILS_LOG_TO_STDOUT` is set.
  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger           = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end

  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false
end
