import { CauseItem, SolutionItem, InspirationalStory, Affirmation, KindnessTask } from '../types';

export const CAUSES_DATA: CauseItem[] = [
  {
    id: 'academic',
    title: 'Academic Pressure',
    iconName: 'GraduationCap',
    category: 'Environment',
    shortDescription: 'Overwhelming exams, fear of failure, or high grade expectations.',
    detailedExplanation: 'Constant performance anxiety and high expectations can wear down self-esteem and lead to mental exhaustion or burnout.',
    positiveAdvice: 'Your worth is defined by who you are as a human, not by a test score. Break tasks into tiny chunks and take frequent rest breaks.',
    copingTip: 'Set realistic study limits and remember that failure is merely feedback, not a final verdict.'
  },
  {
    id: 'financial',
    title: 'Financial Stress',
    iconName: 'Coins',
    category: 'Life Circumstance',
    shortDescription: 'Money worries, debt, job uncertainty, or unexpected expenses.',
    detailedExplanation: 'Persistent anxiety about basic needs or debt triggers chronic stress hormones that disrupt sleep and emotional stability.',
    positiveAdvice: 'Focus on what you can control today. Seeking guidance or creating a micro-budget helps regain a sense of mastery.',
    copingTip: 'You are resilient. Share concerns with a financial counselor or a non-judgmental friend.'
  },
  {
    id: 'relationship',
    title: 'Relationship Problems',
    iconName: 'HeartBreak',
    category: 'Social',
    shortDescription: 'Breakups, constant arguments, lack of intimacy, or unhealthy dynamics.',
    detailedExplanation: 'Friction or loss in key personal connections strikes at our fundamental human need for safety and connection.',
    positiveAdvice: 'Grief after a relationship shift is normal. Focus on self-love, gentle boundaries, and nurturing true supportive friendships.',
    copingTip: 'Practice compassionate communication, and know it is healthy to step back from toxic spaces.'
  },
  {
    id: 'social-isolation',
    title: 'Social Isolation',
    iconName: 'UserX',
    category: 'Social',
    shortDescription: 'Feeling disconnected, lonely, or lacking a supportive community.',
    detailedExplanation: 'Humans are wired for connection. Prolonged loneliness tricks the brain into feeling unsafe and helpless.',
    positiveAdvice: 'Even tiny social interactions—like smiling at a neighbor or sending a friendly text—reignite warm connections.',
    copingTip: 'Join local interest groups, volunteer, or start with online communities focused on shared gentle hobbies.'
  },
  {
    id: 'bullying',
    title: 'Bullying & Harassment',
    iconName: 'ShieldAlert',
    category: 'Environment',
    shortDescription: 'Cyberbullying, workplace harassment, or verbal abuse.',
    detailedExplanation: 'Repeated negative exposure creates deep self-doubt, trauma, and feelings of unsafe vulnerability.',
    positiveAdvice: 'Bullying reflects the offender’s internal dysfunction, never your true worth. You deserve respect and physical safety.',
    copingTip: 'Document incidents, confide in trusted authorities, and block digital harassment immediately.'
  },
  {
    id: 'workplace',
    title: 'Workplace Stress',
    iconName: 'Briefcase',
    category: 'Environment',
    shortDescription: 'Unreasonable workloads, toxic managers, or career insecurity.',
    detailedExplanation: 'Chronic work strain leads to complete exhaustion, depersonalization, and reduced efficacy.',
    positiveAdvice: 'Work is what you do, not who you are. Prioritize strict work-life boundaries and guard your personal evenings.',
    copingTip: 'Schedule non-negotiable downtime and explore small career adjustments if environment remains harmful.'
  },
  {
    id: 'family-conflict',
    title: 'Family Conflicts',
    iconName: 'Home',
    category: 'Social',
    shortDescription: 'Friction with parents, siblings, or domestic discord.',
    detailedExplanation: 'Disagreements in spaces meant to be safe havens can cause deep emotional instability and hyper-vigilance.',
    positiveAdvice: 'You cannot control family members, but you can choose how you respond and protect your peace.',
    copingTip: 'Establish calm, firm boundaries and seek external safe spaces or professional family mediation.'
  },
  {
    id: 'trauma',
    title: 'Past Trauma',
    iconName: 'Activity',
    category: 'Internal',
    shortDescription: 'Unprocessed painful events, accidents, loss, or abuse.',
    detailedExplanation: 'Unresolved trauma keeps the nervous system trapped in a state of alarm or emotional numbness.',
    positiveAdvice: 'Healing from trauma takes time, gentleness, and professional care. You were strong enough to survive it; you can thrive beyond it.',
    copingTip: 'Trauma-informed professional counseling provides safe pathways to restore nervous system balance.'
  },
  {
    id: 'health',
    title: 'Health Problems',
    iconName: 'Stethoscope',
    category: 'Physical',
    shortDescription: 'Chronic illness, physical pain, or sudden medical diagnoses.',
    detailedExplanation: 'Physical illness limits mobility or daily independence, directly impacting mood chemistry and outlook.',
    positiveAdvice: 'Honor your body’s needs without self-blame. Find joy in low-energy comforting activities like listening to audiobooks.',
    copingTip: 'Work closely with medical professionals and join chronic condition support circles.'
  },
  {
    id: 'social-media',
    title: 'Social Media Comparison',
    iconName: 'Smartphone',
    category: 'Digital',
    shortDescription: 'Constantly comparing your reality to filtered highlight reels.',
    detailedExplanation: 'Curated online feeds highlight ideal moments, triggering envy, inadequate feelings, and distorted realities.',
    positiveAdvice: 'Social media is a curated stage, not real life. Unfollow accounts that induce self-doubt.',
    copingTip: 'Try a 24-hour digital detox each week and ground yourself in tangible real-world experiences.'
  },
  {
    id: 'sleep',
    title: 'Sleep Deprivation',
    iconName: 'Moon',
    category: 'Physical',
    shortDescription: 'Insomnia, erratic sleep patterns, or night anxiety.',
    detailedExplanation: 'Lack of restorative REM sleep impairs emotional regulation, memory consolidation, and stress resilience.',
    positiveAdvice: 'Treat your sleep schedule as a sanctuary. Small night rituals tell your body it is safe to rest.',
    copingTip: 'Dim lights 1 hour before bed, avoid screens, and try gentle 4-7-8 breathing when lying down.'
  },
  {
    id: 'addiction',
    title: 'Substance Dependency',
    iconName: 'ZapOff',
    category: 'Physical',
    shortDescription: 'Relying on alcohol, drugs, or compulsive coping habits.',
    detailedExplanation: 'Substances temporize pain but disrupt natural dopamine production, exacerbating depression over time.',
    positiveAdvice: 'Seeking support is a act of courage. Recovery is possible step by step with zero shame.',
    copingTip: 'Reach out to support helplines or addiction counselors for safe, non-judgmental guidance.'
  },
  {
    id: 'grief',
    title: 'Loss of Loved Ones',
    iconName: 'Flower2',
    category: 'Life Circumstance',
    shortDescription: 'Bereavement, loss of a friend, or losing a cherished pet.',
    detailedExplanation: 'Grief is a profound, non-linear emotional wave that alters daily life and sense of identity.',
    positiveAdvice: 'There is no expiration date on grief. Allow tears to flow without rushing your natural process.',
    copingTip: 'Create a gentle memory journal or plant a flower in honor of your loved one.'
  },
  {
    id: 'low-esteem',
    title: 'Low Self-Esteem',
    iconName: 'Sparkles',
    category: 'Internal',
    shortDescription: 'Harsh internal critic, feeling unworthy or "never good enough".',
    detailedExplanation: 'Negative self-talk distorts self-perception and causes withdrawal from meaningful opportunities.',
    positiveAdvice: 'Speak to yourself the way you would speak to a loved best friend who is hurting.',
    copingTip: 'Keep a daily victory log noting 3 tiny achievements, no matter how small.'
  }
];

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'talk',
    title: 'Talk to Trusted People',
    iconName: 'MessageCircleHeart',
    summary: 'Sharing your burden lightens emotional weight and restores feeling seen.',
    detailedGuide: [
      'Choose a empathetic friend, family member, or mentor who listens without judging.',
      'You don’t need to explain everything perfectly; just say "I’ve been feeling overwhelmed lately."',
      'Allowing yourself to be vulnerable creates deep relief and genuine human warmth.'
    ],
    scientificBenefits: 'Expressing emotions lowers cortisol stress hormones and increases oxytocin.',
    durationMinutes: 15,
    category: 'social'
  },
  {
    id: 'exercise',
    title: 'Gentle Physical Exercise',
    iconName: 'Dumbbell',
    summary: 'Simple movement like walking or light stretching boosts mood chemistry.',
    detailedGuide: [
      'Aim for a simple 10–20 minute walk in sunlight or a gentle indoor stretch.',
      'Focus on the sensation of movement rather than strenuous performance.',
      'Consistency matters far more than intensity.'
    ],
    scientificBenefits: 'Exercise stimulates natural endorphins, BDNF brain growth factors, and serotonin.',
    durationMinutes: 20,
    category: 'physical'
  },
  {
    id: 'meditation',
    title: 'Mindfulness Meditation',
    iconName: 'Sparkles',
    summary: 'Train your mind to anchor in the present moment without judging thoughts.',
    detailedGuide: [
      'Sit comfortably, close your eyes, and bring full attention to your breath.',
      'When your mind wanders (which is completely normal), gently return to breathing.',
      'Start with just 3 to 5 minutes daily.'
    ],
    scientificBenefits: 'Regular meditation shrinks the hyperactive amygdala and strengthens the prefrontal cortex.',
    durationMinutes: 5,
    category: 'mindfulness'
  },
  {
    id: 'yoga',
    title: 'Gentle Yoga & Stretching',
    iconName: 'Sun',
    summary: 'Mindful physical postures release stored muscular tension and calm nervous system.',
    detailedGuide: [
      'Perform slow stretches like Child’s Pose, Cat-Cow, or legs up against a wall.',
      'Sync each movement with deep, slow breathing.',
      'Listen to your body’s limits without forcing flexibility.'
    ],
    scientificBenefits: 'Yoga increases GABA neurotransmitters that soothe anxiety and physical restlessness.',
    durationMinutes: 15,
    category: 'physical'
  },
  {
    id: 'sleep-hygiene',
    title: 'Healthy Rest & Sleep Hygiene',
    iconName: 'Moon',
    summary: 'Restorative sleep heals the mind and resets emotional endurance.',
    detailedGuide: [
      'Maintain a fixed wake-up time every day to set your circadian rhythm.',
      'Keep your room cool, quiet, and dark.',
      'Avoid phone screens 45 minutes before sleep; read or listen to calming audio instead.'
    ],
    scientificBenefits: 'Deep REM sleep cleans neural metabolic waste and processes daily emotional events.',
    durationMinutes: 480,
    category: 'lifestyle'
  },
  {
    id: 'nutrition',
    title: 'Nutritious Comforting Meals',
    iconName: 'Apple',
    summary: 'Nourishing food provides stable blood sugar and essential mood building blocks.',
    detailedGuide: [
      'Incorporate whole foods, fresh fruits, vegetables, nuts, and adequate water.',
      'Reduce excess sugar or caffeine spikes that trigger mood crashes.',
      'Enjoy cooking or eating mindfully without distractions.'
    ],
    scientificBenefits: 'Over 90% of serotonin is produced in the gut (gut-brain axis connection).',
    durationMinutes: 30,
    category: 'lifestyle'
  },
  {
    id: 'journaling',
    title: 'Expressive Journaling',
    iconName: 'BookOpen',
    summary: 'Writing thoughts down transfers racing internal noise onto paper.',
    detailedGuide: [
      'Write freely for 5 minutes without worrying about grammar, spelling, or neatness.',
      'Name your emotions specifically ("I feel worried about X")',
      'Finish with one gentle action you can take.'
    ],
    scientificBenefits: 'Labeling feelings in writing reduces activity in emotional alarm centers of the brain.',
    durationMinutes: 10,
    category: 'mindfulness'
  },
  {
    id: 'nature',
    title: 'Time in Nature',
    iconName: 'Trees',
    summary: 'Walking under trees or sitting near plants calms senses and grounds focus.',
    detailedGuide: [
      'Spend time in a park, garden, or near green plants.',
      'Engage all 5 senses: notice bird sounds, wind on your skin, and green colors.',
      'Leave your phone in your pocket during this time.'
    ],
    scientificBenefits: 'Nature exposure lowers blood pressure, heart rate, and ruminative brain activity.',
    durationMinutes: 25,
    category: 'lifestyle'
  },
  {
    id: 'counseling',
    title: 'Professional Counseling',
    iconName: 'HeartHandshake',
    summary: 'Working with a certified therapist gives structured tools and safe support.',
    detailedGuide: [
      'Therapists provide personalized strategies and compassionate, non-judgmental guidance.',
      'There is no shame in seeking guidance—it is a smart, proactive step for well-being.',
      'Explore local clinics, Tele-MANAS, or certified online therapy options.'
    ],
    scientificBenefits: 'Psychotherapy alters neural pathways to replace cognitive distortions with healthy habits.',
    durationMinutes: 50,
    category: 'social'
  },
  {
    id: 'avoid-substances',
    title: 'Avoid Substance Abuse',
    iconName: 'ShieldCheck',
    summary: 'Protect your natural chemistry from artificial highs and deep crashes.',
    detailedGuide: [
      'Recognize triggers that prompt the urge to use substances to numb feeling.',
      'Replace substance rituals with soothing alternatives like warm tea or shower.',
      'Connect with recovery groups or helplines if needed.'
    ],
    scientificBenefits: 'Stabilizes natural neurochemical receptors and prevents rebound anxiety.',
    durationMinutes: 0,
    category: 'lifestyle'
  },
  {
    id: 'gratitude',
    title: 'Daily Gratitude Practice',
    iconName: 'Heart',
    summary: 'Shift mental focus to appreciate small, positive aspects of existence.',
    detailedGuide: [
      'Every morning or evening, write down 3 specific things you appreciate.',
      'They can be simple: a warm cup of water, a quiet morning, or a comfortable chair.',
      'Savor the warm feeling in your chest for 10 seconds.'
    ],
    scientificBenefits: 'Re-wires brain bias away from threat hunting towards positive appreciation.',
    durationMinutes: 5,
    category: 'mindfulness'
  },
  {
    id: 'micro-goals',
    title: 'Small Daily Micro-Goals',
    iconName: 'CheckCircle2',
    summary: 'Accomplishing tiny tasks rebuilds self-efficacy and momentum.',
    detailedGuide: [
      'Set ultra-small goals: e.g., "Make my bed", "Drink a glass of water", or "Open a window".',
      'Celebrate each completed goal with a deep breath and a smile.',
      'Do not overwhelm yourself with big long lists; focus on 1 micro-goal at a time.'
    ],
    scientificBenefits: 'Micro-wins trigger small dopamine releases that boost energy and motivation.',
    durationMinutes: 5,
    category: 'mindfulness'
  }
];

export const INSPIRATIONAL_STORIES: InspirationalStory[] = [
  {
    id: 'story-1',
    title: 'From Complete Darkness to Light: Aarav’s Journey',
    author: 'Aarav M.',
    age: 26,
    summary: 'Faced severe academic burnout and isolation during his final university exams, but found recovery through micro-goals and counseling.',
    fullStory: 'During my final year, I couldn’t get out of bed for weeks. Every exam felt like a mountain, and I felt like a disappointment to everyone. One day, I called a mental health helpline. The counselor didn’t judge me; they just listened. I started setting tiny micro-goals: sitting near the window for 5 minutes, then taking a short walk. Step by step, with counseling and regular walks, my world brightened up again.',
    keyTakeaway: 'You don’t have to fix your whole life today. Just focus on taking one single breath and one small step.',
    tags: ['Academic Burnout', 'Helpline', 'Micro-goals']
  },
  {
    id: 'story-2',
    title: 'Finding Hope After Job Loss: Priya’s Tale',
    author: 'Priya K.',
    age: 32,
    summary: 'Lost her job unexpectedly and struggled with deep self-doubt, but rebuilt her confidence through journaling and community support.',
    fullStory: 'Losing my job felt like losing my entire identity. I felt useless and stopped talking to my friends out of shame. A close friend noticed and gently brought me a warm meal. She encouraged me to write down my feelings in a daily journal. Journaling helped me realize that my worth wasn’t tied to a corporate title. I started volunteering, met wonderful people, and eventually landed a career far more fulfilling than before.',
    keyTakeaway: 'Your current situation is a chapter in your life story, not the whole book.',
    tags: ['Career Stress', 'Journaling', 'Friendship']
  },
  {
    id: 'story-3',
    title: 'Overcoming Social Isolation: Rohan’s Path',
    author: 'Rohan S.',
    age: 21,
    summary: 'Suffered from intense social anxiety and loneliness, but found healing through gentle nature walks and music.',
    fullStory: 'I used to lock myself in my room for days, scrolling through social media and feeling completely invisible. One morning, I decided to walk in a nearby park without my phone. Hearing birds chirping and seeing green trees felt like a cool splash of water on my face. I joined a weekend gardening group, where people were kind and patient. Learning to nurture plants taught me how to nurture myself.',
    keyTakeaway: 'Connecting with nature and gentle human communities reminds us we belong to this world.',
    tags: ['Loneliness', 'Nature Healing', 'Community']
  }
];

export const AFFIRMATIONS: Affirmation[] = [
  { id: '1', text: 'I am worthy of love, peace, and gentleness.', category: 'self-love' },
  { id: '2', text: 'This overwhelming feeling is temporary. I am safe right now.', category: 'calm' },
  { id: '3', text: 'My best is enough, even on days when my energy is low.', category: 'self-love' },
  { id: '4', text: 'With every deep breath, I release tension and welcome peace.', category: 'calm' },
  { id: '5', text: 'I am stronger than my anxious thoughts.', category: 'strength' },
  { id: '6', text: 'I deserve rest without feeling guilty.', category: 'healing' },
  { id: '7', text: 'Light lies ahead. I choose to move forward step by step.', category: 'hope' },
  { id: '8', text: 'I release what I cannot control and nurture my inner calm.', category: 'calm' },
  { id: '9', text: 'My feelings are valid, and I treat myself with deep kindness.', category: 'self-love' },
  { id: '10', text: 'I am not defined by past mistakes or present worries.', category: 'hope' }
];

export const KINDNESS_TASKS: KindnessTask[] = [
  {
    id: 'k1',
    title: 'Send a Warm Message',
    description: 'Reach out to a friend or family member with a short text: "Thinking of you today, hope you’re having a gentle day!"',
    difficulty: 'easy'
  },
  {
    id: 'k2',
    title: 'Water a Plant or Feed a Bird',
    description: 'Nurture a living element around you. Notice how it feels to offer care.',
    difficulty: 'gentle'
  },
  {
    id: 'k3',
    title: 'Write Yourself a Compliment',
    description: 'Write down 1 thing you genuinely admire about yourself on a sticky note and place it near your mirror.',
    difficulty: 'heartwarming'
  },
  {
    id: 'k4',
    title: 'Leave a Positive Review or Note',
    description: 'Leave a kind 5-star review or a genuine thank you note for a small local café or store worker.',
    difficulty: 'easy'
  },
  {
    id: 'k5',
    title: '5 Minutes of Unconditional Rest',
    description: 'Sit in a comfy spot, close your eyes, and allow yourself 5 minutes of doing absolutely nothing without feeling guilty.',
    difficulty: 'gentle'
  }
];

export const MASCOT_TIPS = [
  "Hi friend! I'm Peace Buddy. Remember to take a deep breath in... and let it out softly.",
  "Did you drink some water today? Hydration is a small act of self-love!",
  "Unclench your jaw, drop your shoulders down, and relax your forehead.",
  "You don't have to carry the weight of the entire world on your shoulders.",
  "It's completely okay to take things one minute at a time.",
  "You are doing better than you give yourself credit for. I believe in you!",
  "Want a quick boost? Try our 5-minute breathing exercise in the Self-Help section!"
];
