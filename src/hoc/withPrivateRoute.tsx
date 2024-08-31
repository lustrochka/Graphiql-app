import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const withPrivateRoute = (WrappedComponent) => {
  const ComponentWithPrivateRoute = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/signin");
      }
    }, [user, loading]);

    if (loading || !user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithPrivateRoute.displayName = `withPrivateRoute(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithPrivateRoute;
};

export default withPrivateRoute;
