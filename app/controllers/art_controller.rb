class ArtController < ApplicationController
  def index
    @owned_arts = if user_signed_in?
      OwnedArt.order(Arel.sql('RANDOM()'))
    else
      OwnedArt.visible.order(Arel.sql('RANDOM()'))
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