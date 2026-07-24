import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, Heart, Star, CheckCircle2, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;

    setContactSubmitted(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setFeedbackSubmitted(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    setFeedbackText('');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white/80 dark:bg-stone-900/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-orange-500" />
            <span>We Are Here for You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-stone-100">
            Contact & Feedback
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Have questions, feedback, or need guidance? Reach out to our compassionate team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Details & Socials (Left Column) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-stone-800 dark:via-stone-800/90 dark:to-stone-900 p-8 rounded-3xl border border-orange-200/80 dark:border-stone-700 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                Get in Touch
              </h3>

              <div className="space-y-4 text-sm text-stone-700 dark:text-stone-200">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white dark:bg-stone-700 text-orange-600 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 block">Email Us</span>
                    <a href="mailto:support@peacegainer.org" className="font-semibold hover:underline">
                      support@peacegainer.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white dark:bg-stone-700 text-amber-600 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 block">General Support</span>
                    <a href="tel:14416" className="font-semibold hover:underline">
                      +91 1800-89-14416 (Tele-MANAS)
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-orange-200/60 dark:border-stone-700 space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Follow Peace Gainer
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {['Twitter / X', 'Instagram', 'YouTube', 'LinkedIn'].map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold shadow-sm cursor-pointer hover:bg-orange-100 dark:hover:bg-stone-600 transition-colors"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl border border-orange-200 dark:border-stone-700 shadow-xl space-y-4">
              <h4 className="font-bold font-serif text-stone-900 dark:text-stone-100 text-lg">
                Share Your Experience & Feedback
              </h4>

              {!feedbackSubmitted ? (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= feedbackRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-stone-300 dark:text-stone-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={2}
                    placeholder="How did Peace Gainer make you feel today?"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-700/50 border border-orange-200 dark:border-stone-600 text-xs sm:text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md"
                  >
                    Submit Feedback
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-orange-100 text-orange-950 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  <span>Thank you for your valuable feedback!</span>
                </div>
              )}
            </div>

          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-800 p-8 sm:p-10 rounded-3xl border border-orange-200 dark:border-stone-700 shadow-xl space-y-6">
            <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              Send Us a Message
            </h3>

            {!contactSubmitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-700/50 border border-orange-200 dark:border-stone-600 text-xs sm:text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-700/50 border border-orange-200 dark:border-stone-600 text-xs sm:text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase">
                    Your Message / Inquiry:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share what is on your mind..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-700/50 border border-orange-200 dark:border-stone-600 text-xs sm:text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 text-orange-950 dark:text-orange-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  <span>Message Received!</span>
                </div>
                <p className="text-xs sm:text-sm">
                  Thank you for reaching out to Peace Gainer. We will review your message with care and respond as soon as possible.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
