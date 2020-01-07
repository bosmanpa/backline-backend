Rails.application.routes.draw do
  resources :equipment_models
  resources :equipment_types
  resources :equipment
  resources :equipment_rentals
  resources :events
  resources :owned_equipments
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
