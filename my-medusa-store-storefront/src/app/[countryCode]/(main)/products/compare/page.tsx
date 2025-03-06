import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductCompare from "@modules/products/templates/product-compare"
import ProductSelector from "@modules/products/components/product-selector"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: { product1?: string; product2?: string }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const { product1, product2 } = props.searchParams

  if (!region) {
    notFound()
  }

  const products = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: [product1 ?? "", product2 ?? ""] },
  }).then(({ response }) => response.products)

  const productFirst = product1
    ? products.find((p) => p.handle === product1)
    : null
  const productSecond = product2
    ? products.find((p) => p.handle === product2)
    : null

  return {
    title: "Comparing products",
    description:
      productFirst && productSecond
        ? `${productFirst.title} vs ${productSecond.title}`
        : "Product comparison",
    openGraph: {
      title:
        productFirst && productSecond
          ? `${productFirst.title} vs ${productSecond.title} | Medusa Store`
          : "Product comparison | Medusa Store",
      description:
        productFirst && productSecond
          ? `${productFirst.title} vs ${productSecond.title}`
          : "Compare two products from our store.",
      images:
        productFirst?.thumbnail && productSecond?.thumbnail
          ? [productFirst.thumbnail, productSecond.thumbnail]
          : [],
    },
  }
}

export default async function CompareProductsPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const { product1, product2 } = props.searchParams

  if (!region) {
    notFound()
  }

  // Récupérer la liste complète des produits
  const products = await listProducts({
    countryCode: params.countryCode,
    queryParams: {},
  }).then(({ response }) => response.products)

  const productFirst = product1
    ? products.find((p) => p.handle === product1)
    : null
  const productSecond = product2
    ? products.find((p) => p.handle === product2)
    : null

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Comparing products</h1>

      <div className="mb-8">
        <ProductSelector products={products} countryCode={params.countryCode} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          {productFirst ? (
            <ProductCompare product={productFirst} region={region} />
          ) : (
            <p className="text-center text-gray-500">
              Select a first product to compare.
            </p>
          )}
        </div>
        <div className="flex justify-center">
          {productSecond ? (
            <ProductCompare product={productSecond} region={region} />
          ) : (
            <p className="text-center text-gray-500">
              Select a second product to compare.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
