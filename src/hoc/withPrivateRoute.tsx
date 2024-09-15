import { useRouter } from "next/router";
import { useEffect, ComponentType, JSX } from "react";
import useAuth from "../hooks/useAuth";

function withPrivateRoute<P>(WrappedComponent: ComponentType<P>) {
  const ComponentWithPrivateRoute = (props: P & JSX.IntrinsicAttributes) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, [user, loading]);

    if (loading || !user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithPrivateRoute.displayName = `withPrivateRoute(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithPrivateRoute;
}

export default withPrivateRoute;
