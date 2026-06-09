import { useForm, usePage } from '@inertiajs/react'
import type { FormEvent } from 'react'
import type { SharedProps } from '@/types'

export interface OwnedArtFormValues {
  name: string | null
  description: string | null
  tokenId: string | null
  contractAddress: string | null
  contractName: string | null
  collectionName: string | null
  collectionSlug: string | null
  imageUrl: string | null
  visible: boolean
  externalUrl: string | null
  blockchain: string | null
  tokenType: string | null
}

const inputClasses = 'w-full px-3 py-2 border border-gray-300 rounded'

// `param` is present when editing an existing record.
export default function OwnedArtForm({
  ownedArt,
  param,
}: {
  ownedArt: OwnedArtFormValues
  param?: string
}) {
  const { errors } = usePage<SharedProps>().props
  const form = useForm({
    owned_art: {
      name: ownedArt.name ?? '',
      description: ownedArt.description ?? '',
      token_id: ownedArt.tokenId ?? '',
      contract_address: ownedArt.contractAddress ?? '',
      contract_name: ownedArt.contractName ?? '',
      collection_name: ownedArt.collectionName ?? '',
      collection_slug: ownedArt.collectionSlug ?? '',
      image_url: ownedArt.imageUrl ?? '',
      external_url: ownedArt.externalUrl ?? '',
      blockchain: ownedArt.blockchain ?? '',
      token_type: ownedArt.tokenType ?? '',
      visible: ownedArt.visible,
    },
  })

  const errorMessages = Object.values(errors ?? {}).flat()

  function setField(field: keyof typeof form.data.owned_art, value: string | boolean) {
    form.setData('owned_art', { ...form.data.owned_art, [field]: value })
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (param) {
      form.patch(`/owned_arts/${param}`)
    } else {
      form.post('/owned_arts')
    }
  }

  function textField(
    field: keyof typeof form.data.owned_art,
    label: string,
    { placeholder, className }: { placeholder?: string; className?: string } = {}
  ) {
    return (
      <div className={className}>
        <label htmlFor={`owned_art_${field}`} className="block font-semibold mb-2">
          {label}
        </label>
        <input
          type="text"
          id={`owned_art_${field}`}
          value={form.data.owned_art[field] as string}
          onChange={(e) => setField(field, e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      </div>
    )
  }

  return (
    <form onSubmit={submit}>
      {errorMessages.length > 0 && (
        <div className="border border-red-500 bg-red-50 p-4 rounded mb-6">
          <h2 className="text-red-700 font-semibold mb-2">
            {errorMessages.length} {errorMessages.length === 1 ? 'error' : 'errors'} prohibited
            this NFT from being saved:
          </h2>
          <ul className="list-disc list-inside text-red-600">
            {errorMessages.map((message, i) => (
              <li key={i}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {textField('name', 'Name', { className: 'mb-4' })}

      <div className="mb-4">
        <label htmlFor="owned_art_description" className="block font-semibold mb-2">
          Description
        </label>
        <textarea
          id="owned_art_description"
          rows={4}
          value={form.data.owned_art.description}
          onChange={(e) => setField('description', e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {textField('token_id', 'Token ID')}
        {textField('contract_address', 'Contract address')}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {textField('contract_name', 'Contract name')}
        {textField('token_type', 'Token type', { placeholder: 'e.g., ERC721' })}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {textField('collection_name', 'Collection name')}
        {textField('collection_slug', 'Collection slug')}
      </div>

      {textField('image_url', 'Image URL', { className: 'mb-4' })}

      {textField('external_url', 'External URL', { className: 'mb-4' })}

      {textField('blockchain', 'Blockchain', { placeholder: 'ethereum', className: 'mb-4' })}

      <div className="mb-6">
        <input
          type="checkbox"
          id="owned_art_visible"
          checked={form.data.owned_art.visible}
          onChange={(e) => setField('visible', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="owned_art_visible">Visible on site</label>
      </div>

      <button
        type="submit"
        className="bg-gold text-white px-6 py-2 rounded hover:bg-gold-dark transition-colors cursor-pointer"
      >
        {param ? 'Update NFT' : 'Create NFT'}
      </button>
    </form>
  )
}
