"use client";

import { X, ExternalLink, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioImage from "../../(agency)/portfolio/PortfolioImage";

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  tagline: string;
  externalLink?: string;
  image: string;
  highlights: string[];
  stats: Record<string, string>;
  icon: any;
}

interface PortfolioModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioModal({ product, isOpen, onClose }: PortfolioModalProps) {
  if (!product) return null;

  const IconComponent = product.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-md"
              >
                <X size={20} className="text-slate-600" />
              </button>

              {/* Product Image */}
              <div className="relative h-64 md:h-80 rounded-t-3xl overflow-hidden">
                <PortfolioImage 
                  src={product.image} 
                  alt={product.title}
                  title={product.title}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                  {product.category}
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left: Icon and Basic Info */}
                  <div className="md:w-1/3">
                    <div className="w-24 h-24 rounded-2xl border border-slate-200 bg-blue-50 flex items-center justify-center mb-6">
                      <IconComponent className="text-blue-600" size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">{product.title}</h2>
                    <p className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wider">
                      {product.category}
                    </p>
                    {product.externalLink && product.externalLink !== "#" ? (
                      <a
                        href={product.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition-all"
                      >
                        Visit Site <ExternalLink size={16} className="text-blue-600" />
                      </a>
                    ) : null}
                  </div>

                  {/* Right: Description and Details */}
                  <div className="md:w-2/3">
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Stats */}
                    {product.stats && (
                      <div className="flex flex-wrap gap-4 mb-6">
                        {Object.entries(product.stats).map(([key, value]) => (
                          <div key={key} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                            <div className="text-xs text-slate-600 uppercase tracking-wider">{key}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {product.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Award className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-slate-600">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tagline */}
                    <div className="pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-500 italic">
                        {product.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

