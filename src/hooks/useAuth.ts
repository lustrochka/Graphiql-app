import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      const publicRoutes = ["/signin", "/signup"];
      if (!user && !publicRoutes.includes(router.pathname)) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { user, loading };
};

export default useAuth;
