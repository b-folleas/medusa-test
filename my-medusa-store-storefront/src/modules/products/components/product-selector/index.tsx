"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"

type ProductSelectorProps = {
  products: HttpTypes.StoreProduct[]
  countryCode: string
}

export default function ProductSelector({
  products,
  countryCode,
}: Readonly<ProductSelectorProps>) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const product1 = searchParams.get("product1")
  const product2 = searchParams.get("product2")

  // Initialise selectedProducts with products from URL
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    [product1, product2].filter(Boolean) as string[]
  )

  useEffect(() => {
    setSelectedProducts([product1, product2].filter(Boolean) as string[])
  }, [product1, product2])

  const handleSelect = (handle: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(handle)) {
        return prev.filter((p) => p !== handle)
      } else if (prev.length < 2) {
        return [...prev, handle]
      }
      return prev
    })
  }

  const handleCompare = () => {
    if (selectedProducts.length === 2) {
      router.push(
        `/${countryCode}/products/compare?product1=${selectedProducts[0]}&product2=${selectedProducts[1]}`
      )
    }
  }

  return (
    <Suspense
      fallback={<div className="flex justify-center">Loading products...</div>}
    >
      <div className="p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Select products to compare
        </h2>
        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <label
              key={product.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.handle)}
                onChange={() => handleSelect(product.handle)}
                disabled={
                  selectedProducts.length === 2 &&
                  !selectedProducts.includes(product.handle)
                }
              />
              {product.title}
            </label>
          ))}
        </div>
        <Button
          onClick={handleCompare}
          disabled={selectedProducts.length !== 2}
          variant="primary"
          className="mt-4 w-[100px] h-10"
        >
          Compare
        </Button>
      </div>
    </Suspense>
  )
}
