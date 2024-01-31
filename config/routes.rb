Rails.application.routes.draw do
  resource :registration
  resource :session

  resources :articles
  resources :projects
  resources :investments
  resources :podcasts
  resources :books
  resources :toys
  
  get "up" => "rails/health#show", as: :rails_health_check

  root "pages#home"
end
