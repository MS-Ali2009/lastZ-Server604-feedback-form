import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Send,
  Shield,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";
import SubmissionCounter from "./SubmissionCounter";
import toast from "react-hot-toast";
import axios from "axios";

const FeedbackForm = () => {
  const { themeData } = useTheme();
  const { playSound } = useSound();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbwvBGW-cldWzGE397209DEIruglNmYTtTCeAneT_MLQ8yi1Rn2p564LRvy8xrpsAO4z/exec";

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    playSound("submit");

    // Send data to Google Apps Script
    try {
      const response = await axios.post(
        APPS_SCRIPT_URL,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.status === "success") {
        setSubmitted(true);
        playSound("success");
        toast.success("Feedback Transmitted Successfully");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Transmission Failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "allianceName",
      label: "Alliance Name",
      type: "text",
      placeholder: "Enter Alliance [e.g. LZT]",
      required: true,
    },
    {
      name: "ign",
      label: "In-Game Name",
      type: "text",
      placeholder: "Enter your Game Name",
      required: true,
    },
    {
      name: "powerLevel",
      label: "Power Level",
      type: "number",
      placeholder: "Current Power (Optional)",
    },
    {
      name: "role",
      label: "Role in Alliance",
      type: "select",
      options: ["R5", "R4", "R3", "R2", "R1"],
      required: true,
    },
    {
      name: "problems",
      label: "What problems did you face during Season 1?",
      type: "textarea",
      placeholder: "Share your experience...",
      required: true,
    },
    {
      name: "affectedMost",
      label: "Which event or situation affected you the most?",
      type: "textarea",
      placeholder: "Be specific...",
      required: true,
    },
    {
      name: "communication",
      label: "Do you think server communication was good or poor? Why?",
      type: "textarea",
      placeholder: "Share your thoughts on server communication...",
      required: true,
    },
    {
      name: "improvements",
      label: "What should Server 604 improve before Season 2?",
      type: "textarea",
      placeholder: "Your suggestions...",
      required: true,
    },
    {
      name: "unity",
      label: "What is your suggestion for better unity between alliances?",
      type: "textarea",
      placeholder: "Unity ideas...",
      required: true,
    },
    {
      name: "enjoyed",
      label: "What did you enjoy most about Season 1?",
      type: "textarea",
      placeholder: "Favorite moments...",
      required: true,
    },
    {
      name: "heard",
      label: "Do you feel your alliance/player voice is heard in the server?",
      type: "textarea",
      placeholder: "Share your thoughts...",
      required: true,
    },
    {
      name: "napRules",
      label: "The new NAP rules shared in server email are you agree with them?",
      type: "textarea",
      placeholder: "Share your opinion on the NAP rules...",
      required: true,
    },
    {
      name: "leadership",
      label: "Suggestions for leadership or server management?",
      type: "textarea",
      placeholder: "Your feedback...",
    },
    {
      name: "finalMessage",
      label: "Final message to Server 604 leadership or president?",
      type: "textarea",
      placeholder: "Anything else to share...",
    },
  ];

  if (submitted) {
    return (
      <motion.div
        className="max-w-2xl mx-auto glass-panel p-12 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: `${themeData.primary}22`, color: themeData.primary, boxShadow: `0 0 30px ${themeData.glow}` }}
        >
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-orbitron font-bold mb-4">
          Transmission Complete
        </h2>
        <p className="text-white/70 text-lg mb-8 font-rajdhani">
          Feedback Successfully Delivered to Server 604 Leadership. <br /> Your
          contribution helps secure our future in Season 2.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all duration-300"
          style={{ backgroundColor: themeData.primary, color: '#0a0a0f', boxShadow: `0 0 20px ${themeData.glow}`, fontFamily: "'Exo 2', sans-serif" }}
        >
          Send Another Report
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <SubmissionCounter />

      <motion.div
        className="glass-panel p-8 md:p-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {/* Decorative corners — theme colored */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-tr-2xl pointer-events-none" style={{ borderTop: `2px solid ${themeData.primary}40`, borderRight: `2px solid ${themeData.primary}40` }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-bl-2xl pointer-events-none" style={{ borderBottom: `2px solid ${themeData.primary}40`, borderLeft: `2px solid ${themeData.primary}40` }} />

        <div className="flex items-center gap-3 mb-8">
          <div className="h-0.5 w-12" style={{ backgroundColor: themeData.primary }} />
          <h2 className="text-2xl font-orbitron font-bold tracking-tight">
            Server 604 Feedback
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.slice(0, 4).map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="label-futuristic">
                  {field.label}{" "}
                  {field.required && <span className="text-cyberRed">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    {...register(field.name, { required: field.required })}
                    className="input-glow w-full appearance-none bg-deepNavy/10"
                    style={{ borderColor: themeData.primary }}
                    onMouseEnter={() => playSound("hover")}
                  >
                    <option value="">Select Role</option>
                    {field.options.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-deepNavy text-white"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name, { required: field.required })}
                    className={`input-glow w-full ${errors[field.name] ? "border-cyberRed/50 focus:border-theme-primary" : ""}`}
                    style={{ borderColor: themeData.primary }}
                    onMouseEnter={() => playSound("hover")}
                  />
                )}
                {errors[field.name] && (
                  <span className="text-[10px] text-cyberRed font-orbitron uppercase tracking-widest mt-1 block">
                    Required Field
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-8 mt-12">
            {formFields.slice(4).map((field) => (
              <div key={field.name} className="space-y-2 group">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronRight
                    size={14}
                    style={{ color: themeData.primary }}
                    className="group-focus-within:translate-x-1 transition-transform"
                  />
                  <label className="label-futuristic mb-0">
                    {field.label}{" "}
                    {field.required && <span className="text-rose-500 font-bold">*</span>}
                  </label>
                </div>
                {field.type === "select" ? (
                  <select
                    {...register(field.name, { required: field.required })}
                    className="input-glow w-full"
                    style={{ borderColor: themeData.primary }}
                    onMouseEnter={() => playSound("hover")}
                  >
                    <option value="">Choose Option</option>
                    {field.options.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-deepNavy text-white"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <textarea
                    placeholder={field.placeholder}
                    rows="3"
                    {...register(field.name, { required: field.required })}
                    className={`input-glow w-full resize-none ${errors[field.name] ? 'border-red-500/70' : ''}`}
                    style={{ borderColor: errors[field.name] ? '#f43f5e' : themeData.primary }}
                    onMouseEnter={() => playSound("hover")}
                  />
                )}
                {errors[field.name] && (
                  <span className="text-[10px] text-cyberRed font-orbitron uppercase tracking-widest mt-1 block">
                    This information is critical
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 mt-12">
            <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              <Shield size={16} style={{ color: themeData.primary }} />
              <span>Secure Encrypted Transmission</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative overflow-hidden px-10 py-4 rounded-lg font-orbitron font-bold text-sm tracking-[0.3em] uppercase transition-all duration-300 ${
                isSubmitting
                  ? "bg-white/10 text-white/50 cursor-not-allowed"
                  : "text-white hover:shadow-glow"
              }`}
              style={{ backgroundColor: !isSubmitting ? themeData.primary : 'transparent', boxShadow: !isSubmitting ? `0 0 30px ${themeData.glow}` : 'none' }}
            >
              <div className="relative z-10 flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                    <span>Transmit Feedback</span>
                  </>
                )}
              </div>

              {/* Button shimmer effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[45deg] -translate-x-full group-hover:animate-shimmer" />
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="font-orbitron text-xs tracking-widest text-white/40 uppercase">
                From the president and NAP management of server 604
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;
