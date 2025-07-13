class OwnedArtsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_owned_art, only: [:edit, :update, :destroy, :toggle_visibility]
  
  def new
    @owned_art = OwnedArt.new
  end
  
  def create
    @owned_art = OwnedArt.new(owned_art_params)
    
    if @owned_art.save
      redirect_to art_index_path
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def edit
  end
  
  def update
    if @owned_art.update(owned_art_params)
      redirect_to art_index_path
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    @owned_art.destroy!
    redirect_to art_index_path, status: :see_other
  end
  
  def toggle_visibility
    @owned_art.update!(visible: !@owned_art.visible)
    redirect_back(fallback_location: owned_art_path(@owned_art))
  end
  
  private
  
  def set_owned_art
    @owned_art = OwnedArt.find(params[:id])
  end
  
  def owned_art_params
    params.require(:owned_art).permit(:name, :description, :token_id, :contract_address, 
                                      :contract_name, :collection_name, :collection_slug, 
                                      :image_url, :visible, :external_url, :blockchain, 
                                      :token_type)
  end
end