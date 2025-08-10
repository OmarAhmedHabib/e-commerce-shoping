import Image from "next/image"
import Link from "next/link"
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi"
import { formatPrice } from "@/lib/utils"
import { FiStar } from 'react-icons/fi';
import Button from "./Button";


interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating?: number
  isNew?: boolean
  discount?: number
  colors?: string[]
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  return (
    <div className={`group relative bg-card text-card-foreground border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
      {/* Product Image with Overlay Actions */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Link href={`/products/${product.id}`} className="block h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 300px, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            priority={false}
          />
        </Link>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            aria-label="Quick view"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button 
            className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            aria-label="Add to wishlist"
          >
            <FiHeart className="w-4 h-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>

        {/* Rating (if available) */}
        {product.rating && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.discount && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price * (1 + product.discount/100))}
              </span>
            )}
          </div>

          <Button
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>

        {/* Color Variants (if available) */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 pt-3">
            {product.colors.map((color, i) => (
              <div 
                key={i}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color }}
                aria-label={`Color variant ${color}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}