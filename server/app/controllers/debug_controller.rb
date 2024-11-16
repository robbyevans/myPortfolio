class DebugController < ApplicationController
  before_action :restrict_access

  # GET /debug/cors_origins
  def cors_origins
    allowed_origins = ENV.fetch('CLIENT_ORIGIN', '').split(',').map(&:strip)
    render json: { allowed_origins: allowed_origins }, status: :ok
  end

  private

  def restrict_access
    # Allow access only in development or with a valid debug_token
    unless Rails.env.development? || params[:debug_token] == ENV['DEBUG_TOKEN']
      render json: { error: 'Forbidden' }, status: :forbidden
    end
  end
end
