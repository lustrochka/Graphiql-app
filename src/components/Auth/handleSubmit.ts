import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../lib/firebase";
import { NextRouter } from "next/router";

interface FormValues {
  email: string;
  password: string;
}

interface FormikHelpers {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: { email?: string }) => void;
}

export const handleSubmit = async (
  values: FormValues,
  { setSubmitting, setErrors }: FormikHelpers,
  router: NextRouter,
  isSignUp: boolean,
) => {
  try {
    if (isSignUp) {
      await registerWithEmailAndPassword(values.email, values.password);
    } else {
      await logInWithEmailAndPassword(values.email, values.password);
    }
    router.push("/");
  } catch (error: unknown) {
    if (error instanceof Error) {
      setErrors({ email: error.message });
    } else {
      setErrors({ email: "An unknown error occurred" });
    }
  }
  setSubmitting(false);
};
