import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  preferred_currency: string | null;
  created_at: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("Profiles")
      .select("*")
      .eq("id", userId)
      .single();
      
    if (error) {
      console.error("Error fetching profile:", error);
    }

    if (data && data.avatar_url) {
      // Generate a secure, 1-hour signed URL using the user's ID as the file path
      const filePath = `${userId}`;
      const { data: signedData, error: signedError } = await supabase.storage
        .from("avatars")
        .createSignedUrl(filePath, 60 * 60);
        
      if (signedData?.signedUrl) {
        data.avatar_url = signedData.signedUrl; // Temporarily inject it into state
      } else if (signedError) {
        console.error("Error fetching signed URL:", signedError);
        data.avatar_url = null; // Clear it to prevent broken image icons
      }
    }

    setProfile(data || null);
  };

  useEffect(() => {
    // Get active session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, isLoading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
