import { redirect } from "next/navigation";
import { productService, categoryService, brandService, reviewService } from "@/services";
import { validateSession } from "@/lib/session";
import { Package, FolderTree, Tags, Star, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // Validate session on server
  const session = await validateSession();
  
  if (!session) {
    redirect("/admin/login");
  }

  const [productStats, categoryCount, brandCount, pendingReviews] = await Promise.all([
    productService.getProductStats(),
    categoryService.getCategoryCount(),
    brandService.getBrandCount(),
    reviewService.getPendingReviewsCount(),
  ]);

  const stats = [
    {
      title: "Total Products",
      value: productStats.total,
      icon: Package,
      href: "/admin/products",
      color: "bg-blue-500",
    },
    {
      title: "Published",
      value: productStats.published,
      icon: TrendingUp,
      href: "/admin/products?status=PUBLISHED",
      color: "bg-green-500",
    },
    {
      title: "Draft",
      value: productStats.draft,
      icon: AlertCircle,
      href: "/admin/products?status=DRAFT",
      color: "bg-yellow-500",
    },
    {
      title: "Categories",
      value: categoryCount,
      icon: FolderTree,
      href: "/admin/categories",
      color: "bg-purple-500",
    },
    {
      title: "Brands",
      value: brandCount,
      icon: Tags,
      href: "/admin/brands",
      color: "bg-indigo-500",
    },
    {
      title: "Pending Reviews",
      value: pendingReviews,
      icon: Star,
      href: "/admin/reviews?isApproved=false",
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, <span className="font-medium">{session.username}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Add New Product</span>
            </Link>
            <Link
              href="/admin/categories/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
            >
              <FolderTree className="w-5 h-5" />
              <span>Add New Category</span>
            </Link>
            <Link
              href="/admin/brands/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              <Tags className="w-5 h-5" />
              <span>Add New Brand</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Published</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${productStats.total > 0 ? (productStats.published / productStats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500">{productStats.published}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Draft</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{
                      width: `${productStats.total > 0 ? (productStats.draft / productStats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500">{productStats.draft}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Archived</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-500 rounded-full"
                    style={{
                      width: `${productStats.total > 0 ? (productStats.archived / productStats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500">{productStats.archived}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
