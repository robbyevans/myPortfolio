class ApplicationController < ActionController::API
  include Rails.application.routes.url_helpers

  private

  def authorize_request
    header = request.headers['Authorization']
    Rails.logger.info("Authorization Header: #{header}")

    if header.present?
      token = header.split(' ').last # Extract the token from the header
      begin
        decoded = jwt_decode(token)
        @current_user = User.find(decoded[:user_id])
      rescue ActiveRecord::RecordNotFound => e
        Rails.logger.error("User not found: #{e.message}")
        render json: { error: 'Unauthorized' }, status: :unauthorized
      rescue JWT::DecodeError => e
        Rails.logger.error("JWT Decode Error: #{e.message}")
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    else
      Rails.logger.error("Missing Authorization Header")
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  # Decode JWT
  def jwt_decode(token)
    decoded = JWT.decode(token, Rails.application.secret_key_base)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError => e
    Rails.logger.error("Invalid Token: #{e.message}")
    raise
  end

  # Set default URL options
  def default_url_options
    { host: URI.parse(ENV['API_URL']).host, protocol: URI.parse(ENV['API_URL']).scheme }
  end
end
