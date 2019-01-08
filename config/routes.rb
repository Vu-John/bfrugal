Rails.application.routes.draw do
  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'sign_in',
               sign_out: 'sign_out',
               registration: 'sign_up'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }

  resources :items, only: %i[destroy]
  resources :users, only: %i[show destroy]
  resource :user_items, only: %i[create]
  get 'my_items', to: 'users#my_items'

  # Pass anything that doesn’t match to index.html so that react-router can take over
  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
