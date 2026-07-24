import React, { useState, useEffect } from 'react';
import {
  Sparkles, Heart, Activity, Play, Pause, RotateCcw, Clock,
  CheckCircle2, Info, ChevronRight, Volume2, ShieldCheck, Flame, Sun, Moon
} from 'lucide-react';

// Import generated yoga pose image assets
import forwardBendImg from '../assets/images/yoga_forward_bend_1784745264923.jpg';
import cobraImg from '../assets/images/yoga_cobra_pose_1784745278711.jpg';
import legsUpWallImg from '../assets/images/yoga_legs_up_wall_1784745291944.jpg';
import childPoseImg from '../assets/images/yoga_child_pose_1784745314009.jpg';

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
    <section id="yoga" className="py-12 sm:py-20 bg-gradient-to-b from-amber-50/40 via-white to-rose-50/30 dark:from-[#2a0e17] dark:via-[#220a12] dark:to-[#1f070e] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Section Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 text-xs font-bold uppercase tracking-wider border border-rose-300 dark:border-rose-800 shadow-sm">
            <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Mind-Body Healing & Recovery</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 dark:from-orange-300 dark:via-rose-300 dark:to-amber-300 bg-clip-text text-transparent">
            Yoga for Overcoming Depression
          </h2>

          <p className="text-sm sm:text-base text-stone-700 dark:text-rose-200/90 leading-relaxed">
            Discover scientifically backed Yoga Asanas (poses), breathing practices, and restorative routines specifically designed to regulate stress hormones, increase serotonin & GABA neurotransmitters, and restore inner peace.
          </p>
        </div>

        {/* Science Box: How Yoga Combats Depression */}
        <div className="bg-white/90 dark:bg-[#34121d] p-6 sm:p-8 rounded-3xl border border-orange-200/80 dark:border-rose-900/60 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-orange-100 dark:border-rose-900/40 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
                How Yoga Helps Overcome Depression (Neurobiological Science)
              </h3>
              <p className="text-xs text-stone-500 dark:text-rose-300/80">
                Neuroscience backing the therapeutic power of mind-body movement
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-[#3d1624] border border-orange-200/60 dark:border-rose-800/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-orange-900 dark:text-orange-200">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Lowers Cortisol & Inflammation</span>
              </div>
              <p className="text-stone-600 dark:text-rose-200/80 leading-relaxed">
                Chronic depression keeps the body locked in high cortisol state. Gentle yoga postures lower systemic cortisol, easing nervous exhaustion and physical fatigue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-[#3d1624] border border-rose-200/60 dark:border-rose-800/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Boosts GABA & Brain Serotonin</span>
              </div>
              <p className="text-stone-600 dark:text-rose-200/80 leading-relaxed">
                Clinical studies reveal a 27% increase in brain GABA levels after a single 60-minute yoga session, directly reducing anxiety and lifting low mood.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-[#3d1624] border border-amber-200/60 dark:border-rose-800/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Stimulates Vagus Nerve</span>
              </div>
              <p className="text-stone-600 dark:text-rose-200/80 leading-relaxed">
                Rhythmic yoga movement and deep breathing activate the vagus nerve, shifting the brain from "fight-or-flight" panic into parasympathetic healing.
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
                  ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white shadow-md scale-105'
                  : 'bg-white dark:bg-[#34121d] text-stone-700 dark:text-rose-200 hover:bg-orange-50 dark:hover:bg-[#401726] border border-orange-200/60 dark:border-rose-900/60'
              }`}
            >
              {cat === 'All' ? '✨ All Anti-Depression Poses' : cat}
            </button>
          ))}
        </div>

        {/* Poses List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPoses.map((pose) => (
            <div
              key={pose.id}
              className="bg-white dark:bg-[#32121e] rounded-3xl border border-orange-200/80 dark:border-rose-900/60 shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300"
            >
              {/* Pose Header & Picture */}
              <div className="relative h-64 sm:h-72 w-full bg-stone-100 dark:bg-[#200a12] overflow-hidden">
                <img
                  src={pose.image}
                  alt={pose.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
                
                {/* Pose Tag & Sanskrit Name Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-[#200a12]/90 backdrop-blur-md text-orange-950 dark:text-rose-200 text-xs font-bold border border-orange-200 shadow-sm">
                    {pose.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-500/90 text-white text-xs font-bold shadow-sm">
                    ⏱️ {pose.holdDurationSeconds}s hold
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block">
                    {pose.sanskritName}
                  </span>
                  <h3 className="text-2xl font-bold font-serif">
                    {pose.englishName}
                  </h3>
                  <p className="text-xs text-rose-100/90 font-medium italic">
                    {pose.tag}
                  </p>
                </div>
              </div>

              {/* Pose Card Body Content */}
              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Why It Helps Depression */}
                <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-[#3d1624]/60 border border-orange-200/60 dark:border-rose-900/40 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-orange-900 dark:text-amber-200">
                    <Info className="w-4 h-4 text-orange-500" />
                    <span>How It Relieves Depression:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-rose-200/90 leading-relaxed">
                    {pose.depressionReliefMechanism}
                  </p>
                </div>

                {/* Key Benefits List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-800 dark:text-rose-200 uppercase tracking-wider">
                    Key Health & Emotional Benefits:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-rose-200/90">
                    {pose.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step-by-Step Interactive Procedure */}
                <div className="space-y-3 pt-2 border-t border-orange-100 dark:border-rose-900/40">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-stone-800 dark:text-rose-200 uppercase tracking-wider">
                      Step-by-Step Procedure:
                    </h4>
                    <span className="text-[11px] font-semibold text-orange-600 dark:text-rose-300">
                      {pose.procedure.length} Simple Steps
                    </span>
                  </div>

                  <ol className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-rose-200/90">
                    {pose.procedure.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-orange-50/50 dark:hover:bg-[#3a1523]/50 transition-colors">
                        <span className="w-5 h-5 rounded-lg bg-orange-100 dark:bg-rose-950 text-orange-900 dark:text-rose-200 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Breathing & Precautions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-[#3a1523] border border-amber-200/60 dark:border-rose-900/40 space-y-1">
                    <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-amber-500" /> Breathing:
                    </span>
                    <p className="text-stone-600 dark:text-rose-200/80">{pose.breathingGuidance}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-[#3a1523] border border-rose-200/60 dark:border-rose-900/40 space-y-1">
                    <span className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-500" /> Caution / Note:
                    </span>
                    <p className="text-stone-600 dark:text-rose-200/80">{pose.precautions}</p>
                  </div>
                </div>

                {/* Practice Pose Interactive Timer Bar */}
                <div className="pt-3">
                  {activeTimerPoseId === pose.id ? (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white space-y-3 shadow-md animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-amber-200 animate-spin" />
                          <span className="font-bold text-xs uppercase tracking-wider">
                            Practicing {pose.englishName}
                          </span>
                        </div>
                        <span className="text-2xl font-black font-mono tracking-widest bg-white/20 px-3 py-1 rounded-xl">
                          {formatTime(timeLeft)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleTimer}
                          className="flex-1 py-2 rounded-xl bg-white text-rose-900 font-bold text-xs hover:bg-orange-50 flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          {isTimerRunning ? <Pause className="w-4 h-4 text-rose-600" /> : <Play className="w-4 h-4 text-emerald-600" />}
                          <span>{isTimerRunning ? 'Pause' : 'Resume'}</span>
                        </button>
                        <button
                          onClick={() => resetTimer(pose.holdDurationSeconds)}
                          className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs"
                          title="Reset Timer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => startPoseTimer(pose)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform transform active:scale-98"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Start Guided Hold Timer ({pose.holdDurationSeconds}s)</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pranayama Breathing Section */}
        <div className="bg-white/90 dark:bg-[#34121d] p-6 sm:p-10 rounded-3xl border border-orange-200/80 dark:border-rose-900/60 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-rose-950 text-amber-900 dark:text-rose-200 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Pranayama Healing Breathwork</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-rose-100">
              3 Powerful Breathing Techniques for Depression
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-rose-200/80">
              Pranayama breath control directly regulates autonomic brain rhythms and calms overstimulated nervous pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-orange-50/70 dark:bg-[#3d1624] border border-orange-200/60 dark:border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 font-bold text-orange-950 dark:text-rose-100">
                <span className="w-7 h-7 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">1</span>
                <span>Anulom Vilom (Alternate Nostril)</span>
              </div>
              <p className="text-stone-600 dark:text-rose-200/80 leading-relaxed">
                Balancing right and left brain hemispheres. Inhale through left nostril (4s), exhale through right (4s), then inhale right and exhale left. Repeat for 5 minutes.
              </p>
              <div className="text-[11px] font-bold text-orange-700 dark:text-amber-300">
                ✨ Benefit: Calms anxiety & restores cognitive balance
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-[#3d1624] border border-rose-200/60 dark:border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 font-bold text-rose-950 dark:text-rose-100">
                <span className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">2</span>
                <span>Bhramari (Humming Bee Breath)</span>
              </div>
              <p className="text-stone-600 dark:text-rose-200/80 leading-relaxed">
                Inhale deeply, gently place thumbs on ears and fingers over eyes. Exhale slowly making a low humming bee sound in your throat. Repeat 7–10 times.
              </p>
              <div className="text-[11px] font-bold text-rose-700 dark:text-rose-300">
                ✨ Benefit: Releases brain stress & tension headaches
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-[#3d1624] border border-amber-200/60 dark:border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-rose-100">
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">3</span>
                <span>Diaphragmatic Belly Breathing</span>
              </div>
              <p className="text-stone-600 dark:text-rose-200/80 leading-relaxed">
                Place one hand on chest and one on belly. Inhale through nose allowing belly to expand outward like a balloon, exhale allowing belly to gently sink.
              </p>
              <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                ✨ Benefit: Activates parasympathetic deep relaxation
              </div>
            </div>
          </div>
        </div>

        {/* 15-Minute Daily Anti-Depression Routine Flow */}
        <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/20 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-200 uppercase tracking-widest block">
                Recommended Daily Practice
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
                15-Minute Anti-Depression Daily Flow
              </h3>
              <p className="text-xs sm:text-sm text-rose-100 mt-1">
                Follow this simple daily sequence every morning or whenever emotional exhaustion sets in.
              </p>
            </div>

            <a
              href="#aichat"
              className="px-5 py-3 rounded-2xl bg-white text-rose-900 font-bold text-xs hover:bg-orange-50 transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Talk to AI Assistant About Routine</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1">
              <span className="text-amber-200 font-mono font-bold text-[11px]">00:00 - 03:00 (3 mins)</span>
              <h4 className="font-bold text-sm text-white">1. Balasana (Child Pose)</h4>
              <p className="text-rose-100 text-[11px]">Grounding & calming immediate panic and anxiety.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1">
              <span className="text-amber-200 font-mono font-bold text-[11px]">03:00 - 07:00 (4 mins)</span>
              <h4 className="font-bold text-sm text-white">2. Bhujangasana & Crescent Lunge</h4>
              <p className="text-rose-100 text-[11px]">Heart opening, chest expansion & energizing body.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1">
              <span className="text-amber-200 font-mono font-bold text-[11px]">07:00 - 11:00 (4 mins)</span>
              <h4 className="font-bold text-sm text-white">3. Viparita Karani (Legs Up Wall)</h4>
              <p className="text-rose-100 text-[11px]">Restorative inversion lowering systemic stress.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1">
              <span className="text-amber-200 font-mono font-bold text-[11px]">11:00 - 15:00 (4 mins)</span>
              <h4 className="font-bold text-sm text-white">4. Savasana & Pranayama</h4>
              <p className="text-rose-100 text-[11px]">Deep neural integration and alternate nostril breathing.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
