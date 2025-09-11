# syntax=docker/dockerfile:1

FROM ruby:3.1.2-slim as base

ENV RAILS_ENV=production RACK_ENV=production BUNDLE_WITHOUT="development:test"
ENV BUNDLE_PATH=/usr/local/bundle
ENV APP_HOME=/app

WORKDIR $APP_HOME

# System deps for pg and Active Storage variants
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential git curl pkg-config libvips libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Install gems first (layer cache)
COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v "~>2" && bundle install --jobs 4 --retry 3

# App code
COPY . .

# Rails logs to STDOUT
ENV RAILS_LOG_TO_STDOUT=true

# Expose Fly internal port
EXPOSE 8080

CMD ["bash", "-lc", "bundle exec puma -C config/puma.rb"]
