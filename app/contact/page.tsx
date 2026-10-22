"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section className="w-full bg-gradient-to-r from-[#fffbfb] via-[#f2f7f7] to-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-4 bg-black p-6 sm:p-8 md:p-10 text-white flex flex-col justify-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Contact Us
              </h2>
              <p className="text-sm text-white/80 mb-6">
                L M S Home Design
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="mt-1 flex-shrink-0 text-white/70" />
                  <div>
                    <p className="text-sm leading-relaxed text-white/90">
                      91 E Wheelwright St #4
                      <br />
                      Allyn, WA 98524, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={20} className="flex-shrink-0 text-white/70" />
                  <a
                    href="tel:3602279861"
                    className="text-sm text-white/90 hover:text-white transition"
                  >
                    360-227-9861
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={20} className="flex-shrink-0 text-white/70" />
                  <a
                    href="mailto:lmsdesignsllc@gmail.com"
                    className="text-sm text-white/90 break-all hover:text-white transition"
                  >
                    lmsdesignsllc@gmail.com
                  </a>
                </div>
              </div>

              {/* Larry's details */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-xs uppercase tracking-wider text-white/60 mb-1">
                  Your Contact
                </p>
                <p className="text-base font-semibold text-white">
                  Larry Stevens
                </p>
                <p className="text-sm text-white/80">
                  L M S Home Design
                </p>
                <p className="text-xs text-white/60 mt-1">
                  Serving California, Idaho &amp; Washington State
                </p>
              </div>

              {/* Decorative line */}
              <div className="mt-6 w-12 h-1 bg-white/30 rounded-full" />
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-8 p-6 sm:p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#1D87A1]">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#1D87A1] focus:ring-2 focus:ring-[#1D87A1]/20 outline-none transition"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-[#1D87A1]">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#1D87A1] focus:ring-2 focus:ring-[#1D87A1]/20 outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#1D87A1]">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#1D87A1] focus:ring-2 focus:ring-[#1D87A1]/20 outline-none transition"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#1D87A1]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(360) 227-9861"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#1D87A1] focus:ring-2 focus:ring-[#1D87A1]/20 outline-none transition"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#1D87A1]">
                    Comments <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your custom home design, remodel, or residential project..."
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#1D87A1] focus:ring-2 focus:ring-[#1D87A1]/20 outline-none transition resize-none"
                    required
                  />
                </div>

                {/* Disclaimer */}
                <div className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-4 mt-2">
                  By providing your phone number and/or email and clicking
                  "Submit" you agree to our Terms of Service and Privacy Policy
                  and consent to receive marketing communications from L M S
                  Home Design via text, call, or email, including automated
                  messages. To opt out, reply 'STOP' to any text. Message and
                  data rates may apply.
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full py-3 bg-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit
                      <Send size={18} />
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-100 text-green-700 rounded-xl flex items-center gap-2 text-sm"
                  >
                    <CheckCircle size={18} />
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}