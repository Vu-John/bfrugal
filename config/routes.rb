Rails.application.routes.draw do
  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }

  resources :items, only: %i[destroy]
  resources :users
  resource :user_items, only: %i[create]
  get 'my_items', to: 'users#my_items'

  # Pass anything that doesn’t match to index.html so that react-router can take over
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
