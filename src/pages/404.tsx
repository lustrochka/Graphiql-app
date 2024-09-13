import { useRouter } from "next/router";
import { useEffect } from "react";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>You will be redirected to the homepage in a few seconds...</p>
    </div>
  );
};

export default Custom404;
