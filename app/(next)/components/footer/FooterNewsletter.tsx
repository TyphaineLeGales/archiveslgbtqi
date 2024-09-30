"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await axios.post("/api/newsletter", { email });
      setStatus("success");
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.error || "An error occurred.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-[calc(100vw-2rem)] items-center space-x-2 lg:min-w-full"
    >
      {" "}
      {/* Add your styles! */}
      <div className="input-group">
        <input
          type="email"
          //   placeholder="Entrez votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="footerNewsLetterInput"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="p-[.5rem] uppercase transition-colors duration-300 ease-tamisitée hover:text-pink-arch"
        >
          {status === "loading" ? "..." : "OK"}
        </button>
      </div>
      {/* <div className="fixed inset-x-0 bottom-[1rem] z-50 px-[1rem] lg:inset-x-auto lg:right-[1rem] lg:pr-[1rem]">
        <div className="flex items-center justify-center bg-pink-arch px-[1rem] py-[.5rem] font-jetbrains text-[.8rem] text-white">
          {status === "success" && <p className="success-message">{message}</p>}
          {status === "error" && <p className="error-message">{message}</p>}
        </div>
      </div> */}
      {status === "success" && (
        <div className="fixed inset-x-0 bottom-[1rem] z-50 px-[1rem] lg:inset-x-auto lg:right-[1rem] lg:pr-[1rem]">
          <div className="flex items-center justify-center bg-pink-arch px-[1rem] py-[.5rem] font-jetbrains text-[.8rem] text-white">
            <p>{message}</p>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="fixed inset-x-0 bottom-[1rem] z-50 px-[1rem] lg:inset-x-auto lg:right-[1rem] lg:pr-[1rem]">
          <div className="flex items-center justify-center bg-pink-arch px-[1rem] py-[.5rem] font-jetbrains text-[.8rem] text-white">
            <p>{message}</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default NewsletterForm;
