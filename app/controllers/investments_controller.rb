class InvestmentsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @investments = Investment.all.order(year: :desc)
  end

  def new
    @investment = Investment.new
  end

  def create
    @investment = Investment.new(investment_params)
    if @investment.save
      redirect_to investments_path
    else
      render :new
    end
  end

  def edit
    @investment = Investment.find_by(id: params[:id])
  end

  def update
    @investment = Investment.find_by(id: params[:id])
    if @investment.update(investment_params)
      redirect_to investments_path
    else
      render :edit
    end
  end

  def destroy
    @investment = Investment.find_by(id: params[:id])
    @investment.destroy
    redirect_to investments_path
  end

  private

  def investment_params
    params.require(:investment).permit(:company, :link, :year, :amount, :about, :status)
  end
end
