Rails.application.routes.draw do
  root 'projects#index' # Sets the root route to the projects index page

  resources :projects do
    collection do
      patch :update_order
    end
  end

  post '/login', to: 'authentication#login'
  post '/signup', to: 'authentication#signup'

  # Mount ActiveStorage routes
  mount ActiveStorage::Engine => '/rails/active_storage'
end
