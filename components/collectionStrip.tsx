"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "./reveal"
import { ArrowUpRight } from "lucide-react"
import collections from "@/data/collections.json"

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-20 lg:py-32">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-4xl sm:text-5xl lg:text-6xl font-normal">
              Collections
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our curated collections, each telling a unique story of craftsmanship and design philosophy.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-wider mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm opacity-90">{collection.count}</p>
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow justify-end">
              <Link
                href={`/products/${collection.slug}`}
                className="w-full bg-black hover:bg-[#040e0e] text-white py-2.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                View Details
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}