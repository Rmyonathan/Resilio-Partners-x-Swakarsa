"use client";

import { motion } from "framer-motion";
import { Search, Hammer, Rocket, HeadphonesIcon } from "lucide-react";

export default function HowWeWorkSection() {
  const steps = [
    {
      icon: Search,
      title: "Discovery",
      description: "Audit processes, identify opportunities, and map out the best path forward for your business.",
      color: "indigo",
      delay: 0
    },
    {
      icon: Hammer,
      title: "Build",
      description: "Develop custom solutions in 8-12 week sprints with agile methodology and transparent progress updates.",
      color: "cyan",
      delay: 0.1
    },
    {
      icon: Rocket,
      title: "Deploy",
      description: "Train your team, ensure seamless integration, and launch with confidence backed by comprehensive documentation.",
      color: "purple",
      delay: 0.2
    },
    {
      icon: HeadphonesIcon,
      title: "Support",
      description: "90-day optimization period included to fine-tune performance and ensure maximum ROI.",
      color: "green",
      delay: 0.3
    }
  ];

  const colorClasses: { [key: string]: { bg: string; icon: string; hover: string } } = {
    indigo: {
      bg: "bg-indigo-500/20",
      icon: "text-indigo-400",
      hover: "group-hover:bg-indigo-500/30"
    },
    cyan: {
      bg: "bg-cyan-500/20",
      icon: "text-cyan-400",
      hover: "group-hover:bg-cyan-500/30"
    },
    purple: {
      bg: "bg-purple-500/20",
      icon: "text-purple-400",
      hover: "group-hover:bg-purple-500/30"
    },
    green: {
      bg: "bg-green-500/20",
      icon: "text-green-400",
      hover: "group-hover:bg-green-500/30"
    }
  };

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700">
            How We Work
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A proven process designed to deliver results and drive business growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
                className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-8 transition-all duration-300 group shadow-md hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6 transition-colors">
                  <IconComponent className="text-blue-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

