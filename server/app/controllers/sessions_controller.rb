
class SessionsController < ApplicationController
  def create
    username = params[:username]
    password = params[:password]

    if username == ENV['ADMIN_USERNAME'] && password == ENV['ADMIN_PASSWORD']
      render json: { token: ENV['ADMIN_TOKEN'] }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end
end
