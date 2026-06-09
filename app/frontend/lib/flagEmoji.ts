// Converts an ISO 3166-1 alpha-2 code ("JP") into its flag emoji (🇯🇵)
// by mapping each letter to its regional indicator symbol.
export function flagEmoji(countryCode: string | null | undefined): string | null {
  const code = (countryCode ?? '').toUpperCase()
  if (!/^[A-Z]{2}$/.test(code)) return null

  return String.fromCodePoint(...[...code].map((c) => c.charCodeAt(0) - 65 + 0x1f1e6))
}
