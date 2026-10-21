"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import collections from "@/data/collections.json"
import ProductDetails from "@/components/Product-details"

const productDetails: Record<string, any> = {
  "modern-seating": {
    price: 1299.0,
    originalPrice: 1599.0,
    rating: 4.8,
    reviews: 124,
    description:
      "A perfect blend of comfort and contemporary design. This piece features premium upholstery, solid wood legs, and a minimalist silhouette that fits seamlessly into any modern living space.",
    features: [
      "Premium boucle fabric upholstery",
      "Solid oak wood frame and legs",
      "High-density foam cushioning",
      "Stain-resistant and easy to clean",
    ],
    images: ["/images/e-c1.jpg", "/images/e-c2.jpg", "/images/e-c3.jpg", "/images/e-c21.jpg"],
    colors: [
      { name: "Cream", value: "#F5F0E8" },
      { name: "Charcoal", value: "#3A3A3A" },
      { name: "Olive", value: "#6B7B5A" },
    ],
    sizes: ["2-Seater", "3-Seater", "L-Shape"],
  },
  "modular-design": {
    price: 1899.0,
    originalPrice: 2299.0,
    rating: 4.7,
    reviews: 98,
    description:
      "Modular flexibility meets timeless design. Reconfigure this piece to match your space — from a cozy loveseat to a sprawling sectional.",
    features: [
      "Configurable modules",
      "Performance fabric",
      "Solid wood frame",
      "Removable covers",
    ],
    images: ["/images/e-c2.jpg", "/images/e-c1.jpg", "/images/e-c3.jpg"],
    colors: [
      { name: "Sand", value: "#E8DFCF" },
      { name: "Slate", value: "#5A5F63" },
    ],
    sizes: ["2-Seater", "3-Seater", "Corner"],
  },
  "cloud-collection": {
    price: 999.0,
    originalPrice: 1249.0,
    rating: 4.9,
    reviews: 210,
    description:
      "Sink into cloud-like comfort. Deep seats, plush cushions, and a soft silhouette make this the ultimate lounging collection.",
    features: ["Deep feather-filled cushions", "Wide armrests", "Stain-resistant fabric"],
    images: ["/images/e-c3.jpg", "/images/e-c1.jpg"],
    colors: [
      { name: "Ivory", value: "#F5F2EC" },
      { name: "Grey", value: "#A0A0A0" },
    ],
    sizes: ["Loveseat", "3-Seater", "Chaise"],
  },
}

export default function ProductDetailsPage() {
  const params = useParams()
  const slug = params.slug as string

  const collection = collections.find((c) => c.slug === slug)

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-[#2F4F4F] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const details = productDetails[slug] || {
    price: 999.0,
    originalPrice: 1299.0,
    rating: 4.5,
    reviews: 50,
    description: "Beautifully crafted furniture for your modern home.",
    features: ["Premium materials", "Durable construction", "Modern design"],
    images: [collection.image],
    colors: [{ name: "Default", value: "#CCCCCC" }],
    sizes: ["Standard"],
  }

  // Merge collection + details into a single product object
  const product = {
    id: collection.id,
    slug: collection.slug,
    name: collection.name,
    ...details,
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetails product={product} showBackLink />
    </div>
  )
}