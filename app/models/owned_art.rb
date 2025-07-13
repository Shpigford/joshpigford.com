class OwnedArt < ApplicationRecord
  validates :name, presence: true
  validates :token_id, presence: true
  validates :contract_address, presence: true
  validates :contract_address, uniqueness: { scope: :token_id }
  
  scope :visible, -> { where(visible: true) }
  
  def to_param
    "#{id}-#{name.parameterize}"
  end
  
  def update_from_alchemy(nft_data)
    self.name = nft_data['name'] || nft_data['title'] || "Unknown NFT"
    self.description = nft_data['description']
    self.token_type = nft_data['tokenType']
    self.contract_name = nft_data.dig('contract', 'name')
    self.collection_name = nft_data.dig('collection', 'name') || nft_data.dig('contract', 'openSeaMetadata', 'collectionName')
    self.collection_slug = nft_data.dig('collection', 'slug') || nft_data.dig('contract', 'openSeaMetadata', 'collectionSlug')
    self.external_url = nft_data.dig('collection', 'externalUrl') || nft_data.dig('contract', 'openSeaMetadata', 'externalUrl')
    
    # Handle image URL from various possible locations
    self.image_url = nft_data.dig('image', 'cachedUrl') || 
                     nft_data.dig('image', 'originalUrl') || 
                     nft_data.dig('media', 0, 'gateway') ||
                     nft_data.dig('media', 0, 'raw')
    
    # Handle animation URL - only if it's a video
    animation_content_type = nft_data.dig('animation', 'contentType')
    if animation_content_type&.start_with?('video/')
      self.animation_url = nft_data.dig('animation', 'cachedUrl') || 
                           nft_data.dig('animation', 'originalUrl')
    elsif nft_data.dig('raw', 'metadata', 'animation_details', 'format').present?
      # Check raw metadata for video formats
      format = nft_data.dig('raw', 'metadata', 'animation_details', 'format')&.downcase
      if ['mp4', 'webm', 'mov', 'avi'].include?(format)
        self.animation_url = nft_data.dig('raw', 'metadata', 'animation_url') ||
                             nft_data.dig('raw', 'metadata', 'animation')
      end
    end
    
    self.metadata = nft_data
    self.last_synced_at = Time.current
    save
  end
end