import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  number:"",
  password: "",
  confirm_password: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  number: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid phone number")
        .required("Phone number is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const handleSubmit = (values, actions) => {
  console.log("Form submitted with values:", values);
  actions.resetForm();
};

function Register() {
  return (
    <div>
      <h1>Sign up</h1>
      <h4>Enter your credentials to continue</h4>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>First Name:</label>
          <Field type="text" name="first_name" placeholder="Enter First Name" />
          <ErrorMessage name="first_name" component="div" style={{ color: "red" }} /><br/>

          <label>Last Name:</label>
          <Field type="text" name="last_name" placeholder="Enter Last Name" />
          <ErrorMessage name="last_name" component="div" style={{ color: "red" }} /><br/>

          <label>Email:</label>
          <Field type="email" name="email" placeholder="Enter Email" />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} /><br/>
          
          <label>Mobile</label>
          <Field type="number" name='number' placeholder="Enter mob. Number"/>
          <ErrorMessage name='number' component='div' style={{color:"red"}}/><br/>

          <label>Password:</label>
          <Field type="password" name="password" placeholder="Enter Password" />
          <ErrorMessage name="password" component="div" style={{ color: "red" }} /><br/>

          <label>Confirm Password:</label>
          <Field type="password" name="confirm_password" placeholder="Confirm Password" />
          <ErrorMessage name="confirm_password" component="div" style={{ color: "red" }} /><br/>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
      