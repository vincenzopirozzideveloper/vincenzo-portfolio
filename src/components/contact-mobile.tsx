import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

export const ContactMobile = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

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
      .then(() => {
        toast.success("Grazie per avermi contattato!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.log("[CONTACT_ERROR]: ", error);
        toast.error("Qualcosa è andato storto.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="bg-white min-h-screen py-12 px-4" id="contact">
      <div className="max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-2">
            Get in touch
          </p>
          <h2 className="text-2xl font-bold text-gray-900">Contatti</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Il tuo nome"
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tua@email.com"
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Messaggio *
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Ciao! Vorrei..."
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Invio in corso..." : "Invia Messaggio"}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-gray-600 text-sm">Oppure contattami direttamente:</p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:hello@vincenzocassano.dev"
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/vincenzo-cassano"
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};