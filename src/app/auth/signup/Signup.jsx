import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpSchema } from "../../schemas/index";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (values, { setSubmitting }) => {
    console.log("Signing up with:", values);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/login");
    }, 400);
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-bold text-center text-primary">
        Create Account
      </h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSignup}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Full Name
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-primary"
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-primary"
                type="email"
                name="email"
                id="email"
                placeholder="admin@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-primary"
                type="password"
                name="password"
                id="password"
                placeholder="******************"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-primary"
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="******************"
              />
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-primary rounded hover:bg-primary/80 focus:outline-none focus:shadow-outline transition duration-300 disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          className="font-bold text-primary hover:text-primary/80 focus:outline-none"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </p>
    </>
  );
};

export default Signup;
