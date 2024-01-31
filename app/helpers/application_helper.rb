module ApplicationHelper
  def random_symbol
    symbols = %w[⦂⦂ ⦿ ⊛ ⊚ ⊙ ⦚ ⟁ ⦂⦚ ⌇ ⦚⦚ ⌁ ⌀ ⌮ ⌬ ⌭ ⌯ ⌰ ⌱ ⌲ ⌳ ⌴ ⌵ ⌽ ⌾ ⌿ ⍀ ⍅ ⍆ ⍉ ⍊ ⍋ ⍎ ⍏ ⍑ ⍒ ⍕ ⍖ ⍘ ⍙ ⍚ ⍛ ⍜ ⍝ ⍡ ⍢ ⍣ ⍤ ⍥ ⍦ ⍧ ⍨ ⍩ ⍪ ⍫ ⍬ ⍭ ⍮ ⍱ ⍲ ⍻ ⍼ ⍽ ⍾ ⍿ ⟀ ⟁ ⟂ ⟃ ⟄ ⟅ ⟆ ⟇ ⟈ ⟉ ⟊ ⟌ ⟐ ⟑ ⟒ ⟓ ⟔]
    symbols.sample
  end

  def markdown(text)
    options = {
      filter_html:     true,
      hard_wrap:       true,
      space_after_headers: true
    }

    extensions = {
      autolink:           true,
      superscript:        true,
      fenced_code_blocks: true,
      disable_indented_code_blocks: true
    }

    renderer = Redcarpet::Render::HTML.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end
end
















