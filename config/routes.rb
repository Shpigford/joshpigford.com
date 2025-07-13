Rails.application.routes.draw do
  resource :registration
  resource :session

  resources :articles
  resources :projects
  resources :investments
  resources :podcasts
  resources :books
  resources :toys
  
  resources :art, only: [:index]
  get 'art/owned/:id', to: 'art#owned_show', as: :owned_art
  get 'art/made/:id', to: 'art#made_show', as: :made_art
  
  # Admin routes for managing art
  resources :owned_arts, except: [:index, :show] do
    member do
      patch :toggle_visibility
    end
  end
  resources :made_arts, except: [:index, :show]
  
  get "up" => "rails/health#show", as: :rails_health_check

  root "pages#home"
end
