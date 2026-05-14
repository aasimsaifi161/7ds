export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: "hard" | "extreme" | "legendary";
  duration: string;
  proofRequired: string;
  requiresImage?: boolean;
}

export interface Sin {
  id: string;
  name: string;
  latin: string;
  symbol: string;
  description: string;
  color: string;
  darkColor: string;
  challenges: Challenge[];
}

export const sins: Sin[] = [
  {
    id: "pride",
    name: "Pride",
    latin: "Superbia",
    symbol: "♛",
    description:
      "The excessive belief in one's own abilities. Pride is considered the original and most serious of the seven deadly sins, the source from which all others arise.",
    color: "#C4A000",
    darkColor: "#8B7000",
    challenges: [
      {
        id: 1,
        title: "The Humility Walk",
        description:
          "Spend an entire day without talking about yourself, your achievements, or your opinions unless directly asked. Document your experience.",
        difficulty: "hard",
        duration: "1 day",
        proofRequired: "Detailed written journal entry reflecting on the experience.",
        requiresImage: false,
      },
      {
        id: 2,
        title: "Anonymous Service",
        description:
          "Perform 5 acts of genuine kindness for strangers without revealing your identity or posting about it anywhere. No one should know it was you.",
        difficulty: "hard",
        duration: "3 days",
        proofRequired: "Private journal describing each act",
        requiresImage: false,
      },
      {
        id: 3,
        title: "The Apology Marathon",
        description:
          "Reach out to 3 people you have wronged in the past and offer sincere, unconditional apologies without making excuses or justifying your behavior.",
        difficulty: "extreme",
        duration: "1 week",
        proofRequired: "Reflection on each conversation",
        requiresImage: false,
      },
      {
        id: 4,
        title: "Student of Everything",
        description:
          "Spend 7 days learning something completely new from someone you consider less experienced or younger than you. Accept all feedback without defending yourself.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Daily progress notes and learnings",
        requiresImage: false,
      },
      {
        id: 5,
        title: "The Silence Retreat",
        description:
          "Go 48 hours without sharing any opinion, advice, or correction unless your safety depends on it. Simply listen and observe.",
        difficulty: "extreme",
        duration: "2 days",
        proofRequired: "Hourly check-in journal",
        requiresImage: false,
      },
      {
        id: 6,
        title: "Celebrate Others",
        description:
          "For 10 consecutive days, genuinely compliment or publicly recognize someone else's achievement each day. Make it about them, not you.",
        difficulty: "hard",
        duration: "10 days",
        proofRequired: "Log of each recognition given",
        requiresImage: false,
      },
      {
        id: 7,
        title: "The Vulnerability Exercise",
        description:
          "Share a genuine failure or weakness with someone you respect, without spinning it as a lesson learned or a strength in disguise.",
        difficulty: "extreme",
        duration: "1 day",
        proofRequired: "Written reflection on the experience",
        requiresImage: false,
      },
      {
        id: 8,
        title: "Last Place Finish",
        description:
          "Participate in a competitive activity where you are likely to lose. Stay until the end, congratulate the winner sincerely, and reflect on the experience.",
        difficulty: "hard",
        duration: "1 day",
        proofRequired: "Description of activity and reflection",
        requiresImage: false,
      },
      {
        id: 9,
        title: "The Gratitude Audit",
        description:
          "Write a detailed letter to 5 people who helped shape who you are. Acknowledge specifically what they contributed that you could not have done alone.",
        difficulty: "extreme",
        duration: "5 days",
        proofRequired: "Copies of letters (names can be redacted)",
        requiresImage: false,
      },
      {
        id: 10,
        title: "Ego Death Challenge",
        description:
          "Spend 72 hours without any social media, without mentioning your job title, education, or accomplishments in any conversation. Simply exist as a person, nothing more.",
        difficulty: "legendary",
        duration: "3 days",
        proofRequired: "Detailed 72-hour reflection journal",
        requiresImage: false,
      },
    ],
  },
  {
    id: "greed",
    name: "Greed",
    latin: "Avaritia",
    symbol: "⚜",
    description:
      "An insatiable desire to possess more than one needs. Greed is the relentless pursuit of material wealth, status, and power at the cost of spiritual growth.",
    color: "#2E8B57",
    darkColor: "#1B5E3A",
    challenges: [
      {
        id: 1,
        title: "The Purge",
        description:
          "Identify and give away 20 possessions you don't truly need to someone who does. These must be items of actual value, not junk.",
        difficulty: "hard",
        duration: "3 days",
        proofRequired: "Photo of the items donated and the donation receipt or location.",
        requiresImage: true,
      },
      {
        id: 2,
        title: "Budget of Bare Essentials",
        description:
          "Live on only absolute necessities for 7 days. No entertainment purchases, no eating out, no impulse buys. Track every single expense.",
        difficulty: "extreme",
        duration: "7 days",
        proofRequired: "Complete daily expense log",
        requiresImage: false,
      },
      {
        id: 3,
        title: "Generous Without Reason",
        description:
          "Give away 10% of this week's earnings to someone or a cause without expecting anything in return. No tax deduction hunting.",
        difficulty: "extreme",
        duration: "1 week",
        proofRequired: "Reflection on the experience",
        requiresImage: false,
      },
      {
        id: 4,
        title: "The Free Day",
        description:
          "Spend an entire day offering your skills and time for free to anyone who needs help. No bartering, no future favors expected.",
        difficulty: "hard",
        duration: "1 day",
        proofRequired: "Description of what you offered and to whom",
        requiresImage: false,
      },
      {
        id: 5,
        title: "No New Things",
        description:
          "Go 14 days without purchasing anything that isn't food, medicine, or a true emergency. Resist every urge to buy.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Daily temptation and resistance journal",
        requiresImage: false,
      },
      {
        id: 6,
        title: "Sharing Is Living",
        description:
          "Share a meal you prepared yourself with a neighbor or stranger every day for 5 days. The cost and effort must be entirely yours.",
        difficulty: "hard",
        duration: "5 days",
        proofRequired: "Photo of one of the meals you prepared and shared.",
        requiresImage: true,
      },
      {
        id: 7,
        title: "The Content Inventory",
        description:
          "List every subscription, membership, and recurring payment you have. Cancel at least 3 that serve only entertainment or status.",
        difficulty: "hard",
        duration: "2 days",
        proofRequired: "Screenshot of the canceled subscriptions or confirmation emails.",
        requiresImage: true,
      },
      {
        id: 8,
        title: "Borrow, Don't Buy",
        description:
          "For 10 days, whenever you need something, try to borrow it instead of buying it. Document each instance and the discomfort you feel.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Log of items borrowed and reflections",
        requiresImage: false,
      },
      {
        id: 9,
        title: "Value Beyond Money",
        description:
          "Spend a week measuring your day's worth not by productivity or earnings, but by connections made and help given. Journal each night.",
        difficulty: "extreme",
        duration: "7 days",
        proofRequired: "Nightly journal entries",
        requiresImage: false,
      },
      {
        id: 10,
        title: "The Empty Hands Walk",
        description:
          "Leave your wallet and phone at home. Spend 8 hours in a public place with nothing. Experience what it feels like to have no purchasing power.",
        difficulty: "legendary",
        duration: "8 hours",
        proofRequired: "Detailed reflection on vulnerability and need",
        requiresImage: false,
      },
    ],
  },
  {
    id: "lust",
    name: "Lust",
    latin: "Luxuria",
    symbol: "♡",
    description:
      "An uncontrolled desire for physical pleasures. Lust goes beyond natural desire and becomes an obsessive craving that clouds judgment and damages relationships.",
    color: "#B22222",
    darkColor: "#7B1818",
    challenges: [
      {
        id: 1,
        title: "Digital Detox",
        description:
          "Uninstall all social media apps and dating apps for 7 days. No browsing profiles, no scrolling. Replace screen time with something physical like exercise or art.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Screenshot of your phone's home screen or app library showing apps are gone.",
        requiresImage: true,
      },
      {
        id: 2,
        title: "Mindful Consumption",
        description:
          "For 10 days, before consuming any media, ask yourself: does this add value to my growth? Eliminate all content that serves only base impulses.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Media consumption journal with reflections",
        requiresImage: false,
      },
      {
        id: 3,
        title: "The Connection Challenge",
        description:
          "Have 5 deep, meaningful conversations with people focusing entirely on their stories, struggles, and dreams. No flirting, no agenda.",
        difficulty: "hard",
        duration: "5 days",
        proofRequired: "Summary of each conversation and what you learned",
        requiresImage: false,
      },
      {
        id: 4,
        title: "Cold Discipline",
        description:
          "Take a cold shower every morning for 14 days. Use the discomfort to build willpower and control over physical impulses.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Photo of your shower set to the coldest setting or a post-shower selfie.",
        requiresImage: true,
      },
      {
        id: 5,
        title: "Creative Redirection",
        description:
          "Channel your energy into creating something — write, paint, build, compose. Produce one meaningful creative work over 7 days.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Photo of the creative work you produced.",
        requiresImage: true,
      },
      {
        id: 6,
        title: "Boundaries Workshop",
        description:
          "Identify 3 personal boundaries you've let slip. Re-establish them firmly and document each time they're tested over the next week.",
        difficulty: "extreme",
        duration: "7 days",
        proofRequired: "Written boundary definitions and test log",
        requiresImage: false,
      },
      {
        id: 7,
        title: "The Fasting Mind",
        description:
          "Practice 30 minutes of meditation daily for 10 days. When intrusive thoughts arise, acknowledge them and let them pass. Log your meditation sessions.",
        difficulty: "hard",
        duration: "10 days",
        proofRequired: "Daily meditation journal",
        requiresImage: false,
      },
      {
        id: 8,
        title: "Respect Reflection",
        description:
          "Write a letter to someone you've objectified or treated as less than a full person (you don't have to send it). Acknowledge the full humanity you overlooked.",
        difficulty: "extreme",
        duration: "1 day",
        proofRequired: "The letter (name redacted)",
        requiresImage: false,
      },
      {
        id: 9,
        title: "Physical Mastery",
        description:
          "Commit to an intense physical training routine for 14 days. Run, lift, swim — push your body to redirect energy constructively.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Photo of your workout gear or a post-workout sweat selfie.",
        requiresImage: true,
      },
      {
        id: 10,
        title: "The Monk's Week",
        description:
          "Live 7 days with extreme intentionality: no entertainment media, no social media, daily meditation, daily exercise, early sleep, and journaling every evening.",
        difficulty: "legendary",
        duration: "7 days",
        proofRequired: "Complete daily routine log and final reflection essay",
        requiresImage: false,
      },
    ],
  },
  {
    id: "envy",
    name: "Envy",
    latin: "Invidia",
    symbol: "◈",
    description:
      "The resentful longing for what others possess. Envy breeds bitterness and blinds you to your own gifts, trapping you in a cycle of comparison and inadequacy.",
    color: "#4682B4",
    darkColor: "#2E5A7E",
    challenges: [
      {
        id: 1,
        title: "The Gratitude Inventory",
        description:
          "Write down 50 specific things you are genuinely grateful for. Not generic things — deeply personal and specific blessings in your life.",
        difficulty: "hard",
        duration: "1 day",
        proofRequired: "Photo of your handwritten list of 50 items.",
        requiresImage: true,
      },
      {
        id: 2,
        title: "Celebrate a Rival",
        description:
          "Identify someone whose success makes you uncomfortable. Reach out to them and genuinely congratulate them. Ask to learn from their journey.",
        difficulty: "extreme",
        duration: "3 days",
        proofRequired: "Reflection on the interaction",
        requiresImage: false,
      },
      {
        id: 3,
        title: "Social Media Comparison Fast",
        description:
          "Unfollow or mute every account that triggers comparison or envy. Replace them with educational or inspirational content for 14 days.",
        difficulty: "hard",
        duration: "14 days",
        proofRequired: "Screenshot showing your 'Following' list after the cleanup.",
        requiresImage: true,
      },
      {
        id: 4,
        title: "Your Unique Path Map",
        description:
          "Create a detailed timeline of YOUR life's unique experiences, challenges overcome, and growth moments. See the path that only you have walked.",
        difficulty: "hard",
        duration: "2 days",
        proofRequired: "Photo of your life path map or timeline.",
        requiresImage: true,
      },
      {
        id: 5,
        title: "Abundance Meditation",
        description:
          "Practice a daily 20-minute abundance meditation for 10 days. Focus on the feeling that there is enough for everyone, including you.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Daily meditation log and reflections",
        requiresImage: false,
      },
      {
        id: 6,
        title: "The Mentor Flip",
        description:
          "Find someone who has what you envy and ask them to mentor you. Transform envy into admiration and learning for 2 weeks.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Weekly summary of lessons learned",
        requiresImage: false,
      },
      {
        id: 7,
        title: "Content with Today",
        description:
          "Spend 5 days without planning for the future or wishing things were different. Live entirely in the present and appreciate what IS.",
        difficulty: "hard",
        duration: "5 days",
        proofRequired: "Daily present-moment journal",
        requiresImage: false,
      },
      {
        id: 8,
        title: "The Giving Reverse",
        description:
          "Instead of wanting what others have, give away something you treasure to someone who needs it more. Something that actually hurts to let go of.",
        difficulty: "extreme",
        duration: "1 day",
        proofRequired: "Photo of the item you gave away.",
        requiresImage: true,
      },
      {
        id: 9,
        title: "Comparison Detox Journal",
        description:
          "Every time you catch yourself comparing, write it down. At the end of 7 days, analyze your triggers and write an action plan to address each one.",
        difficulty: "extreme",
        duration: "7 days",
        proofRequired: "Complete comparison journal and action plan",
        requiresImage: false,
      },
      {
        id: 10,
        title: "Self-Worth Declaration",
        description:
          "Write a 1000-word essay on your inherent worth that has nothing to do with achievements, possessions, appearance, or comparison to others. Read it aloud to yourself daily for a week.",
        difficulty: "legendary",
        duration: "7 days",
        proofRequired: "The essay and daily reading log",
        requiresImage: false,
      },
    ],
  },
  {
    id: "gluttony",
    name: "Gluttony",
    latin: "Gula",
    symbol: "◉",
    description:
      "The overindulgence and overconsumption beyond what is necessary. Gluttony extends beyond food to any excess that dulls the spirit and enslaves the body.",
    color: "#CC7722",
    darkColor: "#8B5216",
    challenges: [
      {
        id: 1,
        title: "The Mindful Meal",
        description:
          "For 7 days, eat every meal in silence with no screens. Chew each bite 30 times. Stop eating the moment you feel satisfied, not full.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Photo of your quiet, distraction-free meal setting.",
        requiresImage: true,
      },
      {
        id: 2,
        title: "The Essentials Only Diet",
        description:
          "Eat only simple, whole foods for 10 days. No processed food, no sugar, no excessive seasoning. Learn to appreciate food as fuel, not entertainment.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Photo of one of your whole-food meals.",
        requiresImage: true,
      },
      {
        id: 3,
        title: "Controlled Portions",
        description:
          "Use a smaller plate for every meal for 14 days. Never go back for seconds. Learn the difference between need and want.",
        difficulty: "hard",
        duration: "14 days",
        proofRequired: "Photo comparing your small plate to a standard one.",
        requiresImage: true,
      },
      {
        id: 4,
        title: "Digital Consumption Fast",
        description:
          "Limit all screen time to 2 hours per day for 7 days (excluding work). No binge watching, no endless scrolling, no overconsumption of digital content.",
        difficulty: "extreme",
        duration: "7 days",
        proofRequired: "Screenshot of your phone's screen time report showing < 2 hours.",
        requiresImage: true,
      },
      {
        id: 5,
        title: "The Water Challenge",
        description:
          "Drink only water for 10 days. No coffee, no tea, no juice, no soda. Experience the withdrawal and come out the other side.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Photo of your reusable water bottle.",
        requiresImage: true,
      },
      {
        id: 6,
        title: "Cook to Share",
        description:
          "Cook a meal from scratch every day for 5 days, but make enough for two and give the extra portion to someone else. Learn that food is better when shared.",
        difficulty: "hard",
        duration: "5 days",
        proofRequired: "Photo of the meal you cooked from scratch.",
        requiresImage: true,
      },
      {
        id: 7,
        title: "The Delay Practice",
        description:
          "When you crave something (food, content, shopping), wait 30 minutes before indulging. If the craving passes, don't act on it. Log for 10 days.",
        difficulty: "hard",
        duration: "10 days",
        proofRequired: "Craving delay journal",
        requiresImage: false,
      },
      {
        id: 8,
        title: "Empty Space",
        description:
          "Identify one area of overconsumption in your life (food, media, shopping, etc.) and eliminate it completely for 7 days. Fill that time with creation instead.",
        difficulty: "extreme",
        duration: "7 days",
        proofRequired: "Photo or link to what you created during the fast.",
        requiresImage: true,
      },
      {
        id: 9,
        title: "Intermittent Living",
        description:
          "Practice a 16:8 intermittent eating schedule for 10 days. Use the fasting periods for reflection, reading, or exercise.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Screenshot of your fasting timer or schedule.",
        requiresImage: true,
      },
      {
        id: 10,
        title: "The Ascetic Day",
        description:
          "Once a week for 4 weeks, have one day where you consume the bare minimum: simple food, no entertainment, no luxuries. Reflect on what you truly need vs. what you want.",
        difficulty: "legendary",
        duration: "4 weeks",
        proofRequired: "Photo of your minimal setup for the day.",
        requiresImage: true,
      },
    ],
  },
  {
    id: "wrath",
    name: "Wrath",
    latin: "Ira",
    symbol: "⚔",
    description:
      "Uncontrolled feelings of anger and hatred. Wrath manifests as impatience, revenge, and violence — destroying relationships and consuming the wrathful from within.",
    color: "#8B0000",
    darkColor: "#5C0000",
    challenges: [
      {
        id: 1,
        title: "The Pause Protocol",
        description:
          "For 7 days, every time you feel anger rising, stop. Take 10 deep breaths before responding. Log every instance — what triggered it and how you responded after the pause.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Anger trigger and response journal",
        requiresImage: false,
      },
      {
        id: 2,
        title: "Forgiveness Letters",
        description:
          "Write forgiveness letters to 3 people who have deeply wronged you. You don't have to send them. The act of writing is the challenge.",
        difficulty: "extreme",
        duration: "3 days",
        proofRequired: "Photo of the handwritten letters.",
        requiresImage: true,
      },
      {
        id: 3,
        title: "Empathy Immersion",
        description:
          "For 5 days, whenever someone annoys or angers you, force yourself to imagine 3 possible reasons why they might be acting that way. Write them down.",
        difficulty: "hard",
        duration: "5 days",
        proofRequired: "Empathy exercise journal",
        requiresImage: false,
      },
      {
        id: 4,
        title: "Physical Release",
        description:
          "Channel your anger into intense physical exercise for 14 days straight. Run, box, lift — transform destructive energy into constructive power.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Photo of your gym check-in or exercise tracking app.",
        requiresImage: true,
      },
      {
        id: 5,
        title: "The Calm Communicator",
        description:
          "For 10 days, never raise your voice. No matter the situation. Speak calmly and deliberately even when provoked.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Daily log of challenging moments and your response",
        requiresImage: false,
      },
      {
        id: 6,
        title: "Grudge Inventory",
        description:
          "List every grudge you're currently holding. For each one, write what it's costing you emotionally. Then choose 3 to actively release.",
        difficulty: "hard",
        duration: "3 days",
        proofRequired: "Photo of your grudge and release list.",
        requiresImage: true,
      },
      {
        id: 7,
        title: "Kindness to Enemies",
        description:
          "Identify someone you have conflict with. Perform a genuine act of kindness toward them without expecting reconciliation.",
        difficulty: "extreme",
        duration: "1 week",
        proofRequired: "Description of the act and your emotional state before and after",
        requiresImage: false,
      },
      {
        id: 8,
        title: "The Patience Test",
        description:
          "Intentionally put yourself in situations that test your patience: long lines, slow traffic, difficult conversations. Practice remaining calm for 7 days.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Daily patience challenge log",
        requiresImage: false,
      },
      {
        id: 9,
        title: "Inner Peace Meditation",
        description:
          "Practice loving-kindness meditation for 20 minutes daily for 14 days. Send genuine good wishes to people who have angered you.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Photo of your meditation space.",
        requiresImage: true,
      },
      {
        id: 10,
        title: "The Reconciliation",
        description:
          "Reach out to someone you've hurt in anger. Offer a genuine, unconditional apology. Accept whatever response they give without defensiveness or counter-accusation.",
        difficulty: "legendary",
        duration: "Variable",
        proofRequired: "Detailed reflection on the entire process",
        requiresImage: false,
      },
    ],
  },
  {
    id: "sloth",
    name: "Sloth",
    latin: "∞",
    symbol: "∞",
    description:
      "The failure to act and utilize one's talents. Sloth is not merely physical laziness but a spiritual apathy — the refusal to engage with life and fulfill your potential.",
    color: "#708090",
    darkColor: "#4A5568",
    challenges: [
      {
        id: 1,
        title: "5 AM Wake-Up",
        description:
          "Wake up at 5 AM every day for 14 days. Use the first hour for something productive: exercise, reading, planning, or creating. No snoozing.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Photo of your clock/phone at 5 AM or the sunrise.",
        requiresImage: true,
      },
      {
        id: 2,
        title: "Zero Procrastination Day",
        description:
          "For 7 days, do every task immediately when it comes to mind. No 'later,' no 'tomorrow.' Act on everything within 5 minutes of thinking of it.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Daily task completion log",
        requiresImage: false,
      },
      {
        id: 3,
        title: "The Skill Sprint",
        description:
          "Learn a new skill for 1 hour every day for 10 days. Something you've been putting off. Coding, cooking, an instrument — commit fully.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Photo of your progress (e.g., code snippet, dish, instrument).",
        requiresImage: true,
      },
      {
        id: 4,
        title: "Physical Foundation",
        description:
          "Exercise for at least 30 minutes every single day for 14 days. No excuses, no rest days. Your body is a temple you've been neglecting.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Photo of your workout tracking (watch/app) or gear.",
        requiresImage: true,
      },
      {
        id: 5,
        title: "The Deep Work Block",
        description:
          "Schedule 3 hours of uninterrupted deep work every day for 7 days. No phone, no notifications, no distractions. Pure focused effort.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Photo of your workspace before/after the deep work session.",
        requiresImage: true,
      },
      {
        id: 6,
        title: "Complete the Unfinished",
        description:
          "List 5 projects or tasks you've started but never finished. Complete at least 3 of them within 10 days.",
        difficulty: "extreme",
        duration: "10 days",
        proofRequired: "Photo of the completed projects.",
        requiresImage: true,
      },
      {
        id: 7,
        title: "Comfort Zone Destruction",
        description:
          "Do one thing that scares you or makes you uncomfortable every day for 7 days. Push past the resistance that keeps you stagnant.",
        difficulty: "hard",
        duration: "7 days",
        proofRequired: "Daily comfort zone challenge description and reflection",
        requiresImage: false,
      },
      {
        id: 8,
        title: "Screen Time Swap",
        description:
          "For every hour of entertainment screen time, spend an equal hour on productive activity. Track both for 10 days.",
        difficulty: "hard",
        duration: "10 days",
        proofRequired: "Screenshot comparing entertainment vs. productive app usage.",
        requiresImage: true,
      },
      {
        id: 9,
        title: "The Accountability Partner",
        description:
          "Find someone to hold you accountable. Share your daily goals every morning and report results every evening for 14 days.",
        difficulty: "extreme",
        duration: "14 days",
        proofRequired: "Screenshot of your messages/calls with your partner.",
        requiresImage: true,
      },
      {
        id: 10,
        title: "The Transformation Month",
        description:
          "Commit to a strict daily routine for 30 days: wake early, exercise, learn, create, reflect. No days off. Become the person you've been pretending you'll be 'someday.'",
        difficulty: "legendary",
        duration: "30 days",
        proofRequired: "Photo of your 30-day tracking board or journal.",
        requiresImage: true,
      },
    ],
  },
];
