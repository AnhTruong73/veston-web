import OrderDetailForm from './OrderDetailForm';
import OrderMasterForm from './OrderMasterForm';

export default function OrderDetail() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <h1>Order Detail</h1>
        <OrderMasterForm />
        <OrderDetailForm />
      </div>
    </>
  );
}
