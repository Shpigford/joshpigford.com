class ArticlesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @articles = Article.all.order(publish_at: :desc)
    set_meta(title: "Articles")
    render inertia: "Articles/Index", props: {
      articles: @articles.map { |article| { title: article.title, slug: article.slug } }
    }
  end

  def show
    @article = Article.find_by(slug: params[:id])
    set_meta(title: @article.title)
    render inertia: "Articles/Show", props: {
      article: {
        title: @article.title,
        slug: @article.slug,
        publishAt: @article.publish_at.strftime("%B %-d, %Y"),
        publishAtIso: @article.publish_at.strftime("%Y-%m-%d"),
        bodyHtml: helpers.markdown(@article.body)
      }
    }
  end

  def new
    render inertia: "Articles/New"
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      redirect_to new_article_path, inertia: { errors: @article.errors }
    end
  end

  def edit
    @article = Article.find_by(slug: params[:id])
    render inertia: "Articles/Edit", props: {
      article: {
        title: @article.title,
        slug: @article.slug,
        body: @article.body,
        publishAt: @article.publish_at&.strftime("%Y-%m-%dT%H:%M")
      }
    }
  end

  def update
    @article = Article.find_by(slug: params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      redirect_to edit_article_path(params[:id]), inertia: { errors: @article.errors }
    end
  end

  def destroy
    Article.find_by(slug: params[:id]).destroy
    redirect_to articles_path
  end

  private

  def article_params
    params.require(:article).permit(:title, :slug, :body, :publish_at)
  end
end
