import ProductSearchForm from './ProductSearchForm';
import TableProductl from './TableProduct';

export default function GoodInvoice() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <h1 className="text-2xl font-semibold mb-4">Manage Product</h1>
        <ProductSearchForm />
        <TableProductl />
      </div>
    </>
  );
}
