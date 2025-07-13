class ArtController < ApplicationController
  def index
    @sort_by = params[:sort] || 'random'
    
    @owned_arts = if user_signed_in?
      OwnedArt.all
    else
      OwnedArt.visible
    end
    
    @owned_arts = case @sort_by
    when 'name'
      @owned_arts.order(:name)
    when 'collection'
      @owned_arts.order(:collection_name, :name)
    when 'blockchain'
      @owned_arts.order(:blockchain, :name)
    else
      @owned_arts.order(Arel.sql('RANDOM()'))
    end
    
    @made_arts = MadeArt.order(Arel.sql('RANDOM()'))
    @made_arts_by_series = @made_arts.group_by(&:series_name)
    @full_width = true
  end
  
  def owned_show
    @owned_art = OwnedArt.find(params[:id])
    @full_width = true
  end
  
  def made_show
    @made_art = MadeArt.find_by(slug: params[:id])
    @full_width = true
  end
end