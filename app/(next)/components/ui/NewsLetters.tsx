"use client";
import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {};
const requiredSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function NewsLetter({}: Props) {
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [run, setRun] = useState<boolean>(false);
  const [totalCounts, setTotalCounts] = useState<number>(400);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({
      width,
      height,
    });
  }, []);

  return (
    <>
      <div>
        {/* Formik */}
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={requiredSchema}
          onSubmit={async (values, { resetForm }) => {
            setButtonDisabled(true);
            try {
              const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: values?.email,
                }),
              });
              const datas = await response.json();
              if (datas.status >= 400) {
                setStatus(datas.status);
                setMessage(
                  "Une erreur s'est produite lors de l'inscription à la newsletter.",
                );
                setTimeout(() => {
                  setMessage("");
                  setButtonDisabled(false);
                }, 2000);
                return;
              }

              setStatus(201);
              setMessage("Merci! Vous êtes inscrit à la newsletter.");
              setShowConfetti(true);
              setRun(true);
              setTimeout(() => {
                setTotalCounts(0);
                setMessage("");
                resetForm();
                setButtonDisabled(false);
              }, 4000);
              setTotalCounts(400);
            } catch (error) {
              setStatus(500);
              setMessage(
                "Une erreur s'est produite lors de l'inscription à la newsletter.",
              );
              setTimeout(() => {
                setMessage("");
                setButtonDisabled(false);
              }, 2000);
            }
          }}
        >
          <Form>
            <div className="flex items-center space-x-2">
              <Field
                type="email"
                name="email"
                placeholder="Entrez votre e-mail"
                autoComplete="off"
                className="newsLetterInput"
              />
              <button
                className="absolute right-0 top-0 flex aspect-square h-[2.5rem] items-center justify-center bg-white p-[1rem] px-[1rem] font-tanker uppercase text-pink-arch transition-colors duration-200 ease-tamisitée hover:bg-black hover:text-white"
                type="submit"
                disabled={buttonDisabled}
              >
                {submitting ? "Submitting" : "Ok"}
              </button>
            </div>
            {message && (
              <div
                ref={confettiRef}
                className="fixed inset-x-0 bottom-[1rem] z-50 px-[1rem] lg:inset-x-auto lg:right-[1rem] lg:pr-[1rem]"
              >
                <div className="flex items-center justify-center bg-pink-arch px-[1rem] py-[.5rem] font-jetbrains text-[.8rem] text-white">
                  <p>
                    {status !== 201
                      ? "Une erreur s'est produite lors de l'inscription à la newsletter."
                      : "Merci! Vous êtes inscrit à la newsletter."}
                  </p>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </>
  );
}
