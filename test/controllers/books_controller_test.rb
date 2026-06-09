require "test_helper"

class BooksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get books_path
    assert_inertia_component "Books/Index"
  end

  test "should get new when signed in" do
    sign_in_as users(:one)
    get new_book_path
    assert_inertia_component "Books/New"
  end
end
