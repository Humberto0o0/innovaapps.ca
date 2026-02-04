// Home section: contact form and domain strategy.
import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "../../components/ui/SectionTitle";
import Button from "../../components/ui/Button";
import { siteContent } from "../../data/site";
import SectionGlow from "../../components/effects/SectionGlow";
import SectionScrollFx from "../../components/effects/SectionScrollFx";

export default function ContactSection() {
  const [status, setStatus] = useState("idle");
  const [note, setNote] = useState("");

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "https://api.web3forms.com/submit";
  const accessKey = import.meta.env.VITE_CONTACT_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessKey) {
      setStatus("error");
      setNote("Missing VITE_CONTACT_KEY. Add it to .env to enable submissions.");
      return;
    }

    setStatus("loading");
    setNote("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", accessKey);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setNote("Thanks! Your message is in. I’ll reply soon.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setNote("Something went wrong. Try again or email directly.");
    }
  };

  return (
    <section id="contact" className="section-band section-band--blue relative overflow-hidden pt-20">
      <SectionGlow variant="fuchsia" drift={32} />
      <SectionScrollFx distance={22} rotate={0.35} skewX={0.35} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.contact.eyebrow}
          title={siteContent.contact.title}
          desc={siteContent.contact.desc}
        />

        <motion.div
          className="mt-10 overflow-hidden rounded-3xl border border-cyan-300/40 bg-white shadow-[0_0_30px_rgba(56,189,248,0.12)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-0 md:grid-cols-5">
            <div className="p-6 md:col-span-3">
              <form className="grid gap-3" onSubmit={handleSubmit}>
                <label className="text-sm text-slate-700" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-2xl border border-cyan-300/40 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                  placeholder="Your name"
                />
                <label className="mt-2 text-sm text-slate-700" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-cyan-300/40 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                  placeholder="you@domain.com"
                />
                <label className="mt-2 text-sm text-slate-700" htmlFor="contact-message">What are you building?</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-cyan-300/40 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
                  placeholder="Tell me about the app, plugin, or idea..."
                />

                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <Button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Send"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="directory-cta-ghost"
                    onClick={() => alert("Add Calendly / booking flow next.")}
                  >
                    Book a call
                  </Button>
                </div>

                {note && (
                  <p
                    className={
                      status === "success"
                        ? "text-xs text-cyan-200"
                        : "text-xs text-fuchsia-200"
                    }
                  >
                    {note}
                  </p>
                )}
              </form>
            </div>

            <div className="relative p-6 md:col-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(700px_500px_at_30%_0%,rgba(56,189,248,0.12),transparent_60%)]" />
              <div className="relative">
                <h4 className="text-sm font-semibold text-slate-900">What we’re a good fit for</h4>
                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  {[
                    {
                      title: "An MVP or early build",
                      desc: "You have something started and want help refining, scaling, or polishing it.",
                      border: "border-cyan-300/50",
                      glow: "bg-cyan-400/15",
                    },
                    {
                      title: "A plugin or internal tool",
                      desc: "WordPress plugins, utilities, or tools that solve a specific workflow problem.",
                      border: "border-fuchsia-300/50",
                      glow: "bg-fuchsia-400/15",
                    },
                    {
                      title: "A focused collaboration",
                      desc: "Small teams or founders looking to work closely, not outsource everything.",
                      border: "border-emerald-300/50",
                      glow: "bg-emerald-400/15",
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.title}
                      className={`group relative overflow-hidden rounded-2xl border bg-white px-4 py-3 transition ${item.border}`}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    >
                      <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.glow}`} />
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="mt-1">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-cyan-300/50 bg-white px-4 py-3 text-xs text-slate-600 shadow-[0_0_16px_rgba(56,189,248,0.12)]">
                  You don’t need everything figured out. If there’s a real problem behind it, we’re happy to take a look.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionScrollFx>
    </section>
  );
}
