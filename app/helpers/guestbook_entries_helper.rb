module GuestbookEntriesHelper
  # Converts an ISO 3166-1 alpha-2 code ("JP") into its flag emoji (🇯🇵)
  # by mapping each letter to its regional indicator symbol.
  def flag_emoji(country_code)
    code = country_code.to_s.upcase
    return unless code.match?(/\A[A-Z]{2}\z/)

    code.codepoints.map { |c| c - 65 + 0x1F1E6 }.pack("U*")
  end
end
