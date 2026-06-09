class SessionsController < ApplicationController
  def new
    render inertia: "Sessions/New"
  end

  def create
    if user = User.authenticate_by(email: params[:email], password: params[:password])
      login user
      redirect_to root_path
    else
      redirect_to new_session_path, alert: "Invalid email or password."
    end
  end

  def destroy
    logout
    redirect_to root_path, notice: "You have been logged out."
  end
end

