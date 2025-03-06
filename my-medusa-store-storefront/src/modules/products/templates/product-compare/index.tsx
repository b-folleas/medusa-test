import React, { Suspense } from "react"
import ProductTabs from "@modules/products/components/product-tabs"
import ProductInfo from "@modules/products/templates/product-info"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "@modules/products/templates/product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductCompareTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const ProductCompareTemplate: React.FC<ProductCompareTemplateProps> = ({
  product,
  region,
}) => {
  if (!product?.id) {
    return notFound()
  }

  return (
    <div
      className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
      data-testid="product-container"
    >
      {/* Left Section with info and tabs */}
      <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
        <ProductInfo product={product} />
        <ProductTabs product={product} />
      </div>

      <div className="flex flex-col gap-y-6 w-full">
        {/* Section ImageGallery */}
        <div className="flex justify-center order-first">
          <div className="block w-full relative">
            <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
              {product?.images?.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
                >
                  {!!image.url && (
                    <img
                      src={image.url}
                      alt={`${index + 1}`}
                      className="absolute inset-0 rounded-rounded"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Actions */}
        <div className="flex flex-col gap-y-12 w-full order-last">
          <Suspense
            fallback={
              <div className="flex justify-center">
                {/* Placeholders */}
                <div>Loading actions...</div>
              </div>
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductCompareTemplate
