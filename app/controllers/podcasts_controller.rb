class PodcastsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @podcasts = Podcast.all.order(name: :asc)
  end

  def new
    @podcast = Podcast.new
  end

  def create
    @podcast = Podcast.new(podcast_params)

    if @podcast.save
      redirect_to podcasts_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @podcast = Podcast.find(params[:id])
  end

  def update
    @podcast = Podcast.find(params[:id])

    if @podcast.update(podcast_params)
      redirect_to podcasts_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @podcast = Podcast.find(params[:id])
    @podcast.destroy
    redirect_to podcasts_path
  end

  private

  def podcast_params
    params.require(:podcast).permit(:name, :link)
  end
end
