class ArtController < ApplicationController
  def index
    @sort_by = params[:sort] || 'random'

    owned_arts = if user_signed_in?
      OwnedArt.all
    else
      OwnedArt.visible
    end

    owned_arts = case @sort_by
    when 'name'
      owned_arts.order(:name)
    when 'collection'
      owned_arts.order(:collection_name, :name)
    when 'blockchain'
      owned_arts.order(:blockchain, :name)
    else
      owned_arts.order(Arel.sql('RANDOM()'))
    end

    set_meta(title: "Art")
    render inertia: "Art/Index", props: {
      sortBy: @sort_by,
      ownedArts: owned_arts.map do |art|
        {
          id: art.id,
          param: art.to_param,
          name: art.name,
          imageUrl: art.image_url,
          animationUrl: art.animation_url,
          collectionName: art.collection_name,
          visible: art.visible?
        }
      end
    }
  end

  def owned_show
    @owned_art = OwnedArt.find(params[:id])
    set_meta(title: @owned_art.name, image: @owned_art.image_url)
    render inertia: "Art/OwnedShow", props: {
      ownedArt: {
        param: @owned_art.to_param,
        name: @owned_art.name,
        description: @owned_art.description,
        collectionName: @owned_art.collection_name,
        blockchain: @owned_art.blockchain,
        contractSlug: @owned_art.contract_slug,
        contractAddress: @owned_art.contract_address,
        contractName: @owned_art.contract_name,
        tokenId: @owned_art.token_id,
        tokenType: @owned_art.token_type,
        externalUrl: @owned_art.external_url,
        imageUrl: @owned_art.image_url,
        animationUrl: @owned_art.animation_url,
        visible: @owned_art.visible?,
        attributesList: @owned_art.attributes_list
      }
    }
  end

  def made_show
    @made_art = MadeArt.find_by(slug: params[:id])
    set_meta(title: @made_art.title)
    render inertia: "Art/MadeShow", props: {
      madeArt: {
        param: @made_art.to_param,
        title: @made_art.title,
        description: @made_art.description,
        seriesName: @made_art.series_name,
        year: @made_art.year,
        medium: @made_art.medium,
        dimensions: @made_art.dimensions,
        images: @made_art.images.map { |image| url_for(image.variant(resize_to_fill: [800, 800])) }
      }
    }
  end
end
