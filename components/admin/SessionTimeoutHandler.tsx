"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAuthStatus } from "@/app/actions/auth.actions";

// Check session every 5 minutes
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000;

// Warn user 5 minutes before session expires
const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000;

export function SessionTimeoutHandler() {
  const router = useRouter();
  const warningShownRef = useRef(false);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkSession = useCallback(async () => {
    try {
      const status = await getAuthStatus();

      if (!status.isAuthenticated) {
        // Session expired - redirect to login
        router.push("/admin/login");
        return;
      }

      // Check if session is about to expire
      if (status.expiresIn && status.expiresIn < SESSION_WARNING_THRESHOLD) {
        if (!warningShownRef.current) {
          warningShownRef.current = true;
          const minutes = Math.ceil(status.expiresIn / 60000);
          
          // Show warning (you could use a toast or modal here)
          if (typeof window !== "undefined") {
            const shouldExtend = window.confirm(
              `Your session will expire in ${minutes} minute(s). Click OK to stay logged in, or Cancel to logout.`
            );
            
            if (shouldExtend) {
              // Make a request to refresh the session
              await getAuthStatus();
              warningShownRef.current = false;
            } else {
              router.push("/admin/login");
            }
          }
        }
      } else {
        warningShownRef.current = false;
      }
    } catch {
      // Error checking session - redirect to login
      router.push("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    // Initial check
    checkSession();

    // Set up interval for periodic checks
    checkIntervalRef.current = setInterval(checkSession, SESSION_CHECK_INTERVAL);

    // Set up activity listeners to refresh session on user activity
    const activityEvents = ["mousedown", "keydown", "scroll", "touchstart"];
    
    let activityTimeout: NodeJS.Timeout | null = null;
    
    const handleActivity = () => {
      // Debounce activity checks
      if (activityTimeout) {
        clearTimeout(activityTimeout);
      }
      
      activityTimeout = setTimeout(() => {
        // Refresh session on activity (the getAuthStatus call refreshes the session)
        getAuthStatus().catch(() => {
          router.push("/admin/login");
        });
      }, 1000);
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Cleanup
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (activityTimeout) {
        clearTimeout(activityTimeout);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [checkSession, router]);

  // This component doesn't render anything visible
  return null;
}
