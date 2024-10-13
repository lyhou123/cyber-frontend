"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";


type FormValues = {
  email: string;
  password: string;
};

const LogIn = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  //handle show password when clicked icon
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    // Toggle password visibility
  };

  const handleOpenShare = () => {
    setIsModalOpen(true);
  };

  const handleCloseShare = () => {
    setIsModalOpen(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormValues, actions: any) => {

    console.log("this is value in form",values)

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

        router.push("/");
      } else {
        setIsSubmitting(true);
      }
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("handle submit", handleSubmit);

  return (
    <section>
      <div className="h-screen flex justify-center items-center gap-8">
        <div className="border border-gray-200 bg-white drop-shadow-lg w-[550px] h-fit p-[50px] block rounded-xl">
          <div className="flex flex-row gap-4 items-center justify-center">
            <Image
              alt="login image"
              className="ml-[-18px] border-r-4 border-primary"
              height="80"
              src="/footerLogo.png"
              width="80"
            />
            <h1 className="text-4xl font-bold text-primary text-[36px]">
              Sign In
            </h1>
          </div>

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
                      className="cursor-pointer absolute right-2 top-12"
                      onClick={() => handleShowPassword()}
                    />
                  )}
                  <ErrorMessage
                    className="text-red-500"
                    component="div"
                    name="password"
                  />
                </div>
                <div className="flex flex-row justify-between">
                  {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                  <p
                    className="text-primary non-underline underline-offset-2 cursor-pointer"
                    onClick={handleOpenShare}
                  >
                    Forgot Password?
                  </p>
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
        <Image
          alt="login image"
          className="hidden lg:block"
          height="550"
          src="/login/login.png"
          width="550"
        />

      </div>
    </section>
  );
};

export default LogIn;
