"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Loader2 } from "lucide-react";
import { logoutAction } from "@/app/actions/auth.actions";

export function AdminHeader() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
    } catch {
      // Redirect manually if action fails
      router.push("/admin/login");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm text-gray-500">LS Global Admin</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Admin Info */}
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Administrator</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
