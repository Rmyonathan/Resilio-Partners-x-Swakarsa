'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from "../../components/agency/SectionComponents";
import BlueprintBackground from "../../components/agency/BlueprintBackground";
import PreMeetingForm from "../../components/agency/PreMeetingForm";
export default function FranchisePage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Blueprint Background */}
      <BlueprintBackground />
      
      <div className="relative z-10">
        {/* Hero Section - Image Only */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <Image 
              src="/images/franchiseandbusiness.png" 
              alt="Your Career Revolution Book" 
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </section>

        {/* Start or Buy a Business Section */}
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-700 mb-6">
            Start or Buy a Business with Confidence
          </h2>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            We help you choose the right business model, validate your business plan, and secure funding for your new venture.
          </p>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jirwin@resilio-partners.com&su=Franchise Consultation Request&body=Hi Jon,%0D%0A%0D%0AI would like to schedule a 15-minute consultation to discuss franchise/business opportunities.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Schedule a 15 minute Consult
          </a>
        </section>

        {/* What we help you decide Section */}
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-700 mb-8 text-center">
            What we help you decide
          </h2>
          
          <div className="space-y-8 text-center">
            {/* Business paths */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Business paths</h3>
              <ul className="space-y-2 text-slate-700 text-lg">
                <li>• Franchise</li>
                <li>• Non-franchise startup</li>
                <li>• Buy an existing business</li>
              </ul>
            </div>

            {/* How we compare options */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">How we compare options</h3>
              <ul className="space-y-2 text-slate-700 text-lg">
                <li>• Industry fit and owner role (absentee, semi-absentee, active)</li>
                <li>• Earnings potential and typical ranges</li>
                <li>• Funding paths: SBA, private lenders, grants</li>
                <li>• Credit readiness and investment range</li>
                <li>• Legal structure: LLC, S-Corp, C-Corp, partnership, sole owner</li>
                <li>• Financial validation: review and sanity-check documents</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jirwin@resilio-partners.com&su=Franchise Qualification Inquiry&body=Hi Jon,%0D%0A%0D%0AI would like to see if I qualify for franchise/business opportunities.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              See if you qualify
            </a>
          </div>
        </section>

        {/* Our process Section */}
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-700 mb-8">
            Our process
          </h2>
          <ul className="space-y-4 text-slate-700 text-lg mb-8 text-left max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Clarify goals and constraints</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Shortlist 2-3 models that fit your budget and time available</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Validate financials and ramp timeline</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Funding plan and next steps</span>
            </li>
          </ul>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jirwin@resilio-partners.com&su=Franchise Consultation Request&body=Hi Jon,%0D%0A%0D%0AI would like to schedule a 15-minute consultation to discuss franchise/business opportunities.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Schedule a 15 minute Consult
          </a>
        </section>

        {/* Who this is for Section */}
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651] mb-8 text-center">
            Who this is for?
          </h2>
          <ul className="space-y-4 text-slate-700 text-lg max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>First-time owners who want a guided path</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Operators looking for semi-absentee income</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Professionals evaluating franchise vs. independent</span>
            </li>
          </ul>
        </section>

        {/* Pre-meeting questions Form Section */}
        <section className="py-16 px-6 lg:px-8 max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651] mb-8 text-center">
            Pre-meeting questions
          </h2>
          
          <PreMeetingForm />
        </section>

        {/* Why work with US Section */}
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651] mb-8">
            Why work with US?
          </h2>
          <ul className="space-y-4 text-slate-700 text-lg mb-8 text-left max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>20+ years of project execution and systems design</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>SBA-style planning discipline</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Clear validation of assumptions before you invest</span>
            </li>
          </ul>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jirwin@resilio-partners.com&su=Franchise Consultation Request&body=Hi Jon,%0D%0A%0D%0AI would like to schedule a 15-minute consultation to discuss franchise/business opportunities.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Schedule a 15 minute Consult
          </a>
        </section>
      </div>

      <Footer />
    </main>
  );
}