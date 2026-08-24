// components/FAQSection.jsx
'use client';

import { useState } from 'react';

export default function FAQSection({
  title = 'Frequently Asked Questions',
  subtitle = 'QUESTIONS & ANSWERS',
  description = 'Everything you need to know about our services, operations, and compliance standards.',
  faqs = [],
  className = '',
  headingLevel = 'h2',
  questionLevel = 'h3',
  withSchema = false,
}) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const HeadingTag = headingLevel;
  const QuestionTag = questionLevel;

  return (
    <section className={`py-16 px-4 sm:px-6 bg-[#0A0F1F] border-t border-[#1A2235] ${className}`}>
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          {subtitle && (
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">
              {subtitle}
            </span>
          )}
          <HeadingTag className="font-heading text-2xl md:text-3xl font-bold uppercase text-white mt-1">
            {title}
          </HeadingTag>
          {description && (
            <p className="text-[#8A93A6] text-xs sm:text-sm max-w-xl mx-auto mt-2">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-lg transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#050914] border-[#2E6FBF]/50 shadow-[0_0_20px_rgba(46,111,191,0.15)]'
                    : 'bg-[#050914] border-[#1A2235] hover:border-[#2E6FBF]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <QuestionTag className="font-heading text-sm sm:text-base font-bold text-white tracking-wide flex-grow">
                    {faq.q}
                  </QuestionTag>
                  <span
                    className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#2E6FBF] text-white rotate-180'
                        : 'bg-[#111827] text-[#4A8FD4] border border-[#1A2235]'
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 pt-0 border-t border-[#1A2235]/60 text-[#A8A8A8] text-xs sm:text-sm leading-relaxed">
                    <p className="mt-3">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
