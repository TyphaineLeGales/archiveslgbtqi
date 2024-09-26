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
      className="relative flex h-full w-full flex-col gap-[.5rem] lg:w-[55%]"
    >
      <input
        placeholder="Nom"
        {...register("name")}
        className="FormSubmitInput h-[2.15rem] lg:h-[2.15rem]"
      />
      {errors.name?.message && (
        <p className="FormSubmitInput h-[2.15rem] lg:h-[2.15rem]">
          {errors.name.message}
        </p>
      )}

      <input
        placeholder="Adresse email"
        {...register("email")}
        className="FormSubmitInput h-[2.15rem] lg:h-[2.15rem]"
      />
      {errors.email?.message && (
        <p className="FormSubmitInput h-[2.15rem] lg:h-[2.15rem]">
          {errors.email.message}
        </p>
      )}

      <input
        placeholder="Titre de votre archive"
        {...register("title")}
        className="FormSubmitInput h-[2.15rem] lg:h-[2.15rem]"
      />
      {errors.title?.message && (
        <p className="FormSubmitInput">{errors.title.message}</p>
      )}

      <textarea
        rows={5}
        cols={5}
        placeholder="Message"
        {...register("message")}
        className="FormSubmitInput resize-none"
      />
      {errors.message?.message && (
        <p className="FormSubmitInput">{errors.message.message}</p>
      )}
      <div className="flex w-full items-center justify-end">
        <button
          aria-label="Envoyer"
          disabled={isSubmitting}
          className="w-auto bg-black px-[1rem] py-[.5rem] font-jetbrains text-[.8rem] uppercase tracking-wider text-white hover:text-pink-arch"
        >
          {isSubmitting ? "..." : "Envoyer"}
        </button>
      </div>
    </form>
  );
}
