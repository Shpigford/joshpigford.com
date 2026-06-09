class ToysController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    set_meta(title: "Toys")
    render inertia: "Toys/Index"
  end

  def new
    render inertia: "Toys/New"
  end

  def show
    @toy = Toy.find_by(id: params[:id])
    set_meta(title: @toy.name)
    render inertia: "Toys/Show", props: {
      toy: {
        param: @toy.to_param,
        name: @toy.name,
        artist: @toy.artist,
        manufacturer: @toy.manufacturer,
        platform: @toy.platform,
        series: @toy.series,
        size: @toy.size,
        color: @toy.color,
        releaseYear: @toy.release_date.strftime("%Y"),
        originalPrice: @toy.original_price,
        images: @toy.images.map { |image| url_for(image.variant(resize_to_fill: [800, 800])) }
      }
    }
  end

  def create
    @toy = Toy.new(toy_params)
    if @toy.save
      redirect_to @toy
    else
      redirect_to new_toy_path, inertia: { errors: @toy.errors.to_hash(true) }
    end
  end

  private

  def toy_params
    params.require(:toy).permit(:name, :description, :artist, :manufacturer, :release_date, :size, :platform, :color, :series, :original_price, images: [])
  end
end
