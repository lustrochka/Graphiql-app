import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "../../utils/validationSchema";
import styles from "./AuthForm.module.css";

const SignIn: React.FC = () => {

  return (
    <div className={styles.authForm}>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          // clean console log later!
        }}
      >
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className={styles.errorMessage} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className={styles.errorMessage} />
          </div>
          <button type="submit">Sign In</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;