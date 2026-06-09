class MadeArtsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_made_art, only: [:edit, :update, :destroy]

  def new
    render inertia: "MadeArts/New", props: { madeArt: made_art_form_props(MadeArt.new) }
  end

  def create
    @made_art = MadeArt.new(made_art_params)

    if @made_art.save
      redirect_to art_index_path
    else
      redirect_to new_made_art_path, inertia: { errors: @made_art.errors.to_hash(true) }
    end
  end

  def edit
    render inertia: "MadeArts/Edit", props: {
      madeArt: made_art_form_props(@made_art),
      param: @made_art.to_param,
      currentImages: @made_art.images.map { |image| url_for(image.variant(resize_to_fill: [150, 150])) }
    }
  end

  def update
    if @made_art.update(made_art_params)
      redirect_to art_index_path
    else
      redirect_to edit_made_art_path(@made_art), inertia: { errors: @made_art.errors.to_hash(true) }
    end
  end

  def destroy
    @made_art.destroy!
    redirect_to art_index_path, status: :see_other
  end

  private

  def set_made_art
    @made_art = MadeArt.find_by(slug: params[:id])
  end

  def made_art_form_props(made_art)
    {
      title: made_art.title,
      description: made_art.description,
      seriesName: made_art.series_name,
      year: made_art.year,
      medium: made_art.medium,
      dimensions: made_art.dimensions
    }
  end

  def made_art_params
    params.require(:made_art).permit(:title, :description, :series_name, :year,
                                     :medium, :dimensions, images: [])
  end
end
