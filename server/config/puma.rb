max_threads_count = ENV.fetch('RAILS_MAX_THREADS', 5).to_i
min_threads_count = ENV.fetch('RAILS_MIN_THREADS', max_threads_count).to_i
threads min_threads_count, max_threads_count

# Listen on Fly’s PORT
port ENV.fetch('PORT', 8080)

environment ENV.fetch('RACK_ENV') { ENV.fetch('RAILS_ENV', 'production') }
workers ENV.fetch('WEB_CONCURRENCY', 0).to_i
preload_app!

plugin :tmp_restart
