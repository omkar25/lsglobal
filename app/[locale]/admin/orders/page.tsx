import { ShoppingCart } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage customer orders</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-500">
          Order management functionality will be available soon.
        </p>
      </div>
    </div>
  );
}
