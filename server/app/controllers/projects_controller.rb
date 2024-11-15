class ProjectsController < ApplicationController
  before_action :authorize_request, except: [:index, :show]
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
    @project.position = Project.maximum(:position).to_i + 1

    if @project.save
      render json: project_with_images(@project), status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/:id
  def update
    # Remove images if specified
    if params[:project][:remove_image_ids]
      params[:project][:remove_image_ids].each do |image_id|
        image = @project.images.find(image_id)
        image.purge
      end
    end

    if @project.update(project_params)
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

  # PATCH /projects/update_order
  def update_order
    Project.transaction do
      params[:project_ids].each_with_index do |id, index|
        project = Project.find(id)
        project.update!(position: index)
      end
    end
    render json: { message: 'Projects reordered successfully' }, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def authorize_request
    super  # Calls the method in ApplicationController
  end

  def set_project
    @project = Project.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Project not found' }, status: :not_found
  end

  def project_params
    params.require(:project).permit(:name, :description, :live_link, :position, images: [])
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
