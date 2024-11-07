Rails.application.routes.draw do
  resources :projects
  post '/login', to: 'sessions#create'
end
