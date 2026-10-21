"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag, Truck, ShieldCheck } from "lucide-react"
interface ProductDetailsProps {
  product: {
    id: string
    slug: string
    name: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    description: string
    features: string[]
    images: string[]
    colors: { name: string; value: string }[]
    sizes: string[]
  }
  showBackLink?: boolean
}
export default function ProductDetails({ product, showBackLink = false }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {showBackLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Back to Collections
          </Link>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Left - Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-square sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-[#2F4F4F] ring-2 ring-[#2F4F4F]/20"
                      : "border-transparent hover:border-neutral-300"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`view ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 22vw, 150px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-wide mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-neutral-300 fill-neutral-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-neutral-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-5 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-base sm:text-lg text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs sm:text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 sm:mb-8">
              {product.description}
            </p>

            {/* Color */}
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
                Color: <span className="font-normal text-neutral-500">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-[#2F4F4F] ring-2 ring-offset-2 ring-[#2F4F4F]/30"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
                Size: <span className="font-normal text-neutral-500">{selectedSize}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-md border transition-all ${
                      selectedSize === size
                        ? "bg-[#2F4F4F] text-white border-[#2F4F4F]"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center justify-between sm:justify-start border border-neutral-300 rounded-md h-12 w-full sm:w-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full text-neutral-600 hover:text-neutral-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 h-full text-neutral-600 hover:text-neutral-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 h-12 bg-[#2F4F4F] hover:bg-[#1a3535] text-white rounded-md text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-colors">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-neutral-200">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-600">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2F4F4F] flex-shrink-0" />
                <span>Free shipping over $500</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-600">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2F4F4F] flex-shrink-0" />
                <span>5-year warranty</span>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-200">
                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F4F4F] mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}