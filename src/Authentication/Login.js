import React, { useState } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthLogin";

function Login() {
    const [error, setError] = useState("");
    const { Login } = useAuth();
    console.log("Login",Login)
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    };

    const validateForm = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Password is required";
        }

        return errors;
    };

    const handleFormSubmit = (values, actions) => {
        if (!values.rememberMe) {
            return;
        }

        const formData = {
            email: values.email,
            password: values.password,
        };

        axios.post("https://reqres.in/api/login", formData)
            .then(response => {
                if (response.status === 200) {
                    alert("Login page")
                    console.log("response.data.token",response.data.token)
                    Login(response.data.token); // Assuming your API returns a token
                    navigate("/");
                } else {
                    setError("Invalid email and password");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setError("An error occurred. Please try again later.");
            })
            .finally(() => {
                actions.resetForm();
            });
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validate={validateForm}
                onSubmit={handleFormSubmit}
            >
                <Form>
                    <div className="mb-3">
                        <label>Email:</label>
                        <Field type="email" name="email" placeholder="Enter email" />
                        <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                    </div>
                    <div className="mb-3">
                        <label>Password:</label>
                        <Field type="password" name="password" placeholder="Enter password" />
                        <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                    </div>
                    <div className="mb-3">
                        <label>
                            <Field type="checkbox" name="rememberMe" />
                            Remember Me
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                </Form>
            </Formik>
        </div>
    );
}

export default Login;
