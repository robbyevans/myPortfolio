# /server/app/controllers/debug_controller.rb

class DebugController < ApplicationController
  # It's advisable to restrict access to this action.
  # For example, only allow access in development or via authentication.
  before_action :restrict_access

  # GET /debug/cors_origins
  def cors_origins
    allowed_origins = ENV.fetch('CLIENT_ORIGIN', '').split(',').map(&:strip)
    render json: { allowed_origins: allowed_origins }, status: :ok
  end

  private

  def restrict_access
    # Example Restriction:
    # Only allow access if a specific query parameter is present.
    # You can implement more secure methods like API keys or authentication.
    unless Rails.env.development? || params[:debug_token] == ENV['DEBUG_TOKEN']
      render json: { error: 'Forbidden' }, status: :forbidden
    end
  end
end
