Rails.application.routes.draw do
  resources :projects do
    collection do
      patch :update_order
    end
  end
  post '/login', to: 'authentication#login'
  post '/signup', to: 'authentication#signup'
end
