class GuestbookEntriesController < ApplicationController
  before_action :authenticate_user!, only: [:destroy, :approve, :reject]

  def index
    entries = GuestbookEntry.visible
    set_meta(title: "Guestbook")

    props = {
      entries: entries.map { |entry| entry_props(entry) },
      signatureCount: entries.size
    }
    if user_signed_in?
      props[:pending] = GuestbookEntry.where.not(status: "approved").order(created_at: :desc)
                                      .map { |entry| pending_props(entry) }
    end

    render inertia: "Guestbook/Index", props: props
  end

  def create
    @entry = GuestbookEntry.new(entry_params)
    ip_hash = GuestbookEntry.digest_ip(client_ip)

    if GuestbookEntry.posted_recently?(ip_hash)
      return redirect_to guestbook_entries_path, alert: "Hang on — you can only sign once a minute. Try again shortly."
    end

    # Honeypot tripped: pretend success, save nothing.
    return redirect_to(guestbook_entries_path, notice: thank_you_message) if @entry.nickname.present?

    unless @entry.valid?
      return redirect_to guestbook_entries_path, inertia: { errors: @entry.errors.to_hash(true) }
    end

    result = GuestbookModerator.call(@entry)
    @entry.status = result.status
    @entry.moderation_reason = result.reason
    @entry.country_code = country_from_request
    @entry.ip_hash = ip_hash
    @entry.save!

    redirect_to guestbook_entries_path, notice: confirmation_message(@entry)
  end

  def react
    GuestbookEntry.approved.find(params[:id]).react!(params[:emoji])
    head :ok
  rescue ActiveRecord::RecordNotFound
    head :not_found
  end

  def destroy
    GuestbookEntry.find(params[:id]).destroy
    redirect_to guestbook_entries_path, notice: "Entry deleted."
  end

  def approve
    GuestbookEntry.find(params[:id]).update!(status: "approved")
    redirect_to guestbook_entries_path, notice: "Entry approved."
  end

  def reject
    GuestbookEntry.find(params[:id]).update!(status: "rejected")
    redirect_to guestbook_entries_path, notice: "Entry rejected."
  end

  private

  def entry_props(entry)
    {
      id: entry.id,
      name: entry.name,
      message: entry.message,
      homepage: entry.homepage,
      createdAt: entry.created_at.strftime("%B %-d, %Y"),
      countryCode: entry.country_code,
      reactions: entry.reactions,
      reactionEmojis: entry.reaction_emojis
    }
  end

  def pending_props(entry)
    {
      id: entry.id,
      name: entry.name,
      message: entry.message,
      status: entry.status,
      moderationReason: entry.moderation_reason
    }
  end

  # Cloudflare passes the real client IP; fall back to the connecting address.
  def client_ip
    request.headers["CF-Connecting-IP"].presence || request.remote_ip
  end

  def entry_params
    params.require(:guestbook_entry).permit(:name, :message, :homepage, :nickname)
  end

  def thank_you_message
    "Thanks for signing the guestbook! Entries are checked before they appear."
  end

  def confirmation_message(entry)
    if entry.approved?
      "You're signature ##{GuestbookEntry.approved.count}! Thanks for signing. ✓"
    else
      thank_you_message
    end
  end

  # Cloudflare sets CF-IPCountry on the edge. Store only the 2-letter code.
  def country_from_request
    code = request.headers["CF-IPCountry"].to_s.upcase
    return if %w[XX T1 A1 A2].include?(code)

    code if code.match?(/\A[A-Z]{2}\z/)
  end
end
