class MadeArtsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_made_art, only: [:edit, :update, :destroy]
  
  def new
    @made_art = MadeArt.new
  end
  
  def create
    @made_art = MadeArt.new(made_art_params)
    
    if @made_art.save
      redirect_to art_index_path
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def edit
  end
  
  def update
    if @made_art.update(made_art_params)
      redirect_to art_index_path
    else
      render :edit, status: :unprocessable_entity
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
  
  def made_art_params
    params.require(:made_art).permit(:title, :description, :series_name, :year, 
                                     :medium, :dimensions, images: [])
  end
end