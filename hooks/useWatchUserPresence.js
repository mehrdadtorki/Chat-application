// hooks/useWatchUserPresence.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const useWatchUserPresence = (watchedUserId) => {
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    if (!watchedUserId) return;

    const channel = supabase
      .channel(`presence-${watchedUserId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${watchedUserId}`,
        },
        (payload) => {
            setUserStatus({
            is_online: payload.new.is_online,
            last_seen: payload.new.last_seen,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [watchedUserId]);

  return userStatus;
};

export default useWatchUserPresence;
