class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super { @token = current_token }
  end

  private

  def respond_with(resource, _opts = {})
    render json: {
      id: resource.id,
      firstName: resource.first_name,
      lastName: resource.last_name,
      email: resource.email,
      token: @token
    }
  end

  def respond_to_on_destroy
    head :no_content
  end

  def current_token
    request.env['warden-jwt_auth.token']
  end
end
