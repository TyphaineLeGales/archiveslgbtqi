"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";
import { ContactFormSchema } from "../../lib/schema";
import { sendEmail } from "../../_actions";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export default function FormSubmission() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const processForm: SubmitHandler<ContactFormInputs> = async (data) => {
    const result = await sendEmail(data);

    if (result?.success) {
      console.log({ data: result.data?.data });
      toast.success("Email sent!");
      reset();
      return;
    }

    // toast error
    console.log(result?.error);
    toast.error("Something went wrong!");
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="mx-auto flex flex-1 flex-col gap-4 text-gray-600 sm:w-1/2 lg:w-1/3"
    >
      <input
        placeholder="name"
        className="w-full rounded-lg"
        {...register("name")}
      />
      {errors.name?.message && (
        <p className="ml-1 mt-1 text-sm text-red-400">{errors.name.message}</p>
      )}

      <input
        placeholder="email"
        className="w-full rounded-lg"
        {...register("email")}
      />
      {errors.email?.message && (
        <p className="ml-1 mt-1 text-sm text-red-400">{errors.email.message}</p>
      )}

      <input
        placeholder="Titre de votre archive"
        className="w-full rounded-lg"
        {...register("title")}
      />
      {errors.title?.message && (
        <p className="ml-1 mt-1 text-sm text-red-400">{errors.title.message}</p>
      )}

      <textarea
        rows={5}
        cols={5}
        placeholder="message"
        className="w-full rounded-lg"
        {...register("message")}
      />
      {errors.message?.message && (
        <p className="ml-1 text-sm text-red-400">{errors.message.message}</p>
      )}

      <button
        disabled={isSubmitting}
        className="border-black-primary bg-black-primary text-white-primary rounded-lg border py-2.5 font-medium transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
