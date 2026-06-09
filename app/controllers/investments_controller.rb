class InvestmentsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @investments = Investment.all.order(year: :desc)
    set_meta(title: "Investments")
    render inertia: "Investments/Index", props: {
      investments: @investments.map do |investment|
        {
          id: investment.id,
          company: investment.company,
          link: investment.link,
          year: investment.year,
          amount: helpers.number_to_currency(investment.amount, precision: 0),
          about: investment.about
        }
      end
    }
  end

  def new
    render inertia: "Investments/New"
  end

  def create
    @investment = Investment.new(investment_params)
    if @investment.save
      redirect_to investments_path
    else
      redirect_to new_investment_path, inertia: { errors: @investment.errors }
    end
  end

  def edit
    @investment = Investment.find_by(id: params[:id])
    render inertia: "Investments/Edit", props: {
      investment: {
        id: @investment.id,
        company: @investment.company,
        link: @investment.link,
        year: @investment.year,
        amount: @investment.amount,
        about: @investment.about
      }
    }
  end

  def update
    @investment = Investment.find_by(id: params[:id])
    if @investment.update(investment_params)
      redirect_to investments_path
    else
      redirect_to edit_investment_path(@investment), inertia: { errors: @investment.errors }
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
