class RegistrationsController < ApplicationController
  def new
    # If a user is already signed in, or if there are any users in the database, we redirect to the root path to prevent a user from registering a new account after the first user has already registered.
    redirect_to root_path and return if user_signed_in? || User.any?
    @user = User.new
  end

  def create
    return redirect_to root_path if User.any?

    @user = User.new(registration_params)
    if @user.save
      login @user
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def registration_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end

