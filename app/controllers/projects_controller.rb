class ProjectsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @projects = Project.all.order(year: :asc)
    set_meta(title: "Projects")
    render inertia: "Projects/Index", props: {
      projects: @projects.map do |project|
        {
          name: project.name,
          slug: project.slug,
          year: project.year,
          description: project.description,
          outcome: project.outcome
        }
      end
    }
  end

  def new
    render inertia: "Projects/New"
  end

  def show
    @project = Project.find_by(slug: params[:id])
    set_meta(title: @project.name)
    render inertia: "Projects/Show", props: {
      project: {
        name: @project.name,
        slug: @project.slug,
        year: @project.year,
        description: @project.description,
        outcome: @project.outcome,
        notes: @project.notes,
        link: @project.link
      }
    }
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      flash[:notice] = "Project created successfully."
      redirect_to projects_path
    else
      redirect_to new_project_path, inertia: { errors: @project.errors }
    end
  end

  def edit
    @project = Project.find_by(slug: params[:id])
    render inertia: "Projects/Edit", props: {
      project: {
        name: @project.name,
        slug: @project.slug,
        link: @project.link,
        year: @project.year,
        description: @project.description,
        outcome: @project.outcome,
        notes: @project.notes
      }
    }
  end

  def update
    @project = Project.find_by(slug: params[:id])
    if @project.update(project_params)
      flash[:notice] = "Project updated successfully."
      redirect_to projects_path
    else
      redirect_to edit_project_path(params[:id]), inertia: { errors: @project.errors }
    end
  end

  def destroy
    @project = Project.find_by(slug: params[:id])
    @project.destroy
    flash[:notice] = "Project deleted successfully."
    redirect_to projects_path
  end

  private

  def project_params
    params.require(:project).permit(:name, :slug, :link, :description, :outcome, :notes, :year)
  end
end
