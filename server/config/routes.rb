Rails.application.routes.draw do
  resources :projects
  post '/login', to: 'authentication#login'
  post '/signup', to: 'authentication#signup'
end
