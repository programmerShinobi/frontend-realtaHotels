import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  userPhoneNumber: Yup.string().required("Required"),
});

const SignupGuestNew2 = () => {
  const [values, setValues] = useState({
    userName: "",
    userPhoneNumber: "",
  });

  const eventHandlerAdd = (fieldName:any) => (event:any):any => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit = (values:any) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={values}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
          <Form>
            <div>
              <label htmlFor="userName">Name</label>
              <Field name="userName" type="text" />
              <ErrorMessage name="userName" />
            </div>
            <div>
              <label htmlFor="userPhoneNumber">Phone Number</label>
              <Field
                name="userPhoneNumber"
                type="text"
                placeholder="Enter phone number"
                onChange={(event:any) => {
                  eventHandlerAdd("userPhoneNumber")(event);
                  event.persist();
                  handleChange(event);
                }}
              />
              <ErrorMessage name="userPhoneNumber" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupGuestNew2;
