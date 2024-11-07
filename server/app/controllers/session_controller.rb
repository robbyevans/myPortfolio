class SessionsController < ApplicationController
  def create
    if params[:password] == ENV['ADMIN_PASSWORD']
      render json: { token: ENV['ADMIN_TOKEN'] }
    else
      render json: { error: 'Invalid password' }, status: :unauthorized
    end
  end
end
