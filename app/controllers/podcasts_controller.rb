class PodcastsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @podcasts = Podcast.all.order(name: :asc)
    set_meta(title: "Podcasts")
    render inertia: "Podcasts/Index", props: {
      podcasts: @podcasts.map do |podcast|
        {
          id: podcast.id,
          name: podcast.name,
          link: podcast.link
        }
      end
    }
  end

  def new
    render inertia: "Podcasts/New"
  end

  def create
    @podcast = Podcast.new(podcast_params)

    if @podcast.save
      redirect_to podcasts_path
    else
      redirect_to new_podcast_path, inertia: { errors: @podcast.errors }
    end
  end

  def edit
    @podcast = Podcast.find(params[:id])
    render inertia: "Podcasts/Edit", props: {
      podcast: {
        id: @podcast.id,
        name: @podcast.name,
        link: @podcast.link
      }
    }
  end

  def update
    @podcast = Podcast.find(params[:id])

    if @podcast.update(podcast_params)
      redirect_to podcasts_path
    else
      redirect_to edit_podcast_path(@podcast), inertia: { errors: @podcast.errors }
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
