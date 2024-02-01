class ProjectsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @projects = Project.all.order(year: :asc)
    @full_width = true
  end

  def new
    @project = Project.new
  end

  def show
    @project = Project.find_by(slug: params[:id])
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      flash[:notice] = "Project created successfully."
      redirect_to projects_path
    else
      flash.now[:alert] = "Project could not be created."
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @project = Project.find_by(slug: params[:id])
  end

  def update
    @project = Project.find_by(slug: params[:id])
    if @project.update(project_params)
      flash[:notice] = "Project updated successfully."
      redirect_to projects_path
    else
      flash.now[:alert] = "Project could not be updated."
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @project = Project.find_by(slug: params[:id])
    if @project.destroy
      flash[:notice] = "Project deleted successfully."
      redirect_to projects_path
    else
      flash.now[:alert] = "Project could not be deleted."
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :slug, :link, :description, :outcome, :notes, :year)
  end
end
