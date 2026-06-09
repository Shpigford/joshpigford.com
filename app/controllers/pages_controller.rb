class PagesController < ApplicationController
  def home
    render inertia: "Home"
  end
end
