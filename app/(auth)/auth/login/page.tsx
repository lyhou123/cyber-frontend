"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { signIn,signOut,useSession} from "next-auth/react";


type FormValues = {
  email: string;
  password: string;
};

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  //handle show password when clicked icon
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    // Toggle password visibility
  };



  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Password is Required"),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormValues) => {

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      if (res.status === 200) {

        setIsSubmitting(false);

      } else {
        setIsSubmitting(true);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="h-screen flex justify-center items-center gap-8">
        <div className="border border-gray-200 bg-white drop-shadow-lg w-[550px] h-fit p-[50px] block rounded-xl">
          <p className="text-gray-500 text-center  my-5">
            Please enter your details.
          </p>
          {isSubmitting && (
            <p>Testing</p>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                  <label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="w-full my-2 rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm bg-white"
                    name="email"
                    placeholder="Enter email "
                    type="email"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    component="div"
                    name="email"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="w-full my-2 rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm bg-white"
                    name="password"
                    placeholder="Enter pasword"
                    type={showPassword ? "text" : "password"}
                  />
                  {!showPassword ? (
                    <IoEyeOffSharp
                      className="cursor-pointer absolute right-2 top-[54px]"
                      onClick={() => handleShowPassword()}
                    />
                  ) : (
                    <IoEyeSharp
                      className="cursor-pointer absolute right-2 top-[54px]"
                      onClick={() => handleShowPassword()}
                    />
                  )}
                  <ErrorMessage
                    className="text-red-500"
                    component="div"
                    name="password"
                  />
                </div>

                <button
                  className="inline-block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </Form>
            )}
          </Formik>
        </div>


      </div>

      {/*  auth session*/}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <a
          href="#"
          className="flex w-full items-center justify-center gap-3 rounded-md bg-[#f8f8f8be] px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
          onClick={() => {
            signIn("google");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               viewBox="0 0 256 262">
            <path fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
            <path fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
            <path fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
            <path fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
          </svg>

          <span className="text-sm font-semibold leading-6">Google</span>
        </a>

        <a
          href="#"
          className="flex w-full items-center justify-center gap-3 rounded-md bg-[#f8f8f8be] px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
          onClick={() => signIn("github")}
        >
          <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-semibold leading-6">GitHub</span>
        </a>
      </div>



</section>
)
  ;
};

export default LogIn;
