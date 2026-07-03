import Link from "next/link";
import {
  Package,
  FolderTree,
  Tags,
  Star,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

export function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="text-xl font-bold text-gray-900">
          Admin Panel
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Package className="w-5 h-5" />
          <span>Products</span>
        </Link>
        <Link
          href="/admin/categories"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FolderTree className="w-5 h-5" />
          <span>Categories</span>
        </Link>
        <Link
          href="/admin/brands"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Tags className="w-5 h-5" />
          <span>Brands</span>
        </Link>
        <Link
          href="/admin/reviews"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Star className="w-5 h-5" />
          <span>Reviews</span>
        </Link>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Management
          </p>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Customers</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
