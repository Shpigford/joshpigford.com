class BooksController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @fiction = Book.where(category: "Fiction").order(title: :asc)
    @nonfiction = Book.where(category: "Nonfiction").order(title: :asc)
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      redirect_to books_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @book = Book.find_by(id: params[:id])
  end

  def update
    @book = Book.find_by(slug: params[:id])

    if @book.update(book_params)
      redirect_to books_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @book = Book.find_by(id: params[:id])
    @book.destroy
    redirect_to books_path
  end

  private

  def book_params
    params.require(:book).permit(:title, :link, :category)
  end
end
