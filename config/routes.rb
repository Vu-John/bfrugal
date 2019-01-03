Rails.application.routes.draw do
  resources :items
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
  resources :users
  resource :user_items, only: %i[create destroy]
  get 'my_items', to: 'users#my_items'
end
