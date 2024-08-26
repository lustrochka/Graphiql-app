import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "../../utils/validationSchema";
import styles from "./AuthForm.module.css";

const SignUp: React.FC = () => {
  return (
    <div className={styles.authForm}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          // delete console later!
        }}
      >
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
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
