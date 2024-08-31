import { logInWithEmailAndPassword, registerWithEmailAndPassword } from "../../lib/firebase";
import { NextRouter } from "next/router";

export const handleSubmit = async (values, { setSubmitting, setErrors }, router: NextRouter, isSignUp: boolean) => {
  try {
    if (isSignUp) {
      await registerWithEmailAndPassword(values.email, values.password);
    } else {
      await logInWithEmailAndPassword(values.email, values.password);
    }
    router.push("/");
  } catch (error) {
    setErrors({ email: error.message });
  }
  setSubmitting(false);
};