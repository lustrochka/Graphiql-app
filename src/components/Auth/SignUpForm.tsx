import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "../../utils/validationSchema";
import { useRouter } from "next/router";
import { handleSubmit } from "./handleSubmit";
import styles from "./AuthForm.module.css";

const SignUpForm: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.authForm}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions, router, true)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;

