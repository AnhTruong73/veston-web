import ProductDetailForm from './ProductDetailForm';
import ProductMasterForm from './ProductMasterForm';

export default function GoodInvoiceDetail() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <h1>Product Detail</h1>
        <ProductMasterForm />
        {/* <ProductDetailForm /> */}
      </div>
    </>
  );
}
