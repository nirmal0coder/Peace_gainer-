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
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-[#0B1F2A] via-[#0A1B25] to-[#081620] transition-colors relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#3FCDA8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2836] text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-[#3FCDA8]" />
            <span>We Are Here for You 🕊️</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F3E9]">
            Contact & Feedback
          </h2>
          <p className="text-base sm:text-lg text-[#F7F3E9]/70">
            Have questions, feedback, or need guidance? Reach out to our compassionate team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Details & Socials (Left Column) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-[#0F2836] p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-2xl space-y-6">
              <h3 className="text-2xl font-serif font-bold text-[#F7F3E9]">
                Get in Touch 📩
              </h3>

              <div className="space-y-4 text-sm text-[#F7F3E9]/80">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#0B1F2A] border border-[#3FCDA8]/30 text-[#3FCDA8] shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F2A65A] block">Email Us</span>
                    <a href="mailto:support@peacegainer.org" className="font-semibold text-[#F7F3E9] hover:underline">
                      support@peacegainer.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#0B1F2A] border border-[#3FCDA8]/30 text-[#F2A65A] shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F2A65A] block">General Support</span>
                    <a href="tel:14416" className="font-semibold text-[#F7F3E9] hover:underline">
                      +91 1800-89-14416 (Tele-MANAS)
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-[#3FCDA8]/20 space-y-2">
                <span className="text-xs font-bold text-[#F2A65A] uppercase tracking-wider block">
                  Follow Peace Gainer
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {['Twitter / X', 'Instagram', 'YouTube', 'LinkedIn'].map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1.5 rounded-xl bg-[#0B1F2A] border border-[#3FCDA8]/20 text-[#F7F3E9]/80 text-xs font-semibold shadow-sm cursor-pointer hover:border-[#3FCDA8]/50 hover:text-[#F7F3E9] transition-colors"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-[#0F2836] p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-2xl space-y-4">
              <h4 className="font-serif font-bold text-[#F7F3E9] text-lg">
                Share Your Experience & Feedback ✨
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
                              ? 'text-[#F2A65A] fill-[#F2A65A]'
                              : 'text-[#F7F3E9]/30'
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
                    className="w-full p-3.5 rounded-2xl bg-[#0B1F2A] border border-[#3FCDA8]/30 text-xs sm:text-sm text-[#F7F3E9] placeholder-[#F7F3E9]/40 focus:outline-none focus:ring-2 focus:ring-[#3FCDA8]"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md"
                  >
                    Submit Feedback 🌿
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-[#0B1F2A] border border-[#3FCDA8]/30 text-[#3FCDA8] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3FCDA8]" />
                  <span>Thank you for your valuable feedback! 🕊️</span>
                </div>
              )}
            </div>

          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7 bg-[#0F2836] p-8 sm:p-10 rounded-3xl border border-[#3FCDA8]/30 shadow-2xl space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#F7F3E9]">
              Send Us a Message 💬
            </h3>

            {!contactSubmitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#F2A65A] uppercase">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#0B1F2A] border border-[#3FCDA8]/30 text-xs sm:text-sm text-[#F7F3E9] placeholder-[#F7F3E9]/40 focus:outline-none focus:ring-2 focus:ring-[#3FCDA8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#F2A65A] uppercase">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#0B1F2A] border border-[#3FCDA8]/30 text-xs sm:text-sm text-[#F7F3E9] placeholder-[#F7F3E9]/40 focus:outline-none focus:ring-2 focus:ring-[#3FCDA8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#F2A65A] uppercase">
                    Your Message / Inquiry:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share what is on your mind..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-[#0B1F2A] border border-[#3FCDA8]/30 text-xs sm:text-sm text-[#F7F3E9] placeholder-[#F7F3E9]/40 focus:outline-none focus:ring-2 focus:ring-[#3FCDA8]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message 🕊️</span>
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-[#0B1F2A] border border-[#3FCDA8]/30 text-[#F7F3E9] space-y-2">
                <div className="flex items-center gap-2 font-bold text-base text-[#3FCDA8]">
                  <CheckCircle2 className="w-5 h-5 text-[#3FCDA8]" />
                  <span>Message Received!</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F7F3E9]/80">
                  Thank you for reaching out to Peace Gainer. We will review your message with care and respond as soon as possible.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-[#3FCDA8] text-[#081620] font-bold text-xs"
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
