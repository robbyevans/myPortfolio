# app/controllers/authentication_controller.rb

class AuthenticationController < ApplicationController
  # POST /signup
  def signup
    user = User.new(user_params)
    if user.save
      token = jwt_encode(user_id: user.id)
      render json: { token: token, user: user.slice(:id, :email) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /login
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = jwt_encode(user_id: user.id)
      render json: { token: token, user: user.slice(:id, :email) }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end

  def jwt_encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secret_key_base)
  end
end
