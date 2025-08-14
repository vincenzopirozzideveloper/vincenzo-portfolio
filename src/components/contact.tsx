import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";

// Contact
export const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // handle form change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  // validate form on submit
  const validateForm = () => {
    // form fields
    const { name, email, message } = form;

    type Current = {
      name: boolean;
      email: boolean;
      message: boolean;
    };

    // Error message
    const nameError = document.querySelector("#name-error")!;
    const emailError = document.querySelector("#email-error")!;
    const messageError = document.querySelector("#message-error")!;
    const current: Current = { name: false, email: false, message: false };

    // validate name
    if (name.trim().length < 3) {
      nameError.classList.remove("hidden");
      current["name"] = false;
    } else {
      nameError.classList.add("hidden");
      current["name"] = true;
    }

    const email_regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // valiate email
    if (!email.trim().toLowerCase().match(email_regex)) {
      emailError.classList.remove("hidden");
      current["email"] = false;
    } else {
      emailError.classList.add("hidden");
      current["email"] = true;
    }

    // validate message
    if (message.trim().length < 5) {
      messageError.classList.remove("hidden");
      current["message"] = false;
    } else {
      messageError.classList.add("hidden");
      current["message"] = true;
    }

    // True if all fields are validated
    return Object.keys(current).every(
      (k) => current[k as keyof typeof current],
    );
  };

  // handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // prevent default page reload
    e.preventDefault();

    // validate form
    if (!validateForm()) return false;

    // show loader
    setLoading(true);

    // send email
    emailjs
      .send(
        import.meta.env.VITE_APP_SERVICE_ID,
        import.meta.env.VITE_APP_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Vincenzo",
          from_email: form.email.trim().toLowerCase(),
          to_email: import.meta.env.VITE_APP_EMAILJS_RECIEVER,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_KEY,
      )
      .then(() => toast.success("Thanks for contacting me."))
      .catch((error) => {
        // Error handle
        console.log("[CONTACT_ERROR]: ", error);
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
        setForm({
          name: "",
          email: "",
          message: "",
        });
      });
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <SectionWrapper idName="contact">
        <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.75] bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200"
          >
            {/* Title */}
            <p className="text-gray-600 text-sm font-medium tracking-wider uppercase" 
               style={{ fontFamily: 'Inter, sans-serif' }}>
              Get in touch
            </p>
            <h3 className="text-gray-900 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mt-2" 
                style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Contact.
            </h3>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
            >
              {/* Name */}
              <label htmlFor="name" className="flex flex-col">
                <span className="text-gray-700 font-medium mb-4" 
                      style={{ fontFamily: 'Inter, sans-serif' }}>
                  Your Name*
                </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  title="What's your name?"
                  disabled={loading}
                  aria-disabled={loading}
                  className="bg-gray-50 py-4 px-6 placeholder:text-gray-400 text-gray-900 rounded-lg outline-none border border-gray-200 font-medium disabled:bg-gray-100 disabled:text-gray-400 focus:border-[#915eff]/50 focus:bg-white transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />

                {/* Invalid Name */}
                <span className="text-red-500 mt-2 hidden" id="name-error">
                  Invalid Name!
                </span>
              </label>

              {/* Email */}
              <label htmlFor="email" className="flex flex-col">
                <span className="text-gray-700 font-medium mb-4" 
                      style={{ fontFamily: 'Inter, sans-serif' }}>
                  Your Email*
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  title="What's your email?"
                  disabled={loading}
                  aria-disabled={loading}
                  className="bg-gray-50 py-4 px-6 placeholder:text-gray-400 text-gray-900 rounded-lg outline-none border border-gray-200 font-medium disabled:bg-gray-100 disabled:text-gray-400 focus:border-[#915eff]/50 focus:bg-white transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />

                {/* Invalid Email */}
                <span className="text-red-500 mt-2 hidden" id="email-error">
                  Invalid E-mail!
                </span>
              </label>

              {/* Message */}
              <label htmlFor="message" className="flex flex-col">
                <span className="text-gray-700 font-medium mb-4" 
                      style={{ fontFamily: 'Inter, sans-serif' }}>
                  Your Message*
                </span>
                <textarea
                  rows={7}
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hello there!"
                  title="What do you want to say?"
                  disabled={loading}
                  aria-disabled={loading}
                  className="bg-gray-50 py-4 px-6 placeholder:text-gray-400 text-gray-900 rounded-lg outline-none border border-gray-200 font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:resize-none focus:border-[#915eff]/50 focus:bg-white transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />

                {/* Invalid Message */}
                <span className="text-red-500 mt-2 hidden" id="message-error">
                  Invalid Message!
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                title={loading ? "Sending..." : "Send"}
                className="bg-[#915eff] text-white py-3 px-8 outline-none w-fit font-bold rounded-xl disabled:bg-[#915eff]/30 disabled:text-white/60 hover:bg-[#7a4dd8] transition-colors shadow-lg shadow-[#915eff]/25"
                disabled={loading}
                aria-disabled={loading}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {/* check loader state */}
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </motion.div>

          {/* Earth Model */}
          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
          >
            <EarthCanvas />
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};