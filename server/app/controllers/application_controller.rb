class ApplicationController < ActionController::API
  include Rails.application.routes.url_helpers

  private

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      decoded = jwt_decode(header)
      @current_user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def jwt_decode(token)
    decoded = JWT.decode(token, Rails.application.secret_key_base)[0]
    HashWithIndifferentAccess.new decoded
  end

  # Set default URL options
  def default_url_options
    { host: URI.parse(ENV['API_URL']).host, protocol: URI.parse(ENV['API_URL']).scheme }
  end
end
