import * as React from "react"
import { useState } from "react"
import { Search, Star, MapPin, ChevronDown, ChevronUp, X, ExternalLink } from "lucide-react"
import Icon from "@/components/ui/icon"

interface Review {
  author: string
  rating: number
  date: string
  text: string
}

interface Agency {
  id: number
  name: string
  logo: string
  rating: number
  reviewsCount: number
  location: string
  specializations: string[]
  priceFrom: number
  description: string
  founded: number
  employees: string
  reviews: Review[]
  badge?: string
}

const agencies: Agency[] = [
  {
    id: 1,
    name: "SearchPro Agency",
    logo: "SP",
    rating: 4.9,
    reviewsCount: 128,
    location: "New York, USA",
    specializations: ["Technical SEO", "Link Building", "E-commerce"],
    priceFrom: 1500,
    description: "Top-tier SEO agency with 10+ years experience. Specializes in technical audits, link building campaigns and e-commerce promotion. Average client traffic growth: 320%.",
    founded: 2013,
    employees: "50-100",
    badge: "Top Choice",
    reviews: [
      { author: "Michael R.", rating: 5, date: "February 2025", text: "Organic traffic grew 4x in 8 months. The team is professional and always delivers results." },
      { author: "Sarah K.", rating: 5, date: "January 2025", text: "Best SEO agency I've worked with. Clear reporting, real results and great communication." },
      { author: "David L.", rating: 4, date: "December 2024", text: "Very good work on technical SEO. Site speed improved significantly, positions went up." },
    ],
  },
  {
    id: 2,
    name: "RankBoost Studio",
    logo: "RB",
    rating: 4.7,
    reviewsCount: 94,
    location: "London, UK",
    specializations: ["Local SEO", "Content SEO", "On-page Optimization"],
    priceFrom: 800,
    description: "Boutique agency focused on local business promotion and content marketing. Helps companies dominate local search and attract clients from their city.",
    founded: 2016,
    employees: "20-50",
    reviews: [
      { author: "Emma T.", rating: 5, date: "February 2025", text: "Local SEO truly works! In 3 months we're in the top 3 for all key queries in our city." },
      { author: "James W.", rating: 4, date: "January 2025", text: "Good team, transparent pricing. Results appeared after month 2." },
      { author: "Lisa P.", rating: 5, date: "November 2024", text: "Exceeded all expectations. Revenue from organic traffic grew by 180%." },
    ],
  },
  {
    id: 3,
    name: "OrganicGrowth Co.",
    logo: "OG",
    rating: 4.8,
    reviewsCount: 156,
    location: "Austin, USA",
    specializations: ["Technical SEO", "On-page Optimization", "Analytics"],
    priceFrom: 1200,
    description: "Data-driven agency that makes decisions based on analytics and A/B testing. Specializes in complex technical projects and CRO optimization.",
    founded: 2011,
    employees: "100-200",
    badge: "Verified",
    reviews: [
      { author: "Chris M.", rating: 5, date: "March 2025", text: "Analytics approach really works. We can track ROI from every action. Conversion rate up 45%." },
      { author: "Anna B.", rating: 5, date: "February 2025", text: "Professional team with deep technical expertise. Highly recommend for complex projects." },
      { author: "Robert S.", rating: 4, date: "January 2025", text: "Very good work, though onboarding took time. The results were worth it." },
    ],
  },
  {
    id: 4,
    name: "LinkMasters",
    logo: "LM",
    rating: 4.6,
    reviewsCount: 72,
    location: "Toronto, Canada",
    specializations: ["Link Building", "PR-SEO", "Content SEO"],
    priceFrom: 600,
    description: "Specialists in white-hat link building and digital PR. Builds quality backlink profiles that stand the test of time and algorithm updates.",
    founded: 2018,
    employees: "20-50",
    reviews: [
      { author: "Kevin H.", rating: 5, date: "January 2025", text: "The best link builders I've found. Quality links from real sites, no spam." },
      { author: "Maria G.", rating: 4, date: "December 2024", text: "Good work on PR-SEO. Got placements in major industry publications." },
      { author: "Tom A.", rating: 4, date: "November 2024", text: "Reliable agency with transparent reporting. Recommend for link building." },
    ],
  },
  {
    id: 5,
    name: "EcomSEO Experts",
    logo: "ES",
    rating: 4.5,
    reviewsCount: 61,
    location: "Berlin, Germany",
    specializations: ["E-commerce", "Technical SEO", "International SEO"],
    priceFrom: 2000,
    description: "Specialists exclusively in e-commerce SEO. Deep expertise in Shopify, WooCommerce, Magento. Helps online stores increase organic traffic and revenue.",
    founded: 2015,
    employees: "50-100",
    reviews: [
      { author: "Sophie L.", rating: 5, date: "February 2025", text: "E-commerce SEO is their superpower. Our Shopify store traffic grew 250% in 6 months." },
      { author: "Peter K.", rating: 4, date: "January 2025", text: "Great team for online stores. Understand the specifics of product optimization." },
      { author: "Nina R.", rating: 4, date: "December 2024", text: "Helped with international SEO, now getting traffic from 5 countries." },
    ],
  },
  {
    id: 6,
    name: "ContentRank",
    logo: "CR",
    rating: 4.4,
    reviewsCount: 48,
    location: "Sydney, Australia",
    specializations: ["Content SEO", "Blogging", "On-page Optimization"],
    priceFrom: 500,
    description: "Content-first SEO agency. Creates strategic content that attracts organic traffic and converts visitors into clients. Great value for money.",
    founded: 2019,
    employees: "10-20",
    reviews: [
      { author: "Jack O.", rating: 5, date: "March 2025", text: "Excellent content quality! Articles rank in top 3 and bring consistent traffic." },
      { author: "Helen M.", rating: 4, date: "February 2025", text: "Good agency for content SEO. Affordable prices, decent results." },
      { author: "Ben T.", rating: 4, date: "January 2025", text: "Worked for 4 months, happy with the results. Will continue working together." },
    ],
  },
]

const allSpecializations = Array.from(new Set(agencies.flatMap((a) => a.specializations)))

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "size-5" : "size-4"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${star <= Math.round(rating) ? "text-orange-400 fill-orange-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border border-orange-100 rounded-xl p-4 bg-orange-50/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
            {review.author[0]}
          </div>
          <span className="font-medium text-sm">{review.author}</span>
        </div>
        <span className="text-xs text-muted-foreground">{review.date}</span>
      </div>
      <StarRating rating={review.rating} />
      <p className="text-sm text-muted-foreground mt-2">{review.text}</p>
    </div>
  )
}

function AgencyCard({ agency }: { agency: Agency }) {
  const [expanded, setExpanded] = useState(false)
  const [showReviews, setShowReviews] = useState(false)

  return (
    <div className="bg-background border border-orange-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
              {agency.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-lg">{agency.name}</h3>
                {agency.badge && (
                  <span className="text-xs font-medium bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full border border-orange-200">
                    {agency.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="size-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{agency.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-orange-500">{agency.rating}</div>
            <div className="text-xs text-muted-foreground">{agency.reviewsCount} reviews</div>
          </div>
        </div>

        <div className="mt-4">
          <StarRating rating={agency.rating} />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {agency.specializations.map((spec) => (
            <span key={spec} className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground border">
              {spec}
            </span>
          ))}
        </div>

        <p className={`text-sm text-muted-foreground mt-4 ${!expanded ? "line-clamp-2" : ""}`}>
          {agency.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            <span className="text-muted-foreground">from </span>
            <span className="font-semibold text-foreground">${agency.priceFrom.toLocaleString()}</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
            >
              {expanded ? "Less" : "More"}
              {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </button>
            <a
              href="#contact"
              className="text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              Contact
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-orange-100">
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-muted-foreground">Founded:</span>
                <span className="ml-2 font-medium">{agency.founded}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Team size:</span>
                <span className="ml-2 font-medium">{agency.employees}</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviews(!showReviews)}
              className="w-full text-sm font-medium border border-orange-200 hover:border-orange-400 text-orange-500 hover:text-orange-600 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Star className="size-4" />
              {showReviews ? "Hide reviews" : `Show reviews (${agency.reviews.length})`}
            </button>

            {showReviews && (
              <div className="mt-4 space-y-3">
                {agency.reviews.map((review, idx) => (
                  <ReviewCard key={idx} review={review} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AgencyCatalog() {
  const [search, setSearch] = useState("")
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "price">("rating")
  const [maxPrice, setMaxPrice] = useState<number>(5000)

  const filtered = agencies
    .filter((a) => {
      const matchSearch =
        search === "" ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase()) ||
        a.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()))
      const matchSpec = selectedSpec === null || a.specializations.includes(selectedSpec)
      const matchPrice = a.priceFrom <= maxPrice
      return matchSearch && matchSpec && matchPrice
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount
      if (sortBy === "price") return a.priceFrom - b.priceFrom
      return 0
    })

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-orange-50/40 to-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold lg:text-5xl">
            Agency <span className="text-orange-500">Directory</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {agencies.length} verified SEO agencies. Compare ratings, prices and real client reviews.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-background border border-orange-100 rounded-2xl p-5 mb-8 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, location or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-orange-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-background"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Specialization filter */}
              <div className="flex flex-wrap gap-2 flex-1">
                <button
                  onClick={() => setSelectedSpec(null)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedSpec === null ? "bg-orange-500 text-white border-orange-500" : "border-orange-200 text-muted-foreground hover:border-orange-400 hover:text-orange-500"}`}
                >
                  All services
                </button>
                {allSpecializations.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpec(selectedSpec === spec ? null : spec)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedSpec === spec ? "bg-orange-500 text-white border-orange-500" : "border-orange-200 text-muted-foreground hover:border-orange-400 hover:text-orange-500"}`}
                  >
                    {spec}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-xs border border-orange-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-background"
                >
                  <option value="rating">Rating</option>
                  <option value="reviews">Reviews</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>

            {/* Price slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Max budget:</span>
              <input
                type="range"
                min={500}
                max={5000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 accent-orange-500"
              />
              <span className="text-xs font-medium text-orange-500 w-20 text-right">
                ${maxPrice.toLocaleString()}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Found: <span className="font-medium text-foreground">{filtered.length}</span> agencies
          </p>
          {(selectedSpec || search || maxPrice < 5000) && (
            <button
              onClick={() => { setSearch(""); setSelectedSpec(null); setMaxPrice(5000); }}
              className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
            >
              <X className="size-3.5" />
              Clear filters
            </button>
          )}
        </div>

        {/* Agency cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No agencies found matching your criteria.</p>
            <button
              onClick={() => { setSearch(""); setSelectedSpec(null); setMaxPrice(5000); }}
              className="mt-4 text-orange-500 hover:text-orange-600 text-sm underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
