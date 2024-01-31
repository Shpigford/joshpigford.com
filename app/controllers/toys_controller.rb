class ToysController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @toys = Toy.all.order(:platform, :name)
  end

  def new
    @toy = Toy.new
  end

  def show
    @toy = Toy.find_by(id: params[:id])
  end

  def create
    @toy = Toy.new(toy_params)
    if @toy.save
      redirect_to @toy
    else
      render :new
    end
  end

  private

  def toy_params
    params.require(:toy).permit(:name, :description, :artist, :manufacturer, :release_date, :size, :platform, :color, :series, :original_price, images: [])
  end
end
