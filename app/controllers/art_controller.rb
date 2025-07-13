class ArtController < ApplicationController
  def index
    @owned_arts = if user_signed_in?
      OwnedArt.order(last_synced_at: :desc)
    else
      OwnedArt.visible.order(last_synced_at: :desc)
    end
    @made_arts = MadeArt.by_series
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