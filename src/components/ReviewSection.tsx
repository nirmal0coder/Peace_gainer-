import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Heart, ThumbsUp, CheckCircle, Send, Sparkles, Filter, ShieldCheck } from 'lucide-react';

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  message: string;
  verified?: boolean;
  helpfulCount: number;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Aarav S.',
    rating: 5,
    date: '2 days ago',
    message: 'The breathing exercises and ambient soundscapes helped me calm down during a severe anxiety episode. Truly a peaceful sanctuary.',
    verified: true,
    helpfulCount: 24,
  },
  {
    id: 'rev-2',
    name: 'Priya Sharma',
    rating: 5,
    date: '1 week ago',
    message: 'The AI companion listens so gently without any judgment. Having voice notes in a soothing tone made my evening so much better.',
    verified: true,
    helpfulCount: 18,
  },
  {
    id: 'rev-3',
    name: 'David Miller',
    rating: 5,
    date: '2 weeks ago',
    message: 'I love the lotus plucker and water ripple games. Whenever work pressure spikes, 5 minutes here resets my focus entirely.',
    verified: true,
    helpfulCount: 31,
  },
  {
    id: 'rev-4',
    name: 'Meera Patel',
    rating: 4,
    date: '3 weeks ago',
    message: 'Very thoughtful design and evidence-based self-help tools. The crisis emergency section is very clear and reassuring.',
    verified: true,
    helpfulCount: 12,
  },
  {
    id: 'rev-5',
    name: 'Rohan Gupta',
    rating: 5,
    date: '1 month ago',
    message: 'The gratitude journal and daily affirmation cards have become part of my morning routine. Thank you Peace Gainer team.',
    verified: true,
    helpfulCount: 42,
  }
];

export const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  
  // Form State
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [newName, setNewName] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('peace_gainer_user_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews([...parsed, ...INITIAL_REVIEWS]);
      } catch {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newReview: ReviewItem = {
      id: 'rev-user-' + Date.now(),
      name: newName.trim() || 'Anonymous Friend',
      rating: newRating,
      date: 'Just now',
      message: newMessage.trim(),
      verified: true,
      helpfulCount: 1,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    // Persist user-created reviews
    const userOnly = updated.filter(r => r.id.startsWith('rev-user-'));
    localStorage.setItem('peace_gainer_user_reviews', JSON.stringify(userOnly));

    setSubmitted(true);
    setNewName('');
    setNewMessage('');
    setNewRating(5);
  };

  const toggleHelpful = (id: string) => {
    setHelpfulLiked(prev => {
      const isAlreadyLiked = prev[id];
      const nextState = !isAlreadyLiked;
      
      setReviews(current =>
        current.map(r => {
          if (r.id === id) {
            return {
              ...r,
              helpfulCount: isAlreadyLiked ? r.helpfulCount - 1 : r.helpfulCount + 1
            };
          }
          return r;
        })
      );

      return { ...prev, [id]: nextState };
    });
  };

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === filterRating);

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Banner Overview */}
      <div className="bg-white dark:bg-[#0F2836] rounded-3xl p-6 sm:p-10 border border-[#3FCDA8]/25 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#3FCDA8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3FCDA8]/15 text-[#169375] dark:text-[#3FCDA8] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" /> Community Reviews & Ratings
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">{avgRating}</span>
              <span className="text-sm text-[#1C2D37]/70 dark:text-[#F7F3E9]/70 font-medium">out of 5.0</span>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-xs text-[#1C2D37]/70 dark:text-[#F7F3E9]/70">
              Based on {reviews.length} authentic community reflections and feedback.
            </p>
          </div>

          <div className="md:col-span-7 bg-[#F7F3E9]/60 dark:bg-[#081620]/60 p-6 rounded-2xl border border-[#3FCDA8]/20 space-y-3">
            <h3 className="text-sm font-semibold text-[#0B1F2A] dark:text-[#F7F3E9] flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Safe & Confidential Feedback Space
            </h3>
            <p className="text-xs text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
              Your voice helps us improve Peace Gainer. Share your honest thoughts, experiences with our relaxation tools, or suggestions for new wellness features.
            </p>
          </div>
        </div>
      </div>

      {/* Review Submission Form & Review List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Write a Review Form */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0F2836] rounded-3xl p-6 sm:p-8 border border-[#3FCDA8]/30 shadow-lg h-fit space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#169375] dark:text-[#3FCDA8]" /> Leave Your Reflection
            </h2>
            <p className="text-xs text-[#1C2D37]/70 dark:text-[#F7F3E9]/70">
              How has your experience with Peace Gainer been?
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#3FCDA8]/15 border border-[#3FCDA8]/40 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#3FCDA8] text-[#081620] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">Thank You for Your Feedback!</h3>
              <p className="text-xs text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
                Your review has been added to our community wall. Your support keeps Peace Gainer growing.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-[#169375] dark:text-[#3FCDA8] underline hover:opacity-80"
              >
                Submit another reflection
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#0B1F2A] dark:text-[#F7F3E9] block">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || newRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-medium text-amber-500 ml-2">
                    {hoverRating || newRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0B1F2A] dark:text-[#F7F3E9] block">
                  Your Name or Pseudonym
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., Aarav S. or Anonymous"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F7F3E9]/50 dark:bg-[#081620]/60 text-xs focus:ring-2 focus:ring-[#3FCDA8] focus:outline-none text-[#0B1F2A] dark:text-[#F7F3E9]"
                />
              </div>

              {/* Review Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0B1F2A] dark:text-[#F7F3E9] block">
                  Your Thoughts & Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share how Peace Gainer helped you today or what features you enjoyed most..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F7F3E9]/50 dark:bg-[#081620]/60 text-xs focus:ring-2 focus:ring-[#3FCDA8] focus:outline-none text-[#0B1F2A] dark:text-[#F7F3E9]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#169375] to-[#3FCDA8] text-[#081620] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Submit Review
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Review List */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#0F2836] p-4 rounded-2xl border border-[#3FCDA8]/20 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1F2A] dark:text-[#F7F3E9]">
              <Filter className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" /> Filter Reviews:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filterRating === 'all'
                    ? 'bg-[#169375] dark:bg-[#3FCDA8] text-white dark:text-[#081620] shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                All ({reviews.length})
              </button>
              {[5, 4, 3].map(stars => (
                <button
                  key={stars}
                  onClick={() => setFilterRating(stars)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                    filterRating === stars
                      ? 'bg-[#169375] dark:bg-[#3FCDA8] text-white dark:text-[#081620] shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </button>
              ))}
            </div>
          </div>

          {/* List Cards */}
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-[#0F2836] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <p className="text-xs text-gray-500">No reviews found for this rating filter.</p>
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white dark:bg-[#0F2836] rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-[#3FCDA8]/40 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#169375] to-[#3FCDA8] text-white font-bold text-xs flex items-center justify-center">
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">{rev.name}</span>
                          {rev.verified && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                              Verified Member
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 block">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#1C2D37]/85 dark:text-[#F7F3E9]/85 leading-relaxed">
                    &ldquo;{rev.message}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                    <button
                      onClick={() => toggleHelpful(rev.id)}
                      className={`flex items-center gap-1 hover:text-[#169375] dark:hover:text-[#3FCDA8] transition-colors ${
                        helpfulLiked[rev.id] ? 'text-[#169375] dark:text-[#3FCDA8] font-bold' : ''
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.helpfulCount})
                    </button>
                    <span className="text-[10px] italic text-gray-400">Peace Gainer Sanctuary</span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
