"use client";

import { submitPreMeetingAnswers } from "../../lib/actions";
import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

export default function PreMeetingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await submitPreMeetingAnswers(formData);

    if (result.success) {
      setIsSuccess(true);
      (event.target as HTMLFormElement).reset();
    } else {
      setErrorMessage(result.message || "Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700 mb-4">
          We've received your answers. We'll contact you soon to schedule your call.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-sm text-green-600 hover:text-green-700 underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-md">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Pre-meeting Questions</h3>
        <p className="text-slate-600 text-sm">Please answer a few questions to help us prepare for our call.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="John"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="Doe"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Have you been looking? */}
        <div className="space-y-2">
          <label htmlFor="hasBeenLooking" className="text-sm font-medium text-slate-700">
            Have you been looking? <span className="text-red-500">*</span>
          </label>
          <input
            id="hasBeenLooking"
            name="hasBeenLooking"
            type="text"
            required
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="Tell us about your search"
          />
        </div>

        {/* What Interests you more? */}
        <div className="space-y-2">
          <label htmlFor="interest" className="text-sm font-medium text-slate-700">
            What Interests you more?
          </label>
          <select
            id="interest"
            name="interest"
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
          >
            <option value="">Select an option</option>
            <option value="Starting my own business from Scratch">Starting my own business from Scratch</option>
            <option value="Exploring Franchise opportunities">Exploring Franchise opportunities</option>
            <option value="Not sure/Want guidance">Not sure/Want guidance</option>
          </select>
        </div>

        {/* Target annual Income */}
        <div className="space-y-2">
          <label htmlFor="targetIncome" className="text-sm font-medium text-slate-700">
            Target annual Income
          </label>
          <input
            id="targetIncome"
            name="targetIncome"
            type="text"
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="e.g., $100,000"
          />
        </div>

        {/* Credit Score */}
        <div className="space-y-2">
          <label htmlFor="creditScore" className="text-sm font-medium text-slate-700">
            Do you know your Credit Score?
          </label>
          <select
            id="creditScore"
            name="creditScore"
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
          >
            <option value="">Select your credit score range</option>
            <option value="400 - 500">400 - 500</option>
            <option value="500 - 600">500 - 600</option>
            <option value="600 - 700">600 - 700</option>
            <option value="700+">700+</option>
          </select>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} />
              Submit
            </>
          )}
        </button>
      </form>
    </div>
  );
}

