import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../schemas/authSchema";
import { loginEffect } from "../../features/auth/auth.thunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (values, { setSubmitting }) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginEffect(data))
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <h2 className="mb-6 text-3xl font-bold text-center text-primary">
        Welcome Back
      </h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500"
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
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500"
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
              {/* <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-bold text-primary hover:text-primary/80 focus:outline-none"
                  onClick={() => alert("Reset password flow")}
                >
                  Forgot Password?
                </button>
              </div> */}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-primary rounded hover:bg-primary/80 focus:outline-none focus:shadow-outline transition duration-300 disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* <p className="mt-4 text-center text-gray-600 text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          className="font-bold text-primary hover:text-primary/80 focus:outline-none"
          onClick={() => (window.location.href = "/signup")}
        >
          Sign up
        </button>
      </p> */}
    </>
  );
};

export default Login;
