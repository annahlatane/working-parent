import { useState, useEffect } from "react";

const C = {
  bg: "#FBF6EE", paper: "#FFFFFF", navy: "#1B2B4A",
  coral: "#D94F3D", gold: "#E8A320", sage: "#4A8C6F",
  blush: "#FAE8E5", border: "#E2D8CC", muted: "#8A7F74", stamp: "#C44535",
};

const DIFFICULTIES = {
  standard: {
    key: "standard", label: "Standard", emoji: "🏠",
    tagline: "Partnered. Two kids. Baseline chaos.",
    detail: "You have a co-parent. You can tag out. The bar is still very much on the floor.",
    meters: { sanity: 60, kidJoy: 70, career: 75 }, color: C.sage, badge: "NORMAL",
  },
  pregnant: {
    key: "pregnant", label: "Pregnant", emoji: "🤰",
    tagline: "All of the above, plus nausea.",
    detail: "26 weeks. Still crushing it. Every time you bend over is a commitment.",
    meters: { sanity: 42, kidJoy: 68, career: 70 }, color: C.coral, badge: "HARD",
  },
  single: {
    key: "single", label: "Single Parent", emoji: "💪",
    tagline: "No tag-outs. All you, all day.",
    detail: "Your backup is your mom. She's 40 minutes away and has book club tonight.",
    meters: { sanity: 48, kidJoy: 65, career: 72 }, color: C.gold, badge: "EXPERT",
  },
};

const SCENES = [
  {
    time: "6:02 AM", emoji: "⏰",
    title: "Rise and… Survive",
    desc: "Your 4-year-old was up at 2am with a nightmare. Your 2-year-old hit 3:15 and 4:40. You have a 9am client call. First move?",
    pregnantDesc: "Your 4-year-old: 2am nightmare. Your 2-year-old: 3:15 and 4:40. You're 26 weeks pregnant and have been nauseous since 4:50am. First move?",
    singleDesc: "Your 4-year-old was up at 2am. Your 2-year-old at 3:15 and 4:40. Every single wakeup: you. No trading off. You have a 9am client call. First move?",
    choices: [
      {
        text: "Coffee. Non-negotiable.", emoji: "☕",
        pregnantText: "Decaf. Still non-negotiable.",
        deltas: { sanity: 15, kidJoy: 0, career: -5 },
        feedback: "The correct answer. You feel almost human by 6:47am.",
        pregnantFeedback: "It's decaf, but you need the ritual. You feel approximately 40% human by 6:50am.",
      },
      {
        text: "Check emails. Get a head start.", emoji: "📧",
        deltas: { sanity: -10, kidJoy: 0, career: 10 },
        feedback: "14 new emails since midnight. Three marked urgent. One is a company newsletter.",
      },
      {
        text: "Lay still. Hope it's Saturday.", emoji: "😴",
        deltas: { sanity: -5, kidJoy: 0, career: -10 },
        feedback: "It is not Saturday. Both children will confirm this shortly.",
        singleFeedback: "It is not Saturday. Both children will confirm this shortly, and there is no one else to send.",
      },
    ]
  },
  {
    time: "7:45 AM", emoji: "🥶",
    title: "The Coat Refusal",
    desc: "35°F outside. Your 4-year-old is at the door, coatless, arms crossed: \"I NOT COLD.\" Your 2-year-old has gone suspiciously quiet somewhere in the house. You leave in 8 minutes.",
    pregnantDesc: "35°F. Your 4-year-old: \"I NOT COLD.\" Your 2-year-old has gone quiet — never a good sign. You're 26 weeks pregnant and bending down to find shoes is already a whole thing. Eight minutes.",
    singleDesc: "35°F. Your 4-year-old: \"I NOT COLD.\" Your 2-year-old has gone quiet somewhere in the house. You're tracking both of them at once, from one body. Eight minutes.",
    choices: [
      {
        text: "Stand firm. The coat goes on.", emoji: "🧥",
        deltas: { sanity: -15, kidJoy: -10, career: 0 },
        feedback: "Seven minutes of negotiation. You leave 4 minutes late. The coat is on. The 2-year-old was in the pantry.",
        singleFeedback: "Seven minutes of coat negotiation while tracking the 2-year-old by sound. Coat on. Late. 2-year-old was in the pantry eating crackers. Fine.",
        pregnantFeedback: "Seven minutes. You had to crouch to make eye contact and getting back up took a moment. Coat on. Late.",
      },
      {
        text: "Bring it along. Let the cold be the teacher.", emoji: "🥶",
        deltas: { sanity: 10, kidJoy: -5, career: 5 },
        feedback: "Cold in 90 seconds. Coat on with zero argument. Nobody says anything. The 2-year-old has been located — fine.",
      },
      {
        text: "Layer three shirts under the outfit and call it done.", emoji: "🧅",
        deltas: { sanity: 10, kidJoy: 10, career: 5 },
        feedback: "You leave on time. The daycare teacher raises an eyebrow at the layering situation. You drive away.",
        singleFeedback: "Coats optional. Time is not. You leave on schedule, which is its own small victory.",
      },
    ]
  },
  {
    time: "8:55 AM", emoji: "📞",
    title: "The Sick Call",
    desc: "Daycare calls: your 2-year-old has a fever. \"Please pick up within the hour.\" Your 4-year-old is already at preschool and needs a 3pm pickup regardless. Your 9am starts in 4 minutes.",
    pregnantDesc: "Daycare calls: your 2-year-old has a fever. Your 4-year-old is at preschool — 3pm pickup no matter what. You haven't sat down since 5am and you're dizzy. Nine-am in 4 minutes.",
    singleDesc: "Daycare calls: your 2-year-old has a fever. Your 4-year-old is at preschool — 3pm pickup, solo, regardless. Your backup person has book club. Nine-am in 4 minutes.",
    choices: [
      {
        text: "Join the call, then find backup care fast.", emoji: "🆘",
        deltas: { sanity: -15, kidJoy: 5, career: 10 },
        feedback: "You present while texting 9 people. Your neighbor picks up the 2-year-old. You owe her three dinners and your undying loyalty.",
        singleFeedback: "You present while your mom rearranges her entire day. She cancels book club without being asked. You owe her everything. She says you owe her nothing. You owe her everything.",
      },
      {
        text: "Leave immediately. Family first.", emoji: "❤️",
        deltas: { sanity: 5, kidJoy: 20, career: -15 },
        feedback: "Your sick 2-year-old reaches for you the moment they see you. You still need to get the 4-year-old at 3pm. Your manager sends a 'we missed you' Slack at noon.",
        singleFeedback: "You get the sick one. You still have the preschool pickup at 3pm solo. Your 2-year-old reaches for you immediately. Worth it.",
      },
      {
        text: "Pick up the 2-year-old and rejoin the call from the car.", emoji: "💻",
        deltas: { sanity: -5, kidJoy: 10, career: 5 },
        feedback: "You present the Q3 deck while signing out. Back home in 45 minutes. Nobody asks what that squeaking was.",
        pregnantFeedback: "You present from the car, seat reclined slightly for comfort. Sick 2-year-old in the back with goldfish. The Q3 deck still lands.",
        singleFeedback: "You present from the car, sign out, drive home, rejoin. The 2-year-old falls asleep in the seat. You do not stop for coffee. You think about stopping for coffee.",
      },
    ]
  },
  {
    time: "9:30 AM", emoji: "🤒",
    title: "Home with the Patient",
    desc: "Sick 2-year-old is home. No words to negotiate with. Can't self-entertain. Fever: mild. Energy: somehow fine. 4-year-old at preschool until 3pm. Back-to-back meetings until then. What's the plan?",
    pregnantDesc: "Sick 2-year-old is home — the one who needs you constantly. You're 26 weeks pregnant, back-to-back until 3pm, and still need to do the preschool pickup. Right now: what's the plan?",
    singleDesc: "Sick 2-year-old is home. No words, no self-play, needs you constantly. 4-year-old at preschool until 3pm — your pickup, solo. Back-to-back until then. What's the plan right now?",
    choices: [
      {
        text: "Set them up with Bluey and work from the next room.", emoji: "📺",
        deltas: { sanity: 10, kidJoy: 5, career: 10 },
        feedback: "Four episodes of Bluey. Then four more. A precedent has been set that will outlast this illness by months.",
        pregnantFeedback: "Four episodes of Bluey. You sit down for the first time today. You nearly fall asleep. You do not fall asleep. Barely.",
      },
      {
        text: "Check on them between every call.", emoji: "🤗",
        deltas: { sanity: -15, kidJoy: 15, career: -10 },
        feedback: "You are exhausted. They feel loved. You miss two action items. Worth it? Genuinely unclear.",
        singleFeedback: "You cycle between muted calls and forehead checks every 12 minutes. Miss two items. Your kid grabs your hand and says \"stay.\" You stay an extra minute. You're the only one who can.",
      },
      {
        text: "Build a sick-day couch fort and negotiate the terms.", emoji: "🏕️",
        deltas: { sanity: 5, kidJoy: 20, career: -5 },
        feedback: "Fort complete by 9:47am. You conduct your 10am from inside a blanket fortress. Camera: off. Snacks: provided. No regrets whatsoever.",
        singleFeedback: "Fort complete by 9:47am. Snacks deployed. You run your 10am from inside a blanket fortress. Your kid is safe, settled, and happy. You built that. Solo.",
      },
    ]
  },
  {
    time: "10:30 AM", emoji: "😶",
    title: "The Naked Cameo",
    desc: "You're presenting to your biggest client on video. Your sick 2-year-old — fully pantless, clutching a stuffed bear — silently wanders into frame and just stands there, staring at you.",
    pregnantDesc: "Biggest client call. Your pantless 2-year-old wanders in, stops, and stares directly at your pregnant belly. Then points at it. Then looks at the camera. The client did not know about the baby.",
    singleDesc: "Biggest client call. Your pantless 2-year-old walks in and stands there staring at you. You are the only adult in this house and you are also supposed to be presenting right now.",
    choices: [
      {
        text: "Kill the camera. Immediately.", emoji: "🚫",
        deltas: { sanity: -5, kidJoy: 0, career: -5 },
        feedback: "You rejoin 45 seconds later with zero explanation. The client pretends nothing happened. Mutual respect established.",
      },
      {
        text: "Keep going. This is your life now.", emoji: "💪",
        deltas: { sanity: 10, kidJoy: 5, career: 10 },
        feedback: "You don't flinch. The 2-year-old eventually wanders back out. You close the deal. Client emails after: 'best meeting energy all quarter.'",
        singleFeedback: "You don't flinch. You close the deal. The 2-year-old eventually wanders back out on their own. Because of course you do.",
        pregnantFeedback: "You don't flinch. The client asks if they can send a gift. You say focus on the deliverables. You close the deal.",
      },
      {
        text: "\"One moment.\" Remove child. Return professionally.", emoji: "🚪",
        deltas: { sanity: 0, kidJoy: -5, career: 5 },
        feedback: "32 seconds. Mildly out of breath. Smiling. Nobody mentions the bear.",
        singleFeedback: "32 seconds to wrangle the 2-year-old out of frame. You return mildly out of breath, smiling professionally. Nobody mentions the bear. Nobody knows what that just took.",
        pregnantFeedback: "40 seconds. More out of breath than usual. Smiling. Nobody mentions the belly reveal.",
      },
    ]
  },
  {
    time: "12:00 PM", emoji: "💧",
    title: "The Potty Incident",
    desc: "Your potty-training 2-year-old has had an accident. You are on an active call. The mess is significant. They are announcing it from the hall at full volume.",
    pregnantDesc: "Potty incident. Active call. Getting down to the floor to help at 26 weeks takes planning. The 2-year-old is announcing it to the entire house. The client can hear something.",
    singleDesc: "Potty incident. Active call. The 2-year-old is announcing it at full volume and you are the only one who can deal with any part of this.",
    choices: [
      {
        text: "Hard mute. Handle it. Rejoin like nothing happened.", emoji: "🤫",
        deltas: { sanity: -10, kidJoy: 5, career: 10 },
        feedback: "Four minutes. Back on the call, mid-sentence. You have done this before and you will do it again.",
        singleFeedback: "Four minutes of pure logistics. Back mid-sentence. You are a professional in every sense of the word.",
      },
      {
        text: "Step off the call. Handle it properly.", emoji: "🧹",
        deltas: { sanity: 5, kidJoy: 15, career: -10 },
        feedback: "Your 2-year-old feels cared for. You miss the decision point on the call. You do not regret this.",
        pregnantFeedback: "You get down, handle it, get back up slowly. Took a moment. Your 2-year-old feels taken care of. You missed 6 minutes of the call.",
      },
      {
        text: "Coach the 2-year-old through self-cleanup from 10 feet away.", emoji: "🎙️",
        deltas: { sanity: -15, kidJoy: -5, career: 5 },
        feedback: "They are 2. This does not go as planned. You stayed on the call, technically.",
        singleFeedback: "They are 2. It is now a larger situation. You stayed on the call. That's all that can be said.",
      },
    ]
  },
  {
    time: "2:15 PM", emoji: "📱",
    title: "The Screen Time Reckoning",
    desc: "It has been four hours of Bluey. The tablet dies. Your 2-year-old — sick, over-screened, running on fumes — dissolves into a full meltdown on the kitchen floor. The 4-year-old gets picked up in 45 minutes.",
    pregnantDesc: "Four hours of Bluey. Tablet dead. Your 2-year-old is losing it on the kitchen floor. Your back hurts, your feet are swollen, and preschool pickup is in 45 minutes.",
    singleDesc: "Four hours of Bluey. Tablet dies. Full meltdown, kitchen floor, solo. Preschool pickup in 45 minutes. There is no tag-out.",
    choices: [
      {
        text: "Hold them through it. No negotiating.", emoji: "🫂",
        deltas: { sanity: -15, kidJoy: 15, career: -10 },
        feedback: "18 minutes. They eventually go still against your chest. You both needed that. You leave for pickup a little puffy-eyed.",
        singleFeedback: "18 minutes, your arms, no backup. They go still against your chest. You leave for pickup a little puffy-eyed. That's allowed.",
        pregnantFeedback: "You sit on the floor and hold them for 18 minutes. Getting back up requires a plan. You make it to pickup with 4 minutes to spare.",
      },
      {
        text: "Find another screen. Not today's battle.", emoji: "📺",
        deltas: { sanity: 10, kidJoy: -5, career: 10 },
        feedback: "Silence in 45 seconds. You finish your deliverable. You feel like you lost something. Complicated.",
      },
      {
        text: "Snacks and fresh air — out the door, right now.", emoji: "🍎",
        deltas: { sanity: 5, kidJoy: 10, career: -5 },
        feedback: "Fresh air resets everyone. They forget why they were crying. You do the preschool pickup on the way back. Efficient.",
        singleFeedback: "You herd the crying 2-year-old outside solo, which is its own Olympic event. Six minutes later they've forgotten. You do pickup on the way back.",
      },
    ]
  },
  {
    time: "4:00 PM", emoji: "🌋",
    title: "Both Kids. One Call. No Snacks.",
    desc: "The 4-year-old just got home from preschool — full of energy, ready to debrief their entire day. The 2-year-old has been sick and homebound since 9am. Both are hungry. You are on a call that started 3 minutes ago.",
    pregnantDesc: "4-year-old home from preschool, buzzing with energy. 2-year-old sick and restless since 9am. Both hungry. You are 26 weeks pregnant, have been on calls most of the day, and are now on another one.",
    singleDesc: "4-year-old home from preschool with a full day's worth of things to tell you. 2-year-old sick and depleted. Both hungry. You are on a call. You are the only adult. There is no cavalry.",
    choices: [
      {
        text: "Hard mute. Slide snacks across the counter without breaking eye contact with the camera.", emoji: "🍿",
        deltas: { sanity: 5, kidJoy: 5, career: 10 },
        feedback: "The 4-year-old accepts the snacks. The 2-year-old throws theirs. You do not react visibly. You are a professional.",
        singleFeedback: "Snacks deployed. The 4-year-old accepts. The 2-year-old throws theirs on the floor. You retrieve them on mute, still nodding. An act of extraordinary composure.",
      },
      {
        text: "Step off for 5 minutes. Feed them properly. Come back.", emoji: "🥕",
        deltas: { sanity: 5, kidJoy: 15, career: -10 },
        feedback: "Both kids get actual food and a moment of your attention. The 4-year-old tells you three things about their day in 90 seconds. You missed the agenda item. Worth it.",
        singleFeedback: "You feed them, you hear the 4-year-old's entire day in 90 seconds, you check the 2-year-old's temp. Back on the call 7 minutes later. Everything happened. You handled it.",
      },
      {
        text: "Put the 4-year-old in charge of snacks for both of them.", emoji: "👑",
        deltas: { sanity: 10, kidJoy: 10, career: 5 },
        feedback: "The 4-year-old takes this responsibility extremely seriously. They select cheese sticks and report back. You stay on the call. This was the right call.",
        singleFeedback: "The 4-year-old rises to the occasion. Cheese sticks. Distributed. The 2-year-old accepts them. You stay on the call. This is called delegation and you are very good at it.",
        pregnantFeedback: "The 4-year-old selects cheese sticks with great authority. You remain on the call. The 2-year-old eats. Something worked and you will take it.",
      },
    ]
  },
  {
    time: "6:30 PM", emoji: "🍝",
    title: "Dinner: A Crisis",
    desc: "Both kids are still hungry. Pantry: half a box of pasta, 3 eggs, peanut butter, something that might be a zucchini. Remaining energy: 11%.",
    pregnantDesc: "Both kids hungry, one very hungry pregnant person. Pantry: half a box of pasta, 3 eggs, peanut butter, maybe a zucchini. Remaining energy: 8%.",
    singleDesc: "Both kids hungry. Same pantry. Nobody coming to take over. Remaining energy: 9%.",
    choices: [
      {
        text: "Cook a real meal. You've still got it.", emoji: "👩‍🍳",
        deltas: { sanity: -10, kidJoy: 15, career: 0 },
        feedback: "The pasta was genuinely good. Both kids ate it. The dish situation is tomorrow's problem.",
        pregnantFeedback: "The pasta was good. You stood at the stove for 20 minutes. You sat down immediately after plating. Worth it.",
      },
      {
        text: "Cereal is a nutritionally complete meal.", emoji: "🥣",
        deltas: { sanity: 10, kidJoy: 5, career: 0 },
        feedback: "No shame. Both kids ate it without complaint. Pediatricians consider this fine. Probably.",
        singleFeedback: "No shame. You kept two humans alive and yourself employed today. Cereal is genuinely a win.",
      },
      {
        text: "Order delivery. Absolutely zero regrets.", emoji: "🛵",
        deltas: { sanity: 15, kidJoy: 10, career: 0 },
        feedback: "Doorbell rings. Brief feral child moment. Then everyone is full and nobody cooked anything.",
        singleFeedback: "Ordered from the car at pickup. Arrived 8 minutes after you got home. You planned this. You are a logistics professional.",
      },
    ]
  },
  {
    time: "8:50 PM", emoji: "📖",
    title: "The Bedtime Infinity Loop",
    desc: "Fourth story for the 4-year-old. The 2-year-old is also somehow still awake. Two hours of work left. Forty-seven unread emails. The 4-year-old looks at you like you hung the moon.",
    pregnantDesc: "Fourth story. The 2-year-old still awake next door. Two hours of work. Your back aches. Your feet look like bread loaves. The 4-year-old looks at you like you hung the moon.",
    singleDesc: "Fourth story. The 2-year-old is still awake next door and there's no one to go handle it. Two hours of work. Forty-seven emails. The 4-year-old looks at you like you hung the moon.",
    choices: [
      {
        text: "One more. Always one more.", emoji: "🌙",
        deltas: { sanity: 5, kidJoy: 25, career: -15 },
        feedback: "Both asleep by page 3. The work will wait. These moments won't.",
        singleFeedback: "Both asleep by page 3. You did all of today, alone, and you ended it here. The work will wait. These moments won't.",
        pregnantFeedback: "Both asleep by page 3. You fell asleep too, for 20 minutes. You wake and just sit in the dark a moment. The work will wait.",
      },
      {
        text: "Lights out. Hold the line.", emoji: "🔦",
        deltas: { sanity: 10, kidJoy: -5, career: 10 },
        feedback: "Six minutes of protest from both rooms. Then silence. Bittersweet, efficient victory.",
        singleFeedback: "Six minutes, both rooms. Then silence. You stand in the hall just breathing for a second. Then back to work.",
      },
      {
        text: "You fall asleep reading to them.", emoji: "😴",
        deltas: { sanity: 15, kidJoy: 20, career: -20 },
        feedback: "Midnight. Two sleeping kids. Work completely undone. You don't regret a single second.",
        singleFeedback: "Midnight. Two sleeping kids. You're still in their room. The work is undone. You don't regret a single second of this entire impossible day.",
        pregnantFeedback: "Midnight. Both kids asleep. You're still on the floor with a pillow wedged under your belly. The work is undone. You don't regret a single second.",
      },
    ]
  },
];

const ARCHETYPES = [
  {
    condition: (s, k, c) => s > 68 && k > 68 && c > 68,
    emoji: "🦄", title: "The Unicorn",
    desc: "You nailed all three metrics with two kids under five. Scientists cannot explain you. Please write a book. We will all buy it.",
    share: "Apparently I'm a mythical creature. Who knew?"
  },
  {
    condition: (s, k, c) => c > s + 20 && c > k + 10,
    emoji: "📊", title: "The PowerPoint Parent",
    desc: "Slides: immaculate. School events: recalled differently by each party. The career is very, very real.",
    share: "Optimized for performance reviews and also parenthood. Mostly performance reviews."
  },
  {
    condition: (s, k, c) => k > s + 15 && k > c + 10,
    emoji: "🥪", title: "The Snack Packer",
    desc: "Your kids' emotional development is genuinely thriving. Your inbox is a crime scene. Trade-offs were made. Worth it.",
    share: "My kids will be emotionally secure. My inbox will not."
  },
  {
    condition: (s, k, c) => s > k + 20 && s > c + 10,
    emoji: "🧘", title: "Zen Master in Disguise",
    desc: "You found peace inside the chaos. Either deeply evolved, or you've discovered something the rest of us haven't. Share your secrets.",
    share: "Somehow at peace with all of this. Therapy helps. So does lowering expectations."
  },
  {
    condition: (s, k, c) => s < 50 && k < 50 && c < 50,
    emoji: "💯", title: "Authentically, Honestly Real",
    desc: "Nobody is fully okay. Two kids under five is genuinely a lot. Everyone turns out fine. This is the way.",
    share: "Just trying to keep everyone alive and employed. The bar is relative."
  },
  {
    condition: () => true,
    emoji: "🤹", title: "The Juggler",
    desc: "Nothing perfect, everything functional. The median working parent of two kids under five — and that is more impressive than it sounds.",
    share: "Dropping balls gracefully since becoming a parent of two."
  },
];

const clamp = (v) => Math.min(100, Math.max(0, v));
const getDesc = (scene, diff) =>
  diff === "pregnant" && scene.pregnantDesc ? scene.pregnantDesc :
  diff === "single" && scene.singleDesc ? scene.singleDesc : scene.desc;
const getChoiceText = (ch, diff) =>
  diff === "pregnant" && ch.pregnantText ? ch.pregnantText :
  diff === "single" && ch.singleText ? ch.singleText : ch.text;
const getChoiceFeedback = (ch, diff) =>
  diff === "pregnant" && ch.pregnantFeedback ? ch.pregnantFeedback :
  diff === "single" && ch.singleFeedback ? ch.singleFeedback : ch.feedback;

function Meter({ label, val, color, emoji }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 700, color: C.navy }}>{emoji} {label}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color, fontWeight: 500 }}>{val}</span>
      </div>
      <div style={{ background: C.border, borderRadius: 99, height: 7, overflow: "hidden" }}>
        <div style={{ width: `${val}%`, background: color, height: "100%", borderRadius: 99, transition: "width 0.7s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function ProgressDots({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 18 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 99, background: i < current ? C.sage : i === current ? C.coral : C.border, transition: "all 0.3s ease" }} />
      ))}
    </div>
  );
}

function Wrap({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px 48px", fontFamily: "'Nunito',sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 460 }}>{children}</div>
    </div>
  );
}

export default function WorkingParentSim() {
  const [phase, setPhase] = useState("intro");
  const [difficulty, setDifficulty] = useState(null);
  const [idx, setIdx] = useState(0);
  const [meters, setMeters] = useState({ sanity: 60, kidJoy: 70, career: 75 });
  const [feedback, setFeedback] = useState(null);
  const [deltas, setDeltas] = useState(null);
  const [archetype, setArchetype] = useState(null);
  const [copied, setCopied] = useState(false);
  const [animIn, setAnimIn] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.textContent = `* { box-sizing: border-box; margin: 0; } body { margin: 0; background: ${C.bg}; } button:active { transform: scale(0.97); }`;
    document.head.appendChild(s);
  }, []);

  const scene = SCENES[idx];
  const diff = difficulty || "standard";
  const D = DIFFICULTIES[diff];

  const go = (next) => { setAnimIn(false); setTimeout(() => { setPhase(next); setAnimIn(true); }, 150); };

  const startGame = (key) => {
    setDifficulty(key);
    setMeters({ ...DIFFICULTIES[key].meters });
    go("game");
  };

  const choose = (ch) => {
    setMeters(m => ({
      sanity: clamp(m.sanity + ch.deltas.sanity),
      kidJoy: clamp(m.kidJoy + ch.deltas.kidJoy),
      career: clamp(m.career + ch.deltas.career),
    }));
    setFeedback(getChoiceFeedback(ch, diff));
    setDeltas(ch.deltas);
    go("feedback");
  };

  const next = () => {
    if (idx >= SCENES.length - 1) {
      const arch = ARCHETYPES.find(a => a.condition(meters.sanity, meters.kidJoy, meters.career)) || ARCHETYPES[ARCHETYPES.length - 1];
      setArchetype(arch);
      go("result");
    } else {
      setIdx(i => i + 1);
      setFeedback(null); setDeltas(null);
      go("game");
    }
  };

  const restart = () => {
    setPhase("intro"); setIdx(0); setDifficulty(null);
    setMeters({ sanity: 60, kidJoy: 70, career: 75 });
    setFeedback(null); setDeltas(null); setArchetype(null); setCopied(false); setAnimIn(true);
  };

  const copyText = () => {
    if (!archetype) return;
    const t = `I just played the Working Parent Simulator 🎮\nDifficulty: ${D.emoji} ${D.label}\n\nResult: "${archetype.title}" ${archetype.emoji}\n🧠 Sanity: ${meters.sanity}/100 · 🧡 Kid Joy: ${meters.kidJoy}/100 · 💼 Career: ${meters.career}/100\n\n"${archetype.share}"\n\nTwo kids under 5. One very full day. Think you can balance it?\n[link]\n\n#WorkingParent #MothersDay #RealTalk`;
    navigator.clipboard.writeText(t).catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 3000);
  };

  const fade = { opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(8px)", transition: "all 0.2s ease" };

  const btn = (onClick, children, opts = {}) => (
    <button onClick={onClick} style={{
      border: "none", borderRadius: 14, cursor: "pointer",
      fontFamily: "'Nunito',sans-serif", fontWeight: 800, width: "100%",
      padding: "16px 0", fontSize: 16, color: "#fff",
      background: opts.bg || C.coral, boxShadow: opts.shadow || `0 4px 14px ${C.coral}44`,
      transition: "background 0.3s", ...opts.style,
    }}>{children}</button>
  );

  // ─── INTRO ───
  if (phase === "intro") return (
    <Wrap>
      <div style={{ textAlign: "center", paddingTop: 32, ...fade }}>
        <div style={{ fontSize: 50, marginBottom: 12 }}>💼☕🌀</div>
        <div style={{ display: "inline-block", background: C.coral, color: "#fff", fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "4px 12px", borderRadius: 4, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Mother's Day Edition</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 900, color: C.navy, lineHeight: 1.08, margin: "0 0 10px" }}>
          Working Parent<br /><em style={{ color: C.coral }}>Simulator</em>
        </h1>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.65, margin: "0 0 4px", padding: "0 8px" }}>
          Two kids under 5. Both in preschool or daycare. One very full day.
        </p>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, margin: "0 0 6px", padding: "0 8px" }}>
          For every colleague who's ever wondered what's actually behind that camera-off icon.
        </p>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.coral, margin: "0 0 26px" }}>~5–8 min · 9 scenarios · 3 meters</p>
        <div style={{ background: C.paper, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: "16px 20px", marginBottom: 20, textAlign: "left", boxShadow: "0 2px 12px rgba(27,43,74,0.06)" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>You'll manage 3 meters</p>
          {[["🧠", "Sanity", C.sage, "Your mental bandwidth"], ["🧡", "Kid Joy", C.coral, "How both kids are doing"], ["💼", "Career", C.gold, "Your professional standing"]].map(([e, l, col, sub]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderTop: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 20, width: 26, textAlign: "center" }}>{e}</span>
              <div><div style={{ fontWeight: 800, fontSize: 14, color: col }}>{l}</div><div style={{ fontSize: 12, color: C.muted }}>{sub}</div></div>
            </div>
          ))}
        </div>
        {btn(() => go("difficulty"), "Set the Scene →")}
        <p style={{ fontSize: 11, color: C.muted, marginTop: 10, opacity: 0.7 }}>Made with 💙 in honor of every working parent</p>
      </div>
    </Wrap>
  );

  // ─── DIFFICULTY ───
  if (phase === "difficulty") return (
    <Wrap>
      <div style={{ paddingTop: 24, ...fade }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: C.coral, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Choose Your Difficulty</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 900, color: C.navy, lineHeight: 1.2, margin: "0 0 8px" }}>
            Two kids under 5.<br />Now pick your mode.
          </h2>
          <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.5 }}>Affects your starting meters and how some scenarios play out.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
          {Object.values(DIFFICULTIES).map((d) => (
            <button key={d.key} onClick={() => startGame(d.key)} style={{
              background: C.paper, border: `2px solid ${C.border}`, borderRadius: 16,
              padding: "16px 18px", textAlign: "left", cursor: "pointer", width: "100%",
              boxShadow: "0 2px 8px rgba(27,43,74,0.05)", transition: "all 0.15s ease",
            }}
            onPointerDown={e => { e.currentTarget.style.borderColor = d.color; e.currentTarget.style.background = C.blush; }}
            onPointerUp={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.paper; }}
            onPointerLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.paper; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontSize: 30, lineHeight: 1.1, flexShrink: 0 }}>{d.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: C.navy }}>{d.label}</span>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: d.color, background: `${d.color}20`, padding: "2px 7px", borderRadius: 4, letterSpacing: 1 }}>{d.badge}</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.navy, fontWeight: 700, margin: "0 0 2px" }}>{d.tagline}</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: "0 0 10px", lineHeight: 1.45 }}>{d.detail}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["🧠", d.meters.sanity, C.sage], ["🧡", d.meters.kidJoy, C.coral], ["💼", d.meters.career, C.gold]].map(([e, v, col]) => (
                      <span key={e} style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: col, background: `${col}18`, padding: "2px 7px", borderRadius: 5 }}>{e} {v}</span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: C.muted, marginTop: 6, opacity: 0.6 }}>Tap to select and begin immediately</p>
      </div>
    </Wrap>
  );

  // ─── GAME ───
  if (phase === "game") return (
    <Wrap>
      <div style={fade}>
        <ProgressDots current={idx} total={SCENES.length} />
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: D.color, background: `${D.color}18`, padding: "3px 10px", borderRadius: 4, letterSpacing: 1.5, textTransform: "uppercase" }}>{D.emoji} {D.label}</span>
        </div>
        <div style={{ background: C.paper, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 16 }}>
          <Meter label="Sanity" val={meters.sanity} color={C.sage} emoji="🧠" />
          <Meter label="Kid Joy" val={meters.kidJoy} color={C.coral} emoji="🧡" />
          <Meter label="Career" val={meters.career} color={C.gold} emoji="💼" />
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 500, color: C.coral, background: C.blush, padding: "3px 10px", borderRadius: 6 }}>{scene.time}</span>
            <span style={{ fontSize: 18 }}>{scene.emoji}</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 25, fontWeight: 900, color: C.navy, margin: "0 0 10px", lineHeight: 1.2 }}>{scene.title}</h2>
          <p style={{ color: C.navy, opacity: 0.72, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{getDesc(scene, diff)}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {scene.choices.map((ch, i) => (
            <button key={i} onClick={() => choose(ch)} style={{ background: C.paper, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "13px 15px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 11, width: "100%", transition: "all 0.15s ease" }}
              onPointerDown={e => { e.currentTarget.style.background = C.blush; e.currentTarget.style.borderColor = C.coral; }}
              onPointerUp={e => { e.currentTarget.style.background = C.paper; e.currentTarget.style.borderColor = C.border; }}
              onPointerLeave={e => { e.currentTarget.style.background = C.paper; e.currentTarget.style.borderColor = C.border; }}
            >
              <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1.2 }}>{ch.emoji}</span>
              <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 14, color: C.navy, lineHeight: 1.45 }}>{getChoiceText(ch, diff)}</span>
            </button>
          ))}
        </div>
      </div>
    </Wrap>
  );

  // ─── FEEDBACK ───
  if (phase === "feedback") return (
    <Wrap>
      <div style={fade}>
        <ProgressDots current={idx} total={SCENES.length} />
        <div style={{ background: C.paper, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 16 }}>
          <Meter label="Sanity" val={meters.sanity} color={C.sage} emoji="🧠" />
          <Meter label="Kid Joy" val={meters.kidJoy} color={C.coral} emoji="🧡" />
          <Meter label="Career" val={meters.career} color={C.gold} emoji="💼" />
        </div>
        <div style={{ background: C.navy, color: "#fff", borderRadius: 18, padding: "22px 20px", marginBottom: 14, boxShadow: `0 8px 24px ${C.navy}33` }}>
          <div style={{ fontSize: 34, marginBottom: 10 }}>📋</div>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontStyle: "italic", lineHeight: 1.55, margin: "0 0 16px", opacity: 0.95 }}>"{feedback}"</p>
          {deltas && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {Object.entries(deltas).map(([key, val]) => {
                if (val === 0) return null;
                const labels = { sanity: "🧠 Sanity", kidJoy: "🧡 Kid Joy", career: "💼 Career" };
                return <span key={key} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: val > 0 ? "#7EDBA8" : "#FF8F8F", fontFamily: "'DM Mono',monospace" }}>{labels[key]} {val > 0 ? "+" : ""}{val}</span>;
              })}
            </div>
          )}
        </div>
        {btn(next, idx >= SCENES.length - 1 ? "See Your Results 🎉" : "Next Challenge →")}
      </div>
    </Wrap>
  );

  // ─── RESULT ───
  if (phase === "result" && archetype) return (
    <Wrap>
      <div style={{ textAlign: "center", paddingTop: 16, ...fade }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: D.color, background: `${D.color}18`, padding: "3px 10px", borderRadius: 4, letterSpacing: 1.5, textTransform: "uppercase" }}>{D.emoji} {D.label} Mode</span>
        </div>
        <div style={{ display: "inline-block", border: `3px solid ${C.coral}`, color: C.coral, fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "4px 12px", borderRadius: 6, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, transform: "rotate(-1deg)" }}>Your Working Parent Type</div>
        <div style={{ fontSize: 58, marginBottom: 8 }}>{archetype.emoji}</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: C.navy, margin: "0 0 10px", lineHeight: 1.15 }}>{archetype.title}</h2>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.65, margin: "0 0 22px", padding: "0 6px" }}>{archetype.desc}</p>
        <div style={{ background: C.paper, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: "16px 18px", marginBottom: 18, textAlign: "left" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Final Stats</p>
          <Meter label="Sanity" val={meters.sanity} color={C.sage} emoji="🧠" />
          <Meter label="Kid Joy" val={meters.kidJoy} color={C.coral} emoji="🧡" />
          <Meter label="Career" val={meters.career} color={C.gold} emoji="💼" />
        </div>
        <div style={{ background: C.blush, borderRadius: 14, padding: "13px 16px", marginBottom: 12, textAlign: "left", border: `1px solid ${C.coral}30` }}>
          <p style={{ fontWeight: 800, fontSize: 13, color: C.stamp, marginBottom: 4 }}>✨ Share on LinkedIn</p>
          <p style={{ fontSize: 13, color: C.navy, opacity: 0.7, lineHeight: 1.5, margin: 0 }}>Copy your result and help a colleague understand what juggling it all actually looks like.</p>
        </div>
        {btn(copyText, copied ? "✅ Copied!" : "📋 Copy LinkedIn Post", { bg: copied ? C.sage : C.navy, shadow: "0 4px 14px rgba(27,43,74,0.2)", style: { marginBottom: 10, transition: "background 0.35s" } })}
        <button onClick={restart} style={{ background: "transparent", color: C.muted, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "12px 0", width: "100%", fontSize: 14, fontWeight: 700, fontFamily: "'Nunito',sans-serif", cursor: "pointer" }}>
          Play Again ↺
        </button>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 13, color: C.muted, marginTop: 22, opacity: 0.6, lineHeight: 1.6 }}>
          "To every parent doing the impossible, every day — this one's for you." 🌸
        </p>
      </div>
    </Wrap>
  );

  return null;
}
