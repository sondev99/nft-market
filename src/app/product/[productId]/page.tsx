import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import ProductDetail from './ProductDetail';
import ListRating from './ListRating';
import { getProductById } from '@/action/ProductAction';
import { useParams } from 'next/navigation';
import AddRating from './AddRating';
import NullData from '@/components/NullData';

interface PageProps {
  productId?: string;
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
];

const ProductDetailPage = async ({ params }: { params: PageProps }) => {
  const product = (await getProductById(params.productId)).data;

  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-5">
          <ol className="flex items-center space-x-2">
            {BREADCRUMBS.map((breadcrumb, i) => (
              <li key={breadcrumb.href}>
                <div className="flex items-center text-sm">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {breadcrumb.name}
                  </Link>
                  {i !== BREADCRUMBS.length - 1 ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <ProductDetail product={product} />
          <div className="flex flex-col mt-20 gap-4">
            <AddRating product={product} />
            {/* <ListRating reviews={product.reviews} /> */}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default ProductDetailPage;
