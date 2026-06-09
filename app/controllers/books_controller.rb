class BooksController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @fiction = Book.where(category: "Fiction").order(title: :asc)
    @nonfiction = Book.where(category: "Nonfiction").order(title: :asc)
    set_meta(title: "Books")
    render inertia: "Books/Index", props: {
      fiction: @fiction.map { |book| { id: book.id, title: book.title, link: book.link } },
      nonfiction: @nonfiction.map { |book| { id: book.id, title: book.title, link: book.link } }
    }
  end

  def new
    render inertia: "Books/New"
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      redirect_to books_path
    else
      redirect_to new_book_path, inertia: { errors: @book.errors }
    end
  end

  def edit
    @book = Book.find_by(id: params[:id])
    render inertia: "Books/Edit", props: {
      book: {
        id: @book.id,
        title: @book.title,
        link: @book.link,
        category: @book.category
      }
    }
  end

  def update
    @book = Book.find_by(slug: params[:id])

    if @book.update(book_params)
      redirect_to books_path
    else
      redirect_to edit_book_path(params[:id]), inertia: { errors: @book.errors }
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
