import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "../../utils/validationSchema";
import { logInWithEmailAndPassword } from "../../lib/firebase";
import { useRouter } from "next/router";
import { handleSubmit } from "./handleSubmit";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import styles from "./AuthForm.module.css";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className={styles.authForm}>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          handleSubmit(values, actions, router, false)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
