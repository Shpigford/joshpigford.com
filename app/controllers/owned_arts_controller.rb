class OwnedArtsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_owned_art, only: [:edit, :update, :destroy, :toggle_visibility]

  def new
    render inertia: "OwnedArts/New", props: { ownedArt: owned_art_form_props(OwnedArt.new) }
  end

  def create
    @owned_art = OwnedArt.new(owned_art_params)

    if @owned_art.save
      redirect_to art_index_path
    else
      redirect_to new_owned_art_path, inertia: { errors: @owned_art.errors.to_hash(true) }
    end
  end

  def edit
    render inertia: "OwnedArts/Edit", props: {
      ownedArt: owned_art_form_props(@owned_art),
      param: @owned_art.to_param
    }
  end

  def update
    if @owned_art.update(owned_art_params)
      redirect_to art_index_path
    else
      redirect_to edit_owned_art_path(@owned_art), inertia: { errors: @owned_art.errors.to_hash(true) }
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

  def owned_art_form_props(owned_art)
    {
      name: owned_art.name,
      description: owned_art.description,
      tokenId: owned_art.token_id,
      contractAddress: owned_art.contract_address,
      contractName: owned_art.contract_name,
      collectionName: owned_art.collection_name,
      collectionSlug: owned_art.collection_slug,
      imageUrl: owned_art.image_url,
      visible: owned_art.visible,
      externalUrl: owned_art.external_url,
      blockchain: owned_art.blockchain,
      tokenType: owned_art.token_type
    }
  end

  def owned_art_params
    params.require(:owned_art).permit(:name, :description, :token_id, :contract_address,
                                      :contract_name, :collection_name, :collection_slug,
                                      :image_url, :visible, :external_url, :blockchain,
                                      :token_type)
  end
end
