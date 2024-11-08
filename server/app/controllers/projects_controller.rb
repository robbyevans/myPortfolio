class ProjectsController < ApplicationController
  before_action :authenticate, except: [:index, :show]
  before_action :set_project, only: [:show, :update, :destroy]

  # GET /projects
  def index
    @projects = Project.all
    render json: @projects.map { |project| project_with_images(project) }
  end

  # GET /projects/:id
  def show
    render json: project_with_images(@project)
  end

  # POST /projects
  def create
    @project = Project.new(project_params)
    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

 # PATCH/PUT /projects/:id
 def update
  if @project.update(project_params)
    # Attach new images if any
    if params[:project][:images]
      params[:project][:images].each do |image|
        @project.images.attach(image)
      end
    end

    # Remove images if specified
    if params[:project][:remove_image_ids]
      params[:project][:remove_image_ids].each do |image_id|
        image = @project.images.find(image_id)
        image.purge
      end
    end

    render json: project_with_images(@project)
  else
    render json: @project.errors, status: :unprocessable_entity
  end
end


  # DELETE /projects/:id
  def destroy
    @project.destroy
    head :no_content
  end

  private

  def authenticate
    token = request.headers['Authorization'].to_s.split(' ').last
    unless token == ENV['ADMIN_TOKEN']
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def set_project
    @project = Project.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Project not found' }, status: :not_found
  end

  def project_params
    params.require(:project).permit(:name, :description, :live_link,images: [])
  end

  def project_with_images(project)
    project.as_json.merge(
      images: project.images.attached? ? project.images.map { |image|
        {
          url: url_for(image),
          id: image.id
        }
      } : []
    )
  end
  
end
