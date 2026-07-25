import React, { useState, useEffect } from 'react';
import {
  Sparkles, Heart, Activity, Play, Pause, RotateCcw, Clock,
  CheckCircle2, Info, ChevronRight, Volume2, ShieldCheck, Flame, Sun, Moon
} from 'lucide-react';

// Yoga pose high quality visual references
const forwardBendImg = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80';
const cobraImg = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80';
const legsUpWallImg = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80';
const childPoseImg = 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=80';

interface YogaPose {
  id: string;
  sanskritName: string;
  englishName: string;
  category: 'Restorative' | 'Heart Opener' | 'Mild Inversion' | 'Grounding';
  tag: string;
  image: string;
  imageAlt: string;
  depressionReliefMechanism: string;
  benefits: string[];
  procedure: string[];
  breathingGuidance: string;
  holdDurationSeconds: number;
  precautions: string;
}

export const YogaDepression: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTimerPoseId, setActiveTimerPoseId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeStepTab, setActiveStepTab] = useState<Record<string, number>>({});

  // 8 Scientifically Proven Yoga Poses for Overcoming Depression
  const yogaPoses: YogaPose[] = [
    {
      id: 'uttanasana',
      sanskritName: 'Uttanasana',
      englishName: 'Standing Forward Bend',
      category: 'Mild Inversion',
      tag: 'Calms Nervous System & Brain',
      image: forwardBendImg,
      imageAlt: 'Uttanasana Standing Forward Bend Yoga Pose',
      depressionReliefMechanism:
        'Reverses gravitational pull to increase blood circulation and oxygen flow to the brain. This gentle head-below-heart inversion reduces elevated cortisol (stress hormone) and calms hyperactive nervous responses associated with severe mental fatigue and anxiety.',
      benefits: [
        'Calms the central nervous system and quietens racing thoughts',
        'Helps relieve mild depression, fatigue, and brain fog',
        'Stretches hamstrings, calves, and relieves spine tightness',
        'Stimulates liver and kidneys to assist systemic detox'
      ],
      procedure: [
        'Stand tall with feet hip-width apart and hands rested on hips.',
        'Inhale deeply, lengthen your spine, and engage your core.',
        'Exhale and hinge gently from your hips (not waist), folding your torso down over your legs.',
        'Allow your head, neck, and shoulders to hang heavy toward the floor. Rest hands beside feet or hold opposite elbows.',
        'Softly bend knees if hamstrings feel tight. Focus on breathing deeply into the belly.',
        'To release: Inhale, place hands on hips, engage core, and slowly roll up spine vertebra by vertebra.'
      ],
      breathingGuidance: 'Inhale to lengthen spine; Exhale as you fold deeper. Maintain slow, smooth diaphragmatic breaths while holding.',
      holdDurationSeconds: 60,
      precautions: 'If you have severe lower back injury or high blood pressure, keep knees slightly bent and do not force the fold.'
    },
    {
      id: 'bhujangasana',
      sanskritName: 'Bhujangasana',
      englishName: 'Cobra Pose',
      category: 'Heart Opener',
      tag: 'Elevates Mood & Combats Lethargy',
      image: cobraImg,
      imageAlt: 'Bhujangasana Cobra Yoga Pose',
      depressionReliefMechanism:
        'Depression often causes physical slouching and closed chest posture. Bhujangasana expands the chest, opens the ribcage for full lung expansion, and gently stimulates the adrenal glands and thyroid, instantly elevating energy and countering depressive apathy.',
      benefits: [
        'Opens heart and chest to encourage deep, life-affirming breathing',
        'Invigorates tired energy levels and combats physical lethargy',
        'Strengthens the entire spine, shoulders, and abdomen',
        'Stimulates abdominal organs and improves overall vitality'
      ],
      procedure: [
        'Lie flat on your stomach on the mat with legs extended behind, tops of feet pressing into floor.',
        'Place palms on the mat directly underneath your shoulders, elbows hugging close to torso.',
        'Inhale deeply and press firmly through palms to gently lift chest off the mat up to navel level.',
        'Keep shoulders relaxed down away from ears and gaze gently forward or slightly upward.',
        'Hold the pose while maintaining steady, open breaths in the chest.',
        'Exhale slowly as you lower your chest and forehead back onto the mat.'
      ],
      breathingGuidance: 'Inhale deeply as you lift chest; Exhale smoothly as you lower down.',
      holdDurationSeconds: 30,
      precautions: 'Avoid if pregnant or experiencing acute wrist/lower back injury.'
    },
    {
      id: 'viparita-karani',
      sanskritName: 'Viparita Karani',
      englishName: 'Legs-Up-The-Wall Pose',
      category: 'Restorative',
      tag: 'Deep Anti-Anxiety & Cortisol Reduction',
      image: legsUpWallImg,
      imageAlt: 'Viparita Karani Legs Up Wall Restorative Pose',
      depressionReliefMechanism:
        'A deeply soothing restorative inversion that triggers the parasympathetic nervous system ("rest and digest"). It restores venous blood flow from lower limbs back to heart and brain, triggering profound release of nervous exhaustion and psychological tension.',
      benefits: [
        'Triggers parasympathetic relaxation response to lower anxiety',
        'Relieves leg fatigue, swollen ankles, and physical heaviness',
        'Quietens an overactive mind and improves nighttime sleep quality',
        'Soothes headaches and eases emotional burnout'
      ],
      procedure: [
        'Sit sideways close to a wall with your hip touching the wall.',
        'Gently swing your legs up onto the wall as you swing your torso back to lie flat on floor.',
        'Adjust your hips so they are comfortably close to the wall (or a few inches away if tight).',
        'Rest your arms comfortably out to sides with palms facing upward.',
        'Close your eyes, soften your jaw, and let all muscular effort drain away.',
        'To exit: Gently bend knees toward chest, roll to one side, and rest before sitting up.'
      ],
      breathingGuidance: 'Inhale slow belly breath for 4 counts; Exhale smoothly for 6 counts.',
      holdDurationSeconds: 180,
      precautions: 'Avoid during active eye conditions like glaucoma, or if inversion causes discomfort.'
    },
    {
      id: 'balasana',
      sanskritName: 'Balasana',
      englishName: 'Child Pose',
      category: 'Grounding',
      tag: 'Emotional Safety & Panic Relief',
      image: childPoseImg,
      imageAlt: 'Balasana Child Pose Restorative Yoga',
      depressionReliefMechanism:
        'Balasana creates a comforting, womb-like posture that fosters a feeling of emotional protection and safety. Resting the forehead on the earth stimulates the vagus nerve and quiets mental chatter, helping defuse panic spikes and emotional helplessness.',
      benefits: [
        'Provides immediate emotional comfort and sense of safety',
        'Gently stretches back muscles, hips, thighs, and ankles',
        'Quiets mental chatter and relieves stress-induced tension',
        'Helps soothe digestive discomfort caused by emotional stress'
      ],
      procedure: [
        'Kneel on the mat with big toes touching and knees placed hip-width or wider apart.',
        'Inhale deeply and lengthen your spine.',
        'Exhale and fold torso forward between your thighs, resting forehead gently onto the mat.',
        'Extend arms forward with palms down, or rest arms along side body with palms up.',
        'Allow shoulders to soften toward floor and sink hips toward heels.',
        'Breathe into your back ribcage, feeling expansion on every inhale.'
      ],
      breathingGuidance: 'Breathe deeply into your upper back and ribcage, exhaling away all tension.',
      holdDurationSeconds: 120,
      precautions: 'Place a blanket under knees or a pillow under forehead if neck or knees feel strained.'
    },
    {
      id: 'setu-bandhasana',
      sanskritName: 'Setu Bandhasana',
      englishName: 'Bridge Pose',
      category: 'Heart Opener',
      tag: 'Rejuvenates Brain & Re-energizes Body',
      image: 'https://picsum.photos/seed/yoga-bridge/800/600',
      imageAlt: 'Setu Bandhasana Bridge Yoga Pose',
      depressionReliefMechanism:
        'Bridge Pose elevates hips above heart and opens chest wide. This gentle inversion stimulates the thyroid gland (regulating metabolism and mood) while releasing tension stored in the upper chest and shoulders.',
      benefits: [
        'Rejuvenates a tired mind and reduces symptoms of mild depression',
        'Stimulates thyroid and abdominal organs to boost sluggish mood',
        'Strengthens back, glutes, and thighs',
        'Relieves headache, insomnia, and nervous anxiety'
      ],
      procedure: [
        'Lie on back with knees bent, feet flat on mat hip-width apart and close to glutes.',
        'Keep arms beside body with palms pressing firmly into floor.',
        'Inhale, press down through feet, and lift hips up towards ceiling.',
        'Interlace fingers under lower back and press arms into mat to lift chest higher toward chin.',
        'Keep thighs parallel and knees aligned over ankles.',
        'Hold pose while breathing smoothly. Exhale as you slowly roll spine back down.'
      ],
      breathingGuidance: 'Inhale deeply as you press hips up; breathe continuously into chest.',
      holdDurationSeconds: 45,
      precautions: 'Do not turn head from side to side while in pose to protect neck vertebrae.'
    },
    {
      id: 'adho-mukha-svanasana',
      sanskritName: 'Adho Mukha Svanasana',
      englishName: 'Downward-Facing Dog',
      category: 'Mild Inversion',
      tag: 'Invigorates Mind & Boosts Circulation',
      image: 'https://picsum.photos/seed/yoga-downdog/800/600',
      imageAlt: 'Downward Facing Dog Yoga Pose',
      depressionReliefMechanism:
        'Combines full body strengthening with a gentle head-down inversion. Oxygenates brain cells, relieving mental heaviness and fatigue while stretching hamstrings and shoulders.',
      benefits: [
        'Invigorates full body and clears mental fog',
        'Enhances blood circulation to brain to improve mood and alertness',
        'Builds core and shoulder strength',
        'Helps relieve stiffness from long periods of sitting or inactivity'
      ],
      procedure: [
        'Start on hands and knees with wrists aligned under shoulders and knees under hips.',
        'Spread fingers wide and press palms flat into floor.',
        'Exhale, tuck toes, press through hands, and lift knees off mat, sending hips up and back.',
        'Lengthen spine, relax head between upper arms, gaze toward feet.',
        'Pedal heels gently toward floor to stretch hamstrings.',
        'To exit: Exhale and gently bend knees back down to tabletop pose.'
      ],
      breathingGuidance: 'Breathe steadily into back and ribs, maintaining long deep inhales and exhales.',
      holdDurationSeconds: 60,
      precautions: 'Modify if you have carpal tunnel syndrome or high blood pressure.'
    },
    {
      id: 'anjaneyasana',
      sanskritName: 'Anjaneyasana',
      englishName: 'Crescent Low Lunge',
      category: 'Grounding',
      tag: 'Releases Stored Emotional Hip Tension',
      image: 'https://picsum.photos/seed/yoga-lunge/800/600',
      imageAlt: 'Anjaneyasana Low Lunge Pose',
      depressionReliefMechanism:
        'Trauma and chronic emotional stress are frequently stored physically in the deep hip flexors (psoas muscle). Anjaneyasana deep-stretches the psoas while opening the heart, releasing suppressed stress.',
      benefits: [
        'Releases deep-seated emotional tension stored in hip flexors',
        'Opens chest and lungs to expand breath capacity',
        'Improves balance, stability, and grounded confidence',
        'Strengthens legs and hips'
      ],
      procedure: [
        'From Downward Dog or Tabletop, step right foot forward between hands.',
        'Lower left knee gently to mat and un-tuck left toes.',
        'Inhale and lift torso upright, sweeping arms overhead with palms facing each other.',
        'Sink hips gently forward and down while keeping front knee over ankle.',
        'Lift chest upward to create a slight gentle backbend.',
        'Hold for 30 seconds, then step back and repeat on opposite side.'
      ],
      breathingGuidance: 'Inhale as you sweep arms up; Exhale as you sink gently into hip stretch.',
      holdDurationSeconds: 30,
      precautions: 'Use folded blanket under back knee for extra cushioning if knee is sensitive.'
    },
    {
      id: 'savasana',
      sanskritName: 'Savasana',
      englishName: 'Corpse Pose (Deep Integration)',
      category: 'Restorative',
      tag: 'Complete Neurological Integration & Peace',
      image: 'https://picsum.photos/seed/yoga-savasana/800/600',
      imageAlt: 'Savasana Corpse Pose Integration',
      depressionReliefMechanism:
        'The most essential pose for mental recovery. Savasana allows the brain to process and integrate the physiological benefits of practice, shifting body state into complete equilibrium and quiet awareness.',
      benefits: [
        'Soothes brain activity and reduces symptoms of anxiety and depression',
        'Lowers blood pressure, heart rate, and muscle tension',
        'Promotes deep restorative healing and mindfulness',
        'Improves emotional regulation and sleep patterns'
      ],
      procedure: [
        'Lie flat on back with legs spread comfortably wide, feet flopping open to sides.',
        'Rest arms alongside body a few inches away, palms facing upward.',
        'Close eyes gently, release control of breath, and allow body to feel heavy.',
        'Mentally scan body from toes to top of head, releasing any residual tension.',
        'Remain completely still for 5 to 10 minutes, observing breath with detachment.',
        'To wake up: Wiggle fingers and toes, bend knees, roll to right side, then sit up slowly.'
      ],
      breathingGuidance: 'Allow breath to become natural, soft, effortless, and unforced.',
      holdDurationSeconds: 300,
      precautions: 'If lower back feels uncomfortable, place a rolled towel or bolster under knees.'
    }
  ];

  // Filtered poses
  const filteredPoses = yogaPoses.filter((pose) => {
    if (selectedCategory === 'All') return true;
    return pose.category === selectedCategory;
  });

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play gentle chime completion sound
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, audioCtx.currentTime); // 528Hz Solfeggio frequency
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 2);
      } catch (e) {
        console.log('Audio chime auto-play skipped', e);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const startPoseTimer = (pose: YogaPose) => {
    setActiveTimerPoseId(pose.id);
    setTimeLeft(pose.holdDurationSeconds);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (duration: number) => {
    setIsTimerRunning(false);
    setTimeLeft(duration);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="yoga" className="py-12 sm:py-20 bg-gradient-to-b from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Section Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-[#0F2836] text-[#169375] dark:text-[#3FCDA8] text-xs font-bold uppercase tracking-wider border border-[#3FCDA8]/30 shadow-sm">
            <Activity className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8] animate-pulse" />
            <span>Mind-Body Healing & Yoga Recovery 🧘‍♀️</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
            Yoga for Overcoming Depression 🧘‍♂️✨
          </h2>

          <p className="text-sm sm:text-base text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
            Discover scientifically backed Yoga Asanas (poses), breathing practices 🫁, and restorative routines specifically designed to regulate stress hormones, boost serotonin & GABA 🧬, and restore deep inner peace 🕊️.
          </p>
        </div>

        {/* Science Box: How Yoga Combats Depression */}
        <div className="bg-white dark:bg-[#0F2836] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#3FCDA8]/20 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#3FCDA8] text-[#081620] flex items-center justify-center font-bold text-lg shadow-md">
              🧠
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
                How Yoga Helps Overcome Depression (Neurobiological Science 🔬)
              </h3>
              <p className="text-xs text-[#1C2D37]/70 dark:text-[#F7F3E9]/70">
                Neuroscience backing the therapeutic power of mind-body movement 🌿
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0B1F2A] dark:text-[#F2A65A]">
                <Flame className="w-4 h-4 text-[#F2A65A]" />
                <span>Lowers Cortisol & Inflammation 🔥</span>
              </div>
              <p className="text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
                Chronic depression keeps the body locked in high cortisol state ⚡. Gentle yoga postures lower systemic cortisol, easing nervous exhaustion and physical fatigue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0B1F2A] dark:text-[#3FCDA8]">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Boosts GABA & Brain Serotonin 💖</span>
              </div>
              <p className="text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
                Clinical studies reveal a 27% increase in brain GABA levels after a single 60-minute yoga session 🧘, directly reducing anxiety and lifting low mood.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0B1F2A] dark:text-[#8B85C4]">
                <ShieldCheck className="w-4 h-4 text-[#8B85C4]" />
                <span>Stimulates Vagus Nerve 🛡️</span>
              </div>
              <p className="text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
                Rhythmic yoga movement and deep breathing activate the vagus nerve 🌊, shifting the brain from "fight-or-flight" panic into parasympathetic healing.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {['All', 'Restorative', 'Heart Opener', 'Mild Inversion', 'Grounding'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-[#3FCDA8] text-[#081620] shadow-md scale-105'
                  : 'bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] border border-[#3FCDA8]/30'
              }`}
            >
              {cat === 'All' ? '✨ All Anti-Depression Poses 🧘' : `${cat}`}
            </button>
          ))}
        </div>

        {/* Poses List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPoses.map((pose) => (
            <div
              key={pose.id}
              className="bg-white dark:bg-[#0F2836] rounded-3xl border border-[#3FCDA8]/30 shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300"
            >
              {/* Pose Header & Picture */}
              <div className="relative h-64 sm:h-72 w-full bg-[#EAE4D3] dark:bg-[#0B1F2A] overflow-hidden">
                <img
                  src={pose.image}
                  alt={pose.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F2A]/90 via-[#0B1F2A]/30 to-transparent" />
                
                {/* Pose Tag & Sanskrit Name Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-[#0B1F2A]/90 backdrop-blur-md text-[#0B1F2A] dark:text-[#F7F3E9] text-xs font-bold border border-[#3FCDA8]/30 shadow-sm">
                    {pose.category} 🌸
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#3FCDA8] text-[#081620] text-xs font-bold shadow-sm">
                    ⏱️ {pose.holdDurationSeconds}s hold
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                  <span className="text-xs font-mono font-bold text-[#F2A65A] uppercase tracking-widest block">
                    🧘 {pose.sanskritName}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-[#F7F3E9]">
                    {pose.englishName}
                  </h3>
                  <p className="text-xs text-[#3FCDA8] font-medium italic">
                    ✨ {pose.tag}
                  </p>
                </div>
              </div>

              {/* Pose Card Body Content */}
              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Why It Helps Depression */}
                <div className="p-4 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#169375] dark:text-[#3FCDA8]">
                    <Info className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" />
                    <span>How It Relieves Depression 🧬:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1C2D37] dark:text-[#F7F3E9]/90 leading-relaxed">
                    {pose.depressionReliefMechanism}
                  </p>
                </div>

                {/* Key Benefits List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#0B1F2A] dark:text-[#F7F3E9] uppercase tracking-wider flex items-center gap-1">
                    <span>Key Health & Emotional Benefits 💖:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1C2D37]/90 dark:text-[#F7F3E9]/90">
                    {pose.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3FCDA8] flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step-by-Step Interactive Procedure */}
                <div className="space-y-3 pt-2 border-t border-[#3FCDA8]/20">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#0B1F2A] dark:text-[#F7F3E9] uppercase tracking-wider">
                      Step-by-Step Procedure 👣:
                    </h4>
                    <span className="text-[11px] font-semibold text-[#169375] dark:text-[#3FCDA8]">
                      {pose.procedure.length} Easy Steps 🌿
                    </span>
                  </div>

                  <ol className="space-y-2 text-xs sm:text-sm text-[#1C2D37]/90 dark:text-[#F7F3E9]/90">
                    {pose.procedure.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F7F3E9] dark:hover:bg-[#0B1F2A] transition-colors">
                        <span className="w-5 h-5 rounded-lg bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Breathing & Precautions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-1">
                    <span className="font-bold text-[#0B1F2A] dark:text-[#F2A65A] flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-[#F2A65A]" /> Breathing Guidance 🫁:
                    </span>
                    <p className="text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">{pose.breathingGuidance}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-1">
                    <span className="font-bold text-[#0B1F2A] dark:text-[#3FCDA8] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3FCDA8]" /> Caution / Note 🛡️:
                    </span>
                    <p className="text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">{pose.precautions}</p>
                  </div>
                </div>

                {/* Practice Pose Interactive Timer Bar */}
                <div className="pt-3">
                  {activeTimerPoseId === pose.id ? (
                    <div className="p-4 rounded-2xl bg-[#3FCDA8] text-[#081620] space-y-3 shadow-md animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-[#081620] animate-spin" />
                          <span className="font-bold text-xs uppercase tracking-wider">
                            Practicing {pose.englishName} 🧘
                          </span>
                        </div>
                        <span className="text-2xl font-black font-mono tracking-widest bg-[#081620]/20 px-3 py-1 rounded-xl text-[#081620]">
                          {formatTime(timeLeft)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleTimer}
                          className="flex-1 py-2 rounded-xl bg-[#081620] text-white font-bold text-xs hover:bg-[#081620]/80 flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          {isTimerRunning ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-[#3FCDA8]" />}
                          <span>{isTimerRunning ? 'Pause ⏸️' : 'Resume ▶️'}</span>
                        </button>
                        <button
                          onClick={() => resetTimer(pose.holdDurationSeconds)}
                          className="px-3 py-2 rounded-xl bg-[#081620]/20 hover:bg-[#081620]/30 text-[#081620] font-bold text-xs"
                          title="Reset Timer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => startPoseTimer(pose)}
                      className="w-full py-3 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform transform active:scale-98"
                    >
                      <Play className="w-4 h-4 fill-[#081620]" />
                      <span>Start Guided Hold Timer ({pose.holdDurationSeconds}s) ⏱️</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pranayama Breathing Section */}
        <div className="bg-white dark:bg-[#0F2836] p-6 sm:p-10 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] text-xs font-bold uppercase tracking-wider">
              <Sun className="w-4 h-4 text-[#F2A65A]" />
              <span>Pranayama Healing Breathwork</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
              3 Powerful Breathing Techniques for Depression
            </h3>
            <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
              Pranayama breath control directly regulates autonomic brain rhythms and calms overstimulated nervous pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                <span className="w-7 h-7 rounded-xl bg-[#3FCDA8] text-[#081620] flex items-center justify-center font-bold">1</span>
                <span>Anulom Vilom (Alternate Nostril)</span>
              </div>
              <p className="text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
                Balancing right and left brain hemispheres. Inhale through left nostril (4s), exhale through right (4s), then inhale right and exhale left. Repeat for 5 minutes.
              </p>
              <div className="text-[11px] font-bold text-[#169375] dark:text-[#3FCDA8]">
                Benefit: Calms anxiety & restores cognitive balance
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                <span className="w-7 h-7 rounded-xl bg-[#F2A65A] text-[#081620] flex items-center justify-center font-bold">2</span>
                <span>Bhramari (Humming Bee Breath)</span>
              </div>
              <p className="text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
                Inhale deeply, gently place thumbs on ears and fingers over eyes. Exhale slowly making a low humming bee sound in your throat. Repeat 7–10 times.
              </p>
              <div className="text-[11px] font-bold text-[#F2A65A]">
                Benefit: Releases brain stress & tension headaches
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                <span className="w-7 h-7 rounded-xl bg-[#8B85C4] text-white flex items-center justify-center font-bold">3</span>
                <span>Diaphragmatic Belly Breathing</span>
              </div>
              <p className="text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
                Place one hand on chest and one on belly. Inhale through nose allowing belly to expand outward like a balloon, exhale allowing belly to gently sink.
              </p>
              <div className="text-[11px] font-bold text-[#8B85C4]">
                Benefit: Activates parasympathetic deep relaxation
              </div>
            </div>
          </div>
        </div>

        {/* 15-Minute Daily Anti-Depression Routine Flow */}
        <div className="bg-gradient-to-br from-[#0F2836] via-[#143345] to-[#0B1F2A] border border-[#3FCDA8]/40 text-[#F7F3E9] p-6 sm:p-10 rounded-3xl shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#3FCDA8]/20 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#3FCDA8] uppercase tracking-widest block">
                Recommended Daily Practice
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#F7F3E9]">
                15-Minute Anti-Depression Daily Flow
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F3E9]/80 mt-1">
                Follow this simple daily sequence every morning or whenever emotional exhaustion sets in.
              </p>
            </div>

            <a
              href="#aichat"
              className="px-5 py-3 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#081620]" />
              <span>Talk to Peace AI Bot</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-[#0B1F2A]/80 border border-[#3FCDA8]/30 space-y-1">
              <span className="text-[#3FCDA8] font-mono font-bold text-[11px]">00:00 - 03:00 (3 mins)</span>
              <h4 className="font-bold text-sm text-[#F7F3E9]">1. Balasana (Child Pose)</h4>
              <p className="text-[#F7F3E9]/70 text-[11px]">Grounding & calming immediate panic and anxiety.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1F2A]/80 border border-[#3FCDA8]/30 space-y-1">
              <span className="text-[#3FCDA8] font-mono font-bold text-[11px]">03:00 - 07:00 (4 mins)</span>
              <h4 className="font-bold text-sm text-[#F7F3E9]">2. Cobra & Crescent Lunge</h4>
              <p className="text-[#F7F3E9]/70 text-[11px]">Heart opening, chest expansion & energizing body.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1F2A]/80 border border-[#3FCDA8]/30 space-y-1">
              <span className="text-[#3FCDA8] font-mono font-bold text-[11px]">07:00 - 11:00 (4 mins)</span>
              <h4 className="font-bold text-sm text-[#F7F3E9]">3. Viparita Karani (Legs Up Wall)</h4>
              <p className="text-[#F7F3E9]/70 text-[11px]">Restorative inversion lowering systemic stress.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1F2A]/80 border border-[#3FCDA8]/30 space-y-1">
              <span className="text-[#3FCDA8] font-mono font-bold text-[11px]">11:00 - 15:00 (4 mins)</span>
              <h4 className="font-bold text-sm text-[#F7F3E9]">4. Savasana & Pranayama</h4>
              <p className="text-[#F7F3E9]/70 text-[11px]">Deep neural integration and alternate nostril breathing.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
