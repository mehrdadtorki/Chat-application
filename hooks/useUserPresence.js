// hooks/useUserPresence.js
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const useUserPresence = (userId) => {
  useEffect(() => {
    if (!userId) return;

    const markOnline = async () => {
      await supabase.from("users").update({ is_online: true }).eq("id", userId);
    };

    const markOffline = async () => {
      await supabase
        .from("users")
        .update({
          is_online: false,
          last_seen: new Date().toISOString(),
        })
        .eq("id", userId);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        markOffline();
      } else if (document.visibilityState === "visible") {
        markOnline();
      }
    };

    markOnline();

    window.addEventListener("beforeunload", markOffline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      markOffline();
      window.removeEventListener("beforeunload", markOffline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId]);
};

export default useUserPresence;
