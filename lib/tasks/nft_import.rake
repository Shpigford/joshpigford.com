namespace :nft do
  desc "Sync all NFTs from both Ethereum and Tezos"
  task sync_all: :environment do
    puts "Starting full NFT sync...\n"

    puts "=" * 50
    puts "ETHEREUM SYNC"
    puts "=" * 50
    Rake::Task['nft:sync'].invoke

    puts "\n" + "=" * 50
    puts "TEZOS SYNC"
    puts "=" * 50
    Rake::Task['nft:sync_tezos'].invoke

    puts "\n" + "=" * 50
    puts "FINAL STATISTICS"
    puts "=" * 50
    Rake::Task['nft:stats'].invoke
  end
  desc "Sync NFTs from Alchemy for joshpigford.eth"
  task sync: :environment do
    require 'faraday'
    require 'json'

    # Get API key from environment variable
    api_key = ENV['ALCHEMY_API_KEY']

    if api_key.blank?
      puts "Error: ALCHEMY_API_KEY environment variable not set"
      puts "Please set it in your .env file or environment"
      exit 1
    end

    owner = ENV['NFT_CONTRACT_ADDRESS']
    base_url = "https://eth-mainnet.g.alchemy.com/nft/v3/#{api_key}/getNFTsForOwner"

    puts "Starting NFT sync for #{owner}..."

    total_imported = 0
    total_updated = 0
    page_key = nil

    begin
      loop do
        # Build request parameters
        params = {
          owner: owner,
          withMetadata: 'true',
          pageSize: '100'
        }
        params[:pageKey] = page_key if page_key

        # Make API request
        conn = Faraday.new(url: base_url) do |faraday|
          faraday.request :url_encoded
          faraday.adapter Faraday.default_adapter
        end

        response = conn.get do |req|
          req.params = params
        end

        if response.status != 200
          puts "Error: API returned status #{response.status}"
          puts response.body
          break
        end

        data = JSON.parse(response.body)
        nfts = data['ownedNfts'] || []

        puts "Processing #{nfts.length} NFTs..."

        nfts.each do |nft|
          # Skip spam NFTs
          next if nft.dig('contract', 'isSpam') == true

          contract_address = nft.dig('contract', 'address')
          token_id = nft['tokenId']

          next if contract_address.blank? || token_id.blank?

          # Find or create the NFT
          owned_art = OwnedArt.find_or_initialize_by(
            contract_address: contract_address.downcase,
            token_id: token_id
          )

          was_new_record = owned_art.new_record?

          # Update with latest data
          if owned_art.update_from_alchemy(nft)
            if was_new_record
              total_imported += 1
              puts "  ✓ Imported: #{owned_art.name} (#{contract_address}##{token_id})"
            else
              total_updated += 1
              puts "  ✓ Updated: #{owned_art.name}"
            end
          else
            puts "  ✗ Failed to save: #{owned_art.name} - #{owned_art.errors.full_messages.join(', ')}"
          end
        end

        # Check for next page
        page_key = data['pageKey']
        break unless page_key

        puts "Fetching next page..."
        sleep 0.5 # Rate limiting
      end

      puts "\nSync completed!"
      puts "Total imported: #{total_imported}"
      puts "Total updated: #{total_updated}"
      puts "Total NFTs in database: #{OwnedArt.count}"

    rescue StandardError => e
      puts "\nError during sync: #{e.message}"
      puts e.backtrace.first(5).join("\n")
    end
  end

  desc "Fix IPFS URLs to use ipfs.io instead of cloudflare-ipfs.com"
  task fix_ipfs_urls: :environment do
    puts "Fixing IPFS URLs..."
    
    fixed_count = 0
    
    OwnedArt.where("image_url LIKE ?", "%cloudflare-ipfs.com%").find_each do |art|
      old_url = art.image_url
      new_url = old_url.gsub('https://cloudflare-ipfs.com/ipfs/', 'https://ipfs.io/ipfs/')
      
      if art.update(image_url: new_url)
        fixed_count += 1
        puts "  ✓ Fixed: #{art.name}"
      else
        puts "  ✗ Failed to fix: #{art.name}"
      end
    end
    
    puts "\nFixed #{fixed_count} NFT image URLs"
  end
  
  desc "Show stats about owned NFTs"
  task stats: :environment do
    total = OwnedArt.count
    visible = OwnedArt.visible.count
    hidden = total - visible

    puts "NFT Statistics:"
    puts "Total NFTs: #{total}"
    puts "Visible: #{visible}"
    puts "Hidden: #{hidden}"

    # Blockchain breakdown
    puts "\nBy Blockchain:"
    OwnedArt.group(:blockchain).count.each do |blockchain, count|
      puts "  #{blockchain.capitalize}: #{count} NFTs"
    end

    if total > 0
      puts "\nTop Collections:"
      OwnedArt.group(:collection_name)
              .where.not(collection_name: nil)
              .order('count_all DESC')
              .limit(10)
              .count
              .each do |collection, count|
        puts "  #{collection}: #{count} NFTs"
      end
    end
  end

  desc "Sync NFTs from TzKT (Tezos) for specified wallet"
  task sync_tezos: :environment do
    require 'faraday'
    require 'json'

    # Tezos wallet address
    wallet_address = ENV['TEZOS_CONTRACT_ADDRESS']
    base_url = 'https://api.tzkt.io/v1/tokens/balances'

    puts "Starting Tezos NFT sync for #{wallet_address}..."

    total_imported = 0
    total_updated = 0
    limit = 100
    offset = 0

    begin
      loop do
        # Build request parameters
        params = {
          account: wallet_address,
          'token.standard': 'fa2',
          'balance.ne': '0',
          limit: limit,
          offset: offset
        }

        # Make API request
        conn = Faraday.new(url: base_url) do |faraday|
          faraday.request :url_encoded
          faraday.adapter Faraday.default_adapter
        end

        response = conn.get do |req|
          req.params = params
        end

        if response.status != 200
          puts "Error: API returned status #{response.status}"
          puts response.body
          break
        end

        data = JSON.parse(response.body)

        break if data.empty?

        puts "Processing #{data.length} NFTs..."

        data.each do |item|
          token = item['token']
          next unless token && token['metadata']

          contract_address = token.dig('contract', 'address')
          token_id = token['tokenId']

          next if contract_address.blank? || token_id.blank?

          # Find or create the NFT
          owned_art = OwnedArt.find_or_initialize_by(
            contract_address: contract_address.downcase,
            token_id: token_id,
            blockchain: 'tezos'
          )

          was_new_record = owned_art.new_record?

          # Update with Tezos data
          if update_from_tezos(owned_art, item)
            if was_new_record
              total_imported += 1
              puts "  ✓ Imported: #{owned_art.name} (#{contract_address}##{token_id})"
            else
              total_updated += 1
              puts "  ✓ Updated: #{owned_art.name}"
            end
          else
            puts "  ✗ Failed to save: #{owned_art.name} - #{owned_art.errors.full_messages.join(', ')}"
          end
        end

        # Check if we need to fetch more
        break if data.length < limit
        offset += limit

        puts "Fetching next page..."
        sleep 0.5 # Rate limiting
      end

      puts "\nTezos sync completed!"
      puts "Total imported: #{total_imported}"
      puts "Total updated: #{total_updated}"
      puts "Total Tezos NFTs in database: #{OwnedArt.where(blockchain: 'tezos').count}"

    rescue StandardError => e
      puts "\nError during sync: #{e.message}"
      puts e.backtrace.first(5).join("\n")
    end
  end

  private

  def update_from_tezos(owned_art, tezos_data)
    token = tezos_data['token']
    metadata = token['metadata'] || {}

    owned_art.name = metadata['name'] || "Tezos NFT ##{token['tokenId']}"
    owned_art.description = metadata['description']
    owned_art.token_type = token['standard']&.upcase || 'FA2'
    owned_art.contract_name = token.dig('contract', 'alias') || token.dig('contract', 'address')
    owned_art.collection_name = metadata['symbol'] || token.dig('contract', 'alias')

    # Convert IPFS URLs to Cloudflare gateway URLs
    image_uri = metadata['displayUri'] || metadata['thumbnailUri'] || metadata['artifactUri']
    owned_art.image_url = convert_ipfs_url(image_uri) if image_uri

    # Store external URL if available
    owned_art.external_url = metadata['externalUrl']

    # Store complete metadata
    owned_art.metadata = tezos_data
    owned_art.last_synced_at = Time.current

    owned_art.save
  end

  def convert_ipfs_url(url)
    return url unless url&.start_with?('ipfs://')

    # Extract the IPFS hash
    ipfs_hash = url.gsub('ipfs://', '')

    # Use ipfs.io gateway
    "https://ipfs.io/ipfs/#{ipfs_hash}"
  end
end