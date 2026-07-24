import React, { useState, useEffect } from 'react';
import { Star, X, Heart, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import { ReviewItem } from './ReviewSection';

interface ExitReviewModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ExitReviewModal: React.FC<ExitReviewModalProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Exit intent detector
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves out towards browser top (address bar/tab close)
      if (e.clientY <= 10) {
        const handled = localStorage.getItem('peace_gainer_exit_prompt_handled');
        if (!handled) {
          setInternalIsOpen(true);
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const isModalVisible = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    localStorage.setItem('peace_gainer_exit_prompt_handled', 'true');
    setInternalIsOpen(false);
    if (externalOnClose) externalOnClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newReview: ReviewItem = {
      id: 'rev-user-' + Date.now(),
      name: name.trim() || 'Valued Visitor',
      rating,
      date: 'Just now',
      message: message.trim(),
      verified: true,
      helpfulCount: 1,
    };

    // Save to localStorage reviews
    const existing = localStorage.getItem('peace_gainer_user_reviews');
    let userOnly: ReviewItem[] = [];
    if (existing) {
      try {
        userOnly = JSON.parse(existing);
      } catch {
        userOnly = [];
      }
    }
    userOnly.unshift(newReview);
    localStorage.setItem('peace_gainer_user_reviews', JSON.stringify(userOnly));
    localStorage.setItem('peace_gainer_exit_prompt_handled', 'true');

    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!isModalVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0F2836] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#3FCDA8]/40 shadow-2xl relative overflow-hidden space-y-5">
        
        {/* Top Decorative Background Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#3FCDA8]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-[#3FCDA8] text-[#081620] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
              Thank You for Your Feedback!
            </h2>
            <p className="text-xs text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 max-w-sm mx-auto">
              Your reflection has been recorded. May your day be filled with peace, calm, and hope.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3FCDA8]/15 text-[#169375] dark:text-[#3FCDA8] text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Before You Go
              </div>
              <h2 className="text-xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                Share Your Experience with Peace Gainer
              </h2>
              <p className="text-xs text-[#1C2D37]/70 dark:text-[#F7F3E9]/70 leading-relaxed">
                Your feedback helps us refine our tools and build a more comforting space for everyone seeking emotional calm.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {/* Star Rating */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0B1F2A] dark:text-[#F7F3E9] block">
                  How would you rate your visit?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          s <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-amber-500 ml-1">
                    {hoverRating || rating} / 5
                  </span>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#0B1F2A] dark:text-[#F7F3E9] block">
                  Name or Pseudonym
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Visitor or your name"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F7F3E9]/50 dark:bg-[#081620]/60 text-xs focus:ring-2 focus:ring-[#3FCDA8] focus:outline-none text-[#0B1F2A] dark:text-[#F7F3E9]"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#0B1F2A] dark:text-[#F7F3E9] block">
                  Feedback or Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What did you like? What can we make better for you?"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F7F3E9]/50 dark:bg-[#081620]/60 text-xs focus:ring-2 focus:ring-[#3FCDA8] focus:outline-none text-[#0B1F2A] dark:text-[#F7F3E9]"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#169375] to-[#3FCDA8] text-[#081620] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Feedback
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
