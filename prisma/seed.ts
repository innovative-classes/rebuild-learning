import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Admin user ---
  const adminHash = await bcrypt.hash("Admin@123", 12);
  await prisma.user.upsert({
    where: { email: "admin@nbvsubbarao.com" },
    update: { emailVerified: true, passwordHash: adminHash, failedLoginAttempts: 0, accountLockedUntil: null },
    create: {
      name: "N.B.V. Subba Rao",
      email: "admin@nbvsubbarao.com",
      passwordHash: adminHash,
      role: "ADMIN",
      phone: "+91 9876543210",
      emailVerified: true,
    },
  });
  console.log("✅ Admin user created");

  // --- Demo student ---
  const studentHash = await bcrypt.hash("Student@123", 12);
  await prisma.user.upsert({
    where: { email: "student@demo.com" },
    update: { emailVerified: true, passwordHash: studentHash, failedLoginAttempts: 0, accountLockedUntil: null },
    create: {
      name: "Demo Student",
      email: "student@demo.com",
      passwordHash: studentHash,
      role: "STUDENT",
      phone: "+91 9000000000",
      studentClass: "Inter 2nd Year",
      stream: "MPC",
      city: "Hyderabad",
      emailVerified: true,
    },
  });
  console.log("✅ Demo student created");

  // --- 5 Additional student accounts ---
  const students = [
    { name: "Rahul Sharma", email: "student1@demo.com", phone: "+91 9000000001", studentClass: "Inter 1st Year", stream: "MPC", city: "Hyderabad" },
    { name: "Priya Reddy", email: "student2@demo.com", phone: "+91 9000000002", studentClass: "Inter 2nd Year", stream: "BiPC", city: "Vijayawada" },
    { name: "Karthik Naidu", email: "student3@demo.com", phone: "+91 9000000003", studentClass: "Inter 1st Year", stream: "CEC", city: "Visakhapatnam" },
    { name: "Sneha Devi", email: "student4@demo.com", phone: "+91 9000000004", studentClass: "Inter 2nd Year", stream: "MPC", city: "Tirupati" },
    { name: "Arjun Kumar", email: "student5@demo.com", phone: "+91 9000000005", studentClass: "Inter 1st Year", stream: "BiPC", city: "Warangal" },
  ];

  for (const s of students) {
    await prisma.user.upsert({
      where: { email: s.email },
      update: { emailVerified: true, passwordHash: studentHash, failedLoginAttempts: 0, accountLockedUntil: null },
      create: {
        name: s.name,
        email: s.email,
        passwordHash: studentHash,
        role: "STUDENT",
        phone: s.phone,
        studentClass: s.studentClass,
        stream: s.stream,
        city: s.city,
        emailVerified: true,
      },
    });
  }
  console.log("✅ 5 additional students created");

  // --- 12 Assessments ---
  const assessments = [
    {
      moduleNumber: 1,
      title: "Engineering, Technology & AI",
      slug: "engineering-technology",
      description: "Discover if your analytical thinking, technical curiosity, and problem-solving drive align with engineering & technology careers. Harvard-style scenario assessment.",
      overview: "For the mind that asks 'how does this work?' before 'what does it cost?'. This path leads to IITs, NITs, IIIT Hyderabad, and careers at Google, ISRO, and Silicon Valley startups. India's tech sector is the world's third largest.",
      stream: "PCM (Physics, Chemistry, Mathematics)",
      keyExams: "JEE Main, JEE Advanced, AP/TS EAMCET, BITSAT, VITEEE",
      degree: "B.Tech / B.E. (4 years)",
      salaryRange: "₹6–80+ LPA (entry to senior)",
      demandRating: 5,
      accentColor: "#2563eb",
    },
    {
      moduleNumber: 2,
      title: "Medicine, Healthcare & Biotechnology",
      slug: "medicine-healthcare",
      description: "Assess your readiness for medicine — from patient empathy and biological sciences curiosity to the long study commitment. Harvard-style scenario assessment.",
      overview: "For the mind drawn to healing, human biology, and the science of disease. This path leads to AIIMS, top medical colleges, and careers saving lives. India's healthcare sector grows at 22% annually.",
      stream: "PCB (Physics, Chemistry, Biology)",
      keyExams: "NEET UG, AP EAPCET BiPC, TS EAMCET BiPC",
      degree: "MBBS (5.5 yr) / BDS / B.Sc Nursing / B.Pharm",
      salaryRange: "₹4–80+ LPA (entry to specialist)",
      demandRating: 5,
      accentColor: "#dc2626",
    },
    {
      moduleNumber: 3,
      title: "Pure Sciences, Research & Space",
      slug: "science-research",
      description: "Discover if your deep curiosity, analytical mindset, and tolerance for open-ended questions align with a career in scientific research.",
      overview: "For the genuinely curious mind that asks 'why' before 'how'. This path leads to ISRO, TIFR, IISER, IISc, and PhD programs at MIT, Cambridge, and ETH Zurich. India's space economy targets ₹44,000 crore by 2033.",
      stream: "PCM / PCB",
      keyExams: "IAT, JEST, JEE Advanced",
      degree: "B.S–M.S at IISER / IISc (5 years)",
      salaryRange: "₹3–40+ LPA (research fellowships to senior roles)",
      demandRating: 4,
      accentColor: "#0891b2",
    },
    {
      moduleNumber: 4,
      title: "Finance, Stock Market & Investment Banking",
      slug: "commerce-finance",
      description: "Test your analytical orientation and genuine curiosity about markets, capital, and financial systems. Harvard-style scenario assessment.",
      overview: "India's Mutual Fund AUM crossed ₹80 lakh crore. Demat accounts tripled to 21 crore in 4 years. Hyderabad hosts major banking operations and a growing FinTech ecosystem.",
      stream: "Commerce + Mathematics",
      keyExams: "CUET, NPAT, ICFAI, SET",
      degree: "B.Com / BBA Finance (3 years)",
      salaryRange: "₹6–80+ LPA (entry to senior)",
      demandRating: 5,
      accentColor: "#16a34a",
    },
    {
      moduleNumber: 5,
      title: "Chartered Accountancy, CS & Corporate Finance",
      slug: "chartered-accountancy",
      description: "Evaluate your precision orientation, tolerance for complexity, and genuine interest in financial systems and corporate compliance.",
      overview: "Hyderabad is one of India's top 5 cities for CA practice, with Big 4 firms, major corporate headquarters, and an ICAI branch with 12,000+ members. A CA from Telugu states commands ₹10–18 LPA starting.",
      stream: "Commerce (Maths recommended)",
      keyExams: "CA Foundation (ICAI), CS Foundation (ICSI), CMA Foundation",
      degree: "CA / CS / CMA (parallel to B.Com — 3–5 years)",
      salaryRange: "₹8–60+ LPA (qualified professional)",
      demandRating: 5,
      accentColor: "#059669",
    },
    {
      moduleNumber: 6,
      title: "Business Management, Marketing & Entrepreneurship",
      slug: "business-management",
      description: "Test your leadership instincts, entrepreneurial mindset, and ability to build products, lead teams, and solve market problems.",
      overview: "India's startup ecosystem is the world's third largest. T-Hub in Hyderabad is one of Asia's largest startup incubators. Telugu entrepreneurs founded Adobe and numerous unicorns.",
      stream: "Any Stream (Commerce preferred)",
      keyExams: "CAT, MAT, XAT, ICET (for MBA in AP/TS)",
      degree: "BBA (3 years) → MBA (2 years) OR Direct Startup",
      salaryRange: "₹5–50+ LPA (entry to senior)",
      demandRating: 4,
      accentColor: "#b45309",
    },
    {
      moduleNumber: 7,
      title: "Law, Legal Services & Policy",
      slug: "law-legal-studies",
      description: "Evaluate your aptitude for logical argumentation, precision with language, and sense of justice for a legal career.",
      overview: "NALSAR Hyderabad is India's second-ranked NLU. Telangana and AP High Courts offer significant litigation opportunities. India's legal services market projected to reach ₹1.3 lakh crore by 2030.",
      stream: "Any Stream (Humanities preferred)",
      keyExams: "CLAT, TS LAWCET, AP LAWCET, AILET",
      degree: "5-year Integrated BA LLB / BBA LLB OR 3-year LLB",
      salaryRange: "₹8–80+ LPA (junior advocate to senior partner)",
      demandRating: 4,
      accentColor: "#7c3aed",
    },
    {
      moduleNumber: 8,
      title: "Civil Services, Defence & Government",
      slug: "government-civil-services",
      description: "Assess your passion for public service, governance, and national service through rigorous competitive examinations.",
      overview: "AP and Telangana have historically produced senior IAS, IPS, and IFS officers. APPSC and TSPSC conduct annual examinations with thousands of vacancies.",
      stream: "Any Stream",
      keyExams: "UPSC CSE, NDA (Class 12), APPSC, TSPSC, CDS",
      degree: "Any Graduation (for UPSC) / Class 12 minimum (for NDA)",
      salaryRange: "₹4–N/A LPA (salary + perks + power + prestige)",
      demandRating: 4,
      accentColor: "#374151",
    },
    {
      moduleNumber: 9,
      title: "Psychology, Counselling & Mental Health",
      slug: "psychology-counselling",
      description: "Discover if your empathy, observational instinct, and genuine curiosity about human behaviour align with a psychology career.",
      overview: "India has 1 psychologist per 83,000 people — massive undersupply. Hyderabad, Vizag, Vijayawada seeing explosive demand for school counsellors and corporate wellness professionals.",
      stream: "Humanities / Science (Biology helps)",
      keyExams: "CUET, NIMHANS entrance, University Merit",
      degree: "BA/BSc Psychology → MA/MSc Clinical Psychology → RCI Licensed",
      salaryRange: "₹4–40+ LPA (entry to licensed practitioner)",
      demandRating: 5,
      accentColor: "#ec4899",
    },
    {
      moduleNumber: 10,
      title: "Design, Animation, Gaming & Creative Arts",
      slug: "creative-arts-design",
      description: "Explore if your visual instinct, creative drive, and portfolio-building orientation align with a design career.",
      overview: "India's gaming industry projected to reach ₹25,000 crore by 2028. UX/UI demand at all-time high. Hyderabad hosts major gaming studios and animation companies.",
      stream: "Any Stream (Portfolio essential)",
      keyExams: "NID DAT, NIFT entrance, UCEED, CEED, State entrance",
      degree: "B.Des / B.Sc Animation / B.Sc Game Design (4 years)",
      salaryRange: "₹6–50+ LPA (entry to senior)",
      demandRating: 5,
      accentColor: "#6366f1",
    },
    {
      moduleNumber: 11,
      title: "Media, Journalism, Content Creation & Digital Media",
      slug: "media-communication",
      description: "Evaluate your storytelling instinct, communication skills, and comfort with public-facing creative work.",
      overview: "Telugu media is India's second-largest regional language media market. Digital Telugu content growing 35% annually. Telugu content creators among India's highest-earning regional creators.",
      stream: "Any Stream",
      keyExams: "IIMC entrance, CUET, University Merit, Portfolio",
      degree: "BA Mass Communication / BMM / B.Sc Journalism (3 years)",
      salaryRange: "₹5–50+ LPA (entry to senior)",
      demandRating: 4,
      accentColor: "#f59e0b",
    },
    {
      moduleNumber: 12,
      title: "Green Energy, Sustainability & Environmental Careers",
      slug: "green-energy-sustainability",
      description: "Discover if your genuine concern for environmental systems and interest in sustainability solutions align with a green energy career.",
      overview: "India's commitment to 500 GW renewable energy by 2030. AP is India's leader in solar energy. Greenko (Hyderabad-based) is one of India's largest renewable energy companies.",
      stream: "Any Stream (Science preferred)",
      keyExams: "JEE, CUET, State university entrance",
      degree: "B.Tech Environmental / B.Sc Environmental Science / MBA Sustainability",
      salaryRange: "₹4–20+ LPA (entry to senior)",
      demandRating: 5,
      accentColor: "#65a30d",
    },
  ];

  for (const a of assessments) {
    await prisma.assessment.upsert({
      where: { moduleNumber: a.moduleNumber },
      update: a,
      create: a,
    });
  }
  console.log("✅ 12 Assessments created");

  // --- Module 01 Questions (Engineering, Technology & AI) ---
  const eng = await prisma.assessment.findUnique({ where: { moduleNumber: 1 } });
  if (eng) {
    const engineeringQuestions = [
      {
        questionNumber: 1,
        questionText: "You are at a family gathering. The internet router stops working. Everyone is frustrated. A technician is 2 hours away. You have no instructions. What do you most honestly do?",
        optionAText: "I get curious — I start checking cables, rebooting in different sequences, looking up error lights. I want to figure it out myself.",
        optionBText: "I might try one or two obvious things, but mostly wait for someone who knows what to do.",
        optionCText: "I leave it to whoever is handling it. Troubleshooting devices is not something I enjoy or seek out.",
      },
      {
        questionNumber: 2,
        questionText: "Your Maths teacher gives the class an optional bonus problem — difficult, ungraded, purely for curiosity. No marks, no recognition. What do you do?",
        optionAText: "I attempt it — not for the marks but because unsolved problems genuinely bother me until I try.",
        optionBText: "I glance at it, think briefly, then set it aside — I have enough to study already.",
        optionCText: "I skip it entirely. If it does not count, my time is better spent elsewhere.",
      },
      {
        questionNumber: 3,
        questionText: "You scroll past a 90-second clip of a humanoid robot completing a factory task. You have 10 free minutes. What do you do next?",
        optionAText: "I look up how the robot was built — what sensors it uses, how it was trained, whether companies are hiring for this.",
        optionBText: "I watch the clip, find it cool, and keep scrolling. It does not pull me deeper.",
        optionCText: "I scroll past it. Robots and tech content are not what I naturally seek out.",
      },
      {
        questionNumber: 4,
        questionText: "A friend dares you to build a working 10-question quiz app using free online tutorials — no grade, no prize. You have one free Sunday afternoon. What actually happens?",
        optionAText: "I try it — and even if it breaks repeatedly, I find the process of fixing it genuinely engaging.",
        optionBText: "I start, get stuck early, and lose interest — I would rather spend the afternoon differently.",
        optionCText: "I decline the dare. Coding is not how I want to spend free time.",
      },
      {
        questionNumber: 5,
        questionText: "You spend 45 minutes on a single difficult Maths problem during a practice test. You finally get it right in the last minute. Later that evening, what is your honest feeling?",
        optionAText: "A quiet satisfaction — and I find myself wondering if there was a smarter approach I missed.",
        optionBText: "Relief that it is over. The struggle was more exhausting than rewarding.",
        optionCText: "Frustration. That kind of sustained effort on one problem feels draining, not exciting.",
      },
      {
        questionNumber: 6,
        questionText: "Imagine two people at age 28. One is deep inside code at a product company, debugging systems at midnight because they cannot leave a problem unsolved. The other leads a team, presents strategy to clients, manages people. Which honestly resembles something you can see yourself in?",
        optionAText: "The first. The idea of being inside a technical problem that deeply actually sounds like a good life to me.",
        optionBText: "Maybe a version of the first — but I am drawn to the business side too. I am genuinely unsure.",
        optionCText: "The second, clearly — or neither. I see myself in medicine, law, design, or something outside tech.",
      },
      {
        questionNumber: 7,
        questionText: "A senior student tells you: 'To crack JEE, you will study Physics, Chemistry, and Maths for 6 hours a day for 2 years — weekends included.' Your honest internal reaction is:",
        optionAText: "That sounds hard, but if the goal is right, I can do this. I have done sustained focused work before.",
        optionBText: "I feel uncertain. I would do it mostly because of family expectations, not because I am excited.",
        optionCText: "That level of commitment to PCM does not feel right. Other paths feel more aligned with who I am.",
      },
      {
        questionNumber: 8,
        questionText: "All engineering exams are cancelled permanently and engineering salaries drop to average. No pressure, no reward. On a quiet evening, which of these would you actually choose to spend 2 hours on?",
        optionAText: "Learning how a GPS works, building a small Python script, or reading about how a chip is designed — the curiosity is real regardless of outcome.",
        optionBText: "Maybe — but I am not sure if my interest in tech is genuine or shaped by what everyone around me is doing.",
        optionCText: "Honestly, something else entirely — writing, debating, cooking, sport, art, or something non-technical.",
      },
    ];

    for (const q of engineeringQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: eng.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: eng.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 01 questions seeded (8)");
  }

  // --- Module 02 Questions (Medicine, Healthcare & Biotechnology) ---
  const med = await prisma.assessment.findUnique({ where: { moduleNumber: 2 } });
  if (med) {
    const medicineQuestions = [
      {
        questionNumber: 1,
        questionText: "A classmate faints during the morning assembly. Teachers rush over. There is confusion. What happens inside you in that moment, honestly?",
        optionAText: "I want to help — I move toward the situation, stay calm, and want to understand what is happening medically.",
        optionBText: "I feel concerned but stay back — I do not feel drawn to be the person taking charge.",
        optionCText: "I feel uncomfortable and look away. Medical emergencies make me anxious and I prefer distance.",
      },
      {
        questionNumber: 2,
        questionText: "Your Biology teacher explains how the heart's electrical system causes arrhythmia and how a pacemaker compensates. Class ends. What do you do that evening?",
        optionAText: "I look up more about how pacemakers work — the biology pulled me in and I am not done yet.",
        optionBText: "I noted what was needed for the exam and moved on. It was interesting but not compelling enough to pursue further.",
        optionCText: "I copied the notes and felt relieved when the class moved on. Biology content does not excite me.",
      },
      {
        questionNumber: 3,
        questionText: "A close family member is diagnosed with a serious illness. Over the next three weeks, you are exposed to doctors, hospitals, fear, and uncertainty. Reflecting honestly on that period — how do you relate to it?",
        optionAText: "I wanted to understand what was happening medically — I read about the condition and felt drawn to the world of diagnosis and treatment.",
        optionBText: "I coped, but the emotional weight drained me significantly and I wanted to escape it as quickly as possible.",
        optionCText: "It confirmed that medicine is not for me — sustained exposure to illness and suffering feels incompatible with my wellbeing.",
      },
      {
        questionNumber: 4,
        questionText: "A doctor you respect tells you: 'From Class 10 to your first independent practice, you are looking at 14 years minimum. The first 10 you will earn very little.' Your honest reaction is:",
        optionAText: "That is a long road but I can see myself on it — the work itself is what I am choosing, not just the destination.",
        optionBText: "It concerns me. I would manage it but the timeline genuinely troubles me.",
        optionCText: "That timeline does not work for me. I want financial and professional independence within 5–6 years of finishing Class 12.",
      },
      {
        questionNumber: 5,
        questionText: "You read that a new mRNA vaccine approach has shown early promise against a cancer type. You have a free hour. What do you actually do with that information?",
        optionAText: "I read further — how mRNA works, which cancers are being targeted, what the clinical trial process looks like.",
        optionBText: "I find it interesting and share it with someone, but do not investigate further on my own.",
        optionCText: "I note it and move on. Medical research news does not hold my attention beyond the headline.",
      },
      {
        questionNumber: 6,
        questionText: "Picture two people at age 35. One has just diagnosed a complex case that three other doctors missed and is quietly satisfied. The other runs a health-tech startup, pitching investors and building a team. Which portrait honestly resonates with who you want to become?",
        optionAText: "The first. The idea of clinical diagnosis and patient impact is what genuinely pulls me.",
        optionBText: "The second, or something between — I want to be in healthcare but the management or technology side appeals more than direct patient care.",
        optionCText: "Neither — I see myself somewhere outside healthcare entirely.",
      },
      {
        questionNumber: 7,
        questionText: "A student who dropped out of MBBS tells you: 'It was five years of memorising 40-page chapters on anatomy, biochemistry, and pathology — every week.' Your honest reaction to that description is:",
        optionAText: "That actually sounds engaging — the complexity of the human body is something I genuinely want to go deep on.",
        optionBText: "I could manage it but it does not excite me. I would get through it, not love it.",
        optionCText: "That sounds like a difficult endurance test. It does not align with how I want to spend my learning years.",
      },
      {
        questionNumber: 8,
        questionText: "NEET is cancelled permanently, medical salaries are equalised with other professions, and there is no social prestige attached to being a doctor. Would you still want to understand how the human body works and how diseases are diagnosed and treated?",
        optionAText: "Yes — the human body and disease genuinely captivate me independently of any external reward.",
        optionBText: "Possibly — but I honestly do not know if my interest is intrinsic or shaped by what my family expects.",
        optionCText: "Honestly no — other fields feel more naturally exciting and meaningful to me.",
      },
    ];

    for (const q of medicineQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: med.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: med.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 02 questions seeded (8)");
  }

  // --- Module 03 Questions (Pure Sciences, Research & Space) ---
  const sci = await prisma.assessment.findUnique({ where: { moduleNumber: 3 } });
  if (sci) {
    const scienceQuestions = [
      {
        questionNumber: 1,
        questionText: "A teacher says: 'Nobody fully understands why time moves only in one direction.' Class ends in 5 minutes. What do you do for the rest of the day?",
        optionAText: "The question stays with me — I look it up, read about entropy and the arrow of time, and the reading pulls me deeper.",
        optionBText: "I find it interesting in the moment but it does not occupy my thoughts after class.",
        optionCText: "I note that the teacher went off-topic and refocus on what will be in the exam.",
      },
      {
        questionNumber: 2,
        questionText: "You conduct a Chemistry experiment. The result contradicts what the textbook predicts. You have 20 minutes before the next class. What do you do?",
        optionAText: "I try to understand why — I repeat a step, check variables, and feel genuinely excited by the contradiction.",
        optionBText: "I assume I made an error, note it, and move on. Investigating further is not how I want to use those 20 minutes.",
        optionCText: "I record the result as an error and feel mildly annoyed by the inconsistency.",
      },
      {
        questionNumber: 3,
        questionText: "It is a Saturday with no plans. No exams next week. Which of these would you actually choose to spend 3 hours on, honestly?",
        optionAText: "Reading about black holes, the mathematics of quantum mechanics, or how CRISPR edits genes — purely because it is fascinating.",
        optionBText: "Something lighter — gaming, sport, friends — with maybe a brief curiosity-led reading if something interesting appeared.",
        optionCText: "Nothing scientific. I would spend it on creative work, social activities, or entertainment.",
      },
      {
        questionNumber: 4,
        questionText: "A scientist at TIFR earns ₹80,000 per month, works on fundamental physics questions, has academic freedom, but will never build a product used by millions or earn ₹1 crore per year. How do you genuinely feel about this trade-off?",
        optionAText: "That actually sounds like a good life — the work itself is the reward. Money beyond a certain level is not what drives me.",
        optionBText: "I respect it but would want more financial security. Research as a career would require convincing myself.",
        optionCText: "That trade-off does not work for me. I want both financial independence and visible, tangible output.",
      },
      {
        questionNumber: 5,
        questionText: "A younger cousin asks: 'If the universe started with the Big Bang, what was there before it?' You have an hour before dinner. What actually happens?",
        optionAText: "I sit down and try to explain it properly — and realise I want to understand it better myself, so I look it up too.",
        optionBText: "I give a simple answer and change the subject. Deep scientific questions do not naturally occupy my thoughts.",
        optionCText: "I say 'nobody knows' and end the conversation. These abstract questions do not excite me.",
      },
      {
        questionNumber: 6,
        questionText: "A research career means spending 3–4 years on a problem that might yield no usable result. The contribution to human knowledge is real but not visible in a product or outcome you can point to. How do you relate to this description?",
        optionAText: "That is what genuine science is — I can see myself in that uncertainty. The question itself is the reward.",
        optionBText: "I could manage it but I would want some tangible output to anchor the effort.",
        optionCText: "That uncertainty is not compatible with how I want to work. I need clearer, shorter feedback loops.",
      },
      {
        questionNumber: 7,
        questionText: "You learn that the Physics Olympiad requires solving problems that no textbook has taught you — problems that require you to construct the method yourself. Your honest reaction to this challenge is:",
        optionAText: "That sounds genuinely exciting — problems without a prescribed method are exactly what I want to practise.",
        optionBText: "I would attempt it for the recognition but find the open-ended nature stressful rather than exciting.",
        optionCText: "I prefer exams where the method is known and the effort is in mastering it, not constructing it.",
      },
      {
        questionNumber: 8,
        questionText: "Imagine all research funding disappears and science degrees become worthless on the job market. Would you still want to understand how the universe, the atom, or the living cell works?",
        optionAText: "Yes — the curiosity is independent of any external structure. I would still read, think, and try to understand.",
        optionBText: "Probably not at this level of intensity — I think some of my interest is shaped by the pathway it leads to.",
        optionCText: "Honestly no — my interest in science is instrumental. Remove the career path and the interest fades.",
      },
    ];

    for (const q of scienceQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: sci.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: sci.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 03 questions seeded (8)");
  }

  // --- Module 04 Questions (Finance, Stock Market & Investment Banking) ---
  const fin = await prisma.assessment.findUnique({ where: { moduleNumber: 4 } });
  if (fin) {
    const financeQuestions = [
      {
        questionNumber: 1,
        questionText: "You read that the Sensex dropped 1,200 points in a single day after a central bank announcement. Your first honest reaction is:",
        optionAText: "I want to understand why — which sectors fell most, what the RBI announced, what it means for different investors.",
        optionBText: "I notice it and move on. Market events are interesting when pointed out but I do not actively track them.",
        optionCText: "I have no strong reaction — financial news does not naturally hold my attention.",
      },
      {
        questionNumber: 2,
        questionText: "Your family is deciding whether to put ₹5 lakhs in a fixed deposit or invest it in mutual funds. They ask your opinion. You have 2 days. What do you actually do?",
        optionAText: "I research the difference — look up current FD rates, compare equity fund historical returns, and give them a reasoned recommendation.",
        optionBText: "I suggest they speak to a financial advisor and give a general opinion without deep research.",
        optionCText: "I feel out of my depth and decline to engage with the financial decision.",
      },
      {
        questionNumber: 3,
        questionText: "A friend shows you a company's financial statement — revenue, expenses, profit margin, debt ratio — and asks: 'Does this company look healthy?' You have no instructions. Your honest reaction is:",
        optionAText: "I find the exercise genuinely interesting — I look at the ratios and start forming a view about the company's financial health.",
        optionBText: "I try to help but feel uncertain. I can follow the numbers when explained but do not independently find meaning in them.",
        optionCText: "I find financial statements dry and confusing. This is not how I naturally engage with information.",
      },
      {
        questionNumber: 4,
        questionText: "You are offered a choice: ₹50,000 guaranteed, or a 60% chance of ₹1 lakh and a 40% chance of nothing. No time pressure, no judgement. What do you choose and why?",
        optionAText: "I calculate the expected value (₹60,000 > ₹50,000) and take the gamble — and I find the reasoning process itself engaging.",
        optionBText: "I take the guaranteed amount. I understand the logic but I am risk-averse by instinct.",
        optionCText: "I struggle to engage with the question analytically. Probability-based decisions feel uncomfortable to me.",
      },
      {
        questionNumber: 5,
        questionText: "You wake up and have 15 free minutes before school. What do you actually look at on your phone, honestly?",
        optionAText: "Business news, market updates, or something economically interesting — I have a genuine habit of tracking financial information.",
        optionBText: "Social media, entertainment, or sports — finance content is not my natural morning pull.",
        optionCText: "Nothing with financial content. I would only read it if assigned.",
      },
      {
        questionNumber: 6,
        questionText: "A young investment banker describes her week: 'Monday I analysed a ₹500 crore acquisition. Wednesday I modelled three merger scenarios. Friday I presented to a board.' How does that description make you feel?",
        optionAText: "That sounds like exactly the kind of high-stakes analytical work I want to build toward.",
        optionBText: "It sounds impressive but I am drawn more to understanding markets and investing than to corporate deal-making.",
        optionCText: "It sounds stressful and not aligned with how I want to spend my professional life.",
      },
      {
        questionNumber: 7,
        questionText: "CA Foundation or CFA Level 1 requires 6–9 months of intensive study of accounting, financial analysis, and economics. Your honest reaction to this commitment is:",
        optionAText: "That sounds like building a real foundation — I am willing to invest that time because the subject matter genuinely interests me.",
        optionBText: "I could do it but it feels like a means to an end, not something I would enjoy studying.",
        optionCText: "That level of commitment to finance-specific study does not feel right for me.",
      },
      {
        questionNumber: 8,
        questionText: "All financial certifications are stripped of their value and finance salaries are equalised with average professions. Would you still want to understand how capital markets work, how companies are valued, and how money flows through economies?",
        optionAText: "Yes — the mechanics of markets and money genuinely fascinate me, independent of any career or financial reward.",
        optionBText: "Possibly — but I suspect my interest is tied to the earning potential more than the subject itself.",
        optionCText: "Honestly no — my interest in finance is entirely instrumental. Remove the reward, remove the interest.",
      },
    ];

    for (const q of financeQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: fin.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: fin.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 04 questions seeded (8)");
  }

  // --- Module 05 Questions (Chartered Accountancy, CS & Corporate Finance) ---
  const ca = await prisma.assessment.findUnique({ where: { moduleNumber: 5 } });
  if (ca) {
    const charteredAccountancyQuestions = [
      {
        questionNumber: 1,
        questionText: "You are given a 15-page profit and loss statement for a company and told to identify three financial inconsistencies within 40 minutes. No instructions. Your honest reaction is:",
        optionAText: "I find the challenge engaging — I start systematically and feel alert, not overwhelmed.",
        optionBText: "I would try but feel uncertain. Detailed numerical analysis under pressure is not my natural mode.",
        optionCText: "I find prolonged numerical analysis draining rather than stimulating.",
      },
      {
        questionNumber: 2,
        questionText: "You read that India has over 1,500 indirect tax notifications under GST. Some seem contradictory. How do you feel about a career that requires mastering and applying rules of this complexity?",
        optionAText: "That complexity is actually interesting — systems with layers of rules have an internal logic I want to understand.",
        optionBText: "I can manage rules and regulations but I would not call it stimulating. It is a means to an end.",
        optionCText: "That level of rule-memorisation is not how I want to spend my professional energy.",
      },
      {
        questionNumber: 3,
        questionText: "A CA describes their day: '7 am to midnight reviewing ledgers, reconciling accounts, and verifying compliance across 200 entries.' How do you honestly feel hearing this?",
        optionAText: "That kind of deep, methodical accuracy is something I can genuinely commit to — precision is satisfying to me.",
        optionBText: "I respect the work but it does not excite me. I could do it but would not look forward to it.",
        optionCText: "That description sounds exhausting. I prefer varied, creative, or people-facing work.",
      },
      {
        questionNumber: 4,
        questionText: "CA Intermediate has a pass rate of approximately 10–15%. Most students take 2–3 attempts. A peer who just failed their second attempt says: 'I am not sure it is worth continuing.' What do you honestly think?",
        optionAText: "I think persistence through repeated difficult exams is part of what creates the credential's value. I can see myself in that journey.",
        optionBText: "I understand both sides. I would continue but I am not sure how I would handle repeated failure.",
        optionCText: "That level of repeated high-stakes failure would significantly affect my ability to continue.",
      },
      {
        questionNumber: 5,
        questionText: "Two cousins have careers. One audits corporate accounts at a Big 4 firm — precise, rule-bound, respected, and well-paid. The other builds marketing campaigns for brands — creative, variable, and highly visible. Which career genuinely pulls you more?",
        optionAText: "The first — precision, rules, and the satisfaction of a correct audit trail genuinely appeal to me.",
        optionBText: "Somewhere in between — I like the stability of finance but want more strategic or people-facing elements.",
        optionCText: "The second, clearly. Creative and variable work is what energises me.",
      },
      {
        questionNumber: 6,
        questionText: "A CA at 35 runs her own practice, works with 12 clients, files returns, conducts audits, and gives corporate financial advice. She earns ₹30–40 LPA and manages her own time. How does this professional portrait feel to you?",
        optionAText: "That sounds like exactly the kind of expert, independent professional life I want to build.",
        optionBText: "It sounds stable and respectable but not especially exciting. I would want more scale or impact.",
        optionCText: "That portrait does not resonate with what I want my career to look like.",
      },
      {
        questionNumber: 7,
        questionText: "It is March 31st. A CA's most stressful period — multiple client deadlines, tax filings, no sleep. A colleague says: 'This is the job.' How do you honestly feel about a career with a recurring high-pressure season?",
        optionAText: "I can manage seasonal pressure. If the work is meaningful and well-compensated, I can commit to the difficult periods.",
        optionBText: "I would cope, but I prefer more even-keeled work. Sustained high pressure affects me significantly.",
        optionCText: "A career with recurring crisis periods is not compatible with how I want to live and work.",
      },
      {
        questionNumber: 8,
        questionText: "If all professional certifications lost their value tomorrow and accountants earned average wages, would you still want to understand how companies manage money, how taxes are structured, and how financial compliance works?",
        optionAText: "Yes — the mechanics of corporate finance and compliance genuinely fascinate me beyond the career reward.",
        optionBText: "Possibly — but I suspect the credential and salary are more motivating to me than the subject itself.",
        optionCText: "Honestly no. My interest in this field is entirely driven by career outcomes, not the subject matter.",
      },
    ];

    for (const q of charteredAccountancyQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: ca.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: ca.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 05 questions seeded (8)");
  }

  // --- Module 06 Questions (Business Management, Marketing & Entrepreneurship) ---
  const biz = await prisma.assessment.findUnique({ where: { moduleNumber: 6 } });
  if (biz) {
    const businessQuestions = [
      {
        questionNumber: 1,
        questionText: "The school canteen is always crowded at lunch. You notice three things: long queues, popular items that run out early, and a corner with empty space. Without being asked, what goes through your mind?",
        optionAText: "I start thinking about how to reorganise it — pre-orders, different counter layouts, what items to stock more of and when.",
        optionBText: "I notice the problem but assume someone responsible will fix it eventually.",
        optionCText: "I notice it as an inconvenience and move on. Operational problems are not what I naturally analyse.",
      },
      {
        questionNumber: 2,
        questionText: "You need to convince your school committee to allow students to run a small business inside the campus during the annual event. You have 10 minutes with the principal. How do you naturally feel about this task?",
        optionAText: "I feel energised — I think through the strongest arguments, anticipate objections, and enjoy the challenge of persuasion.",
        optionBText: "I prepare carefully but find the social pressure of persuasion stressful.",
        optionCText: "This kind of negotiation and persuasion is not a natural strength or interest for me.",
      },
      {
        questionNumber: 3,
        questionText: "A classmate launches a small tiffin service that fails after 2 weeks — not enough customers. Your honest first reaction is:",
        optionAText: "I want to understand why it failed — what was the product-market fit problem, what could have been done differently?",
        optionBText: "I sympathise with the effort but do not feel pulled to analyse the business failure in depth.",
        optionCText: "I see it as confirmation that starting a business is risky. My interest in entrepreneurship is low.",
      },
      {
        questionNumber: 4,
        questionText: "You are leading a group project. Halfway through, two team members start disagreeing about direction. The project is at risk. What do you honestly do?",
        optionAText: "I step in to mediate — I listen to both sides, find common ground, and redirect the group toward the goal.",
        optionBText: "I try to help but find group conflict draining and avoid taking a strong position.",
        optionCText: "I focus on my own contribution and hope someone else handles the conflict.",
      },
      {
        questionNumber: 5,
        questionText: "You read that a 24-year-old built a ₹10 crore revenue business from a college dormitory in 3 years. Your honest first reaction is:",
        optionAText: "That is genuinely exciting — I want to know how they found the problem, built the product, and acquired customers.",
        optionBText: "I am impressed but it seems like an exceptional case. I would not think about it much beyond the headline.",
        optionCText: "I see it as a high-risk exception. The idea of building a business from scratch does not particularly excite me.",
      },
      {
        questionNumber: 6,
        questionText: "An MBA at IIM Ahmedabad costs ₹25 lakhs and 2 years. You graduate at 25, potentially earning ₹30+ LPA. But you must work at someone else's company first. A friend says: 'I would rather start something directly.' Which view honestly resonates more with you?",
        optionAText: "The MBA route — I want deep business education, structured networks, and corporate leadership experience before building anything.",
        optionBText: "I am genuinely torn — both paths have merit and I have not decided which suits me better.",
        optionCText: "The direct path — waiting until 25 to start feels too long. I want to build something now.",
      },
      {
        questionNumber: 7,
        questionText: "You pitch a business idea to 10 people. 9 say no or give negative feedback. One expresses interest. Your honest internal state after the 9th rejection is:",
        optionAText: "Mildly frustrated but still focused — one interested person is a start and I want to understand the objections to refine the pitch.",
        optionBText: "Significantly discouraged. Repeated rejection affects my confidence and motivation to continue.",
        optionCText: "This level of rejection would make me question whether the path is right. I prefer work with more reliable feedback loops.",
      },
      {
        questionNumber: 8,
        questionText: "All business degrees lose their value overnight and entrepreneurship stops being glamorous. Would you still want to build products, lead teams, solve market problems, and grow organisations?",
        optionAText: "Yes — the building process itself is what excites me, independent of the status or credential attached to it.",
        optionBText: "Possibly — but I am not certain how much of my interest is the real thing versus the attraction of the entrepreneur identity.",
        optionCText: "Honestly no. Remove the status and reward and I would choose a different path.",
      },
    ];

    for (const q of businessQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: biz.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: biz.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 06 questions seeded (8)");
  }

  // --- Module 07 Questions (Law, Legal Services & Policy) ---
  const law = await prisma.assessment.findUnique({ where: { moduleNumber: 7 } });
  if (law) {
    const lawQuestions = [
      {
        questionNumber: 1,
        questionText: "Two relatives are debating a news story. One is louder and more confident. The other has the stronger argument but is less assertive. What do you honestly do?",
        optionAText: "I step in — I find myself naturally wanting to support the stronger argument, even against the more forceful voice.",
        optionBText: "I notice the dynamic but stay out of it. Arguments in social settings make me uncomfortable.",
        optionCText: "I eat and wait for the topic to change. Social debates do not engage me.",
      },
      {
        questionNumber: 2,
        questionText: "You receive a 4-page rental agreement for a holiday booking. Others sign without reading. Your honest behaviour is:",
        optionAText: "I read it — and I often find clauses that others missed. Detail in documents actually interests me.",
        optionBText: "I skim the important sections but do not read carefully. Detailed documents are not my natural strength.",
        optionCText: "I sign without reading. Dense documents feel like unnecessary friction.",
      },
      {
        questionNumber: 3,
        questionText: "You witness a shopkeeper overcharging an elderly customer who does not realise it. You are with friends. Your honest reaction is:",
        optionAText: "I say something — I feel genuinely disturbed by the injustice and an internal drive to correct it.",
        optionBText: "I feel uncomfortable but do not intervene — I am not sure it is my place.",
        optionCText: "I notice it, feel briefly bothered, and move on. Intervening in strangers' disputes is not my instinct.",
      },
      {
        questionNumber: 4,
        questionText: "A case study asks you to argue in favour of a position you personally disagree with. Your honest reaction is:",
        optionAText: "I find it genuinely interesting — constructing the strongest possible argument for a position I disagree with is an intellectual exercise I enjoy.",
        optionBText: "I can do it but find it uncomfortable. I prefer arguing for positions I believe in.",
        optionCText: "I find this exercise frustrating. I do not see the value in arguing against my own views.",
      },
      {
        questionNumber: 5,
        questionText: "A well-known law: 'No person shall be deprived of their life or personal liberty except according to procedure established by law.' A professor asks: 'What does this guarantee — and what does it not?' You have 10 minutes to answer. Your honest reaction is:",
        optionAText: "I feel genuinely engaged — the gap between what the law says and what it protects is exactly the kind of puzzle I want to think through.",
        optionBText: "I can analyse it but feel uncertain. Legal language and its interpretation is not my natural mode of thinking.",
        optionCText: "I find the question abstract and difficult to engage with. This kind of analysis does not come naturally.",
      },
      {
        questionNumber: 6,
        questionText: "A junior advocate earns ₹20,000–40,000 per month for the first 3–5 years, working 12-hour days in courts. Senior advocates with 15+ years experience can earn ₹5–10 crore per year. Your honest reaction to this arc is:",
        optionAText: "That long-term arc makes sense to me — I can sustain difficult early years if I can see the trajectory clearly.",
        optionBText: "The early years concern me significantly. I am not sure I can sustain that level of difficulty without stronger financial return.",
        optionCText: "That timeline does not work for me. I want financial stability within 3–4 years of finishing my degree.",
      },
      {
        questionNumber: 7,
        questionText: "A law degree requires reading 200–300 pages per week — case law, statutes, commentary, and judgment analysis. Your honest relationship with sustained, dense reading is:",
        optionAText: "Reading deeply and analytically is something I genuinely enjoy. Volume does not intimidate me.",
        optionBText: "I can read at that volume but it takes significant effort. I do not naturally enjoy reading-heavy workloads.",
        optionCText: "That reading volume sounds exhausting. I prefer to learn through doing, discussing, or building rather than reading.",
      },
      {
        questionNumber: 8,
        questionText: "Courts are closed, all law firms have shut down, and legal fees are capped at minimum wage. Would you still want to understand how laws are made, how rights are protected, how arguments are constructed, and how justice is administered?",
        optionAText: "Yes — the intellectual and civic dimensions of law genuinely fascinate me, independent of any career reward.",
        optionBText: "Possibly — but I am not certain how much of my interest is in the idea of law versus the reality of practising it.",
        optionCText: "Honestly no. My interest in law is driven by the career pathway and reputation, not the subject itself.",
      },
    ];

    for (const q of lawQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: law.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: law.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 07 questions seeded (8)");
  }

  // --- Module 08 Questions (Civil Services, Defence & Government) ---
  const civ = await prisma.assessment.findUnique({ where: { moduleNumber: 8 } });
  if (civ) {
    const civilServicesQuestions = [
      {
        questionNumber: 1,
        questionText: "A collector in a rural district spends Monday inspecting a broken government water supply, Tuesday reviewing crop compensation records for 200 farmers, and Wednesday mediating a land dispute. No media coverage, no applause. How does this day feel to you?",
        optionAText: "That is genuinely meaningful work — the absence of glamour does not reduce the value of it. I find this kind of systemic impact compelling.",
        optionBText: "I respect the work but am drawn to roles with more visible outcomes or public recognition.",
        optionCText: "That combination of administrative complexity and invisible impact does not appeal to me as a career.",
      },
      {
        questionNumber: 2,
        questionText: "UPSC Civil Services has a success rate of less than 0.2%. Most successful candidates attempt 3–5 times, studying full-time for 2–4 years. A friend says: 'That sacrifice for uncertainty is irrational.' Your honest view is:",
        optionAText: "I disagree — for the right person, the work of a civil servant justifies the preparation. I can see that journey for myself.",
        optionBText: "I understand both positions. The odds concern me but the goal is compelling enough that I would consider it.",
        optionCText: "My friend has a point. That level of preparation for uncertain outcomes does not align with how I want to manage my early career.",
      },
      {
        questionNumber: 3,
        questionText: "You are the District Collector. A politically connected contractor has done substandard road work. The road will fail in 3 months if not redone. Taking action will create significant political friction. What do you honestly do?",
        optionAText: "I take the action — the road and the public interest come first. I am comfortable with institutional friction for the right reason.",
        optionBText: "I would try to find a middle path — document the issue formally while avoiding direct confrontation.",
        optionCText: "I would flag it to superiors and let them decide. Direct confrontation with political pressure is not something I feel equipped for.",
      },
      {
        questionNumber: 4,
        questionText: "A young IPS officer describes her work: 'I have been posted to a Naxalite-affected district. The work is dangerous, the conditions are difficult, and the salary is modest. But the impact is real.' Your honest reaction is:",
        optionAText: "That description is compelling — national service in difficult conditions, with real impact, is exactly what attracts me to this path.",
        optionBText: "I admire her commitment but difficult posting conditions would significantly affect my willingness to join.",
        optionCText: "Difficult postings and physical risk are not compatible with the career life I want to build.",
      },
      {
        questionNumber: 5,
        questionText: "UPSC General Studies requires knowing ancient Indian history, international relations, environmental policy, economic theory, and current affairs — simultaneously. Your honest reaction to this breadth of required knowledge is:",
        optionAText: "That breadth is actually exciting — I love connecting ideas across disciplines and general knowledge energises me.",
        optionBText: "I can study across subjects when required but do not find interdisciplinary breadth naturally motivating.",
        optionCText: "I prefer deep specialisation in one area. Breadth across all these domains feels like shallow knowledge everywhere.",
      },
      {
        questionNumber: 6,
        questionText: "An IAS officer earns ₹56,000–2.5 lakh per month depending on grade. A similarly qualified engineer earns ₹20–80 LPA in the private sector. The IAS officer has significant power, social impact, and non-monetary benefits. Your honest assessment of this trade-off is:",
        optionAText: "The power, impact, and public service dimension outweigh the salary differential for me. I am genuinely comfortable with this trade-off.",
        optionBText: "I respect the trade-off but am honestly more motivated by financial outcome than I would like to admit.",
        optionCText: "The salary differential is too significant for me. I cannot make that trade-off in good conscience.",
      },
      {
        questionNumber: 7,
        questionText: "An NDA officer at 21 is responsible for 30 soldiers, operating in extreme terrain, with high physical and leadership demands. He earns ₹56,100 base plus full benefits. Your honest reaction to this career at 21 is:",
        optionAText: "That sounds like exactly what I want — physical challenge, leadership responsibility, and national service from the start.",
        optionBText: "The leadership and service elements attract me but the physical demands and posting uncertainty concern me.",
        optionCText: "Defence is not my calling. The physical intensity, discipline structure, and posting unpredictability do not suit how I want to live.",
      },
      {
        questionNumber: 8,
        questionText: "Civil service salaries are cut to minimum wage, postings are removed, and the role loses all status. Would you still want to serve as the mechanism through which government policy reaches citizens — allocating resources, resolving disputes, and building public systems?",
        optionAText: "Yes — the work itself is what calls me. The service and impact are intrinsically motivating.",
        optionBText: "Possibly — but I honestly recognise that the status and power are significant motivators, not just the service.",
        optionCText: "No — my interest in civil services is substantially driven by the status and security it provides.",
      },
    ];

    for (const q of civilServicesQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: civ.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: civ.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 08 questions seeded (8)");
  }

  // --- Module 09 Questions (Psychology, Counselling & Mental Health) ---
  const psy = await prisma.assessment.findUnique({ where: { moduleNumber: 9 } });
  if (psy) {
    const psychologyQuestions = [
      {
        questionNumber: 1,
        questionText: "You are at a party. Across the room, two people are having a conversation. One looks increasingly uncomfortable. No one else notices. What do you actually do?",
        optionAText: "I notice it clearly and find myself analysing the body language, wondering what is happening between them.",
        optionBText: "I notice briefly and look away. Other people's emotional dynamics are not something I actively analyse.",
        optionCText: "I do not notice these kinds of subtle social signals. I engage with what is directly in front of me.",
      },
      {
        questionNumber: 2,
        questionText: "A close friend goes through a difficult period — withdrawn, unlike themselves, but not asking for help. Over the next month, what do you honestly do?",
        optionAText: "I stay present and available — I check in consistently, create space without forcing, and find it natural to hold someone else's difficulty.",
        optionBText: "I try to help but find sustained emotional availability draining. I support them but need to withdraw periodically.",
        optionCText: "I feel unsure how to help and end up giving space by default. Sustained emotional support is not my natural strength.",
      },
      {
        questionNumber: 3,
        questionText: "A family member reacts with intense anger every time someone is even slightly late. Everyone else accepts it. Your honest reaction to this pattern is:",
        optionAText: "I find myself wondering why — what early experience or belief creates this response? The psychology behind the behaviour genuinely interests me.",
        optionBText: "I notice it as unusual but do not feel pulled to understand its deeper origin.",
        optionCText: "I just adapt my behaviour to avoid triggering the reaction. I do not analyse people's patterns.",
      },
      {
        questionNumber: 4,
        questionText: "A counsellor friend describes a session where a client cried for 40 minutes and left without resolution — and that was the right outcome for that day. Your honest reaction to this description is:",
        optionAText: "I understand it — sometimes bearing witness to pain without trying to fix it is the most important thing a counsellor can offer.",
        optionBText: "I feel uncomfortable with the lack of resolution. I want to help people feel better, not just sit with them.",
        optionCText: "That kind of emotional exposure sounds exhausting to me. I would struggle to sustain that professionally.",
      },
      {
        questionNumber: 5,
        questionText: "A psychology paper asks: 'Why do people stay in relationships that harm them?' You have a free hour. What do you honestly do with this question?",
        optionAText: "I find it genuinely compelling — I want to read about attachment theory, trauma bonding, and cognitive dissonance as applied to relationships.",
        optionBText: "I find it interesting but would not choose to spend a free hour reading about it.",
        optionCText: "I find the question sad rather than intellectually interesting. It does not pull me to investigate further.",
      },
      {
        questionNumber: 6,
        questionText: "A clinical psychologist earns ₹4–8 LPA in the first 3 years, completes 5 years of education, then RCI registration. Senior clinical psychologists earn ₹25–40 LPA. Your honest reaction to this timeline is:",
        optionAText: "I can sustain this — the work itself is what motivates me and I understand that clinical expertise takes time to build.",
        optionBText: "The timeline concerns me but I could manage it if the work feels meaningful.",
        optionCText: "That salary trajectory and timeline do not work with my financial and professional goals.",
      },
      {
        questionNumber: 7,
        questionText: "A supervisor in your psychology internship says: 'The most effective psychologists have done their own inner work.' This implies years of self-reflection, therapy, and confronting your own psychological patterns. Your honest reaction is:",
        optionAText: "I find that requirement honestly exciting — I am genuinely interested in understanding my own mind and I see this as part of the professional journey.",
        optionBText: "I understand it intellectually but feel uncertain about how comfortable I am with that level of self-examination.",
        optionCText: "I prefer to maintain professional distance from my personal psychology. This requirement makes me less interested in the path.",
      },
      {
        questionNumber: 8,
        questionText: "Mental health is fully funded by the government, all psychologists earn equal wages, and there is no professional prestige attached. Would you still want to understand why people think, feel, and behave the way they do — and help them change?",
        optionAText: "Yes — human psychology genuinely fascinates me and I would find the work meaningful regardless of financial outcome.",
        optionBText: "Possibly — but I am not certain my interest would remain at this level without the career structure around it.",
        optionCText: "Honestly no. My interest in psychology is intellectual but not strong enough to sustain a career without the external incentives.",
      },
    ];

    for (const q of psychologyQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: psy.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: psy.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 09 questions seeded (8)");
  }

  // --- Module 10 Questions (Design, Animation, Gaming & Creative Arts) ---
  const des = await prisma.assessment.findUnique({ where: { moduleNumber: 10 } });
  if (des) {
    const designQuestions = [
      {
        questionNumber: 1,
        questionText: "You use an app every day but find one interaction confusing — a button in the wrong place, a flow that makes you think twice. What do you honestly do?",
        optionAText: "I find myself mentally redesigning it — thinking about where the button should be and why the current design fails.",
        optionBText: "I adapt to the friction and move on. Interaction design is not something I naturally analyse.",
        optionCText: "I feel mildly annoyed and forget about it. I do not think about design problems unless directly asked.",
      },
      {
        questionNumber: 2,
        questionText: "You are given a blank sheet of paper and 30 free minutes. No instructions. What do you actually do?",
        optionAText: "I draw, sketch, or design something — the blank page is an invitation, not a pressure.",
        optionBText: "I might write something or doodle absentmindedly but do not feel particularly driven to create visually.",
        optionCText: "I feel uncertain what to do with it. Unstructured creative time does not come naturally.",
      },
      {
        questionNumber: 3,
        questionText: "You are redecorating a room and choosing between three colour palettes. You spend an hour on this decision. Your honest experience of that hour is:",
        optionAText: "I find it genuinely engaging — I am thinking about light, mood, contrast, and how each palette will feel at different times of day.",
        optionBText: "I can make the decision but it does not absorb me. I want it done, not perfect.",
        optionCText: "I find aesthetic decisions frustrating. I prefer someone to just tell me the right answer.",
      },
      {
        questionNumber: 4,
        questionText: "You spend a week on a design project. A mentor reviews it and identifies 8 things that need to change. Your honest first reaction is:",
        optionAText: "I want to understand each point — I see the critique as the most useful part of the process, not a judgement of my worth.",
        optionBText: "I feel deflated but recover. I can use the feedback but find substantial critique demotivating.",
        optionCText: "I find extensive critique of my creative work significantly discouraging. I prefer work with clearer right/wrong answers.",
      },
      {
        questionNumber: 5,
        questionText: "You play a game where the world design, art direction, and character animation are exceptional. You notice how much craft went into it. What goes through your mind?",
        optionAText: "I find myself wondering how it was made — what tools, what process, what decisions went into each visual element.",
        optionBText: "I enjoy the experience but do not think much about the production process behind it.",
        optionCText: "I enjoy games as entertainment. The creative production process does not particularly interest me.",
      },
      {
        questionNumber: 6,
        questionText: "A working animator tells you: 'My first 3 years were financially difficult — freelance work, inconsistent income, building a portfolio. Now I earn ₹18 LPA and find the work deeply satisfying.' Your honest reaction to this career arc is:",
        optionAText: "That arc makes sense for creative careers and I can see myself sustaining it — the work quality matters more to me than early financial stability.",
        optionBText: "I find the early instability concerning but could tolerate it if the destination is meaningful.",
        optionCText: "Financial instability in the early career is not something I can accept. I need a more predictable income trajectory.",
      },
      {
        questionNumber: 7,
        questionText: "AI tools can now generate images, animations, and game assets. A peer says: 'Design is a dying career.' Your honest reaction is:",
        optionAText: "I disagree — AI changes the tools but human creative direction, conceptual thinking, and aesthetic judgement are not automated. I am more interested in design than ever.",
        optionBText: "I am concerned. I find the argument partially convincing and it has made me less certain about this path.",
        optionCText: "The argument is convincing. It confirms that a more stable, technical career is a better bet.",
      },
      {
        questionNumber: 8,
        questionText: "All design degrees lose their market value and creative work pays only subsistence wages. Would you still create — design, animate, draw, build worlds — because the act of creating itself is intrinsically meaningful to you?",
        optionAText: "Yes — creating is how I think and how I experience satisfaction. Remove the career and I would still make things.",
        optionBText: "Probably not at this level of commitment. Some of my interest is in making a career from creativity, not just creating.",
        optionCText: "Honestly no. I enjoy creative work but not enough to pursue it without strong financial and career incentives.",
      },
    ];

    for (const q of designQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: des.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: des.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 10 questions seeded (8)");
  }

  // --- Module 11 Questions (Media, Journalism, Content Creation & Digital Media) ---
  const media = await prisma.assessment.findUnique({ where: { moduleNumber: 11 } });
  if (media) {
    const mediaQuestions = [
      {
        questionNumber: 1,
        questionText: "You notice that a story being widely shared on your family WhatsApp group is factually incorrect. It has over 200 forwards. What do you honestly do?",
        optionAText: "I fact-check it, find the correct information, and share a correction — even if some family members push back.",
        optionBText: "I note that it is likely false but stay silent. Correcting adults in group chats feels uncomfortable.",
        optionCText: "I ignore it. Correcting misinformation in social groups is not something I feel driven to do.",
      },
      {
        questionNumber: 2,
        questionText: "You read that a small town's only government hospital was quietly shut down due to a bureaucratic rule change affecting 40,000 people. No major outlet covered it. What goes through your mind?",
        optionAText: "I find this genuinely compelling — someone needs to report this and I feel a pull to understand it and bring it to attention.",
        optionBText: "I find it concerning but it does not create a strong personal drive in me to do anything about it.",
        optionCText: "I note it as unfortunate and move on. I do not feel a vocational connection to stories like this.",
      },
      {
        questionNumber: 3,
        questionText: "Your school is holding an event. Someone needs to present a 5-minute video report about it — speaking to camera, editing the footage, writing the script. What is your honest reaction to being asked?",
        optionAText: "I want to do it — I find the idea of capturing, structuring, and presenting a story to an audience genuinely exciting.",
        optionBText: "I would do it if asked but would not volunteer. Public-facing creative tasks are not my natural preference.",
        optionCText: "I would prefer not to. Being on camera or producing content is not something I seek out.",
      },
      {
        questionNumber: 4,
        questionText: "A classmate who started a YouTube channel 8 months ago now has 12,000 subscribers. No income yet, lots of time invested. Your honest reaction is:",
        optionAText: "I find myself thinking about what they are doing right — content strategy, audience building, consistency. I want to understand the process.",
        optionBText: "I am impressed by their consistency but the effort-to-return ratio concerns me. I would need to see income before committing.",
        optionCText: "I see it as a hobby, not a career. I would not invest 8 months in content creation without financial return.",
      },
      {
        questionNumber: 5,
        questionText: "A journalism professor returns your article with 15 editorial comments — structure, sourcing, clarity, and tone all criticised. Your honest reaction is:",
        optionAText: "I read every comment carefully and feel energised rather than deflated — good editing makes the work better and I want to learn.",
        optionBText: "I feel discouraged initially but recover and revise. Significant criticism is difficult but manageable.",
        optionCText: "Extensive critique of my writing significantly affects my confidence and motivation to continue.",
      },
      {
        questionNumber: 6,
        questionText: "Media careers are volatile — channels close, publications shut down, content formats change. A senior journalist says: 'You have to love the work to sustain this field.' Your honest reaction to this reality is:",
        optionAText: "That is how I feel about most careers I find meaningful — the volatility is the price and the work is the reward.",
        optionBText: "I admire the commitment but I need more stability than this career promises.",
        optionCText: "That degree of career volatility is not something I can accept. I need a more predictable professional path.",
      },
      {
        questionNumber: 7,
        questionText: "You are writing a story for three different audiences: a 12-year-old student, a PhD economist, and a rural farmer. Same topic, three versions. Your honest reaction to this task is:",
        optionAText: "I find it genuinely interesting — adapting the same information for different minds is exactly what good communication requires.",
        optionBText: "I can do it but find the multiple-version requirement tedious rather than creative.",
        optionCText: "I would struggle with this. Writing in multiple registers is not a natural skill for me.",
      },
      {
        questionNumber: 8,
        questionText: "All media platforms shut down, journalism salaries drop to zero, and there is no audience for content creation. Would you still want to investigate, report, create, and tell stories?",
        optionAText: "Yes — storytelling and finding truth in complex situations is how I naturally make sense of the world.",
        optionBText: "Possibly — but I recognise that audience validation and career reward are significant motivators for me.",
        optionCText: "Honestly no. My interest in media is substantially about platform, audience, and identity rather than the act of storytelling itself.",
      },
    ];

    for (const q of mediaQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: media.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: media.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 11 questions seeded (8)");
  }

  // --- Module 12 Questions (Green Energy, Sustainability & Environmental Careers) ---
  const green = await prisma.assessment.findUnique({ where: { moduleNumber: 12 } });
  if (green) {
    const greenEnergyQuestions = [
      {
        questionNumber: 1,
        questionText: "Your city issues an air quality warning. AQI is at hazardous levels. Others treat it as background noise. Your honest reaction is:",
        optionAText: "I want to understand what caused the spike — industrial activity, seasonal factors, traffic patterns — and whether there are systemic interventions.",
        optionBText: "I take the precaution recommended and move on. Environmental issues interest me generally but not technically.",
        optionCText: "I note it and ignore it. Air quality data and environmental analysis are not things I actively think about.",
      },
      {
        questionNumber: 2,
        questionText: "A neighbour installs solar panels on their rooftop. You have a free afternoon. What do you actually do with this observation?",
        optionAText: "I go over and ask about the system — the capacity, the payback period, how it connects to the grid. The technology and economics both interest me.",
        optionBText: "I think it is a good idea but do not feel pulled to learn more about how it works.",
        optionCText: "I notice it and move on. Renewable energy technology is not something I naturally investigate.",
      },
      {
        questionNumber: 3,
        questionText: "A new industrial corridor will create 50,000 jobs and destroy a significant wetland ecosystem. There is no perfect answer. A group asks for your analysis. Your honest reaction is:",
        optionAText: "I find this kind of complex trade-off genuinely compelling — I want to analyse the ecological value, the economic impact, and the policy options.",
        optionBText: "I find it interesting but would struggle to hold both sides without defaulting to one value system.",
        optionCText: "I find this kind of ambiguous, multi-variable problem frustrating rather than engaging.",
      },
      {
        questionNumber: 4,
        questionText: "Most environmental careers involve working on problems that will take 20–30 years to show results — and you may not see the outcome within your career. A colleague says: 'You are planting trees under whose shade you will not sit.' Your honest reaction is:",
        optionAText: "That is actually a powerful framing — working on intergenerational problems is exactly the kind of significance I want my career to have.",
        optionBText: "I find it philosophically compelling but would need shorter feedback loops to stay motivated professionally.",
        optionCText: "I need to see the results of my work in my own career timeline. Intergenerational impact does not sustain me professionally.",
      },
      {
        questionNumber: 5,
        questionText: "An ESG analyst spends a day reviewing 80 pages of a company's environmental disclosure report, cross-referencing with satellite imagery of their industrial sites, and writing a 10-page risk assessment. Your honest reaction to this description of a day's work is:",
        optionAText: "That sounds like genuinely interesting analytical work — combining environmental data with corporate analysis is exactly the kind of interdisciplinary work I find compelling.",
        optionBText: "I can do that kind of work but it does not particularly excite me. I prefer more people-facing or creative roles.",
        optionCText: "That sounds like a tedious day. I prefer work with more visible, direct impact.",
      },
      {
        questionNumber: 6,
        questionText: "A climate scientist says: 'Technology alone will not solve the climate crisis. Behaviour change at scale is equally important.' Which part of this challenge honestly interests you more?",
        optionAText: "Both equally — I am genuinely interested in both the engineering solutions (solar, battery, hydrogen) and the social science of why people do or do not change behaviour.",
        optionBText: "The technology side — I find the social science of behaviour change less compelling than the engineering solutions.",
        optionCText: "Neither pulls me strongly. Environmental work is important but not something I find personally compelling as a career.",
      },
      {
        questionNumber: 7,
        questionText: "Andhra Pradesh aims to be a 100% renewable energy state by 2030. Achieving this requires engineers, policy analysts, project finance experts, and community managers. You are offered a role in this programme at ₹6 LPA to start. Your honest reaction is:",
        optionAText: "That sounds like exactly the right kind of early career role — working on a real, large-scale transition with clear impact and learning.",
        optionBText: "I find the mission compelling but ₹6 LPA starting salary concerns me given the commitment involved.",
        optionCText: "The salary and the specialised nature of the role are both concerns. I would prefer a more transferable first job.",
      },
      {
        questionNumber: 8,
        questionText: "All green energy jobs are eliminated, ESG investing is abandoned, and environmental careers pay nothing. Would you still want to understand how ecosystems function, how energy systems can be redesigned, and how human activity affects the planet?",
        optionAText: "Yes — the environment and energy systems genuinely fascinate me and I would engage with these questions for their own sake.",
        optionBText: "Possibly — but I recognise that the growing career opportunity is a significant part of my interest in sustainability.",
        optionCText: "Honestly no. My interest in sustainability is driven by its career growth prospects, not intrinsic fascination.",
      },
    ];

    for (const q of greenEnergyQuestions) {
      await prisma.question.upsert({
        where: {
          assessmentId_questionNumber: {
            assessmentId: green.id,
            questionNumber: q.questionNumber,
          },
        },
        update: q,
        create: {
          assessmentId: green.id,
          ...q,
        },
      });
    }
    console.log("✅ Module 12 questions seeded (8)");
  }

  // --- Reports for Module 01 (Engineering, Technology & AI) ---
  if (eng) {
    const mod01Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Engineering Fit — Strong Fit",
        description: "Your responses point to genuine curiosity and problem-solving orientation — not performed interest. Choose PCM with confidence. Start Python today: 30 minutes a day. Register for JEE or AP/TS EAMCET coaching this month.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts 1,400+ tech companies including Microsoft, Google, Amazon, and Apple engineering centres. IIT Hyderabad, IIIT Hyderabad, and NIT Warangal have outstanding placement records. AP's semiconductor parks and Vizag's IT corridor are creating new regional opportunities through 2030.",
        careerPaths: JSON.stringify([{"role": "Software Engineer (Product Companies)", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹25–80+ LPA", "qualification": "B.Tech CSE/IT from IIT/NIT/IIIT + DSA + System Design"}, {"role": "AI/ML Engineer", "entrySalary": "₹8–20 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "B.Tech + ML specialization + Python/TensorFlow"}, {"role": "VLSI/Chip Design Engineer", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Tech ECE + VLSI specialization + Verilog/VHDL"}, {"role": "Data Scientist", "entrySalary": "₹8–18 LPA", "seniorSalary": "₹25–60 LPA", "qualification": "B.Tech + Statistics + Python/R + ML"}, {"role": "Robotics Engineer", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "B.Tech Mechanical/ECE + ROS + embedded systems"}, {"role": "ISRO/DRDO Scientist", "entrySalary": "₹8–12 LPA", "seniorSalary": "₹18–30 LPA", "qualification": "B.Tech/M.Tech + GATE + Interview"}, {"role": "Civil/Structural Engineer", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Tech Civil + site experience + PE license"}, {"role": "Cloud/DevOps Engineer", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Tech + AWS/Azure certification + Linux"}]),
        topColleges: JSON.stringify([{"name": "IIT Hyderabad", "location": "Sangareddy, Telangana", "entrance": "JEE Advanced", "package": "₹18–30 LPA"}, {"name": "IIIT Hyderabad", "location": "Gachibowli, Hyderabad", "entrance": "JEE Main / IIIT-H own test", "package": "₹20–45 LPA"}, {"name": "NIT Warangal", "location": "Warangal, Telangana", "entrance": "JEE Main", "package": "₹12–25 LPA"}, {"name": "BITS Pilani Hyderabad", "location": "Jawahar Nagar, Hyderabad", "entrance": "BITSAT", "package": "₹12–25 LPA"}, {"name": "JNTU Hyderabad", "location": "Kukatpally, Hyderabad", "entrance": "TS EAMCET / AP EAPCET", "package": "₹4–12 LPA"}, {"name": "Andhra University", "location": "Visakhapatnam, AP", "entrance": "AP EAPCET", "package": "₹4–10 LPA"}, {"name": "VIT-AP University", "location": "Amaravati, AP", "entrance": "VITEEE", "package": "₹6–15 LPA"}, {"name": "SRM University AP", "location": "Guntur, AP", "entrance": "SRMJEEE", "package": "₹6–12 LPA"}, {"name": "GITAM University", "location": "Visakhapatnam, AP", "entrance": "GITAM GAT", "package": "₹4–10 LPA"}, {"name": "KL University", "location": "Guntur, AP", "entrance": "KLEEE / AP EAPCET", "package": "₹4–10 LPA"}]),
        thirtyDayTest: "Week 1: Attempt 3 JEE-style Physics problems (freely available on Mathongo or PW). Notice: did you enjoy the process of solving, or just want it to be over? Try writing 10 lines of Python code (use repl.it).\\n\\nWeek 2: Watch 3 engineering videos — Stuff Made Here, Mark Rober, or Veritasium. Did you voluntarily watch more? Build a simple LED circuit or code a basic calculator.\\n\\nWeek 3: Visit an engineering college campus or attend an open day. Talk to 2 current students. Ask: What surprised you about engineering?\\n\\nWeek 4: Spend 2 hours on a mini project — a small Python app, an Arduino experiment, or a Physics simulation. Notice: did you lose track of time (good sign) or watch the clock?\\n\\nJudgement: If you voluntarily kept solving, coding, and building beyond the minimum — engineering is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "JEE Main", "details": "Gateway to 31 NITs, 26 IIITs, and 100+ CFTIs. Tests Physics, Chemistry, Mathematics. Two attempts per year (January + April). Target: 99+ percentile for top NITs. Computer-based test."}, {"exam": "JEE Advanced", "details": "For IIT admission. Only top 2.5 lakh JEE Main qualifiers eligible. Significantly harder than Main — tests conceptual depth, not just speed. Target: AIR < 5000 for core branches at top IITs."}, {"exam": "AP EAPCET / TS EAMCET", "details": "State-level engineering entrance for AP and Telangana colleges. Easier than JEE — strong fallback. Gateway to JNTU, AU, OU, and 400+ engineering colleges."}, {"exam": "BITSAT", "details": "For BITS Pilani (all 4 campuses including Hyderabad). Online speed-based test. 150 questions in 3 hours. Also tests English and Logical Reasoning."}, {"exam": "VITEEE", "details": "For VIT (Vellore + AP campus). Online test. Relatively moderate difficulty. Excellent placements at VIT-AP for CSE branches."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Engineering career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCM (Physics, Chemistry, Mathematics). Participate in competitions and workshops. Connect with professionals in Engineering."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (JEE Main, JEE Advanced, AP/TS EAMCET, BITSAT, VITEEE). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Engineering. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Engineering due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on JEE Main but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Engineering", "description": "Strong global demand for AI/ML engineers, VLSI designers, and software architects. US, EU, Singapore, and the Middle East actively hire Indian engineering graduates. FAANG, semiconductor firms, and space companies like SpaceX are within realistic reach for top B.Tech graduates."}, {"code": "IN", "title": "India Market for Engineering", "description": "India's tech sector is the world's third largest. Hyderabad, Bengaluru, Pune, and Chennai are major hiring hubs. ISRO, DRDO, and the ₹76,000 crore semiconductor mission are creating government-sector engineering demand. Entry: ₹8–15 LPA; senior: ₹30–80 LPA."}, {"code": "AP", "title": "AP & Telangana Engineering Outlook", "description": "Hyderabad hosts 1,400+ tech companies including Microsoft, Google, Amazon, and Apple engineering centres. IIT Hyderabad, IIIT Hyderabad, and NIT Warangal have outstanding placement records. AP's semiconductor parks and Vizag's IT corridor are creating new regional opportunities through 2030."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Engineering Fit — Possible Fit",
        description: "You show potential but your responses suggest some uncertainty. Complete the 30-Day Engineering Test before committing to PCM. Also explore Module 06 (Business) or Module 03 (Pure Sciences) for possible stronger alignment.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts 1,400+ tech companies including Microsoft, Google, Amazon, and Apple engineering centres. IIT Hyderabad, IIIT Hyderabad, and NIT Warangal have outstanding placement records. AP's semiconductor parks and Vizag's IT corridor are creating new regional opportunities through 2030.",
        careerPaths: JSON.stringify([{"role": "Software Engineer (Product Companies)", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹25–80+ LPA", "qualification": "B.Tech CSE/IT from IIT/NIT/IIIT + DSA + System Design"}, {"role": "AI/ML Engineer", "entrySalary": "₹8–20 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "B.Tech + ML specialization + Python/TensorFlow"}, {"role": "VLSI/Chip Design Engineer", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Tech ECE + VLSI specialization + Verilog/VHDL"}, {"role": "Data Scientist", "entrySalary": "₹8–18 LPA", "seniorSalary": "₹25–60 LPA", "qualification": "B.Tech + Statistics + Python/R + ML"}, {"role": "Robotics Engineer", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "B.Tech Mechanical/ECE + ROS + embedded systems"}, {"role": "ISRO/DRDO Scientist", "entrySalary": "₹8–12 LPA", "seniorSalary": "₹18–30 LPA", "qualification": "B.Tech/M.Tech + GATE + Interview"}, {"role": "Civil/Structural Engineer", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Tech Civil + site experience + PE license"}, {"role": "Cloud/DevOps Engineer", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Tech + AWS/Azure certification + Linux"}]),
        topColleges: JSON.stringify([{"name": "IIT Hyderabad", "location": "Sangareddy, Telangana", "entrance": "JEE Advanced", "package": "₹18–30 LPA"}, {"name": "IIIT Hyderabad", "location": "Gachibowli, Hyderabad", "entrance": "JEE Main / IIIT-H own test", "package": "₹20–45 LPA"}, {"name": "NIT Warangal", "location": "Warangal, Telangana", "entrance": "JEE Main", "package": "₹12–25 LPA"}, {"name": "BITS Pilani Hyderabad", "location": "Jawahar Nagar, Hyderabad", "entrance": "BITSAT", "package": "₹12–25 LPA"}, {"name": "JNTU Hyderabad", "location": "Kukatpally, Hyderabad", "entrance": "TS EAMCET / AP EAPCET", "package": "₹4–12 LPA"}, {"name": "Andhra University", "location": "Visakhapatnam, AP", "entrance": "AP EAPCET", "package": "₹4–10 LPA"}, {"name": "VIT-AP University", "location": "Amaravati, AP", "entrance": "VITEEE", "package": "₹6–15 LPA"}, {"name": "SRM University AP", "location": "Guntur, AP", "entrance": "SRMJEEE", "package": "₹6–12 LPA"}, {"name": "GITAM University", "location": "Visakhapatnam, AP", "entrance": "GITAM GAT", "package": "₹4–10 LPA"}, {"name": "KL University", "location": "Guntur, AP", "entrance": "KLEEE / AP EAPCET", "package": "₹4–10 LPA"}]),
        thirtyDayTest: "Week 1: Attempt 3 JEE-style Physics problems (freely available on Mathongo or PW). Notice: did you enjoy the process of solving, or just want it to be over? Try writing 10 lines of Python code (use repl.it).\\n\\nWeek 2: Watch 3 engineering videos — Stuff Made Here, Mark Rober, or Veritasium. Did you voluntarily watch more? Build a simple LED circuit or code a basic calculator.\\n\\nWeek 3: Visit an engineering college campus or attend an open day. Talk to 2 current students. Ask: What surprised you about engineering?\\n\\nWeek 4: Spend 2 hours on a mini project — a small Python app, an Arduino experiment, or a Physics simulation. Notice: did you lose track of time (good sign) or watch the clock?\\n\\nJudgement: If you voluntarily kept solving, coding, and building beyond the minimum — engineering is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "JEE Main", "details": "Gateway to 31 NITs, 26 IIITs, and 100+ CFTIs. Tests Physics, Chemistry, Mathematics. Two attempts per year (January + April). Target: 99+ percentile for top NITs. Computer-based test."}, {"exam": "JEE Advanced", "details": "For IIT admission. Only top 2.5 lakh JEE Main qualifiers eligible. Significantly harder than Main — tests conceptual depth, not just speed. Target: AIR < 5000 for core branches at top IITs."}, {"exam": "AP EAPCET / TS EAMCET", "details": "State-level engineering entrance for AP and Telangana colleges. Easier than JEE — strong fallback. Gateway to JNTU, AU, OU, and 400+ engineering colleges."}, {"exam": "BITSAT", "details": "For BITS Pilani (all 4 campuses including Hyderabad). Online speed-based test. 150 questions in 3 hours. Also tests English and Logical Reasoning."}, {"exam": "VITEEE", "details": "For VIT (Vellore + AP campus). Online test. Relatively moderate difficulty. Excellent placements at VIT-AP for CSE branches."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Engineering career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCM (Physics, Chemistry, Mathematics). Participate in competitions and workshops. Connect with professionals in Engineering."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (JEE Main, JEE Advanced, AP/TS EAMCET, BITSAT, VITEEE). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Engineering. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Engineering due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on JEE Main but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Engineering", "description": "Strong global demand for AI/ML engineers, VLSI designers, and software architects. US, EU, Singapore, and the Middle East actively hire Indian engineering graduates. FAANG, semiconductor firms, and space companies like SpaceX are within realistic reach for top B.Tech graduates."}, {"code": "IN", "title": "India Market for Engineering", "description": "India's tech sector is the world's third largest. Hyderabad, Bengaluru, Pune, and Chennai are major hiring hubs. ISRO, DRDO, and the ₹76,000 crore semiconductor mission are creating government-sector engineering demand. Entry: ₹8–15 LPA; senior: ₹30–80 LPA."}, {"code": "AP", "title": "AP & Telangana Engineering Outlook", "description": "Hyderabad hosts 1,400+ tech companies including Microsoft, Google, Amazon, and Apple engineering centres. IIT Hyderabad, IIIT Hyderabad, and NIT Warangal have outstanding placement records. AP's semiconductor parks and Vizag's IT corridor are creating new regional opportunities through 2030."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Engineering Fit — Explore Others",
        description: "Your honest responses suggest engineering may not be your primary calling — this is important information, not a failure. Modules 02, 04, 07, 09, and 10 may offer careers that align more naturally with how you think.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts 1,400+ tech companies including Microsoft, Google, Amazon, and Apple engineering centres. IIT Hyderabad, IIIT Hyderabad, and NIT Warangal have outstanding placement records. AP's semiconductor parks and Vizag's IT corridor are creating new regional opportunities through 2030.",
        careerPaths: JSON.stringify([{"role": "Software Engineer (Product Companies)", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹25–80+ LPA", "qualification": "B.Tech CSE/IT from IIT/NIT/IIIT + DSA + System Design"}, {"role": "AI/ML Engineer", "entrySalary": "₹8–20 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "B.Tech + ML specialization + Python/TensorFlow"}, {"role": "VLSI/Chip Design Engineer", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Tech ECE + VLSI specialization + Verilog/VHDL"}, {"role": "Data Scientist", "entrySalary": "₹8–18 LPA", "seniorSalary": "₹25–60 LPA", "qualification": "B.Tech + Statistics + Python/R + ML"}, {"role": "Robotics Engineer", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "B.Tech Mechanical/ECE + ROS + embedded systems"}, {"role": "ISRO/DRDO Scientist", "entrySalary": "₹8–12 LPA", "seniorSalary": "₹18–30 LPA", "qualification": "B.Tech/M.Tech + GATE + Interview"}, {"role": "Civil/Structural Engineer", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Tech Civil + site experience + PE license"}, {"role": "Cloud/DevOps Engineer", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Tech + AWS/Azure certification + Linux"}]),
        topColleges: JSON.stringify([{"name": "IIT Hyderabad", "location": "Sangareddy, Telangana", "entrance": "JEE Advanced", "package": "₹18–30 LPA"}, {"name": "IIIT Hyderabad", "location": "Gachibowli, Hyderabad", "entrance": "JEE Main / IIIT-H own test", "package": "₹20–45 LPA"}, {"name": "NIT Warangal", "location": "Warangal, Telangana", "entrance": "JEE Main", "package": "₹12–25 LPA"}, {"name": "BITS Pilani Hyderabad", "location": "Jawahar Nagar, Hyderabad", "entrance": "BITSAT", "package": "₹12–25 LPA"}, {"name": "JNTU Hyderabad", "location": "Kukatpally, Hyderabad", "entrance": "TS EAMCET / AP EAPCET", "package": "₹4–12 LPA"}, {"name": "Andhra University", "location": "Visakhapatnam, AP", "entrance": "AP EAPCET", "package": "₹4–10 LPA"}, {"name": "VIT-AP University", "location": "Amaravati, AP", "entrance": "VITEEE", "package": "₹6–15 LPA"}, {"name": "SRM University AP", "location": "Guntur, AP", "entrance": "SRMJEEE", "package": "₹6–12 LPA"}, {"name": "GITAM University", "location": "Visakhapatnam, AP", "entrance": "GITAM GAT", "package": "₹4–10 LPA"}, {"name": "KL University", "location": "Guntur, AP", "entrance": "KLEEE / AP EAPCET", "package": "₹4–10 LPA"}]),
        thirtyDayTest: "Week 1: Attempt 3 JEE-style Physics problems (freely available on Mathongo or PW). Notice: did you enjoy the process of solving, or just want it to be over? Try writing 10 lines of Python code (use repl.it).\\n\\nWeek 2: Watch 3 engineering videos — Stuff Made Here, Mark Rober, or Veritasium. Did you voluntarily watch more? Build a simple LED circuit or code a basic calculator.\\n\\nWeek 3: Visit an engineering college campus or attend an open day. Talk to 2 current students. Ask: What surprised you about engineering?\\n\\nWeek 4: Spend 2 hours on a mini project — a small Python app, an Arduino experiment, or a Physics simulation. Notice: did you lose track of time (good sign) or watch the clock?\\n\\nJudgement: If you voluntarily kept solving, coding, and building beyond the minimum — engineering is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "JEE Main", "details": "Gateway to 31 NITs, 26 IIITs, and 100+ CFTIs. Tests Physics, Chemistry, Mathematics. Two attempts per year (January + April). Target: 99+ percentile for top NITs. Computer-based test."}, {"exam": "JEE Advanced", "details": "For IIT admission. Only top 2.5 lakh JEE Main qualifiers eligible. Significantly harder than Main — tests conceptual depth, not just speed. Target: AIR < 5000 for core branches at top IITs."}, {"exam": "AP EAPCET / TS EAMCET", "details": "State-level engineering entrance for AP and Telangana colleges. Easier than JEE — strong fallback. Gateway to JNTU, AU, OU, and 400+ engineering colleges."}, {"exam": "BITSAT", "details": "For BITS Pilani (all 4 campuses including Hyderabad). Online speed-based test. 150 questions in 3 hours. Also tests English and Logical Reasoning."}, {"exam": "VITEEE", "details": "For VIT (Vellore + AP campus). Online test. Relatively moderate difficulty. Excellent placements at VIT-AP for CSE branches."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Engineering career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCM (Physics, Chemistry, Mathematics). Participate in competitions and workshops. Connect with professionals in Engineering."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (JEE Main, JEE Advanced, AP/TS EAMCET, BITSAT, VITEEE). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Engineering. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Engineering due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on JEE Main but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Engineering", "description": "Strong global demand for AI/ML engineers, VLSI designers, and software architects. US, EU, Singapore, and the Middle East actively hire Indian engineering graduates. FAANG, semiconductor firms, and space companies like SpaceX are within realistic reach for top B.Tech graduates."}, {"code": "IN", "title": "India Market for Engineering", "description": "India's tech sector is the world's third largest. Hyderabad, Bengaluru, Pune, and Chennai are major hiring hubs. ISRO, DRDO, and the ₹76,000 crore semiconductor mission are creating government-sector engineering demand. Entry: ₹8–15 LPA; senior: ₹30–80 LPA."}, {"code": "AP", "title": "AP & Telangana Engineering Outlook", "description": "Hyderabad hosts 1,400+ tech companies including Microsoft, Google, Amazon, and Apple engineering centres. IIT Hyderabad, IIIT Hyderabad, and NIT Warangal have outstanding placement records. AP's semiconductor parks and Vizag's IT corridor are creating new regional opportunities through 2030."}]),
      },
    ];

    for (const r of mod01Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: eng.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: eng.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 01 reports seeded (3 tiers)");
  }

  // --- Reports for Module 02 (Medicine, Healthcare & Biotechnology) ---
  if (med) {
    const mod02Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Medicine Fit — Strong Fit",
        description: "Your empathy, biological curiosity, and emotional resilience align strongly with a medical career. Take PCB in Class 11 with confidence. Begin NEET preparation with a structured coaching plan immediately.\\n\\nRegional Outlook (AP & Telangana): Hyderabad is a global pharma and biotech hub — Dr. Reddy's, Aurobindo, Hetero, and Biological E are headquartered here. AIIMS Mangalagiri is the newest premium medical institution in AP. Telemedicine is rapidly expanding healthcare access in rural AP and Telangana, creating new doctor demand.",
        careerPaths: JSON.stringify([{"role": "Doctor (MBBS General Practice)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "MBBS (5.5 years) + internship"}, {"role": "Specialist Doctor (MD/MS)", "entrySalary": "₹12–25 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "MBBS + MD/MS (3 years) + super specialization"}, {"role": "Surgeon (Super Specialist)", "entrySalary": "₹15–30 LPA", "seniorSalary": "₹50–2 Cr/year", "qualification": "MBBS + MS + MCh/DM (3 years super specialization)"}, {"role": "Dentist (BDS)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–40 LPA", "qualification": "BDS (5 years) + MDS specialization"}, {"role": "Pharmacist / Pharma Researcher", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Pharm/M.Pharm + research experience"}, {"role": "Biotech Researcher", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "B.Tech/M.Tech Biotechnology + PhD"}, {"role": "Public Health Specialist", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "MBBS/MPH + community health experience"}, {"role": "Nursing Professional", "entrySalary": "₹3–6 LPA", "seniorSalary": "₹8–25 LPA (abroad: ₹40–80 LPA)", "qualification": "B.Sc Nursing + specialization"}]),
        topColleges: JSON.stringify([{"name": "AIIMS Mangalagiri", "location": "Guntur, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Osmania Medical College", "location": "Hyderabad, Telangana", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Andhra Medical College", "location": "Visakhapatnam, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Gandhi Medical College", "location": "Secunderabad, Telangana", "entrance": "NEET UG", "package": "Government posting + PG pathway"}, {"name": "Guntur Medical College", "location": "Guntur, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "SVS Medical College", "location": "Mahabubnagar, Telangana", "entrance": "NEET UG", "package": "₹6–10 LPA"}, {"name": "NTR University of Health Sciences", "location": "Vijayawada, AP", "entrance": "NEET UG + counselling", "package": "Various affiliated colleges"}, {"name": "NIMS Hyderabad", "location": "Hyderabad, Telangana", "entrance": "NEET UG", "package": "Government super-specialty hospital"}]),
        thirtyDayTest: "Week 1: Shadow a doctor or visit a hospital for 3 hours. Observe patient interactions, the pace, the smells. Notice your honest reaction — curiosity or discomfort?\\n\\nWeek 2: Read one chapter of human anatomy (Gray's Anatomy for Students). Watch 2 surgical procedure videos on YouTube. Did they fascinate you or make you look away?\\n\\nWeek 3: Volunteer at a local clinic or health camp for one day. Observe how doctors handle pressure, difficult patients, and long hours.\\n\\nWeek 4: Attempt 30 NEET Biology MCQs. Study one disease pathway end-to-end (cause → symptoms → diagnosis → treatment). Notice: does the complexity energise you?\\n\\nJudgement: If hospitals felt like a place you belonged, and biology pulled you deeper — medicine is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "NEET UG", "details": "Single national entrance for MBBS, BDS, AYUSH, B.Sc Nursing, and Veterinary. Physics, Chemistry, Biology (Botany + Zoology). 200 MCQs in 3.5 hours. Target: 650+ for government medical colleges."}, {"exam": "AP EAPCET (BiPC)", "details": "State-level medical entrance for AP colleges. Based on NEET score + inter marks. Important for AP domicile students targeting state quota seats."}, {"exam": "TS EAMCET (BiPC)", "details": "Telangana state medical entrance. Combined merit of EAMCET + intermediate marks. Gateway to Osmania, Gandhi, and other TS medical colleges."}, {"exam": "AIIMS/JIPMER (now NEET)", "details": "Formerly separate exams, now merged into NEET UG. AIIMS Mangalagiri (AP) is a top target. All-India quota available."}, {"exam": "NEET PG", "details": "After MBBS completion. For MD/MS admission. Critical for specialization — the real earning potential in medicine requires PG."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Medicine career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCB (Physics, Chemistry, Biology). Participate in competitions and workshops. Connect with professionals in Medicine."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (NEET UG, AP EAPCET BiPC, TS EAMCET BiPC). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Medicine. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Medicine due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on NEET UG but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Medicine", "description": "USA needs 139,000 additional doctors by 2033. UK's NHS actively recruits from India. A Telugu MBBS graduate targeting USMLE from 3rd year has a clear path to USD 300,000+ specialist career. Gulf and Canada also offer strong nursing and medical pathways."}, {"code": "IN", "title": "India Market for Medicine", "description": "India's healthcare sector is growing at 22% annually. Pharma (Hyderabad is the world's largest generic drug hub), health-tech startups, clinical research, and telemedicine are all expanding rapidly. AI diagnostics companies like Qure.ai are creating new medical technology roles."}, {"code": "AP", "title": "AP & Telangana Medicine Outlook", "description": "Hyderabad is a global pharma and biotech hub — Dr. Reddy's, Aurobindo, Hetero, and Biological E are headquartered here. AIIMS Mangalagiri is the newest premium medical institution in AP. Telemedicine is rapidly expanding healthcare access in rural AP and Telangana, creating new doctor demand."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Medicine Fit — Possible Fit",
        description: "You have healthcare inclination but need to verify its depth before committing to a 10-year path. Complete the 30-Day Hospital Exposure Test. Explore Biotechnology, Pharmacy, or Health Technology as alternatives.\\n\\nRegional Outlook (AP & Telangana): Hyderabad is a global pharma and biotech hub — Dr. Reddy's, Aurobindo, Hetero, and Biological E are headquartered here. AIIMS Mangalagiri is the newest premium medical institution in AP. Telemedicine is rapidly expanding healthcare access in rural AP and Telangana, creating new doctor demand.",
        careerPaths: JSON.stringify([{"role": "Doctor (MBBS General Practice)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "MBBS (5.5 years) + internship"}, {"role": "Specialist Doctor (MD/MS)", "entrySalary": "₹12–25 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "MBBS + MD/MS (3 years) + super specialization"}, {"role": "Surgeon (Super Specialist)", "entrySalary": "₹15–30 LPA", "seniorSalary": "₹50–2 Cr/year", "qualification": "MBBS + MS + MCh/DM (3 years super specialization)"}, {"role": "Dentist (BDS)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–40 LPA", "qualification": "BDS (5 years) + MDS specialization"}, {"role": "Pharmacist / Pharma Researcher", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Pharm/M.Pharm + research experience"}, {"role": "Biotech Researcher", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "B.Tech/M.Tech Biotechnology + PhD"}, {"role": "Public Health Specialist", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "MBBS/MPH + community health experience"}, {"role": "Nursing Professional", "entrySalary": "₹3–6 LPA", "seniorSalary": "₹8–25 LPA (abroad: ₹40–80 LPA)", "qualification": "B.Sc Nursing + specialization"}]),
        topColleges: JSON.stringify([{"name": "AIIMS Mangalagiri", "location": "Guntur, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Osmania Medical College", "location": "Hyderabad, Telangana", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Andhra Medical College", "location": "Visakhapatnam, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Gandhi Medical College", "location": "Secunderabad, Telangana", "entrance": "NEET UG", "package": "Government posting + PG pathway"}, {"name": "Guntur Medical College", "location": "Guntur, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "SVS Medical College", "location": "Mahabubnagar, Telangana", "entrance": "NEET UG", "package": "₹6–10 LPA"}, {"name": "NTR University of Health Sciences", "location": "Vijayawada, AP", "entrance": "NEET UG + counselling", "package": "Various affiliated colleges"}, {"name": "NIMS Hyderabad", "location": "Hyderabad, Telangana", "entrance": "NEET UG", "package": "Government super-specialty hospital"}]),
        thirtyDayTest: "Week 1: Shadow a doctor or visit a hospital for 3 hours. Observe patient interactions, the pace, the smells. Notice your honest reaction — curiosity or discomfort?\\n\\nWeek 2: Read one chapter of human anatomy (Gray's Anatomy for Students). Watch 2 surgical procedure videos on YouTube. Did they fascinate you or make you look away?\\n\\nWeek 3: Volunteer at a local clinic or health camp for one day. Observe how doctors handle pressure, difficult patients, and long hours.\\n\\nWeek 4: Attempt 30 NEET Biology MCQs. Study one disease pathway end-to-end (cause → symptoms → diagnosis → treatment). Notice: does the complexity energise you?\\n\\nJudgement: If hospitals felt like a place you belonged, and biology pulled you deeper — medicine is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "NEET UG", "details": "Single national entrance for MBBS, BDS, AYUSH, B.Sc Nursing, and Veterinary. Physics, Chemistry, Biology (Botany + Zoology). 200 MCQs in 3.5 hours. Target: 650+ for government medical colleges."}, {"exam": "AP EAPCET (BiPC)", "details": "State-level medical entrance for AP colleges. Based on NEET score + inter marks. Important for AP domicile students targeting state quota seats."}, {"exam": "TS EAMCET (BiPC)", "details": "Telangana state medical entrance. Combined merit of EAMCET + intermediate marks. Gateway to Osmania, Gandhi, and other TS medical colleges."}, {"exam": "AIIMS/JIPMER (now NEET)", "details": "Formerly separate exams, now merged into NEET UG. AIIMS Mangalagiri (AP) is a top target. All-India quota available."}, {"exam": "NEET PG", "details": "After MBBS completion. For MD/MS admission. Critical for specialization — the real earning potential in medicine requires PG."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Medicine career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCB (Physics, Chemistry, Biology). Participate in competitions and workshops. Connect with professionals in Medicine."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (NEET UG, AP EAPCET BiPC, TS EAMCET BiPC). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Medicine. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Medicine due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on NEET UG but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Medicine", "description": "USA needs 139,000 additional doctors by 2033. UK's NHS actively recruits from India. A Telugu MBBS graduate targeting USMLE from 3rd year has a clear path to USD 300,000+ specialist career. Gulf and Canada also offer strong nursing and medical pathways."}, {"code": "IN", "title": "India Market for Medicine", "description": "India's healthcare sector is growing at 22% annually. Pharma (Hyderabad is the world's largest generic drug hub), health-tech startups, clinical research, and telemedicine are all expanding rapidly. AI diagnostics companies like Qure.ai are creating new medical technology roles."}, {"code": "AP", "title": "AP & Telangana Medicine Outlook", "description": "Hyderabad is a global pharma and biotech hub — Dr. Reddy's, Aurobindo, Hetero, and Biological E are headquartered here. AIIMS Mangalagiri is the newest premium medical institution in AP. Telemedicine is rapidly expanding healthcare access in rural AP and Telangana, creating new doctor demand."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Medicine Fit — Explore Others",
        description: "Medicine as a primary career may create sustained difficulty. This is important self-knowledge. Biotechnology, Psychology (Module 09), Engineering (Module 01), or Business (Module 06) may align much better with how you naturally think.\\n\\nRegional Outlook (AP & Telangana): Hyderabad is a global pharma and biotech hub — Dr. Reddy's, Aurobindo, Hetero, and Biological E are headquartered here. AIIMS Mangalagiri is the newest premium medical institution in AP. Telemedicine is rapidly expanding healthcare access in rural AP and Telangana, creating new doctor demand.",
        careerPaths: JSON.stringify([{"role": "Doctor (MBBS General Practice)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "MBBS (5.5 years) + internship"}, {"role": "Specialist Doctor (MD/MS)", "entrySalary": "₹12–25 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "MBBS + MD/MS (3 years) + super specialization"}, {"role": "Surgeon (Super Specialist)", "entrySalary": "₹15–30 LPA", "seniorSalary": "₹50–2 Cr/year", "qualification": "MBBS + MS + MCh/DM (3 years super specialization)"}, {"role": "Dentist (BDS)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–40 LPA", "qualification": "BDS (5 years) + MDS specialization"}, {"role": "Pharmacist / Pharma Researcher", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Pharm/M.Pharm + research experience"}, {"role": "Biotech Researcher", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "B.Tech/M.Tech Biotechnology + PhD"}, {"role": "Public Health Specialist", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "MBBS/MPH + community health experience"}, {"role": "Nursing Professional", "entrySalary": "₹3–6 LPA", "seniorSalary": "₹8–25 LPA (abroad: ₹40–80 LPA)", "qualification": "B.Sc Nursing + specialization"}]),
        topColleges: JSON.stringify([{"name": "AIIMS Mangalagiri", "location": "Guntur, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Osmania Medical College", "location": "Hyderabad, Telangana", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Andhra Medical College", "location": "Visakhapatnam, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "Gandhi Medical College", "location": "Secunderabad, Telangana", "entrance": "NEET UG", "package": "Government posting + PG pathway"}, {"name": "Guntur Medical College", "location": "Guntur, AP", "entrance": "NEET UG", "package": "Government posting: ₹60K–1L/month"}, {"name": "SVS Medical College", "location": "Mahabubnagar, Telangana", "entrance": "NEET UG", "package": "₹6–10 LPA"}, {"name": "NTR University of Health Sciences", "location": "Vijayawada, AP", "entrance": "NEET UG + counselling", "package": "Various affiliated colleges"}, {"name": "NIMS Hyderabad", "location": "Hyderabad, Telangana", "entrance": "NEET UG", "package": "Government super-specialty hospital"}]),
        thirtyDayTest: "Week 1: Shadow a doctor or visit a hospital for 3 hours. Observe patient interactions, the pace, the smells. Notice your honest reaction — curiosity or discomfort?\\n\\nWeek 2: Read one chapter of human anatomy (Gray's Anatomy for Students). Watch 2 surgical procedure videos on YouTube. Did they fascinate you or make you look away?\\n\\nWeek 3: Volunteer at a local clinic or health camp for one day. Observe how doctors handle pressure, difficult patients, and long hours.\\n\\nWeek 4: Attempt 30 NEET Biology MCQs. Study one disease pathway end-to-end (cause → symptoms → diagnosis → treatment). Notice: does the complexity energise you?\\n\\nJudgement: If hospitals felt like a place you belonged, and biology pulled you deeper — medicine is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "NEET UG", "details": "Single national entrance for MBBS, BDS, AYUSH, B.Sc Nursing, and Veterinary. Physics, Chemistry, Biology (Botany + Zoology). 200 MCQs in 3.5 hours. Target: 650+ for government medical colleges."}, {"exam": "AP EAPCET (BiPC)", "details": "State-level medical entrance for AP colleges. Based on NEET score + inter marks. Important for AP domicile students targeting state quota seats."}, {"exam": "TS EAMCET (BiPC)", "details": "Telangana state medical entrance. Combined merit of EAMCET + intermediate marks. Gateway to Osmania, Gandhi, and other TS medical colleges."}, {"exam": "AIIMS/JIPMER (now NEET)", "details": "Formerly separate exams, now merged into NEET UG. AIIMS Mangalagiri (AP) is a top target. All-India quota available."}, {"exam": "NEET PG", "details": "After MBBS completion. For MD/MS admission. Critical for specialization — the real earning potential in medicine requires PG."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Medicine career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCB (Physics, Chemistry, Biology). Participate in competitions and workshops. Connect with professionals in Medicine."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (NEET UG, AP EAPCET BiPC, TS EAMCET BiPC). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Medicine. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Medicine due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on NEET UG but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Medicine", "description": "USA needs 139,000 additional doctors by 2033. UK's NHS actively recruits from India. A Telugu MBBS graduate targeting USMLE from 3rd year has a clear path to USD 300,000+ specialist career. Gulf and Canada also offer strong nursing and medical pathways."}, {"code": "IN", "title": "India Market for Medicine", "description": "India's healthcare sector is growing at 22% annually. Pharma (Hyderabad is the world's largest generic drug hub), health-tech startups, clinical research, and telemedicine are all expanding rapidly. AI diagnostics companies like Qure.ai are creating new medical technology roles."}, {"code": "AP", "title": "AP & Telangana Medicine Outlook", "description": "Hyderabad is a global pharma and biotech hub — Dr. Reddy's, Aurobindo, Hetero, and Biological E are headquartered here. AIIMS Mangalagiri is the newest premium medical institution in AP. Telemedicine is rapidly expanding healthcare access in rural AP and Telangana, creating new doctor demand."}]),
      },
    ];

    for (const r of mod02Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: med.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: med.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 02 reports seeded (3 tiers)");
  }

  // --- Reports for Module 03 (Pure Sciences, Research & Space) ---
  if (sci) {
    const mod03Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Pure Sciences Fit — Strong Fit",
        description: "Your intrinsic curiosity and tolerance for open-ended thinking strongly align with a research career. Target IISER Tirupati or IISER Hyderabad via IAT. Begin Mathematics Olympiad preparation this month — it is the single best signal to research institutions.\\n\\nRegional Outlook (AP & Telangana): IISER Tirupati is a premier research institution directly accessible to AP students via IAT. IMSc Hyderabad and TIFR Hyderabad are world-class mathematics and physics institutes. Skyroot Aerospace, headquartered in Hyderabad, is building private rockets and hiring physics-trained engineers.",
        careerPaths: JSON.stringify([{"role": "Research Scientist (Physics/Chemistry/Biology)", "entrySalary": "₹31K–37K/month fellowship", "seniorSalary": "₹15–40 LPA", "qualification": "BS-MS (IISER/IISc) + PhD"}, {"role": "Space Scientist (ISRO)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "B.Tech/BS + ICRB exam"}, {"role": "Data Scientist / Quantitative Analyst", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–60 LPA", "qualification": "MSc/PhD + Python/ML skills"}, {"role": "University Professor", "entrySalary": "₹8–12 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "PhD + NET/SET qualification"}, {"role": "R&D Engineer (Semiconductor/Pharma)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MSc/PhD in relevant field"}]),
        topColleges: JSON.stringify([{"name": "IISER Tirupati  Tirupati, AP  IAT / JEE Advanced  Fellowship + ₹10 –35", "location": "LPA (post -PhD)", "entrance": "IISc Bangalore (BS", "package": "Research)  Bangalore  JEE Advanced / IAT  ₹22.5 LPA median"}, {"name": "PG", "location": "--- PAGE 25 ---", "entrance": "TS IAT Fellowship + strong", "package": "PhD pipeline"}, {"name": "IMSc Hyderabad  Hyderabad,", "location": "TS JEST / NBHM  ₹31,000 –", "entrance": "35,000/month", "package": "fellowship"}, {"name": "Tata Institute (TIFR,", "location": "Hyderabad campus)  Hyderabad,", "entrance": "TS JEST  ₹35,000+/month", "package": "fellowship"}]),
        thirtyDayTest: "Week 1: Read one chapter of 'A Short History of Nearly Everything' by Bill Bryson. Notice: does the science pull you forward or do you have to push yourself?\\n\\nWeek 2: Watch 3 episodes of a science documentary (Cosmos, Our Planet, or Particle Fever). Write one paragraph on what genuinely fascinated you.\\n\\nWeek 3: Try solving 5 Physics or Mathematics Olympiad problems (freely available online). Notice whether you find the open-ended nature exciting or frustrating.\\n\\nWeek 4: Visit a science museum or planetarium. Ask yourself: would I want to work here?\\n\\nJudgement: If you voluntarily kept reading, watching, and solving beyond the minimum — research is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "IAT (IISER Aptitude Test)", "details": "Gateway to all 7 IISERs. Tests aptitude in Physics, Chemistry, Mathematics, Biology. IISER Tirupati directly accessible for AP students."}, {"exam": "JEE Advanced", "details": "Top 2.5 lakh JEE Main qualifiers can appear. Qualifies for IISc BS Research program. Combined with IAT for comprehensive science pathway."}, {"exam": "JEST (Joint Entrance Screening Test)", "details": "For MSc/PhD at TIFR, IMSc, IISERs, HRI. Tests Physics or Mathematics. Direct path to India's premier research institutes."}, {"exam": "KVPY (replaced by INSPIRE)", "details": "INSPIRE Scholarship for top science students. ₹80,000/year scholarship for BS-MS programs. Based on board exam performance."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Pure Sciences career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCM / PCB. Participate in competitions and workshops. Connect with professionals in Pure Sciences."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (IAT, JEST, JEE Advanced). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Pure Sciences. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Pure Sciences due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on IAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Pure Sciences", "description": "CERN, MIT, Cambridge, and ETH Zurich actively recruit Indian research students. India's International Science Fellowship programme funds PhD study abroad. Top IISER graduates have strong international PhD pipelines to leading global universities."}, {"code": "IN", "title": "India Market for Pure Sciences", "description": "ISRO, DRDO, TIFR, IISc, and the National Quantum Mission (₹6,003 crore) are all actively expanding. India's space economy targets ₹44,000 crore by 2033. Research fellowships at premier institutions: ₹31,000–37,000 per month with full funding."}, {"code": "AP", "title": "AP & Telangana Pure Sciences Outlook", "description": "IISER Tirupati is a premier research institution directly accessible to AP students via IAT. IMSc Hyderabad and TIFR Hyderabad are world-class mathematics and physics institutes. Skyroot Aerospace, headquartered in Hyderabad, is building private rockets and hiring physics-trained engineers."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Pure Sciences Fit — Possible Fit",
        description: "You have intellectual curiosity but may want structured outcomes. Explore Applied Sciences, Data Science, or Engineering — fields that combine scientific thinking with tangible products. Complete the 30-Day Research Interest Test before committing.\\n\\nRegional Outlook (AP & Telangana): IISER Tirupati is a premier research institution directly accessible to AP students via IAT. IMSc Hyderabad and TIFR Hyderabad are world-class mathematics and physics institutes. Skyroot Aerospace, headquartered in Hyderabad, is building private rockets and hiring physics-trained engineers.",
        careerPaths: JSON.stringify([{"role": "Research Scientist (Physics/Chemistry/Biology)", "entrySalary": "₹31K–37K/month fellowship", "seniorSalary": "₹15–40 LPA", "qualification": "BS-MS (IISER/IISc) + PhD"}, {"role": "Space Scientist (ISRO)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "B.Tech/BS + ICRB exam"}, {"role": "Data Scientist / Quantitative Analyst", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–60 LPA", "qualification": "MSc/PhD + Python/ML skills"}, {"role": "University Professor", "entrySalary": "₹8–12 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "PhD + NET/SET qualification"}, {"role": "R&D Engineer (Semiconductor/Pharma)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MSc/PhD in relevant field"}]),
        topColleges: JSON.stringify([{"name": "IISER Tirupati  Tirupati, AP  IAT / JEE Advanced  Fellowship + ₹10 –35", "location": "LPA (post -PhD)", "entrance": "IISc Bangalore (BS", "package": "Research)  Bangalore  JEE Advanced / IAT  ₹22.5 LPA median"}, {"name": "PG", "location": "--- PAGE 25 ---", "entrance": "TS IAT Fellowship + strong", "package": "PhD pipeline"}, {"name": "IMSc Hyderabad  Hyderabad,", "location": "TS JEST / NBHM  ₹31,000 –", "entrance": "35,000/month", "package": "fellowship"}, {"name": "Tata Institute (TIFR,", "location": "Hyderabad campus)  Hyderabad,", "entrance": "TS JEST  ₹35,000+/month", "package": "fellowship"}]),
        thirtyDayTest: "Week 1: Read one chapter of 'A Short History of Nearly Everything' by Bill Bryson. Notice: does the science pull you forward or do you have to push yourself?\\n\\nWeek 2: Watch 3 episodes of a science documentary (Cosmos, Our Planet, or Particle Fever). Write one paragraph on what genuinely fascinated you.\\n\\nWeek 3: Try solving 5 Physics or Mathematics Olympiad problems (freely available online). Notice whether you find the open-ended nature exciting or frustrating.\\n\\nWeek 4: Visit a science museum or planetarium. Ask yourself: would I want to work here?\\n\\nJudgement: If you voluntarily kept reading, watching, and solving beyond the minimum — research is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "IAT (IISER Aptitude Test)", "details": "Gateway to all 7 IISERs. Tests aptitude in Physics, Chemistry, Mathematics, Biology. IISER Tirupati directly accessible for AP students."}, {"exam": "JEE Advanced", "details": "Top 2.5 lakh JEE Main qualifiers can appear. Qualifies for IISc BS Research program. Combined with IAT for comprehensive science pathway."}, {"exam": "JEST (Joint Entrance Screening Test)", "details": "For MSc/PhD at TIFR, IMSc, IISERs, HRI. Tests Physics or Mathematics. Direct path to India's premier research institutes."}, {"exam": "KVPY (replaced by INSPIRE)", "details": "INSPIRE Scholarship for top science students. ₹80,000/year scholarship for BS-MS programs. Based on board exam performance."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Pure Sciences career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCM / PCB. Participate in competitions and workshops. Connect with professionals in Pure Sciences."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (IAT, JEST, JEE Advanced). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Pure Sciences. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Pure Sciences due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on IAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Pure Sciences", "description": "CERN, MIT, Cambridge, and ETH Zurich actively recruit Indian research students. India's International Science Fellowship programme funds PhD study abroad. Top IISER graduates have strong international PhD pipelines to leading global universities."}, {"code": "IN", "title": "India Market for Pure Sciences", "description": "ISRO, DRDO, TIFR, IISc, and the National Quantum Mission (₹6,003 crore) are all actively expanding. India's space economy targets ₹44,000 crore by 2033. Research fellowships at premier institutions: ₹31,000–37,000 per month with full funding."}, {"code": "AP", "title": "AP & Telangana Pure Sciences Outlook", "description": "IISER Tirupati is a premier research institution directly accessible to AP students via IAT. IMSc Hyderabad and TIFR Hyderabad are world-class mathematics and physics institutes. Skyroot Aerospace, headquartered in Hyderabad, is building private rockets and hiring physics-trained engineers."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Pure Sciences Fit — Explore Others",
        description: "Research science's long timelines and open-ended uncertainty may not suit your orientation. Engineering (Module 01), Finance (Module 04), or Design (Module 10) may offer better alignment with how you prefer to work.\\n\\nRegional Outlook (AP & Telangana): IISER Tirupati is a premier research institution directly accessible to AP students via IAT. IMSc Hyderabad and TIFR Hyderabad are world-class mathematics and physics institutes. Skyroot Aerospace, headquartered in Hyderabad, is building private rockets and hiring physics-trained engineers.",
        careerPaths: JSON.stringify([{"role": "Research Scientist (Physics/Chemistry/Biology)", "entrySalary": "₹31K–37K/month fellowship", "seniorSalary": "₹15–40 LPA", "qualification": "BS-MS (IISER/IISc) + PhD"}, {"role": "Space Scientist (ISRO)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "B.Tech/BS + ICRB exam"}, {"role": "Data Scientist / Quantitative Analyst", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–60 LPA", "qualification": "MSc/PhD + Python/ML skills"}, {"role": "University Professor", "entrySalary": "₹8–12 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "PhD + NET/SET qualification"}, {"role": "R&D Engineer (Semiconductor/Pharma)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MSc/PhD in relevant field"}]),
        topColleges: JSON.stringify([{"name": "IISER Tirupati  Tirupati, AP  IAT / JEE Advanced  Fellowship + ₹10 –35", "location": "LPA (post -PhD)", "entrance": "IISc Bangalore (BS", "package": "Research)  Bangalore  JEE Advanced / IAT  ₹22.5 LPA median"}, {"name": "PG", "location": "--- PAGE 25 ---", "entrance": "TS IAT Fellowship + strong", "package": "PhD pipeline"}, {"name": "IMSc Hyderabad  Hyderabad,", "location": "TS JEST / NBHM  ₹31,000 –", "entrance": "35,000/month", "package": "fellowship"}, {"name": "Tata Institute (TIFR,", "location": "Hyderabad campus)  Hyderabad,", "entrance": "TS JEST  ₹35,000+/month", "package": "fellowship"}]),
        thirtyDayTest: "Week 1: Read one chapter of 'A Short History of Nearly Everything' by Bill Bryson. Notice: does the science pull you forward or do you have to push yourself?\\n\\nWeek 2: Watch 3 episodes of a science documentary (Cosmos, Our Planet, or Particle Fever). Write one paragraph on what genuinely fascinated you.\\n\\nWeek 3: Try solving 5 Physics or Mathematics Olympiad problems (freely available online). Notice whether you find the open-ended nature exciting or frustrating.\\n\\nWeek 4: Visit a science museum or planetarium. Ask yourself: would I want to work here?\\n\\nJudgement: If you voluntarily kept reading, watching, and solving beyond the minimum — research is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "IAT (IISER Aptitude Test)", "details": "Gateway to all 7 IISERs. Tests aptitude in Physics, Chemistry, Mathematics, Biology. IISER Tirupati directly accessible for AP students."}, {"exam": "JEE Advanced", "details": "Top 2.5 lakh JEE Main qualifiers can appear. Qualifies for IISc BS Research program. Combined with IAT for comprehensive science pathway."}, {"exam": "JEST (Joint Entrance Screening Test)", "details": "For MSc/PhD at TIFR, IMSc, IISERs, HRI. Tests Physics or Mathematics. Direct path to India's premier research institutes."}, {"exam": "KVPY (replaced by INSPIRE)", "details": "INSPIRE Scholarship for top science students. ₹80,000/year scholarship for BS-MS programs. Based on board exam performance."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Pure Sciences career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in PCM / PCB. Participate in competitions and workshops. Connect with professionals in Pure Sciences."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (IAT, JEST, JEE Advanced). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Pure Sciences. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Pure Sciences due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on IAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Pure Sciences", "description": "CERN, MIT, Cambridge, and ETH Zurich actively recruit Indian research students. India's International Science Fellowship programme funds PhD study abroad. Top IISER graduates have strong international PhD pipelines to leading global universities."}, {"code": "IN", "title": "India Market for Pure Sciences", "description": "ISRO, DRDO, TIFR, IISc, and the National Quantum Mission (₹6,003 crore) are all actively expanding. India's space economy targets ₹44,000 crore by 2033. Research fellowships at premier institutions: ₹31,000–37,000 per month with full funding."}, {"code": "AP", "title": "AP & Telangana Pure Sciences Outlook", "description": "IISER Tirupati is a premier research institution directly accessible to AP students via IAT. IMSc Hyderabad and TIFR Hyderabad are world-class mathematics and physics institutes. Skyroot Aerospace, headquartered in Hyderabad, is building private rockets and hiring physics-trained engineers."}]),
      },
    ];

    for (const r of mod03Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: sci.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: sci.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 03 reports seeded (3 tiers)");
  }

  // --- Reports for Module 04 (Finance, Stock Market & Investment Banking) ---
  if (fin) {
    const mod04Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Finance Fit — Strong Fit",
        description: "Your analytical orientation and genuine curiosity about markets and capital align strongly with a finance career. Take Commerce with Mathematics in Class 11. Explore CA Foundation, CFA, and CUET-based B.Com programmes simultaneously.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts ICFAI Business School, XLRI, major banking operations (HDFC, ICICI, Kotak, Axis), and a rapidly growing FinTech ecosystem. BSE and NSE have regional offices here. Telugu students have access to 7 lakh+ projected new wealth management roles over the next decade.",
        careerPaths: JSON.stringify([{"role": "Investment Banker", "entrySalary": "₹10–20 LPA", "seniorSalary": "₹50–80+ LPA", "qualification": "B.Com/MBA Finance + CFA"}, {"role": "Equity Research Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Com/MBA + CFA"}, {"role": "Financial Planner / Wealth Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "CFP certification + B.Com/MBA"}, {"role": "Stock Market Trader / Portfolio Manager", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "Finance degree + NISM certifications"}, {"role": "FinTech Product Manager", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "MBA/B.Tech + Finance knowledge"}]),
        topColleges: JSON.stringify([{"name": "ICFAI Business School (IBS", "location": "Hyderabad)  Hyderabad,", "entrance": "TS IBSAT / CAT / XAT  ₹8–18 LPA avg MBA", "package": "Finance"}, {"name": "XLRI Hyderabad campus  Hyderabad,", "location": "TS XAT + XLRI test  ₹24+ LPA avg", "entrance": "--- PAGE 27 ---", "package": "TS SET ₹8–14 LPA avg BBA"}, {"name": "Finance", "location": "GITAM School of Business", "entrance": "Hyderabad  Hyderabad,", "package": "TS GITAM GAT  ₹6–10 LPA avg"}]),
        thirtyDayTest: "Week 1: Open a Zerodha/Groww account (paper trading). Track 3 stocks daily — note their movements and try to understand why they moved.\\n\\nWeek 2: Read one chapter of 'The Intelligent Investor' by Benjamin Graham. Does the logic of value investing engage you?\\n\\nWeek 3: Analyse one company's annual report — revenue, expenses, profit margin. Present your findings to a family member.\\n\\nWeek 4: Follow financial news daily (Mint, Economic Times). Write 3 observations about what you learned.\\n\\nJudgement: If tracking stocks and reading financial data became a habit — finance is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CUET UG", "details": "Common University Entrance Test for B.Com/BBA at central universities including DU, JNU, BHU. Multiple language options available."}, {"exam": "NPAT (NMIMS Programs After Twelfth)", "details": "Gateway to NMIMS BBA/B.Com programs. Aptitude-based test. NMIMS Mumbai and Hyderabad campuses."}, {"exam": "IPMAT (IIM Integrated Program)", "details": "5-year Integrated MBA at IIM Indore/Ranchi/Bodh Gaya. Highly competitive. Direct IIM degree after 12th."}, {"exam": "SET (Symbiosis Entrance Test)", "details": "Entry to Symbiosis BBA/B.Com programs. Symbiosis Hyderabad campus available."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Finance career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Commerce + Mathematics. Participate in competitions and workshops. Connect with professionals in Finance."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CUET, NPAT, ICFAI, SET). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Finance. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Finance due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CUET but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Finance", "description": "Investment banking, private equity, and quantitative finance roles at Goldman Sachs, JP Morgan, and BlackRock actively recruit from India's top commerce institutions. CFA charter opens doors in Singapore, Dubai, London, and New York."}, {"code": "IN", "title": "India Market for Finance", "description": "India's mutual fund AUM crossed ₹80 lakh crore in 2025. Demat accounts tripled to 21 crore in 4 years. SEBI, IRDAI, and RBI are all expanding regulatory hiring. Mumbai is the financial capital but Hyderabad, Bengaluru, and Pune have major banking and fintech operations."}, {"code": "AP", "title": "AP & Telangana Finance Outlook", "description": "Hyderabad hosts ICFAI Business School, XLRI, major banking operations (HDFC, ICICI, Kotak, Axis), and a rapidly growing FinTech ecosystem. BSE and NSE have regional offices here. Telugu students have access to 7 lakh+ projected new wealth management roles over the next decade."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Finance Fit — Possible Fit",
        description: "You have financial aptitude but need to verify whether your interest is intrinsic. Complete 30 days of tracking one stock and one mutual fund daily. If the process engages you without being forced — finance is your path.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts ICFAI Business School, XLRI, major banking operations (HDFC, ICICI, Kotak, Axis), and a rapidly growing FinTech ecosystem. BSE and NSE have regional offices here. Telugu students have access to 7 lakh+ projected new wealth management roles over the next decade.",
        careerPaths: JSON.stringify([{"role": "Investment Banker", "entrySalary": "₹10–20 LPA", "seniorSalary": "₹50–80+ LPA", "qualification": "B.Com/MBA Finance + CFA"}, {"role": "Equity Research Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Com/MBA + CFA"}, {"role": "Financial Planner / Wealth Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "CFP certification + B.Com/MBA"}, {"role": "Stock Market Trader / Portfolio Manager", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "Finance degree + NISM certifications"}, {"role": "FinTech Product Manager", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "MBA/B.Tech + Finance knowledge"}]),
        topColleges: JSON.stringify([{"name": "ICFAI Business School (IBS", "location": "Hyderabad)  Hyderabad,", "entrance": "TS IBSAT / CAT / XAT  ₹8–18 LPA avg MBA", "package": "Finance"}, {"name": "XLRI Hyderabad campus  Hyderabad,", "location": "TS XAT + XLRI test  ₹24+ LPA avg", "entrance": "--- PAGE 27 ---", "package": "TS SET ₹8–14 LPA avg BBA"}, {"name": "Finance", "location": "GITAM School of Business", "entrance": "Hyderabad  Hyderabad,", "package": "TS GITAM GAT  ₹6–10 LPA avg"}]),
        thirtyDayTest: "Week 1: Open a Zerodha/Groww account (paper trading). Track 3 stocks daily — note their movements and try to understand why they moved.\\n\\nWeek 2: Read one chapter of 'The Intelligent Investor' by Benjamin Graham. Does the logic of value investing engage you?\\n\\nWeek 3: Analyse one company's annual report — revenue, expenses, profit margin. Present your findings to a family member.\\n\\nWeek 4: Follow financial news daily (Mint, Economic Times). Write 3 observations about what you learned.\\n\\nJudgement: If tracking stocks and reading financial data became a habit — finance is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CUET UG", "details": "Common University Entrance Test for B.Com/BBA at central universities including DU, JNU, BHU. Multiple language options available."}, {"exam": "NPAT (NMIMS Programs After Twelfth)", "details": "Gateway to NMIMS BBA/B.Com programs. Aptitude-based test. NMIMS Mumbai and Hyderabad campuses."}, {"exam": "IPMAT (IIM Integrated Program)", "details": "5-year Integrated MBA at IIM Indore/Ranchi/Bodh Gaya. Highly competitive. Direct IIM degree after 12th."}, {"exam": "SET (Symbiosis Entrance Test)", "details": "Entry to Symbiosis BBA/B.Com programs. Symbiosis Hyderabad campus available."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Finance career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Commerce + Mathematics. Participate in competitions and workshops. Connect with professionals in Finance."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CUET, NPAT, ICFAI, SET). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Finance. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Finance due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CUET but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Finance", "description": "Investment banking, private equity, and quantitative finance roles at Goldman Sachs, JP Morgan, and BlackRock actively recruit from India's top commerce institutions. CFA charter opens doors in Singapore, Dubai, London, and New York."}, {"code": "IN", "title": "India Market for Finance", "description": "India's mutual fund AUM crossed ₹80 lakh crore in 2025. Demat accounts tripled to 21 crore in 4 years. SEBI, IRDAI, and RBI are all expanding regulatory hiring. Mumbai is the financial capital but Hyderabad, Bengaluru, and Pune have major banking and fintech operations."}, {"code": "AP", "title": "AP & Telangana Finance Outlook", "description": "Hyderabad hosts ICFAI Business School, XLRI, major banking operations (HDFC, ICICI, Kotak, Axis), and a rapidly growing FinTech ecosystem. BSE and NSE have regional offices here. Telugu students have access to 7 lakh+ projected new wealth management roles over the next decade."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Finance Fit — Explore Others",
        description: "Finance may not be your primary calling. Engineering (Module 01), Law (Module 07), or Business Management (Module 06) may offer better alignment — especially if you are analytically strong but not drawn to markets specifically.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts ICFAI Business School, XLRI, major banking operations (HDFC, ICICI, Kotak, Axis), and a rapidly growing FinTech ecosystem. BSE and NSE have regional offices here. Telugu students have access to 7 lakh+ projected new wealth management roles over the next decade.",
        careerPaths: JSON.stringify([{"role": "Investment Banker", "entrySalary": "₹10–20 LPA", "seniorSalary": "₹50–80+ LPA", "qualification": "B.Com/MBA Finance + CFA"}, {"role": "Equity Research Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Com/MBA + CFA"}, {"role": "Financial Planner / Wealth Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "CFP certification + B.Com/MBA"}, {"role": "Stock Market Trader / Portfolio Manager", "entrySalary": "₹6–15 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "Finance degree + NISM certifications"}, {"role": "FinTech Product Manager", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "MBA/B.Tech + Finance knowledge"}]),
        topColleges: JSON.stringify([{"name": "ICFAI Business School (IBS", "location": "Hyderabad)  Hyderabad,", "entrance": "TS IBSAT / CAT / XAT  ₹8–18 LPA avg MBA", "package": "Finance"}, {"name": "XLRI Hyderabad campus  Hyderabad,", "location": "TS XAT + XLRI test  ₹24+ LPA avg", "entrance": "--- PAGE 27 ---", "package": "TS SET ₹8–14 LPA avg BBA"}, {"name": "Finance", "location": "GITAM School of Business", "entrance": "Hyderabad  Hyderabad,", "package": "TS GITAM GAT  ₹6–10 LPA avg"}]),
        thirtyDayTest: "Week 1: Open a Zerodha/Groww account (paper trading). Track 3 stocks daily — note their movements and try to understand why they moved.\\n\\nWeek 2: Read one chapter of 'The Intelligent Investor' by Benjamin Graham. Does the logic of value investing engage you?\\n\\nWeek 3: Analyse one company's annual report — revenue, expenses, profit margin. Present your findings to a family member.\\n\\nWeek 4: Follow financial news daily (Mint, Economic Times). Write 3 observations about what you learned.\\n\\nJudgement: If tracking stocks and reading financial data became a habit — finance is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CUET UG", "details": "Common University Entrance Test for B.Com/BBA at central universities including DU, JNU, BHU. Multiple language options available."}, {"exam": "NPAT (NMIMS Programs After Twelfth)", "details": "Gateway to NMIMS BBA/B.Com programs. Aptitude-based test. NMIMS Mumbai and Hyderabad campuses."}, {"exam": "IPMAT (IIM Integrated Program)", "details": "5-year Integrated MBA at IIM Indore/Ranchi/Bodh Gaya. Highly competitive. Direct IIM degree after 12th."}, {"exam": "SET (Symbiosis Entrance Test)", "details": "Entry to Symbiosis BBA/B.Com programs. Symbiosis Hyderabad campus available."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Finance career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Commerce + Mathematics. Participate in competitions and workshops. Connect with professionals in Finance."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CUET, NPAT, ICFAI, SET). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Finance. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Finance due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CUET but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Finance", "description": "Investment banking, private equity, and quantitative finance roles at Goldman Sachs, JP Morgan, and BlackRock actively recruit from India's top commerce institutions. CFA charter opens doors in Singapore, Dubai, London, and New York."}, {"code": "IN", "title": "India Market for Finance", "description": "India's mutual fund AUM crossed ₹80 lakh crore in 2025. Demat accounts tripled to 21 crore in 4 years. SEBI, IRDAI, and RBI are all expanding regulatory hiring. Mumbai is the financial capital but Hyderabad, Bengaluru, and Pune have major banking and fintech operations."}, {"code": "AP", "title": "AP & Telangana Finance Outlook", "description": "Hyderabad hosts ICFAI Business School, XLRI, major banking operations (HDFC, ICICI, Kotak, Axis), and a rapidly growing FinTech ecosystem. BSE and NSE have regional offices here. Telugu students have access to 7 lakh+ projected new wealth management roles over the next decade."}]),
      },
    ];

    for (const r of mod04Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: fin.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: fin.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 04 reports seeded (3 tiers)");
  }

  // --- Reports for Module 05 (Chartered Accountancy, CS & Corporate Finance) ---
  if (ca) {
    const mod05Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Chartered Accountancy Fit — Strong Fit",
        description: "Your precision orientation, tolerance for complexity, and genuine interest in financial systems align strongly with CA, CS, or CMA. Register for CA Foundation immediately after Class 12. Begin with Accountancy and Business Mathematics in Class 11.\\n\\nRegional Outlook (AP & Telangana): ICAI Hyderabad Branch has 12,000+ members and strong articleship placement. Major corporate headquarters in Hyderabad (TCS, Infosys, Google India, Amazon India) all require finance teams. ICAI Visakhapatnam branch is growing rapidly with AP's expanding industrial sector.",
        careerPaths: JSON.stringify([{"role": "Chartered Accountant (Practice)", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹30–60+ LPA", "qualification": "CA Final + 3 years articleship"}, {"role": "Company Secretary", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "CS Professional + practice"}, {"role": "Cost & Management Accountant", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "CMA Final + industry experience"}, {"role": "Big 4 Audit Manager", "entrySalary": "₹10–18 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "CA + Big 4 experience"}, {"role": "CFO / Finance Director", "entrySalary": "₹15–25 LPA", "seniorSalary": "₹40–80+ LPA", "qualification": "CA/CMA + MBA + 10+ years experience"}]),
        topColleges: JSON.stringify([{"name": "ICAI Hyderabad Branch (CA", "location": "Foundation)  Hyderabad,", "entrance": "TS ICAI Foundation", "package": "exam  ₹10–25 LPA (CA"}, {"name": "qualified)", "location": "ICAI Visakhapatnam Branch  Vizag, AP  ICAI Foundation", "entrance": "exam  ₹8–20 LPA (CA", "package": "qualified)"}, {"name": "--- PAGE 29 ---", "location": "(parallel CA)  Hyderabad,", "entrance": "TS Merit -based  ₹4–8 LPA (B.Com", "package": "base)"}, {"name": "JNTU Hyderabad B.Com  Hyderabad,", "location": "TS Merit/TSEAMCET  ₹4–8 LPA (B.Com", "entrance": "base)", "package": "CS Foundation — ICSI"}, {"name": "Hyderabad Chapter  Hyderabad,", "location": "TS ICSI Foundation", "entrance": "exam  ₹6–15 LPA (CS", "package": "qualified)"}]),
        thirtyDayTest: "Week 1: Register for CA Foundation mock test (free online). Attempt the Accountancy section. Notice: does the precision and rule-based thinking energise you?\\n\\nWeek 2: Study one chapter of Financial Accounting from ICAI study material. Create structured notes.\\n\\nWeek 3: Visit a CA's office for 2 hours. Observe their work — audit files, tax returns, client meetings.\\n\\nWeek 4: Complete one full CA Foundation mock paper. Analyse your mistakes methodically.\\n\\nJudgement: If the structured, precise nature of accountancy felt satisfying — CA/CS is your path.",
        entranceExamStrategy: JSON.stringify([{"exam": "CA Foundation (ICAI)", "details": "First level of Chartered Accountancy. 4 papers: Accounting, Business Law, Maths/Statistics, Business Economics. Can register after Class 12. Study alongside B.Com."}, {"exam": "CS Foundation (ICSI)", "details": "First level of Company Secretary. 4 papers: Business Communication, Legal Aptitude, Economic and Business Environment, Fundamentals of Financial Management."}, {"exam": "CMA Foundation (ICAI-CMA)", "details": "Cost & Management Accountancy first level. 4 papers focusing on cost accounting and management principles."}, {"exam": "B.Com Entrance (various universities)", "details": "TSEAMCET / Merit-based admission to Osmania, JNTU for B.Com. Run CA/CS parallel to B.Com for maximum qualification."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Chartered Accountancy career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Commerce (Maths recommended). Participate in competitions and workshops. Connect with professionals in Chartered Accountancy."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CA Foundation (ICAI), CS Foundation (ICSI), CMA Foundation). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Chartered Accountancy. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Chartered Accountancy due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CA Foundation (ICAI) but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Chartered Accountancy", "description": "Big 4 (Deloitte, EY, KPMG, PwC) transfer Indian CAs to global offices in Singapore, London, Dubai, and New York. CMA (US) and ACCA qualifications are globally recognised and pair well with the Indian CA credential."}, {"code": "IN", "title": "India Market for Chartered Accountancy", "description": "India has 3.5 lakh CAs for a ₹300+ lakh crore economy — massive undersupply. Every listed company, bank, and major enterprise requires CA services. Hyderabad Big 4 offices offer ₹10–18 LPA starting salaries for qualified CAs."}, {"code": "AP", "title": "AP & Telangana Chartered Accountancy Outlook", "description": "ICAI Hyderabad Branch has 12,000+ members and strong articleship placement. Major corporate headquarters in Hyderabad (TCS, Infosys, Google India, Amazon India) all require finance teams. ICAI Visakhapatnam branch is growing rapidly with AP's expanding industrial sector."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Chartered Accountancy Fit — Possible Fit",
        description: "You have financial aptitude but may prefer strategic or advisory roles over technical compliance work. Explore Financial Analysis, Corporate Finance at MBA level, or CFO-track roles that combine finance with leadership.\\n\\nRegional Outlook (AP & Telangana): ICAI Hyderabad Branch has 12,000+ members and strong articleship placement. Major corporate headquarters in Hyderabad (TCS, Infosys, Google India, Amazon India) all require finance teams. ICAI Visakhapatnam branch is growing rapidly with AP's expanding industrial sector.",
        careerPaths: JSON.stringify([{"role": "Chartered Accountant (Practice)", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹30–60+ LPA", "qualification": "CA Final + 3 years articleship"}, {"role": "Company Secretary", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "CS Professional + practice"}, {"role": "Cost & Management Accountant", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "CMA Final + industry experience"}, {"role": "Big 4 Audit Manager", "entrySalary": "₹10–18 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "CA + Big 4 experience"}, {"role": "CFO / Finance Director", "entrySalary": "₹15–25 LPA", "seniorSalary": "₹40–80+ LPA", "qualification": "CA/CMA + MBA + 10+ years experience"}]),
        topColleges: JSON.stringify([{"name": "ICAI Hyderabad Branch (CA", "location": "Foundation)  Hyderabad,", "entrance": "TS ICAI Foundation", "package": "exam  ₹10–25 LPA (CA"}, {"name": "qualified)", "location": "ICAI Visakhapatnam Branch  Vizag, AP  ICAI Foundation", "entrance": "exam  ₹8–20 LPA (CA", "package": "qualified)"}, {"name": "--- PAGE 29 ---", "location": "(parallel CA)  Hyderabad,", "entrance": "TS Merit -based  ₹4–8 LPA (B.Com", "package": "base)"}, {"name": "JNTU Hyderabad B.Com  Hyderabad,", "location": "TS Merit/TSEAMCET  ₹4–8 LPA (B.Com", "entrance": "base)", "package": "CS Foundation — ICSI"}, {"name": "Hyderabad Chapter  Hyderabad,", "location": "TS ICSI Foundation", "entrance": "exam  ₹6–15 LPA (CS", "package": "qualified)"}]),
        thirtyDayTest: "Week 1: Register for CA Foundation mock test (free online). Attempt the Accountancy section. Notice: does the precision and rule-based thinking energise you?\\n\\nWeek 2: Study one chapter of Financial Accounting from ICAI study material. Create structured notes.\\n\\nWeek 3: Visit a CA's office for 2 hours. Observe their work — audit files, tax returns, client meetings.\\n\\nWeek 4: Complete one full CA Foundation mock paper. Analyse your mistakes methodically.\\n\\nJudgement: If the structured, precise nature of accountancy felt satisfying — CA/CS is your path.",
        entranceExamStrategy: JSON.stringify([{"exam": "CA Foundation (ICAI)", "details": "First level of Chartered Accountancy. 4 papers: Accounting, Business Law, Maths/Statistics, Business Economics. Can register after Class 12. Study alongside B.Com."}, {"exam": "CS Foundation (ICSI)", "details": "First level of Company Secretary. 4 papers: Business Communication, Legal Aptitude, Economic and Business Environment, Fundamentals of Financial Management."}, {"exam": "CMA Foundation (ICAI-CMA)", "details": "Cost & Management Accountancy first level. 4 papers focusing on cost accounting and management principles."}, {"exam": "B.Com Entrance (various universities)", "details": "TSEAMCET / Merit-based admission to Osmania, JNTU for B.Com. Run CA/CS parallel to B.Com for maximum qualification."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Chartered Accountancy career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Commerce (Maths recommended). Participate in competitions and workshops. Connect with professionals in Chartered Accountancy."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CA Foundation (ICAI), CS Foundation (ICSI), CMA Foundation). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Chartered Accountancy. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Chartered Accountancy due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CA Foundation (ICAI) but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Chartered Accountancy", "description": "Big 4 (Deloitte, EY, KPMG, PwC) transfer Indian CAs to global offices in Singapore, London, Dubai, and New York. CMA (US) and ACCA qualifications are globally recognised and pair well with the Indian CA credential."}, {"code": "IN", "title": "India Market for Chartered Accountancy", "description": "India has 3.5 lakh CAs for a ₹300+ lakh crore economy — massive undersupply. Every listed company, bank, and major enterprise requires CA services. Hyderabad Big 4 offices offer ₹10–18 LPA starting salaries for qualified CAs."}, {"code": "AP", "title": "AP & Telangana Chartered Accountancy Outlook", "description": "ICAI Hyderabad Branch has 12,000+ members and strong articleship placement. Major corporate headquarters in Hyderabad (TCS, Infosys, Google India, Amazon India) all require finance teams. ICAI Visakhapatnam branch is growing rapidly with AP's expanding industrial sector."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Chartered Accountancy Fit — Explore Others",
        description: "The detailed, rule-bound nature of professional accountancy may not suit your orientation. Business Management (Module 06), Finance Markets (Module 04), or Law (Module 07) may offer better alignment with how you prefer to work.\\n\\nRegional Outlook (AP & Telangana): ICAI Hyderabad Branch has 12,000+ members and strong articleship placement. Major corporate headquarters in Hyderabad (TCS, Infosys, Google India, Amazon India) all require finance teams. ICAI Visakhapatnam branch is growing rapidly with AP's expanding industrial sector.",
        careerPaths: JSON.stringify([{"role": "Chartered Accountant (Practice)", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹30–60+ LPA", "qualification": "CA Final + 3 years articleship"}, {"role": "Company Secretary", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "CS Professional + practice"}, {"role": "Cost & Management Accountant", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "CMA Final + industry experience"}, {"role": "Big 4 Audit Manager", "entrySalary": "₹10–18 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "CA + Big 4 experience"}, {"role": "CFO / Finance Director", "entrySalary": "₹15–25 LPA", "seniorSalary": "₹40–80+ LPA", "qualification": "CA/CMA + MBA + 10+ years experience"}]),
        topColleges: JSON.stringify([{"name": "ICAI Hyderabad Branch (CA", "location": "Foundation)  Hyderabad,", "entrance": "TS ICAI Foundation", "package": "exam  ₹10–25 LPA (CA"}, {"name": "qualified)", "location": "ICAI Visakhapatnam Branch  Vizag, AP  ICAI Foundation", "entrance": "exam  ₹8–20 LPA (CA", "package": "qualified)"}, {"name": "--- PAGE 29 ---", "location": "(parallel CA)  Hyderabad,", "entrance": "TS Merit -based  ₹4–8 LPA (B.Com", "package": "base)"}, {"name": "JNTU Hyderabad B.Com  Hyderabad,", "location": "TS Merit/TSEAMCET  ₹4–8 LPA (B.Com", "entrance": "base)", "package": "CS Foundation — ICSI"}, {"name": "Hyderabad Chapter  Hyderabad,", "location": "TS ICSI Foundation", "entrance": "exam  ₹6–15 LPA (CS", "package": "qualified)"}]),
        thirtyDayTest: "Week 1: Register for CA Foundation mock test (free online). Attempt the Accountancy section. Notice: does the precision and rule-based thinking energise you?\\n\\nWeek 2: Study one chapter of Financial Accounting from ICAI study material. Create structured notes.\\n\\nWeek 3: Visit a CA's office for 2 hours. Observe their work — audit files, tax returns, client meetings.\\n\\nWeek 4: Complete one full CA Foundation mock paper. Analyse your mistakes methodically.\\n\\nJudgement: If the structured, precise nature of accountancy felt satisfying — CA/CS is your path.",
        entranceExamStrategy: JSON.stringify([{"exam": "CA Foundation (ICAI)", "details": "First level of Chartered Accountancy. 4 papers: Accounting, Business Law, Maths/Statistics, Business Economics. Can register after Class 12. Study alongside B.Com."}, {"exam": "CS Foundation (ICSI)", "details": "First level of Company Secretary. 4 papers: Business Communication, Legal Aptitude, Economic and Business Environment, Fundamentals of Financial Management."}, {"exam": "CMA Foundation (ICAI-CMA)", "details": "Cost & Management Accountancy first level. 4 papers focusing on cost accounting and management principles."}, {"exam": "B.Com Entrance (various universities)", "details": "TSEAMCET / Merit-based admission to Osmania, JNTU for B.Com. Run CA/CS parallel to B.Com for maximum qualification."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Chartered Accountancy career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Commerce (Maths recommended). Participate in competitions and workshops. Connect with professionals in Chartered Accountancy."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CA Foundation (ICAI), CS Foundation (ICSI), CMA Foundation). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Chartered Accountancy. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Chartered Accountancy due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CA Foundation (ICAI) but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Chartered Accountancy", "description": "Big 4 (Deloitte, EY, KPMG, PwC) transfer Indian CAs to global offices in Singapore, London, Dubai, and New York. CMA (US) and ACCA qualifications are globally recognised and pair well with the Indian CA credential."}, {"code": "IN", "title": "India Market for Chartered Accountancy", "description": "India has 3.5 lakh CAs for a ₹300+ lakh crore economy — massive undersupply. Every listed company, bank, and major enterprise requires CA services. Hyderabad Big 4 offices offer ₹10–18 LPA starting salaries for qualified CAs."}, {"code": "AP", "title": "AP & Telangana Chartered Accountancy Outlook", "description": "ICAI Hyderabad Branch has 12,000+ members and strong articleship placement. Major corporate headquarters in Hyderabad (TCS, Infosys, Google India, Amazon India) all require finance teams. ICAI Visakhapatnam branch is growing rapidly with AP's expanding industrial sector."}]),
      },
    ];

    for (const r of mod05Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: ca.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: ca.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 05 reports seeded (3 tiers)");
  }

  // --- Reports for Module 06 (Business Management, Marketing & Entrepreneurship) ---
  if (biz) {
    const mod06Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Business Management Fit — Strong Fit",
        description: "Your entrepreneurial instinct, persuasion orientation, and systems thinking align strongly with business management. Consider BBA at a strong institution followed by CAT preparation. Equally, starting a small venture during college is your most honest signal.\\n\\nRegional Outlook (AP & Telangana): T-Hub in Hyderabad is Asia's largest startup incubator. Telugu entrepreneurs founded Adobe (Shantanu Narayen) and several major Indian unicorns. AP ICET and TS ICET provide pathways to 500+ MBA colleges in both states. Amaravati's development is creating new business opportunities in AP.",
        careerPaths: JSON.stringify([{"role": "Management Consultant", "entrySalary": "₹10–20 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "MBA from IIM/ISB + consulting experience"}, {"role": "Product Manager", "entrySalary": "₹8–18 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "MBA/B.Tech + product experience"}, {"role": "Marketing Manager", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MBA Marketing + digital skills"}, {"role": "Entrepreneur / Startup Founder", "entrySalary": "Variable", "seniorSalary": "Unlimited", "qualification": "BBA/MBA + business acumen + risk tolerance"}, {"role": "HR Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "MBA HR + SHRM/CIPD certification"}]),
        topColleges: JSON.stringify([{"name": "BITS School of Management", "location": "(BITSSOM Hyderabad)  Hyderabad,", "entrance": "TS CAT/GMAT  ₹18–22 LPA avg", "package": "ISB Hyderabad  Hyderabad,"}, {"name": "TS GMAT/GRE (post -", "location": "experience)  ₹35+ LPA avg", "entrance": "--- PAGE 31 ---", "package": "Hyderabad  Hyderabad,"}, {"name": "TS IBSAT/CAT  ₹8–16 LPA avg", "location": "Andhra University MBA  Vizag, AP  AP ICET  ₹5–10 LPA avg", "entrance": "Osmania University MBA  Hyderabad,", "package": "TS TS ICET  ₹5–10 LPA avg"}]),
        thirtyDayTest: "Week 1: Identify 3 problems in your neighbourhood that could be solved with a business. Write a one-page business plan for one.\\n\\nWeek 2: Interview 2 small business owners. Ask: How did you start? What was hardest? Would you do it again?\\n\\nWeek 3: Read one chapter of 'Zero to One' by Peter Thiel. Does the startup thinking excite you?\\n\\nWeek 4: Try selling something (even a skill or service) to 10 people. Track your results.\\n\\nJudgement: If building, selling, and problem-solving felt natural — business is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CAT (Common Admission Test)", "details": "Gateway to 20 IIMs + 200 top MBA colleges. Quantitative Aptitude, Verbal Ability, Data Interpretation. Target score 95+ percentile for IIM."}, {"exam": "AP ICET / TS ICET", "details": "State-level MBA/MCA entrance. Gateway to 500+ MBA colleges in AP and Telangana. Easier than CAT — strong backup option."}, {"exam": "XAT (Xavier Aptitude Test)", "details": "For XLRI Jamshedpur + XLRI Hyderabad campus. Essay writing component unique to XAT."}, {"exam": "IPMAT", "details": "IIM Indore 5-year integrated MBA after Class 12. One of the most competitive post-12th management entrances."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Business Management career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Commerce preferred). Participate in competitions and workshops. Connect with professionals in Business Management."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CAT, MAT, XAT, ICET (for MBA in AP/TS)). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Business Management. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Business Management due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Business Management", "description": "India's startup ecosystem is the world's third largest. Indian MBA graduates at IIM/ISB regularly move into global consulting (McKinsey, BCG, Bain) and Fortune 500 leadership roles. T-Hub Hyderabad has international startup accelerator connections."}, {"code": "IN", "title": "India Market for Business Management", "description": "ISB Hyderabad is India's top-ranked business school by salary outcome (₹35+ LPA avg). India's startup funding crossed $10 billion in 2024. CAT top scorers from AP/TS access IIM Ahmedabad, Bangalore, and Calcutta — all with strong placement outcomes."}, {"code": "AP", "title": "AP & Telangana Business Management Outlook", "description": "T-Hub in Hyderabad is Asia's largest startup incubator. Telugu entrepreneurs founded Adobe (Shantanu Narayen) and several major Indian unicorns. AP ICET and TS ICET provide pathways to 500+ MBA colleges in both states. Amaravati's development is creating new business opportunities in AP."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Business Management Fit — Possible Fit",
        description: "You have business potential but may prefer structured corporate roles over open-ended entrepreneurship. Explore marketing, strategy consulting, or product management as career tracks that combine analytical and people skills.\\n\\nRegional Outlook (AP & Telangana): T-Hub in Hyderabad is Asia's largest startup incubator. Telugu entrepreneurs founded Adobe (Shantanu Narayen) and several major Indian unicorns. AP ICET and TS ICET provide pathways to 500+ MBA colleges in both states. Amaravati's development is creating new business opportunities in AP.",
        careerPaths: JSON.stringify([{"role": "Management Consultant", "entrySalary": "₹10–20 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "MBA from IIM/ISB + consulting experience"}, {"role": "Product Manager", "entrySalary": "₹8–18 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "MBA/B.Tech + product experience"}, {"role": "Marketing Manager", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MBA Marketing + digital skills"}, {"role": "Entrepreneur / Startup Founder", "entrySalary": "Variable", "seniorSalary": "Unlimited", "qualification": "BBA/MBA + business acumen + risk tolerance"}, {"role": "HR Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "MBA HR + SHRM/CIPD certification"}]),
        topColleges: JSON.stringify([{"name": "BITS School of Management", "location": "(BITSSOM Hyderabad)  Hyderabad,", "entrance": "TS CAT/GMAT  ₹18–22 LPA avg", "package": "ISB Hyderabad  Hyderabad,"}, {"name": "TS GMAT/GRE (post -", "location": "experience)  ₹35+ LPA avg", "entrance": "--- PAGE 31 ---", "package": "Hyderabad  Hyderabad,"}, {"name": "TS IBSAT/CAT  ₹8–16 LPA avg", "location": "Andhra University MBA  Vizag, AP  AP ICET  ₹5–10 LPA avg", "entrance": "Osmania University MBA  Hyderabad,", "package": "TS TS ICET  ₹5–10 LPA avg"}]),
        thirtyDayTest: "Week 1: Identify 3 problems in your neighbourhood that could be solved with a business. Write a one-page business plan for one.\\n\\nWeek 2: Interview 2 small business owners. Ask: How did you start? What was hardest? Would you do it again?\\n\\nWeek 3: Read one chapter of 'Zero to One' by Peter Thiel. Does the startup thinking excite you?\\n\\nWeek 4: Try selling something (even a skill or service) to 10 people. Track your results.\\n\\nJudgement: If building, selling, and problem-solving felt natural — business is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CAT (Common Admission Test)", "details": "Gateway to 20 IIMs + 200 top MBA colleges. Quantitative Aptitude, Verbal Ability, Data Interpretation. Target score 95+ percentile for IIM."}, {"exam": "AP ICET / TS ICET", "details": "State-level MBA/MCA entrance. Gateway to 500+ MBA colleges in AP and Telangana. Easier than CAT — strong backup option."}, {"exam": "XAT (Xavier Aptitude Test)", "details": "For XLRI Jamshedpur + XLRI Hyderabad campus. Essay writing component unique to XAT."}, {"exam": "IPMAT", "details": "IIM Indore 5-year integrated MBA after Class 12. One of the most competitive post-12th management entrances."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Business Management career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Commerce preferred). Participate in competitions and workshops. Connect with professionals in Business Management."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CAT, MAT, XAT, ICET (for MBA in AP/TS)). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Business Management. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Business Management due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Business Management", "description": "India's startup ecosystem is the world's third largest. Indian MBA graduates at IIM/ISB regularly move into global consulting (McKinsey, BCG, Bain) and Fortune 500 leadership roles. T-Hub Hyderabad has international startup accelerator connections."}, {"code": "IN", "title": "India Market for Business Management", "description": "ISB Hyderabad is India's top-ranked business school by salary outcome (₹35+ LPA avg). India's startup funding crossed $10 billion in 2024. CAT top scorers from AP/TS access IIM Ahmedabad, Bangalore, and Calcutta — all with strong placement outcomes."}, {"code": "AP", "title": "AP & Telangana Business Management Outlook", "description": "T-Hub in Hyderabad is Asia's largest startup incubator. Telugu entrepreneurs founded Adobe (Shantanu Narayen) and several major Indian unicorns. AP ICET and TS ICET provide pathways to 500+ MBA colleges in both states. Amaravati's development is creating new business opportunities in AP."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Business Management Fit — Explore Others",
        description: "Entrepreneurship and business leadership may not be your primary orientation. Finance (Module 04), Law (Module 07), or Engineering (Module 01) may offer better alignment with how you prefer to solve problems.\\n\\nRegional Outlook (AP & Telangana): T-Hub in Hyderabad is Asia's largest startup incubator. Telugu entrepreneurs founded Adobe (Shantanu Narayen) and several major Indian unicorns. AP ICET and TS ICET provide pathways to 500+ MBA colleges in both states. Amaravati's development is creating new business opportunities in AP.",
        careerPaths: JSON.stringify([{"role": "Management Consultant", "entrySalary": "₹10–20 LPA", "seniorSalary": "₹30–80+ LPA", "qualification": "MBA from IIM/ISB + consulting experience"}, {"role": "Product Manager", "entrySalary": "₹8–18 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "MBA/B.Tech + product experience"}, {"role": "Marketing Manager", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MBA Marketing + digital skills"}, {"role": "Entrepreneur / Startup Founder", "entrySalary": "Variable", "seniorSalary": "Unlimited", "qualification": "BBA/MBA + business acumen + risk tolerance"}, {"role": "HR Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "MBA HR + SHRM/CIPD certification"}]),
        topColleges: JSON.stringify([{"name": "BITS School of Management", "location": "(BITSSOM Hyderabad)  Hyderabad,", "entrance": "TS CAT/GMAT  ₹18–22 LPA avg", "package": "ISB Hyderabad  Hyderabad,"}, {"name": "TS GMAT/GRE (post -", "location": "experience)  ₹35+ LPA avg", "entrance": "--- PAGE 31 ---", "package": "Hyderabad  Hyderabad,"}, {"name": "TS IBSAT/CAT  ₹8–16 LPA avg", "location": "Andhra University MBA  Vizag, AP  AP ICET  ₹5–10 LPA avg", "entrance": "Osmania University MBA  Hyderabad,", "package": "TS TS ICET  ₹5–10 LPA avg"}]),
        thirtyDayTest: "Week 1: Identify 3 problems in your neighbourhood that could be solved with a business. Write a one-page business plan for one.\\n\\nWeek 2: Interview 2 small business owners. Ask: How did you start? What was hardest? Would you do it again?\\n\\nWeek 3: Read one chapter of 'Zero to One' by Peter Thiel. Does the startup thinking excite you?\\n\\nWeek 4: Try selling something (even a skill or service) to 10 people. Track your results.\\n\\nJudgement: If building, selling, and problem-solving felt natural — business is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CAT (Common Admission Test)", "details": "Gateway to 20 IIMs + 200 top MBA colleges. Quantitative Aptitude, Verbal Ability, Data Interpretation. Target score 95+ percentile for IIM."}, {"exam": "AP ICET / TS ICET", "details": "State-level MBA/MCA entrance. Gateway to 500+ MBA colleges in AP and Telangana. Easier than CAT — strong backup option."}, {"exam": "XAT (Xavier Aptitude Test)", "details": "For XLRI Jamshedpur + XLRI Hyderabad campus. Essay writing component unique to XAT."}, {"exam": "IPMAT", "details": "IIM Indore 5-year integrated MBA after Class 12. One of the most competitive post-12th management entrances."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Business Management career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Commerce preferred). Participate in competitions and workshops. Connect with professionals in Business Management."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CAT, MAT, XAT, ICET (for MBA in AP/TS)). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Business Management. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Business Management due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Business Management", "description": "India's startup ecosystem is the world's third largest. Indian MBA graduates at IIM/ISB regularly move into global consulting (McKinsey, BCG, Bain) and Fortune 500 leadership roles. T-Hub Hyderabad has international startup accelerator connections."}, {"code": "IN", "title": "India Market for Business Management", "description": "ISB Hyderabad is India's top-ranked business school by salary outcome (₹35+ LPA avg). India's startup funding crossed $10 billion in 2024. CAT top scorers from AP/TS access IIM Ahmedabad, Bangalore, and Calcutta — all with strong placement outcomes."}, {"code": "AP", "title": "AP & Telangana Business Management Outlook", "description": "T-Hub in Hyderabad is Asia's largest startup incubator. Telugu entrepreneurs founded Adobe (Shantanu Narayen) and several major Indian unicorns. AP ICET and TS ICET provide pathways to 500+ MBA colleges in both states. Amaravati's development is creating new business opportunities in AP."}]),
      },
    ];

    for (const r of mod06Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: biz.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: biz.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 06 reports seeded (3 tiers)");
  }

  // --- Reports for Module 07 (Law, Legal Services & Policy) ---
  if (law) {
    const mod07Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Law Fit — Strong Fit",
        description: "Your argumentative instinct, precision with language, and sense of justice align strongly with a legal career. Take Humanities in Class 11 and begin CLAT preparation. Also prepare for TS LAWCET and AP LAWCET simultaneously.\\n\\nRegional Outlook (AP & Telangana): Telangana High Court and Andhra Pradesh High Court both offer significant litigation opportunity. NALSAR University (Hyderabad) and DSNLU (Vizag) are premier institutions. TS LAWCET and AP LAWCET provide access to 150+ law colleges in both states.",
        careerPaths: JSON.stringify([{"role": "Corporate Lawyer (Law Firm)", "entrySalary": "₹8–20 LPA", "seniorSalary": "₹40–80+ LPA", "qualification": "5-year BA LLB from NLU + corporate experience"}, {"role": "Litigation Advocate", "entrySalary": "₹2–5 LPA (junior)", "seniorSalary": "₹5–10 Cr/year (senior)", "qualification": "LLB + High Court practice + 15+ years"}, {"role": "Legal Tech / Policy Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "LLB + tech skills or policy research"}, {"role": "Judiciary (Judge)", "entrySalary": "₹6–10 LPA + perks", "seniorSalary": "₹15–25 LPA + perks", "qualification": "LLB + Judicial Services Exam"}, {"role": "International Arbitration Lawyer", "entrySalary": "₹15–30 LPA", "seniorSalary": "₹50–100+ LPA", "qualification": "LLB + LLM (Oxford/Harvard) + international experience"}]),
        topColleges: JSON.stringify([{"name": "NALSAR University of Law  Hyderabad,", "location": "TS CLAT (AIQ) / TS", "entrance": "LAWCET  ₹10–25 LPA (law", "package": "firm)"}, {"name": "DSNLU (Damodaram", "location": "Sanjivayya NLU)  Vizag, AP  CLAT (AIQ) / AP", "entrance": "LAWCET  ₹8–18 LPA", "package": "--- PAGE 33 ---"}, {"name": "College  Hyderabad,", "location": "TS TS LAWCET  ₹6–15 LPA (litigation", "entrance": "builds over time)", "package": "GITAM School of Law  Vizag /"}, {"name": "Hyderabad  CLAT / TS LAWCET  ₹5–12 LPA", "location": "University College of Law,", "entrance": "Osmania  Hyderabad,", "package": "TS TS LAWCET (high"}]),
        thirtyDayTest: "Week 1: Read 3 landmark Supreme Court judgments (available on indiankanoon.org). Notice: does the legal reasoning engage you?\\n\\nWeek 2: Watch 3 episodes of a legal drama (The Lincoln Lawyer, Better Call Saul, or Suits). Write what genuinely interested you about the legal process.\\n\\nWeek 3: Attend one day at a local court (District Court). Observe 3 hearings. Notice your reaction to the courtroom environment.\\n\\nWeek 4: Debate a policy issue with a friend — argue the opposite position. Was it intellectually exciting?\\n\\nJudgement: If reading judgments and arguing positions felt natural — law is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CLAT (Common Law Admission Test)", "details": "Gateway to 22 National Law Universities. Tests English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques."}, {"exam": "AP LAWCET", "details": "Conducted by Sri Krishnadevaraya University for law admissions in AP. Gateway to 80+ law colleges in Andhra Pradesh."}, {"exam": "TS LAWCET", "details": "Conducted by Osmania University for law admissions in Telangana. Gateway to 70+ law colleges including NALSAR."}, {"exam": "AILET (All India Law Entrance Test)", "details": "For NLU Delhi admission. National-level exam with separate application from CLAT."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Law career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Humanities preferred). Participate in competitions and workshops. Connect with professionals in Law."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CLAT, TS LAWCET, AP LAWCET, AILET). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Law. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Law due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CLAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Law", "description": "Indian LLB graduates with CLAT top ranks increasingly pursue LLM at Oxford, Cambridge, Harvard, and NYU. International arbitration, human rights law, and corporate cross-border transactions are growing international practice areas for Indian lawyers."}, {"code": "IN", "title": "India Market for Law", "description": "NALSAR Hyderabad is India's second-ranked NLU. The Supreme Court, High Courts, and India's growing corporate legal sector all offer strong career pathways. India's legal services market is projected to reach ₹1.3 lakh crore by 2030."}, {"code": "AP", "title": "AP & Telangana Law Outlook", "description": "Telangana High Court and Andhra Pradesh High Court both offer significant litigation opportunity. NALSAR University (Hyderabad) and DSNLU (Vizag) are premier institutions. TS LAWCET and AP LAWCET provide access to 150+ law colleges in both states."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Law Fit — Possible Fit",
        description: "You have legal aptitude but may prefer policy, compliance, or corporate legal roles over litigation. Explore Corporate Law, Legal Tech, or Public Policy as tracks that use legal thinking without requiring daily court work.\\n\\nRegional Outlook (AP & Telangana): Telangana High Court and Andhra Pradesh High Court both offer significant litigation opportunity. NALSAR University (Hyderabad) and DSNLU (Vizag) are premier institutions. TS LAWCET and AP LAWCET provide access to 150+ law colleges in both states.",
        careerPaths: JSON.stringify([{"role": "Corporate Lawyer (Law Firm)", "entrySalary": "₹8–20 LPA", "seniorSalary": "₹40–80+ LPA", "qualification": "5-year BA LLB from NLU + corporate experience"}, {"role": "Litigation Advocate", "entrySalary": "₹2–5 LPA (junior)", "seniorSalary": "₹5–10 Cr/year (senior)", "qualification": "LLB + High Court practice + 15+ years"}, {"role": "Legal Tech / Policy Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "LLB + tech skills or policy research"}, {"role": "Judiciary (Judge)", "entrySalary": "₹6–10 LPA + perks", "seniorSalary": "₹15–25 LPA + perks", "qualification": "LLB + Judicial Services Exam"}, {"role": "International Arbitration Lawyer", "entrySalary": "₹15–30 LPA", "seniorSalary": "₹50–100+ LPA", "qualification": "LLB + LLM (Oxford/Harvard) + international experience"}]),
        topColleges: JSON.stringify([{"name": "NALSAR University of Law  Hyderabad,", "location": "TS CLAT (AIQ) / TS", "entrance": "LAWCET  ₹10–25 LPA (law", "package": "firm)"}, {"name": "DSNLU (Damodaram", "location": "Sanjivayya NLU)  Vizag, AP  CLAT (AIQ) / AP", "entrance": "LAWCET  ₹8–18 LPA", "package": "--- PAGE 33 ---"}, {"name": "College  Hyderabad,", "location": "TS TS LAWCET  ₹6–15 LPA (litigation", "entrance": "builds over time)", "package": "GITAM School of Law  Vizag /"}, {"name": "Hyderabad  CLAT / TS LAWCET  ₹5–12 LPA", "location": "University College of Law,", "entrance": "Osmania  Hyderabad,", "package": "TS TS LAWCET (high"}]),
        thirtyDayTest: "Week 1: Read 3 landmark Supreme Court judgments (available on indiankanoon.org). Notice: does the legal reasoning engage you?\\n\\nWeek 2: Watch 3 episodes of a legal drama (The Lincoln Lawyer, Better Call Saul, or Suits). Write what genuinely interested you about the legal process.\\n\\nWeek 3: Attend one day at a local court (District Court). Observe 3 hearings. Notice your reaction to the courtroom environment.\\n\\nWeek 4: Debate a policy issue with a friend — argue the opposite position. Was it intellectually exciting?\\n\\nJudgement: If reading judgments and arguing positions felt natural — law is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CLAT (Common Law Admission Test)", "details": "Gateway to 22 National Law Universities. Tests English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques."}, {"exam": "AP LAWCET", "details": "Conducted by Sri Krishnadevaraya University for law admissions in AP. Gateway to 80+ law colleges in Andhra Pradesh."}, {"exam": "TS LAWCET", "details": "Conducted by Osmania University for law admissions in Telangana. Gateway to 70+ law colleges including NALSAR."}, {"exam": "AILET (All India Law Entrance Test)", "details": "For NLU Delhi admission. National-level exam with separate application from CLAT."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Law career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Humanities preferred). Participate in competitions and workshops. Connect with professionals in Law."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CLAT, TS LAWCET, AP LAWCET, AILET). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Law. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Law due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CLAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Law", "description": "Indian LLB graduates with CLAT top ranks increasingly pursue LLM at Oxford, Cambridge, Harvard, and NYU. International arbitration, human rights law, and corporate cross-border transactions are growing international practice areas for Indian lawyers."}, {"code": "IN", "title": "India Market for Law", "description": "NALSAR Hyderabad is India's second-ranked NLU. The Supreme Court, High Courts, and India's growing corporate legal sector all offer strong career pathways. India's legal services market is projected to reach ₹1.3 lakh crore by 2030."}, {"code": "AP", "title": "AP & Telangana Law Outlook", "description": "Telangana High Court and Andhra Pradesh High Court both offer significant litigation opportunity. NALSAR University (Hyderabad) and DSNLU (Vizag) are premier institutions. TS LAWCET and AP LAWCET provide access to 150+ law colleges in both states."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Law Fit — Explore Others",
        description: "The reading intensity and adversarial nature of legal practice may not suit your orientation. Business (Module 06), Psychology (Module 09), or Civil Services (Module 08) may offer better alignment.\\n\\nRegional Outlook (AP & Telangana): Telangana High Court and Andhra Pradesh High Court both offer significant litigation opportunity. NALSAR University (Hyderabad) and DSNLU (Vizag) are premier institutions. TS LAWCET and AP LAWCET provide access to 150+ law colleges in both states.",
        careerPaths: JSON.stringify([{"role": "Corporate Lawyer (Law Firm)", "entrySalary": "₹8–20 LPA", "seniorSalary": "₹40–80+ LPA", "qualification": "5-year BA LLB from NLU + corporate experience"}, {"role": "Litigation Advocate", "entrySalary": "₹2–5 LPA (junior)", "seniorSalary": "₹5–10 Cr/year (senior)", "qualification": "LLB + High Court practice + 15+ years"}, {"role": "Legal Tech / Policy Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "LLB + tech skills or policy research"}, {"role": "Judiciary (Judge)", "entrySalary": "₹6–10 LPA + perks", "seniorSalary": "₹15–25 LPA + perks", "qualification": "LLB + Judicial Services Exam"}, {"role": "International Arbitration Lawyer", "entrySalary": "₹15–30 LPA", "seniorSalary": "₹50–100+ LPA", "qualification": "LLB + LLM (Oxford/Harvard) + international experience"}]),
        topColleges: JSON.stringify([{"name": "NALSAR University of Law  Hyderabad,", "location": "TS CLAT (AIQ) / TS", "entrance": "LAWCET  ₹10–25 LPA (law", "package": "firm)"}, {"name": "DSNLU (Damodaram", "location": "Sanjivayya NLU)  Vizag, AP  CLAT (AIQ) / AP", "entrance": "LAWCET  ₹8–18 LPA", "package": "--- PAGE 33 ---"}, {"name": "College  Hyderabad,", "location": "TS TS LAWCET  ₹6–15 LPA (litigation", "entrance": "builds over time)", "package": "GITAM School of Law  Vizag /"}, {"name": "Hyderabad  CLAT / TS LAWCET  ₹5–12 LPA", "location": "University College of Law,", "entrance": "Osmania  Hyderabad,", "package": "TS TS LAWCET (high"}]),
        thirtyDayTest: "Week 1: Read 3 landmark Supreme Court judgments (available on indiankanoon.org). Notice: does the legal reasoning engage you?\\n\\nWeek 2: Watch 3 episodes of a legal drama (The Lincoln Lawyer, Better Call Saul, or Suits). Write what genuinely interested you about the legal process.\\n\\nWeek 3: Attend one day at a local court (District Court). Observe 3 hearings. Notice your reaction to the courtroom environment.\\n\\nWeek 4: Debate a policy issue with a friend — argue the opposite position. Was it intellectually exciting?\\n\\nJudgement: If reading judgments and arguing positions felt natural — law is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CLAT (Common Law Admission Test)", "details": "Gateway to 22 National Law Universities. Tests English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques."}, {"exam": "AP LAWCET", "details": "Conducted by Sri Krishnadevaraya University for law admissions in AP. Gateway to 80+ law colleges in Andhra Pradesh."}, {"exam": "TS LAWCET", "details": "Conducted by Osmania University for law admissions in Telangana. Gateway to 70+ law colleges including NALSAR."}, {"exam": "AILET (All India Law Entrance Test)", "details": "For NLU Delhi admission. National-level exam with separate application from CLAT."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Law career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Humanities preferred). Participate in competitions and workshops. Connect with professionals in Law."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CLAT, TS LAWCET, AP LAWCET, AILET). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Law. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Law due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CLAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Law", "description": "Indian LLB graduates with CLAT top ranks increasingly pursue LLM at Oxford, Cambridge, Harvard, and NYU. International arbitration, human rights law, and corporate cross-border transactions are growing international practice areas for Indian lawyers."}, {"code": "IN", "title": "India Market for Law", "description": "NALSAR Hyderabad is India's second-ranked NLU. The Supreme Court, High Courts, and India's growing corporate legal sector all offer strong career pathways. India's legal services market is projected to reach ₹1.3 lakh crore by 2030."}, {"code": "AP", "title": "AP & Telangana Law Outlook", "description": "Telangana High Court and Andhra Pradesh High Court both offer significant litigation opportunity. NALSAR University (Hyderabad) and DSNLU (Vizag) are premier institutions. TS LAWCET and AP LAWCET provide access to 150+ law colleges in both states."}]),
      },
    ];

    for (const r of mod07Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: law.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: law.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 07 reports seeded (3 tiers)");
  }

  // --- Reports for Module 08 (Civil Services, Defence & Government) ---
  if (civ) {
    const mod08Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Civil Services Fit — Strong Fit",
        description: "Your service orientation, tolerance for complexity, and patience with long-term goals align strongly with civil services. Begin UPSC preparation parallel to your graduation. Start The Hindu daily. Join an APPSC/TSPSC coaching programme to build the habit of current affairs.\\n\\nRegional Outlook (AP & Telangana): Andhra Pradesh and Telangana have historically produced senior IAS, IPS, and IFS officers in large numbers. APPSC and TSPSC conduct annual examinations with thousands of vacancies. Sainik School Korukonda (East Godavari, AP) provides early defence career preparation. Hyderabad's administrative tradition is strong.",
        careerPaths: JSON.stringify([{"role": "IAS Officer (District Collector/Secretary)", "entrySalary": "₹56K–1L/month + perks", "seniorSalary": "₹2.5L/month + significant perks", "qualification": "Any graduation + UPSC CSE (3–5 attempts)"}, {"role": "IPS Officer", "entrySalary": "₹56K–1L/month + perks", "seniorSalary": "₹2.5L/month + perks", "qualification": "Any graduation + UPSC CSE"}, {"role": "NDA/CDS Military Officer", "entrySalary": "₹56,100/month + full benefits", "seniorSalary": "₹2L+/month + perks", "qualification": "Class 12 (NDA) / Graduation (CDS) + SSB"}, {"role": "APPSC/TSPSC Group 1 Officer", "entrySalary": "₹40K–1L/month", "seniorSalary": "₹1.5L+/month", "qualification": "Graduation + State PSC exam"}, {"role": "IFS (Foreign Service) Officer", "entrySalary": "₹56K/month + posting allowances", "seniorSalary": "₹2.5L/month + international postings", "qualification": "Any graduation + UPSC CSE"}]),
        topColleges: JSON.stringify([{"name": "DSNLU / Any NLU (for law", "location": "optional UPSC)  Various  CLAT then", "entrance": "Graduation  IAS/IPS salary:", "package": "₹56K –2.5L/month +"}, {"name": "perks", "location": "--- PAGE 35 ---", "entrance": "(History/Pol Sci)  Hyderabad,", "package": "TS Merit -based  IAS/IPS — power,"}, {"name": "prestige, societal", "location": "impact", "entrance": "Andhra University", "package": "(History/Economics)  Vizag, AP  Merit -based  APPSC/TSPSC:"}, {"name": "₹40,000 –1.5L/month", "location": "Sainik School Korukonda  East", "entrance": "Godavari, AP  AISSEE entrance  NDA after Class 12 →", "package": "Army/Navy/Air Force"}, {"name": "Officer", "location": "NDA (Khadakwasla)  Pune (via", "entrance": "exam)  NDA written + SSB  ₹56,100+ LPA", "package": "equivalent with all"}]),
        thirtyDayTest: "Week 1: Read The Hindu editorial page daily for 7 days. Make notes on 3 policy issues. Notice: does current affairs reading feel like work or genuine interest?\\n\\nWeek 2: Watch 3 Rajya Sabha/Lok Sabha debate clips. Write 1 paragraph on what you observed about governance.\\n\\nWeek 3: Take one UPSC Prelims mock test (freely available). Analyse your general knowledge score.\\n\\nWeek 4: Talk to a government employee (teacher, collector office staff, bank officer). Ask about their work satisfaction.\\n\\nJudgement: If reading about governance and serving the public felt meaningful — civil services is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "UPSC CSE (Civil Services Examination)", "details": "India's premier administrative exam. 3 stages: Prelims (June), Mains (Sep), Interview (Mar). Typical 3-5 attempts for success. Success rate < 0.2%."}, {"exam": "NDA (National Defence Academy)", "details": "After Class 12. Written test (Maths + General Ability) + SSB Interview. Age 16.5-19.5 years. Direct entry to Army/Navy/Air Force officer training."}, {"exam": "APPSC Group 1", "details": "Andhra Pradesh Public Service Commission. State civil services exam with thousands of vacancies for DSP, Deputy Collector, RDO positions."}, {"exam": "TSPSC Group 1", "details": "Telangana State Public Service Commission. Similar to APPSC. State civil services positions in Telangana."}, {"exam": "CDS (Combined Defence Services)", "details": "After graduation. Entry to IMA, OTA, Naval Academy, Air Force Academy. Written + SSB interview."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Civil Services career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream. Participate in competitions and workshops. Connect with professionals in Civil Services."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (UPSC CSE, NDA (Class 12), APPSC, TSPSC, CDS). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Civil Services. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Civil Services due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on UPSC CSE but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Civil Services", "description": "IFS (Indian Foreign Service) officers represent India in embassies worldwide. UN and international organisation roles are accessible to IAS/IPS officers on deputation. India's growing diplomatic importance creates more international postings than at any previous point."}, {"code": "IN", "title": "India Market for Civil Services", "description": "UPSC final lists consistently include Telugu state candidates among top 100 rankers. APPSC Group 1, TSPSC Group 1, and state-level civil services offer thousands of vacancies annually. Defence — NDA, CDSE, Indian Army/Navy/Air Force — all have strong recruitment from AP and TS."}, {"code": "AP", "title": "AP & Telangana Civil Services Outlook", "description": "Andhra Pradesh and Telangana have historically produced senior IAS, IPS, and IFS officers in large numbers. APPSC and TSPSC conduct annual examinations with thousands of vacancies. Sainik School Korukonda (East Godavari, AP) provides early defence career preparation. Hyderabad's administrative tradition is strong."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Civil Services Fit — Possible Fit",
        description: "You have public service inclination but may prefer structured government roles (banking, PSU, judiciary) over the open-ended UPSC track. Explore APPSC Group 1, State Judicial Services, or NABARD/RBI examinations.\\n\\nRegional Outlook (AP & Telangana): Andhra Pradesh and Telangana have historically produced senior IAS, IPS, and IFS officers in large numbers. APPSC and TSPSC conduct annual examinations with thousands of vacancies. Sainik School Korukonda (East Godavari, AP) provides early defence career preparation. Hyderabad's administrative tradition is strong.",
        careerPaths: JSON.stringify([{"role": "IAS Officer (District Collector/Secretary)", "entrySalary": "₹56K–1L/month + perks", "seniorSalary": "₹2.5L/month + significant perks", "qualification": "Any graduation + UPSC CSE (3–5 attempts)"}, {"role": "IPS Officer", "entrySalary": "₹56K–1L/month + perks", "seniorSalary": "₹2.5L/month + perks", "qualification": "Any graduation + UPSC CSE"}, {"role": "NDA/CDS Military Officer", "entrySalary": "₹56,100/month + full benefits", "seniorSalary": "₹2L+/month + perks", "qualification": "Class 12 (NDA) / Graduation (CDS) + SSB"}, {"role": "APPSC/TSPSC Group 1 Officer", "entrySalary": "₹40K–1L/month", "seniorSalary": "₹1.5L+/month", "qualification": "Graduation + State PSC exam"}, {"role": "IFS (Foreign Service) Officer", "entrySalary": "₹56K/month + posting allowances", "seniorSalary": "₹2.5L/month + international postings", "qualification": "Any graduation + UPSC CSE"}]),
        topColleges: JSON.stringify([{"name": "DSNLU / Any NLU (for law", "location": "optional UPSC)  Various  CLAT then", "entrance": "Graduation  IAS/IPS salary:", "package": "₹56K –2.5L/month +"}, {"name": "perks", "location": "--- PAGE 35 ---", "entrance": "(History/Pol Sci)  Hyderabad,", "package": "TS Merit -based  IAS/IPS — power,"}, {"name": "prestige, societal", "location": "impact", "entrance": "Andhra University", "package": "(History/Economics)  Vizag, AP  Merit -based  APPSC/TSPSC:"}, {"name": "₹40,000 –1.5L/month", "location": "Sainik School Korukonda  East", "entrance": "Godavari, AP  AISSEE entrance  NDA after Class 12 →", "package": "Army/Navy/Air Force"}, {"name": "Officer", "location": "NDA (Khadakwasla)  Pune (via", "entrance": "exam)  NDA written + SSB  ₹56,100+ LPA", "package": "equivalent with all"}]),
        thirtyDayTest: "Week 1: Read The Hindu editorial page daily for 7 days. Make notes on 3 policy issues. Notice: does current affairs reading feel like work or genuine interest?\\n\\nWeek 2: Watch 3 Rajya Sabha/Lok Sabha debate clips. Write 1 paragraph on what you observed about governance.\\n\\nWeek 3: Take one UPSC Prelims mock test (freely available). Analyse your general knowledge score.\\n\\nWeek 4: Talk to a government employee (teacher, collector office staff, bank officer). Ask about their work satisfaction.\\n\\nJudgement: If reading about governance and serving the public felt meaningful — civil services is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "UPSC CSE (Civil Services Examination)", "details": "India's premier administrative exam. 3 stages: Prelims (June), Mains (Sep), Interview (Mar). Typical 3-5 attempts for success. Success rate < 0.2%."}, {"exam": "NDA (National Defence Academy)", "details": "After Class 12. Written test (Maths + General Ability) + SSB Interview. Age 16.5-19.5 years. Direct entry to Army/Navy/Air Force officer training."}, {"exam": "APPSC Group 1", "details": "Andhra Pradesh Public Service Commission. State civil services exam with thousands of vacancies for DSP, Deputy Collector, RDO positions."}, {"exam": "TSPSC Group 1", "details": "Telangana State Public Service Commission. Similar to APPSC. State civil services positions in Telangana."}, {"exam": "CDS (Combined Defence Services)", "details": "After graduation. Entry to IMA, OTA, Naval Academy, Air Force Academy. Written + SSB interview."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Civil Services career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream. Participate in competitions and workshops. Connect with professionals in Civil Services."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (UPSC CSE, NDA (Class 12), APPSC, TSPSC, CDS). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Civil Services. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Civil Services due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on UPSC CSE but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Civil Services", "description": "IFS (Indian Foreign Service) officers represent India in embassies worldwide. UN and international organisation roles are accessible to IAS/IPS officers on deputation. India's growing diplomatic importance creates more international postings than at any previous point."}, {"code": "IN", "title": "India Market for Civil Services", "description": "UPSC final lists consistently include Telugu state candidates among top 100 rankers. APPSC Group 1, TSPSC Group 1, and state-level civil services offer thousands of vacancies annually. Defence — NDA, CDSE, Indian Army/Navy/Air Force — all have strong recruitment from AP and TS."}, {"code": "AP", "title": "AP & Telangana Civil Services Outlook", "description": "Andhra Pradesh and Telangana have historically produced senior IAS, IPS, and IFS officers in large numbers. APPSC and TSPSC conduct annual examinations with thousands of vacancies. Sainik School Korukonda (East Godavari, AP) provides early defence career preparation. Hyderabad's administrative tradition is strong."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Civil Services Fit — Explore Others",
        description: "The long preparation period, salary constraints, and posting unpredictability of civil services may not suit your orientation. Law (Module 07), Business (Module 06), or Finance (Module 04) may offer better alignment.\\n\\nRegional Outlook (AP & Telangana): Andhra Pradesh and Telangana have historically produced senior IAS, IPS, and IFS officers in large numbers. APPSC and TSPSC conduct annual examinations with thousands of vacancies. Sainik School Korukonda (East Godavari, AP) provides early defence career preparation. Hyderabad's administrative tradition is strong.",
        careerPaths: JSON.stringify([{"role": "IAS Officer (District Collector/Secretary)", "entrySalary": "₹56K–1L/month + perks", "seniorSalary": "₹2.5L/month + significant perks", "qualification": "Any graduation + UPSC CSE (3–5 attempts)"}, {"role": "IPS Officer", "entrySalary": "₹56K–1L/month + perks", "seniorSalary": "₹2.5L/month + perks", "qualification": "Any graduation + UPSC CSE"}, {"role": "NDA/CDS Military Officer", "entrySalary": "₹56,100/month + full benefits", "seniorSalary": "₹2L+/month + perks", "qualification": "Class 12 (NDA) / Graduation (CDS) + SSB"}, {"role": "APPSC/TSPSC Group 1 Officer", "entrySalary": "₹40K–1L/month", "seniorSalary": "₹1.5L+/month", "qualification": "Graduation + State PSC exam"}, {"role": "IFS (Foreign Service) Officer", "entrySalary": "₹56K/month + posting allowances", "seniorSalary": "₹2.5L/month + international postings", "qualification": "Any graduation + UPSC CSE"}]),
        topColleges: JSON.stringify([{"name": "DSNLU / Any NLU (for law", "location": "optional UPSC)  Various  CLAT then", "entrance": "Graduation  IAS/IPS salary:", "package": "₹56K –2.5L/month +"}, {"name": "perks", "location": "--- PAGE 35 ---", "entrance": "(History/Pol Sci)  Hyderabad,", "package": "TS Merit -based  IAS/IPS — power,"}, {"name": "prestige, societal", "location": "impact", "entrance": "Andhra University", "package": "(History/Economics)  Vizag, AP  Merit -based  APPSC/TSPSC:"}, {"name": "₹40,000 –1.5L/month", "location": "Sainik School Korukonda  East", "entrance": "Godavari, AP  AISSEE entrance  NDA after Class 12 →", "package": "Army/Navy/Air Force"}, {"name": "Officer", "location": "NDA (Khadakwasla)  Pune (via", "entrance": "exam)  NDA written + SSB  ₹56,100+ LPA", "package": "equivalent with all"}]),
        thirtyDayTest: "Week 1: Read The Hindu editorial page daily for 7 days. Make notes on 3 policy issues. Notice: does current affairs reading feel like work or genuine interest?\\n\\nWeek 2: Watch 3 Rajya Sabha/Lok Sabha debate clips. Write 1 paragraph on what you observed about governance.\\n\\nWeek 3: Take one UPSC Prelims mock test (freely available). Analyse your general knowledge score.\\n\\nWeek 4: Talk to a government employee (teacher, collector office staff, bank officer). Ask about their work satisfaction.\\n\\nJudgement: If reading about governance and serving the public felt meaningful — civil services is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "UPSC CSE (Civil Services Examination)", "details": "India's premier administrative exam. 3 stages: Prelims (June), Mains (Sep), Interview (Mar). Typical 3-5 attempts for success. Success rate < 0.2%."}, {"exam": "NDA (National Defence Academy)", "details": "After Class 12. Written test (Maths + General Ability) + SSB Interview. Age 16.5-19.5 years. Direct entry to Army/Navy/Air Force officer training."}, {"exam": "APPSC Group 1", "details": "Andhra Pradesh Public Service Commission. State civil services exam with thousands of vacancies for DSP, Deputy Collector, RDO positions."}, {"exam": "TSPSC Group 1", "details": "Telangana State Public Service Commission. Similar to APPSC. State civil services positions in Telangana."}, {"exam": "CDS (Combined Defence Services)", "details": "After graduation. Entry to IMA, OTA, Naval Academy, Air Force Academy. Written + SSB interview."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Civil Services career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream. Participate in competitions and workshops. Connect with professionals in Civil Services."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (UPSC CSE, NDA (Class 12), APPSC, TSPSC, CDS). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Civil Services. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Civil Services due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on UPSC CSE but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Civil Services", "description": "IFS (Indian Foreign Service) officers represent India in embassies worldwide. UN and international organisation roles are accessible to IAS/IPS officers on deputation. India's growing diplomatic importance creates more international postings than at any previous point."}, {"code": "IN", "title": "India Market for Civil Services", "description": "UPSC final lists consistently include Telugu state candidates among top 100 rankers. APPSC Group 1, TSPSC Group 1, and state-level civil services offer thousands of vacancies annually. Defence — NDA, CDSE, Indian Army/Navy/Air Force — all have strong recruitment from AP and TS."}, {"code": "AP", "title": "AP & Telangana Civil Services Outlook", "description": "Andhra Pradesh and Telangana have historically produced senior IAS, IPS, and IFS officers in large numbers. APPSC and TSPSC conduct annual examinations with thousands of vacancies. Sainik School Korukonda (East Godavari, AP) provides early defence career preparation. Hyderabad's administrative tradition is strong."}]),
      },
    ];

    for (const r of mod08Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: civ.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: civ.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 08 reports seeded (3 tiers)");
  }

  // --- Reports for Module 09 (Psychology, Counselling & Mental Health) ---
  if (psy) {
    const mod09Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Psychology Fit — Strong Fit",
        description: "Your empathy, observational instinct, and genuine curiosity about human behaviour align strongly with a psychology career. Take Humanities or Science (with Biology) in Class 11. Target University of Hyderabad, Osmania University, or NIMHANS for higher study.\\n\\nRegional Outlook (AP & Telangana): Hyderabad, Vizag, and Vijayawada are seeing explosive demand for school counsellors and corporate wellness professionals. University of Hyderabad and Osmania University offer strong clinical psychology programmes. Hyderabad's IT sector creates major demand for corporate mental health services.",
        careerPaths: JSON.stringify([{"role": "Clinical Psychologist (Licensed)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹25–40 LPA", "qualification": "MA/MSc Clinical Psychology + RCI registration + 5 years"}, {"role": "School Counsellor", "entrySalary": "₹3–6 LPA", "seniorSalary": "₹10–20 LPA", "qualification": "MA Psychology + counselling certification"}, {"role": "Corporate Wellness / Organizational Psychologist", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "MA Psychology + corporate training"}, {"role": "Online Therapist (Global Platforms)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–40 LPA", "qualification": "Licensed psychologist + BetterHelp/Talkspace registration"}, {"role": "Neuropsychologist / Researcher", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "PhD Clinical Neuropsychology + research publications"}]),
        topColleges: JSON.stringify([{"name": "NIMHANS Bangalore", "location": "(PG/PhD)  Bangalore", "entrance": "(nearby for", "package": "AP/TS)  NIMHANS entrance  ₹15–40 LPA"}, {"name": "(licensed", "location": "psychologist)", "entrance": "--- PAGE 38 ---", "package": "Psychology  Hyderabad,"}, {"name": "TS CUET/University", "location": "entrance  ₹10–25 LPA (post -", "entrance": "MSc)", "package": "Osmania University —"}, {"name": "Psychology  Hyderabad,", "location": "TS TS EAMCET / Merit  ₹8–20 LPA (post -", "entrance": "MSc)", "package": "GITAM Vizag — BA/BSc"}, {"name": "Psychology  Vizag, AP  Merit -based  ₹6–15 LPA entry", "location": "Sri Padmavati Mahila", "entrance": "Visvavidyalayam  Tirupati, AP  Merit -based  ₹5–12 LPA (Women's", "package": "University)"}]),
        thirtyDayTest: "Week 1: Observe 3 people around you for one week. Write brief notes on their behavioural patterns — what triggers emotions, how they cope with stress.\\n\\nWeek 2: Read one chapter on Attachment Theory (freely available on Psychology Today). Does understanding human behaviour fascinate you?\\n\\nWeek 3: Watch a psychology documentary: 'The Social Dilemma' or 'My Beautiful Broken Brain'. Write what genuinely moved you.\\n\\nWeek 4: Have a 30-minute deep conversation with someone you trust. Practice active listening without giving advice. Notice how it feels.\\n\\nJudgement: If observing, understanding, and helping people felt natural — psychology is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CUET UG", "details": "For BA/BSc Psychology at central universities — University of Hyderabad, DU, JNU, BHU. Multiple domain options."}, {"exam": "NIMHANS Entrance", "details": "National Institute of Mental Health and Neurosciences, Bangalore. India's premier mental health institution. PG/PhD entrance."}, {"exam": "University Merit / Entrance", "details": "Osmania University, Andhra University, GITAM — merit-based or entrance-based BA/BSc Psychology admissions."}, {"exam": "RCI Registration", "details": "Rehabilitation Council of India registration required to practice as licensed clinical psychologist. Requires MPhil/PhD Clinical Psychology."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Psychology career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Humanities / Science (Biology helps). Participate in competitions and workshops. Connect with professionals in Psychology."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CUET, NIMHANS entrance, University Merit). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Psychology. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Psychology due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CUET but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Psychology", "description": "UK, USA, Canada, and Australia actively recruit licensed clinical psychologists from India. Online therapy platforms like BetterHelp and Talkspace are creating global remote counselling opportunities. International trauma and humanitarian psychology roles are growing rapidly."}, {"code": "IN", "title": "India Market for Psychology", "description": "India has 1 psychologist per 83,000 people — a massive undersupply. School counsellor mandates, corporate employee wellness programmes, and the post-pandemic mental health awareness surge are all driving demand. NIMHANS Bangalore is the premier national institution."}, {"code": "AP", "title": "AP & Telangana Psychology Outlook", "description": "Hyderabad, Vizag, and Vijayawada are seeing explosive demand for school counsellors and corporate wellness professionals. University of Hyderabad and Osmania University offer strong clinical psychology programmes. Hyderabad's IT sector creates major demand for corporate mental health services."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Psychology Fit — Possible Fit",
        description: "You have strong empathetic instincts but may prefer applied roles — HR, coaching, school counselling, or corporate wellness — over clinical practice. Explore these parallel tracks alongside your core psychology degree.\\n\\nRegional Outlook (AP & Telangana): Hyderabad, Vizag, and Vijayawada are seeing explosive demand for school counsellors and corporate wellness professionals. University of Hyderabad and Osmania University offer strong clinical psychology programmes. Hyderabad's IT sector creates major demand for corporate mental health services.",
        careerPaths: JSON.stringify([{"role": "Clinical Psychologist (Licensed)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹25–40 LPA", "qualification": "MA/MSc Clinical Psychology + RCI registration + 5 years"}, {"role": "School Counsellor", "entrySalary": "₹3–6 LPA", "seniorSalary": "₹10–20 LPA", "qualification": "MA Psychology + counselling certification"}, {"role": "Corporate Wellness / Organizational Psychologist", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "MA Psychology + corporate training"}, {"role": "Online Therapist (Global Platforms)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–40 LPA", "qualification": "Licensed psychologist + BetterHelp/Talkspace registration"}, {"role": "Neuropsychologist / Researcher", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "PhD Clinical Neuropsychology + research publications"}]),
        topColleges: JSON.stringify([{"name": "NIMHANS Bangalore", "location": "(PG/PhD)  Bangalore", "entrance": "(nearby for", "package": "AP/TS)  NIMHANS entrance  ₹15–40 LPA"}, {"name": "(licensed", "location": "psychologist)", "entrance": "--- PAGE 38 ---", "package": "Psychology  Hyderabad,"}, {"name": "TS CUET/University", "location": "entrance  ₹10–25 LPA (post -", "entrance": "MSc)", "package": "Osmania University —"}, {"name": "Psychology  Hyderabad,", "location": "TS TS EAMCET / Merit  ₹8–20 LPA (post -", "entrance": "MSc)", "package": "GITAM Vizag — BA/BSc"}, {"name": "Psychology  Vizag, AP  Merit -based  ₹6–15 LPA entry", "location": "Sri Padmavati Mahila", "entrance": "Visvavidyalayam  Tirupati, AP  Merit -based  ₹5–12 LPA (Women's", "package": "University)"}]),
        thirtyDayTest: "Week 1: Observe 3 people around you for one week. Write brief notes on their behavioural patterns — what triggers emotions, how they cope with stress.\\n\\nWeek 2: Read one chapter on Attachment Theory (freely available on Psychology Today). Does understanding human behaviour fascinate you?\\n\\nWeek 3: Watch a psychology documentary: 'The Social Dilemma' or 'My Beautiful Broken Brain'. Write what genuinely moved you.\\n\\nWeek 4: Have a 30-minute deep conversation with someone you trust. Practice active listening without giving advice. Notice how it feels.\\n\\nJudgement: If observing, understanding, and helping people felt natural — psychology is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CUET UG", "details": "For BA/BSc Psychology at central universities — University of Hyderabad, DU, JNU, BHU. Multiple domain options."}, {"exam": "NIMHANS Entrance", "details": "National Institute of Mental Health and Neurosciences, Bangalore. India's premier mental health institution. PG/PhD entrance."}, {"exam": "University Merit / Entrance", "details": "Osmania University, Andhra University, GITAM — merit-based or entrance-based BA/BSc Psychology admissions."}, {"exam": "RCI Registration", "details": "Rehabilitation Council of India registration required to practice as licensed clinical psychologist. Requires MPhil/PhD Clinical Psychology."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Psychology career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Humanities / Science (Biology helps). Participate in competitions and workshops. Connect with professionals in Psychology."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CUET, NIMHANS entrance, University Merit). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Psychology. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Psychology due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CUET but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Psychology", "description": "UK, USA, Canada, and Australia actively recruit licensed clinical psychologists from India. Online therapy platforms like BetterHelp and Talkspace are creating global remote counselling opportunities. International trauma and humanitarian psychology roles are growing rapidly."}, {"code": "IN", "title": "India Market for Psychology", "description": "India has 1 psychologist per 83,000 people — a massive undersupply. School counsellor mandates, corporate employee wellness programmes, and the post-pandemic mental health awareness surge are all driving demand. NIMHANS Bangalore is the premier national institution."}, {"code": "AP", "title": "AP & Telangana Psychology Outlook", "description": "Hyderabad, Vizag, and Vijayawada are seeing explosive demand for school counsellors and corporate wellness professionals. University of Hyderabad and Osmania University offer strong clinical psychology programmes. Hyderabad's IT sector creates major demand for corporate mental health services."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Psychology Fit — Explore Others",
        description: "The emotional depth and long training of clinical psychology may not suit your current orientation. Sociology, Communication (Module 11), or Education may offer better alignment if you enjoy understanding people but in a less clinically intensive way.\\n\\nRegional Outlook (AP & Telangana): Hyderabad, Vizag, and Vijayawada are seeing explosive demand for school counsellors and corporate wellness professionals. University of Hyderabad and Osmania University offer strong clinical psychology programmes. Hyderabad's IT sector creates major demand for corporate mental health services.",
        careerPaths: JSON.stringify([{"role": "Clinical Psychologist (Licensed)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹25–40 LPA", "qualification": "MA/MSc Clinical Psychology + RCI registration + 5 years"}, {"role": "School Counsellor", "entrySalary": "₹3–6 LPA", "seniorSalary": "₹10–20 LPA", "qualification": "MA Psychology + counselling certification"}, {"role": "Corporate Wellness / Organizational Psychologist", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "MA Psychology + corporate training"}, {"role": "Online Therapist (Global Platforms)", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–40 LPA", "qualification": "Licensed psychologist + BetterHelp/Talkspace registration"}, {"role": "Neuropsychologist / Researcher", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "PhD Clinical Neuropsychology + research publications"}]),
        topColleges: JSON.stringify([{"name": "NIMHANS Bangalore", "location": "(PG/PhD)  Bangalore", "entrance": "(nearby for", "package": "AP/TS)  NIMHANS entrance  ₹15–40 LPA"}, {"name": "(licensed", "location": "psychologist)", "entrance": "--- PAGE 38 ---", "package": "Psychology  Hyderabad,"}, {"name": "TS CUET/University", "location": "entrance  ₹10–25 LPA (post -", "entrance": "MSc)", "package": "Osmania University —"}, {"name": "Psychology  Hyderabad,", "location": "TS TS EAMCET / Merit  ₹8–20 LPA (post -", "entrance": "MSc)", "package": "GITAM Vizag — BA/BSc"}, {"name": "Psychology  Vizag, AP  Merit -based  ₹6–15 LPA entry", "location": "Sri Padmavati Mahila", "entrance": "Visvavidyalayam  Tirupati, AP  Merit -based  ₹5–12 LPA (Women's", "package": "University)"}]),
        thirtyDayTest: "Week 1: Observe 3 people around you for one week. Write brief notes on their behavioural patterns — what triggers emotions, how they cope with stress.\\n\\nWeek 2: Read one chapter on Attachment Theory (freely available on Psychology Today). Does understanding human behaviour fascinate you?\\n\\nWeek 3: Watch a psychology documentary: 'The Social Dilemma' or 'My Beautiful Broken Brain'. Write what genuinely moved you.\\n\\nWeek 4: Have a 30-minute deep conversation with someone you trust. Practice active listening without giving advice. Notice how it feels.\\n\\nJudgement: If observing, understanding, and helping people felt natural — psychology is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "CUET UG", "details": "For BA/BSc Psychology at central universities — University of Hyderabad, DU, JNU, BHU. Multiple domain options."}, {"exam": "NIMHANS Entrance", "details": "National Institute of Mental Health and Neurosciences, Bangalore. India's premier mental health institution. PG/PhD entrance."}, {"exam": "University Merit / Entrance", "details": "Osmania University, Andhra University, GITAM — merit-based or entrance-based BA/BSc Psychology admissions."}, {"exam": "RCI Registration", "details": "Rehabilitation Council of India registration required to practice as licensed clinical psychologist. Requires MPhil/PhD Clinical Psychology."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Psychology career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Humanities / Science (Biology helps). Participate in competitions and workshops. Connect with professionals in Psychology."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (CUET, NIMHANS entrance, University Merit). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Psychology. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Psychology due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on CUET but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Psychology", "description": "UK, USA, Canada, and Australia actively recruit licensed clinical psychologists from India. Online therapy platforms like BetterHelp and Talkspace are creating global remote counselling opportunities. International trauma and humanitarian psychology roles are growing rapidly."}, {"code": "IN", "title": "India Market for Psychology", "description": "India has 1 psychologist per 83,000 people — a massive undersupply. School counsellor mandates, corporate employee wellness programmes, and the post-pandemic mental health awareness surge are all driving demand. NIMHANS Bangalore is the premier national institution."}, {"code": "AP", "title": "AP & Telangana Psychology Outlook", "description": "Hyderabad, Vizag, and Vijayawada are seeing explosive demand for school counsellors and corporate wellness professionals. University of Hyderabad and Osmania University offer strong clinical psychology programmes. Hyderabad's IT sector creates major demand for corporate mental health services."}]),
      },
    ];

    for (const r of mod09Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: psy.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: psy.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 09 reports seeded (3 tiers)");
  }

  // --- Reports for Module 10 (Design, Animation, Gaming & Creative Arts) ---
  if (des) {
    const mod10Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Design Fit — Strong Fit",
        description: "Your visual instinct, creative drive, and portfolio-building orientation align strongly with a design career. Begin building your portfolio now — not after admission. Prepare for UCEED, NID DAT, or NIFT entrance with past paper practice and portfolio development.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts major gaming studios, animation companies, and the L.V. Prasad Film & TV Academy. NIFT Hyderabad is the premier fashion and design institution in the region. Hyderabad's IT sector creates enormous UX/UI designer demand across 1,400+ technology companies.",
        careerPaths: JSON.stringify([{"role": "UX/UI Designer", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Des/BFA + portfolio + Figma/Sketch skills"}, {"role": "Game Designer / Developer", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "B.Sc Game Design + Unity/Unreal + portfolio"}, {"role": "Motion Graphics / Animator", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Sc Animation + After Effects/Maya skills"}, {"role": "Product Designer", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹30–50 LPA", "qualification": "B.Des + product thinking + user research skills"}, {"role": "Fashion / Textile Designer", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "NIFT degree + industry internship"}]),
        topColleges: JSON.stringify([{"name": "CEPT University (Design", "location": "programs)  Ahmedabad", "entrance": "(national", "package": "target)  NID DAT / CEPT"}, {"name": "entrance  ₹8–25 LPA", "location": "(UX/Product)", "entrance": "NIFT Hyderabad  Hyderabad,", "package": "TS NIFT entrance test  ₹5–15 LPA"}, {"name": "(Fashion/Textile)", "location": "--- PAGE 40 ---", "entrance": "Academy  Hyderabad,", "package": "TS Portfolio + interview  ₹5–20 LPA"}, {"name": "(Film/Media design)", "location": "JNTU Hyderabad — B.Sc", "entrance": "Animation  Hyderabad,", "package": "TS TS EAMCET / Merit  ₹4–12 LPA"}]),
        thirtyDayTest: "Week 1: Create one design project per day for 7 days — a poster, a logo sketch, a UI mockup, anything visual. Use free tools (Canva, Figma).\\n\\nWeek 2: Redesign one app screen that you find frustrating. Compare your version with the original.\\n\\nWeek 3: Watch 3 episodes of 'Abstract: The Art of Design' (Netflix). Write what genuinely excited you.\\n\\nWeek 4: Build one complete portfolio piece — from concept to final design.\\n\\nJudgement: If creating design work voluntarily felt like play — design is your calling. If you had to force yourself — explore other paths.",
        entranceExamStrategy: JSON.stringify([{"exam": "NID DAT (Design Aptitude Test)", "details": "Gateway to National Institute of Design — Ahmedabad, Hyderabad, and other campuses. Tests design thinking, visual perception, observation."}, {"exam": "NIFT Entrance Test", "details": "For National Institute of Fashion Technology. NIFT Hyderabad campus. Tests creative ability, general ability, situation test."}, {"exam": "UCEED (Undergraduate Common Entrance Exam for Design)", "details": "For B.Des at IITs. Conducted by IIT Bombay. Tests visualization, observation, design thinking."}, {"exam": "CEED (Common Entrance Exam for Design)", "details": "For M.Des at IITs and IISc. Post-graduate design entrance."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Design career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Portfolio essential). Participate in competitions and workshops. Connect with professionals in Design."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (NID DAT, NIFT entrance, UCEED, CEED, State entrance). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Design. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Design due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on NID DAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Design", "description": "UX/UI designers, game designers, and motion graphics artists are globally in demand. Indian design graduates work at Google, Adobe, Amazon, and top gaming studios. The global gaming industry crossed USD 200 billion — larger than film and music combined."}, {"code": "IN", "title": "India Market for Design", "description": "India's gaming industry is projected to reach ₹25,000 crore by 2028. UX/UI demand is at an all-time high — every app and digital product needs designers. OTT platforms (Netflix, Amazon Prime, SonyLIV, Aha) are creating massive animation and content production demand."}, {"code": "AP", "title": "AP & Telangana Design Outlook", "description": "Hyderabad hosts major gaming studios, animation companies, and the L.V. Prasad Film & TV Academy. NIFT Hyderabad is the premier fashion and design institution in the region. Hyderabad's IT sector creates enormous UX/UI designer demand across 1,400+ technology companies."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Design Fit — Possible Fit",
        description: "You have creative aptitude but need to verify whether design is your primary calling. Take the 30-Day Portfolio Test: create one design project per week for a month. Whether you continue voluntarily is your most honest signal.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts major gaming studios, animation companies, and the L.V. Prasad Film & TV Academy. NIFT Hyderabad is the premier fashion and design institution in the region. Hyderabad's IT sector creates enormous UX/UI designer demand across 1,400+ technology companies.",
        careerPaths: JSON.stringify([{"role": "UX/UI Designer", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Des/BFA + portfolio + Figma/Sketch skills"}, {"role": "Game Designer / Developer", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "B.Sc Game Design + Unity/Unreal + portfolio"}, {"role": "Motion Graphics / Animator", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Sc Animation + After Effects/Maya skills"}, {"role": "Product Designer", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹30–50 LPA", "qualification": "B.Des + product thinking + user research skills"}, {"role": "Fashion / Textile Designer", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "NIFT degree + industry internship"}]),
        topColleges: JSON.stringify([{"name": "CEPT University (Design", "location": "programs)  Ahmedabad", "entrance": "(national", "package": "target)  NID DAT / CEPT"}, {"name": "entrance  ₹8–25 LPA", "location": "(UX/Product)", "entrance": "NIFT Hyderabad  Hyderabad,", "package": "TS NIFT entrance test  ₹5–15 LPA"}, {"name": "(Fashion/Textile)", "location": "--- PAGE 40 ---", "entrance": "Academy  Hyderabad,", "package": "TS Portfolio + interview  ₹5–20 LPA"}, {"name": "(Film/Media design)", "location": "JNTU Hyderabad — B.Sc", "entrance": "Animation  Hyderabad,", "package": "TS TS EAMCET / Merit  ₹4–12 LPA"}]),
        thirtyDayTest: "Week 1: Create one design project per day for 7 days — a poster, a logo sketch, a UI mockup, anything visual. Use free tools (Canva, Figma).\\n\\nWeek 2: Redesign one app screen that you find frustrating. Compare your version with the original.\\n\\nWeek 3: Watch 3 episodes of 'Abstract: The Art of Design' (Netflix). Write what genuinely excited you.\\n\\nWeek 4: Build one complete portfolio piece — from concept to final design.\\n\\nJudgement: If creating design work voluntarily felt like play — design is your calling. If you had to force yourself — explore other paths.",
        entranceExamStrategy: JSON.stringify([{"exam": "NID DAT (Design Aptitude Test)", "details": "Gateway to National Institute of Design — Ahmedabad, Hyderabad, and other campuses. Tests design thinking, visual perception, observation."}, {"exam": "NIFT Entrance Test", "details": "For National Institute of Fashion Technology. NIFT Hyderabad campus. Tests creative ability, general ability, situation test."}, {"exam": "UCEED (Undergraduate Common Entrance Exam for Design)", "details": "For B.Des at IITs. Conducted by IIT Bombay. Tests visualization, observation, design thinking."}, {"exam": "CEED (Common Entrance Exam for Design)", "details": "For M.Des at IITs and IISc. Post-graduate design entrance."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Design career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Portfolio essential). Participate in competitions and workshops. Connect with professionals in Design."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (NID DAT, NIFT entrance, UCEED, CEED, State entrance). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Design. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Design due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on NID DAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Design", "description": "UX/UI designers, game designers, and motion graphics artists are globally in demand. Indian design graduates work at Google, Adobe, Amazon, and top gaming studios. The global gaming industry crossed USD 200 billion — larger than film and music combined."}, {"code": "IN", "title": "India Market for Design", "description": "India's gaming industry is projected to reach ₹25,000 crore by 2028. UX/UI demand is at an all-time high — every app and digital product needs designers. OTT platforms (Netflix, Amazon Prime, SonyLIV, Aha) are creating massive animation and content production demand."}, {"code": "AP", "title": "AP & Telangana Design Outlook", "description": "Hyderabad hosts major gaming studios, animation companies, and the L.V. Prasad Film & TV Academy. NIFT Hyderabad is the premier fashion and design institution in the region. Hyderabad's IT sector creates enormous UX/UI designer demand across 1,400+ technology companies."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Design Fit — Explore Others",
        description: "Design as a primary career path may require more intrinsic creative drive than you currently have. Media (Module 11), Business (Module 06), or Engineering (Module 01) with a design component may offer better alignment.\\n\\nRegional Outlook (AP & Telangana): Hyderabad hosts major gaming studios, animation companies, and the L.V. Prasad Film & TV Academy. NIFT Hyderabad is the premier fashion and design institution in the region. Hyderabad's IT sector creates enormous UX/UI designer demand across 1,400+ technology companies.",
        careerPaths: JSON.stringify([{"role": "UX/UI Designer", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹25–50 LPA", "qualification": "B.Des/BFA + portfolio + Figma/Sketch skills"}, {"role": "Game Designer / Developer", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "B.Sc Game Design + Unity/Unreal + portfolio"}, {"role": "Motion Graphics / Animator", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Sc Animation + After Effects/Maya skills"}, {"role": "Product Designer", "entrySalary": "₹8–15 LPA", "seniorSalary": "₹30–50 LPA", "qualification": "B.Des + product thinking + user research skills"}, {"role": "Fashion / Textile Designer", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "NIFT degree + industry internship"}]),
        topColleges: JSON.stringify([{"name": "CEPT University (Design", "location": "programs)  Ahmedabad", "entrance": "(national", "package": "target)  NID DAT / CEPT"}, {"name": "entrance  ₹8–25 LPA", "location": "(UX/Product)", "entrance": "NIFT Hyderabad  Hyderabad,", "package": "TS NIFT entrance test  ₹5–15 LPA"}, {"name": "(Fashion/Textile)", "location": "--- PAGE 40 ---", "entrance": "Academy  Hyderabad,", "package": "TS Portfolio + interview  ₹5–20 LPA"}, {"name": "(Film/Media design)", "location": "JNTU Hyderabad — B.Sc", "entrance": "Animation  Hyderabad,", "package": "TS TS EAMCET / Merit  ₹4–12 LPA"}]),
        thirtyDayTest: "Week 1: Create one design project per day for 7 days — a poster, a logo sketch, a UI mockup, anything visual. Use free tools (Canva, Figma).\\n\\nWeek 2: Redesign one app screen that you find frustrating. Compare your version with the original.\\n\\nWeek 3: Watch 3 episodes of 'Abstract: The Art of Design' (Netflix). Write what genuinely excited you.\\n\\nWeek 4: Build one complete portfolio piece — from concept to final design.\\n\\nJudgement: If creating design work voluntarily felt like play — design is your calling. If you had to force yourself — explore other paths.",
        entranceExamStrategy: JSON.stringify([{"exam": "NID DAT (Design Aptitude Test)", "details": "Gateway to National Institute of Design — Ahmedabad, Hyderabad, and other campuses. Tests design thinking, visual perception, observation."}, {"exam": "NIFT Entrance Test", "details": "For National Institute of Fashion Technology. NIFT Hyderabad campus. Tests creative ability, general ability, situation test."}, {"exam": "UCEED (Undergraduate Common Entrance Exam for Design)", "details": "For B.Des at IITs. Conducted by IIT Bombay. Tests visualization, observation, design thinking."}, {"exam": "CEED (Common Entrance Exam for Design)", "details": "For M.Des at IITs and IISc. Post-graduate design entrance."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Design career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Portfolio essential). Participate in competitions and workshops. Connect with professionals in Design."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (NID DAT, NIFT entrance, UCEED, CEED, State entrance). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Design. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Design due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on NID DAT but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Design", "description": "UX/UI designers, game designers, and motion graphics artists are globally in demand. Indian design graduates work at Google, Adobe, Amazon, and top gaming studios. The global gaming industry crossed USD 200 billion — larger than film and music combined."}, {"code": "IN", "title": "India Market for Design", "description": "India's gaming industry is projected to reach ₹25,000 crore by 2028. UX/UI demand is at an all-time high — every app and digital product needs designers. OTT platforms (Netflix, Amazon Prime, SonyLIV, Aha) are creating massive animation and content production demand."}, {"code": "AP", "title": "AP & Telangana Design Outlook", "description": "Hyderabad hosts major gaming studios, animation companies, and the L.V. Prasad Film & TV Academy. NIFT Hyderabad is the premier fashion and design institution in the region. Hyderabad's IT sector creates enormous UX/UI designer demand across 1,400+ technology companies."}]),
      },
    ];

    for (const r of mod10Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: des.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: des.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 10 reports seeded (3 tiers)");
  }

  // --- Reports for Module 11 (Media, Journalism, Content Creation & Digital Media) ---
  if (media) {
    const mod11Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Media Fit — Strong Fit",
        description: "Your storytelling instinct, intellectual curiosity, and comfort with public communication align strongly with a media career. Start your first content piece this week — a blog, a short video, or an article. The portfolio you build before college matters more than the college you attend.\\n\\nRegional Outlook (AP & Telangana): Telugu content creators are among India's highest-earning regional creators. IIMC Hyderabad Regional Centre and Osmania University Mass Communication are accessible entry points. AP and Telangana's strong political and social media ecosystems create constant demand for reporters, analysts, and content professionals.",
        careerPaths: JSON.stringify([{"role": "Journalist / Reporter", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "BA Mass Communication + internship experience"}, {"role": "Content Creator / YouTuber", "entrySalary": "Variable", "seniorSalary": "₹10–50+ LPA", "qualification": "Portfolio + consistency + platform knowledge"}, {"role": "Digital Marketing Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "BA/MBA + Google/Meta certifications"}, {"role": "Film/TV Producer / Director", "entrySalary": "₹3–8 LPA", "seniorSalary": "₹20–50+ LPA", "qualification": "Film school/portfolio + industry connections"}, {"role": "Public Relations Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "BA Communication + PR agency experience"}]),
        topColleges: JSON.stringify([{"name": "Osmania University — Mass", "location": "Communication  Hyderabad,", "entrance": "TS Entrance + Merit  ₹4–12 LPA", "package": "(journalism/digital)"}, {"name": "University of Hyderabad —", "location": "Communication  Hyderabad,", "entrance": "TS CUET/University", "package": "entrance  ₹6–15 LPA (post -MA)"}, {"name": "--- PAGE 42 ---", "location": "Centre  Hyderabad,", "entrance": "TS IIMC entrance exam  ₹6–18 LPA", "package": "Andhra University —"}]),
        thirtyDayTest: "Week 1: Write one article or create one short video (3 minutes) on a topic you care about. Publish it (blog, YouTube, Instagram).\\n\\nWeek 2: Fact-check 3 viral stories on your family WhatsApp. Write corrections with sources.\\n\\nWeek 3: Interview someone interesting in your community. Record it and edit it into a 5-minute piece.\\n\\nWeek 4: Follow 5 journalists you admire. Analyse their storytelling style. Write in their style for one article.\\n\\nJudgement: If creating content and telling stories felt natural — media is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "IIMC Entrance", "details": "Indian Institute of Mass Communication — Delhi + Hyderabad Regional Centre. Tests English comprehension, general awareness, aptitude for journalism."}, {"exam": "CUET UG", "details": "For BA Mass Communication at central universities. University of Hyderabad Communication department."}, {"exam": "ACJ Entrance (Asian College of Journalism)", "details": "Chennai-based premier journalism school. Tests current affairs, English, analytical writing."}, {"exam": "University Merit / Portfolio", "details": "Osmania University, Andhra University journalism programs. Some accept portfolio for creative media programs."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Media career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream. Participate in competitions and workshops. Connect with professionals in Media."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (IIMC entrance, CUET, University Merit, Portfolio). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Media. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Media due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on IIMC entrance but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Media", "description": "Global digital media, international journalism (BBC, Reuters, AP), and multilingual content creation are growing. Indian journalists and content creators are building global audiences. Streaming platforms — Netflix, Disney+, Amazon — are investing heavily in Indian-language content."}, {"code": "IN", "title": "India Market for Media", "description": "Telugu media is India's second-largest regional language media market. ETV Network, TV9, SAKSHI, ABN are all headquartered in Hyderabad. Digital Telugu content on YouTube grows 35% annually. OTT platforms (Aha, SonyLIV, Zee5) are creating significant original content demand."}, {"code": "AP", "title": "AP & Telangana Media Outlook", "description": "Telugu content creators are among India's highest-earning regional creators. IIMC Hyderabad Regional Centre and Osmania University Mass Communication are accessible entry points. AP and Telangana's strong political and social media ecosystems create constant demand for reporters, analysts, and content professionals."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Media Fit — Possible Fit",
        description: "You have communication skills but need to verify whether media is your calling. Explore Communications, Public Relations, or Content Strategy as adjacent tracks that use media skills within more structured corporate environments.\\n\\nRegional Outlook (AP & Telangana): Telugu content creators are among India's highest-earning regional creators. IIMC Hyderabad Regional Centre and Osmania University Mass Communication are accessible entry points. AP and Telangana's strong political and social media ecosystems create constant demand for reporters, analysts, and content professionals.",
        careerPaths: JSON.stringify([{"role": "Journalist / Reporter", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "BA Mass Communication + internship experience"}, {"role": "Content Creator / YouTuber", "entrySalary": "Variable", "seniorSalary": "₹10–50+ LPA", "qualification": "Portfolio + consistency + platform knowledge"}, {"role": "Digital Marketing Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "BA/MBA + Google/Meta certifications"}, {"role": "Film/TV Producer / Director", "entrySalary": "₹3–8 LPA", "seniorSalary": "₹20–50+ LPA", "qualification": "Film school/portfolio + industry connections"}, {"role": "Public Relations Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "BA Communication + PR agency experience"}]),
        topColleges: JSON.stringify([{"name": "Osmania University — Mass", "location": "Communication  Hyderabad,", "entrance": "TS Entrance + Merit  ₹4–12 LPA", "package": "(journalism/digital)"}, {"name": "University of Hyderabad —", "location": "Communication  Hyderabad,", "entrance": "TS CUET/University", "package": "entrance  ₹6–15 LPA (post -MA)"}, {"name": "--- PAGE 42 ---", "location": "Centre  Hyderabad,", "entrance": "TS IIMC entrance exam  ₹6–18 LPA", "package": "Andhra University —"}]),
        thirtyDayTest: "Week 1: Write one article or create one short video (3 minutes) on a topic you care about. Publish it (blog, YouTube, Instagram).\\n\\nWeek 2: Fact-check 3 viral stories on your family WhatsApp. Write corrections with sources.\\n\\nWeek 3: Interview someone interesting in your community. Record it and edit it into a 5-minute piece.\\n\\nWeek 4: Follow 5 journalists you admire. Analyse their storytelling style. Write in their style for one article.\\n\\nJudgement: If creating content and telling stories felt natural — media is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "IIMC Entrance", "details": "Indian Institute of Mass Communication — Delhi + Hyderabad Regional Centre. Tests English comprehension, general awareness, aptitude for journalism."}, {"exam": "CUET UG", "details": "For BA Mass Communication at central universities. University of Hyderabad Communication department."}, {"exam": "ACJ Entrance (Asian College of Journalism)", "details": "Chennai-based premier journalism school. Tests current affairs, English, analytical writing."}, {"exam": "University Merit / Portfolio", "details": "Osmania University, Andhra University journalism programs. Some accept portfolio for creative media programs."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Media career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream. Participate in competitions and workshops. Connect with professionals in Media."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (IIMC entrance, CUET, University Merit, Portfolio). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Media. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Media due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on IIMC entrance but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Media", "description": "Global digital media, international journalism (BBC, Reuters, AP), and multilingual content creation are growing. Indian journalists and content creators are building global audiences. Streaming platforms — Netflix, Disney+, Amazon — are investing heavily in Indian-language content."}, {"code": "IN", "title": "India Market for Media", "description": "Telugu media is India's second-largest regional language media market. ETV Network, TV9, SAKSHI, ABN are all headquartered in Hyderabad. Digital Telugu content on YouTube grows 35% annually. OTT platforms (Aha, SonyLIV, Zee5) are creating significant original content demand."}, {"code": "AP", "title": "AP & Telangana Media Outlook", "description": "Telugu content creators are among India's highest-earning regional creators. IIMC Hyderabad Regional Centre and Osmania University Mass Communication are accessible entry points. AP and Telangana's strong political and social media ecosystems create constant demand for reporters, analysts, and content professionals."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Media Fit — Explore Others",
        description: "The volatility and creative demands of a media career may not suit your current orientation. Business Communication, HR, or Law (Module 07) may offer better alignment if you are strong with language but prefer more stable professional structures.\\n\\nRegional Outlook (AP & Telangana): Telugu content creators are among India's highest-earning regional creators. IIMC Hyderabad Regional Centre and Osmania University Mass Communication are accessible entry points. AP and Telangana's strong political and social media ecosystems create constant demand for reporters, analysts, and content professionals.",
        careerPaths: JSON.stringify([{"role": "Journalist / Reporter", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "BA Mass Communication + internship experience"}, {"role": "Content Creator / YouTuber", "entrySalary": "Variable", "seniorSalary": "₹10–50+ LPA", "qualification": "Portfolio + consistency + platform knowledge"}, {"role": "Digital Marketing Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "BA/MBA + Google/Meta certifications"}, {"role": "Film/TV Producer / Director", "entrySalary": "₹3–8 LPA", "seniorSalary": "₹20–50+ LPA", "qualification": "Film school/portfolio + industry connections"}, {"role": "Public Relations Manager", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹18–35 LPA", "qualification": "BA Communication + PR agency experience"}]),
        topColleges: JSON.stringify([{"name": "Osmania University — Mass", "location": "Communication  Hyderabad,", "entrance": "TS Entrance + Merit  ₹4–12 LPA", "package": "(journalism/digital)"}, {"name": "University of Hyderabad —", "location": "Communication  Hyderabad,", "entrance": "TS CUET/University", "package": "entrance  ₹6–15 LPA (post -MA)"}, {"name": "--- PAGE 42 ---", "location": "Centre  Hyderabad,", "entrance": "TS IIMC entrance exam  ₹6–18 LPA", "package": "Andhra University —"}]),
        thirtyDayTest: "Week 1: Write one article or create one short video (3 minutes) on a topic you care about. Publish it (blog, YouTube, Instagram).\\n\\nWeek 2: Fact-check 3 viral stories on your family WhatsApp. Write corrections with sources.\\n\\nWeek 3: Interview someone interesting in your community. Record it and edit it into a 5-minute piece.\\n\\nWeek 4: Follow 5 journalists you admire. Analyse their storytelling style. Write in their style for one article.\\n\\nJudgement: If creating content and telling stories felt natural — media is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "IIMC Entrance", "details": "Indian Institute of Mass Communication — Delhi + Hyderabad Regional Centre. Tests English comprehension, general awareness, aptitude for journalism."}, {"exam": "CUET UG", "details": "For BA Mass Communication at central universities. University of Hyderabad Communication department."}, {"exam": "ACJ Entrance (Asian College of Journalism)", "details": "Chennai-based premier journalism school. Tests current affairs, English, analytical writing."}, {"exam": "University Merit / Portfolio", "details": "Osmania University, Andhra University journalism programs. Some accept portfolio for creative media programs."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Media career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream. Participate in competitions and workshops. Connect with professionals in Media."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (IIMC entrance, CUET, University Merit, Portfolio). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Media. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Media due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on IIMC entrance but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Media", "description": "Global digital media, international journalism (BBC, Reuters, AP), and multilingual content creation are growing. Indian journalists and content creators are building global audiences. Streaming platforms — Netflix, Disney+, Amazon — are investing heavily in Indian-language content."}, {"code": "IN", "title": "India Market for Media", "description": "Telugu media is India's second-largest regional language media market. ETV Network, TV9, SAKSHI, ABN are all headquartered in Hyderabad. Digital Telugu content on YouTube grows 35% annually. OTT platforms (Aha, SonyLIV, Zee5) are creating significant original content demand."}, {"code": "AP", "title": "AP & Telangana Media Outlook", "description": "Telugu content creators are among India's highest-earning regional creators. IIMC Hyderabad Regional Centre and Osmania University Mass Communication are accessible entry points. AP and Telangana's strong political and social media ecosystems create constant demand for reporters, analysts, and content professionals."}]),
      },
    ];

    for (const r of mod11Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: media.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: media.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 11 reports seeded (3 tiers)");
  }

  // --- Reports for Module 12 (Green Energy, Sustainability & Environmental Careers) ---
  if (green) {
    const mod12Reports = [
      {
        tierLevel: "HIGH",
        title: "Strong Green Energy Fit — Strong Fit",
        description: "Your genuine concern for environmental systems and interest in sustainability solutions align strongly with a green energy career. AP's solar leadership and India's 500 GW renewable target create real regional opportunity. Target IIT Hyderabad's Environmental Engineering or JNTU Environmental programmes.\\n\\nRegional Outlook (AP & Telangana): Andhra Pradesh is already India's leader in solar energy installation. Telangana has major wind and solar projects under development. Greenko Group, headquartered in Hyderabad, is one of India's largest renewable energy companies. AP's renewable energy industrial parks and coastal wind projects are creating new technical and policy roles.",
        careerPaths: JSON.stringify([{"role": "Solar/Wind Energy Engineer", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Tech Electrical/Environmental + renewable energy certification"}, {"role": "ESG Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "Finance/Environmental degree + ESG certification"}, {"role": "Environmental Consultant", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Sc/M.Sc Environmental Science + field experience"}, {"role": "Sustainability Manager (Corporate)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MBA Sustainability / Environmental Engineering + CSR experience"}, {"role": "Climate Policy Analyst", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "Public Policy/Environmental Studies + research skills"}]),
        topColleges: JSON.stringify([{"name": "IIT Hyderabad —", "location": "Environmental Engineering  Hyderabad,", "entrance": "TS JEE Advanced  ₹8–20 LPA entry,", "package": "₹25–50 LPA senior"}, {"name": "--- PAGE 44 ---", "location": "Environmental Engg  Hyderabad,", "entrance": "TS TS EAMCET  ₹5–12 LPA entry", "package": "University of Hyderabad —"}, {"name": "Earth Sciences  Hyderabad,", "location": "TS CUET/University", "entrance": "entrance  ₹6–18 LPA", "package": "TERI University New Delhi"}, {"name": "(distance option)  New Delhi", "location": "(PG) TERI entrance  ₹8–22 LPA", "entrance": "(sustainability roles)", "package": "Andhra University —"}]),
        thirtyDayTest: "Week 1: Track your household's energy consumption for 7 days. Calculate the carbon footprint using an online calculator.\\n\\nWeek 2: Visit a solar installation (rooftop or farm). Ask about the technology, payback period, and grid connection.\\n\\nWeek 3: Read one report on India's renewable energy targets (MNRE website). Write 3 observations.\\n\\nWeek 4: Design a simple proposal to make your school or neighbourhood more sustainable.\\n\\nJudgement: If understanding energy systems and environmental solutions felt compelling — green energy is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "JEE Main/Advanced", "details": "B.Tech Environmental Engineering at IIT Hyderabad, NIT Warangal. Overlap with regular engineering preparation."}, {"exam": "CUET UG", "details": "BSc Environmental Science at central universities. University of Hyderabad Earth Sciences department."}, {"exam": "State EAMCET", "details": "AP EAPCET / TS EAMCET for B.Tech Environmental Engineering at state colleges. JNTU Hyderabad offers the program."}, {"exam": "TERI University Entrance", "details": "PG programs in Sustainability and Environmental Studies. India's premier environmental policy institution."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Green Energy career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Science preferred). Participate in competitions and workshops. Connect with professionals in Green Energy."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (JEE, CUET, State university entrance). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Green Energy. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Green Energy due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on JEE but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Green Energy", "description": "Global clean energy investment crossed USD 1 trillion for the first time in 2023. IRENA, UN Environment Programme, World Bank, and ADB all hire sustainability professionals from India. Carbon markets, ESG investing, and climate technology are creating entirely new global career categories."}, {"code": "IN", "title": "India Market for Green Energy", "description": "India's commitment to 500 GW renewable energy by 2030 makes this the fastest-growing engineering and policy sector in the country. Adani Green, ReNew Power, and Greenko (Hyderabad-based) are actively recruiting. SEBI's ESG mandate for India's top 1,000 companies creates massive analyst demand."}, {"code": "AP", "title": "AP & Telangana Green Energy Outlook", "description": "Andhra Pradesh is already India's leader in solar energy installation. Telangana has major wind and solar projects under development. Greenko Group, headquartered in Hyderabad, is one of India's largest renewable energy companies. AP's renewable energy industrial parks and coastal wind projects are creating new technical and policy roles."}]),
      },
      {
        tierLevel: "MEDIUM",
        title: "Moderate Green Energy Fit — Possible Fit",
        description: "You have environmental awareness but need to verify whether this is a career calling or a personal value. Explore ESG Analysis, Corporate Sustainability, or Environmental Policy as tracks that bridge your interest with more conventional career structures.\\n\\nRegional Outlook (AP & Telangana): Andhra Pradesh is already India's leader in solar energy installation. Telangana has major wind and solar projects under development. Greenko Group, headquartered in Hyderabad, is one of India's largest renewable energy companies. AP's renewable energy industrial parks and coastal wind projects are creating new technical and policy roles.",
        careerPaths: JSON.stringify([{"role": "Solar/Wind Energy Engineer", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Tech Electrical/Environmental + renewable energy certification"}, {"role": "ESG Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "Finance/Environmental degree + ESG certification"}, {"role": "Environmental Consultant", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Sc/M.Sc Environmental Science + field experience"}, {"role": "Sustainability Manager (Corporate)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MBA Sustainability / Environmental Engineering + CSR experience"}, {"role": "Climate Policy Analyst", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "Public Policy/Environmental Studies + research skills"}]),
        topColleges: JSON.stringify([{"name": "IIT Hyderabad —", "location": "Environmental Engineering  Hyderabad,", "entrance": "TS JEE Advanced  ₹8–20 LPA entry,", "package": "₹25–50 LPA senior"}, {"name": "--- PAGE 44 ---", "location": "Environmental Engg  Hyderabad,", "entrance": "TS TS EAMCET  ₹5–12 LPA entry", "package": "University of Hyderabad —"}, {"name": "Earth Sciences  Hyderabad,", "location": "TS CUET/University", "entrance": "entrance  ₹6–18 LPA", "package": "TERI University New Delhi"}, {"name": "(distance option)  New Delhi", "location": "(PG) TERI entrance  ₹8–22 LPA", "entrance": "(sustainability roles)", "package": "Andhra University —"}]),
        thirtyDayTest: "Week 1: Track your household's energy consumption for 7 days. Calculate the carbon footprint using an online calculator.\\n\\nWeek 2: Visit a solar installation (rooftop or farm). Ask about the technology, payback period, and grid connection.\\n\\nWeek 3: Read one report on India's renewable energy targets (MNRE website). Write 3 observations.\\n\\nWeek 4: Design a simple proposal to make your school or neighbourhood more sustainable.\\n\\nJudgement: If understanding energy systems and environmental solutions felt compelling — green energy is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "JEE Main/Advanced", "details": "B.Tech Environmental Engineering at IIT Hyderabad, NIT Warangal. Overlap with regular engineering preparation."}, {"exam": "CUET UG", "details": "BSc Environmental Science at central universities. University of Hyderabad Earth Sciences department."}, {"exam": "State EAMCET", "details": "AP EAPCET / TS EAMCET for B.Tech Environmental Engineering at state colleges. JNTU Hyderabad offers the program."}, {"exam": "TERI University Entrance", "details": "PG programs in Sustainability and Environmental Studies. India's premier environmental policy institution."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Green Energy career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Science preferred). Participate in competitions and workshops. Connect with professionals in Green Energy."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (JEE, CUET, State university entrance). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Green Energy. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Green Energy due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on JEE but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Green Energy", "description": "Global clean energy investment crossed USD 1 trillion for the first time in 2023. IRENA, UN Environment Programme, World Bank, and ADB all hire sustainability professionals from India. Carbon markets, ESG investing, and climate technology are creating entirely new global career categories."}, {"code": "IN", "title": "India Market for Green Energy", "description": "India's commitment to 500 GW renewable energy by 2030 makes this the fastest-growing engineering and policy sector in the country. Adani Green, ReNew Power, and Greenko (Hyderabad-based) are actively recruiting. SEBI's ESG mandate for India's top 1,000 companies creates massive analyst demand."}, {"code": "AP", "title": "AP & Telangana Green Energy Outlook", "description": "Andhra Pradesh is already India's leader in solar energy installation. Telangana has major wind and solar projects under development. Greenko Group, headquartered in Hyderabad, is one of India's largest renewable energy companies. AP's renewable energy industrial parks and coastal wind projects are creating new technical and policy roles."}]),
      },
      {
        tierLevel: "LOW",
        title: "Low Green Energy Fit — Explore Others",
        description: "Green energy as a primary career may not align with your current orientation. Engineering (Module 01) or Business (Module 06) with an environmental specialisation may offer better alignment — letting you contribute to sustainability within a more familiar career structure.\\n\\nRegional Outlook (AP & Telangana): Andhra Pradesh is already India's leader in solar energy installation. Telangana has major wind and solar projects under development. Greenko Group, headquartered in Hyderabad, is one of India's largest renewable energy companies. AP's renewable energy industrial parks and coastal wind projects are creating new technical and policy roles.",
        careerPaths: JSON.stringify([{"role": "Solar/Wind Energy Engineer", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Tech Electrical/Environmental + renewable energy certification"}, {"role": "ESG Analyst", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "Finance/Environmental degree + ESG certification"}, {"role": "Environmental Consultant", "entrySalary": "₹4–8 LPA", "seniorSalary": "₹15–30 LPA", "qualification": "B.Sc/M.Sc Environmental Science + field experience"}, {"role": "Sustainability Manager (Corporate)", "entrySalary": "₹6–12 LPA", "seniorSalary": "₹20–40 LPA", "qualification": "MBA Sustainability / Environmental Engineering + CSR experience"}, {"role": "Climate Policy Analyst", "entrySalary": "₹5–10 LPA", "seniorSalary": "₹15–35 LPA", "qualification": "Public Policy/Environmental Studies + research skills"}]),
        topColleges: JSON.stringify([{"name": "IIT Hyderabad —", "location": "Environmental Engineering  Hyderabad,", "entrance": "TS JEE Advanced  ₹8–20 LPA entry,", "package": "₹25–50 LPA senior"}, {"name": "--- PAGE 44 ---", "location": "Environmental Engg  Hyderabad,", "entrance": "TS TS EAMCET  ₹5–12 LPA entry", "package": "University of Hyderabad —"}, {"name": "Earth Sciences  Hyderabad,", "location": "TS CUET/University", "entrance": "entrance  ₹6–18 LPA", "package": "TERI University New Delhi"}, {"name": "(distance option)  New Delhi", "location": "(PG) TERI entrance  ₹8–22 LPA", "entrance": "(sustainability roles)", "package": "Andhra University —"}]),
        thirtyDayTest: "Week 1: Track your household's energy consumption for 7 days. Calculate the carbon footprint using an online calculator.\\n\\nWeek 2: Visit a solar installation (rooftop or farm). Ask about the technology, payback period, and grid connection.\\n\\nWeek 3: Read one report on India's renewable energy targets (MNRE website). Write 3 observations.\\n\\nWeek 4: Design a simple proposal to make your school or neighbourhood more sustainable.\\n\\nJudgement: If understanding energy systems and environmental solutions felt compelling — green energy is your calling.",
        entranceExamStrategy: JSON.stringify([{"exam": "JEE Main/Advanced", "details": "B.Tech Environmental Engineering at IIT Hyderabad, NIT Warangal. Overlap with regular engineering preparation."}, {"exam": "CUET UG", "details": "BSc Environmental Science at central universities. University of Hyderabad Earth Sciences department."}, {"exam": "State EAMCET", "details": "AP EAPCET / TS EAMCET for B.Tech Environmental Engineering at state colleges. JNTU Hyderabad offers the program."}, {"exam": "TERI University Entrance", "details": "PG programs in Sustainability and Environmental Studies. India's premier environmental policy institution."}]),
        nextSteps: JSON.stringify([{"phase": "Now (Class 10)", "actions": "Score 85%+ in board exams. Research Green Energy career paths. Complete the 30-Day Interest Test. Choose appropriate stream for Class 11."}, {"phase": "Class 11", "actions": "Build foundational knowledge in Any Stream (Science preferred). Participate in competitions and workshops. Connect with professionals in Green Energy."}, {"phase": "Class 12", "actions": "Prepare for entrance exams (JEE, CUET, State university entrance). Complete board exams with 75%+. Apply to target colleges. Begin first certification or portfolio."}, {"phase": "UG Year 1–2", "actions": "Join relevant clubs and societies. Secure first internship or research experience. Start domain-specific certifications. Build professional network."}, {"phase": "UG Year 3–4", "actions": "Complete major internship. Build professional portfolio. Apply for graduate programs or entry-level roles. Target campus placements."}, {"phase": "Career Entry", "actions": "First professional role in Green Energy. Continue learning and upskilling. Target ₹6–15 LPA depending on track. Build toward senior role over 5 years."}]),
        mistakesToAvoid: JSON.stringify([{"title": "Choosing Green Energy due to external pressure", "description": "Choose this path only if your 30-Day Test revealed genuine interest. External pressure without intrinsic motivation leads to burnout within 3-5 years."}, {"title": "Not building practical skills alongside academics", "description": "Theory without practice is incomplete. Build projects, portfolios, and real-world experience from Year 1 of college."}, {"title": "Ignoring state-level entrance exams", "description": "Focus on JEE but also prepare for state-level alternatives. Having backup options is strategic, not weak."}, {"title": "Delaying career exploration until final year", "description": "Start exploring career options, internships, and networking from Year 1. Students who start early have a 2-year advantage at graduation."}]),
        trendIntelligence: JSON.stringify([{"code": "GL", "title": "Global Opportunities in Green Energy", "description": "Global clean energy investment crossed USD 1 trillion for the first time in 2023. IRENA, UN Environment Programme, World Bank, and ADB all hire sustainability professionals from India. Carbon markets, ESG investing, and climate technology are creating entirely new global career categories."}, {"code": "IN", "title": "India Market for Green Energy", "description": "India's commitment to 500 GW renewable energy by 2030 makes this the fastest-growing engineering and policy sector in the country. Adani Green, ReNew Power, and Greenko (Hyderabad-based) are actively recruiting. SEBI's ESG mandate for India's top 1,000 companies creates massive analyst demand."}, {"code": "AP", "title": "AP & Telangana Green Energy Outlook", "description": "Andhra Pradesh is already India's leader in solar energy installation. Telangana has major wind and solar projects under development. Greenko Group, headquartered in Hyderabad, is one of India's largest renewable energy companies. AP's renewable energy industrial parks and coastal wind projects are creating new technical and policy roles."}]),
      },
    ];

    for (const r of mod12Reports) {
      await prisma.report.upsert({
        where: {
          assessmentId_tierLevel: {
            assessmentId: green.id,
            tierLevel: r.tierLevel,
          },
        },
        update: r,
        create: {
          assessmentId: green.id,
          ...r,
        },
      });
    }
    console.log("✅ Module 12 reports seeded (3 tiers)");
  }

  // --- Sample Coupon ---
  await prisma.coupon.upsert({
    where: { code: "LAUNCH50" },
    update: {},
    create: {
      code: "LAUNCH50",
      discountType: "PERCENTAGE",
      discountValue: 50,
      maxUses: 100,
      validTo: new Date("2025-12-31"),
    },
  });
  console.log("✅ Sample coupon LAUNCH50 created");

  console.log("\n🎉 Seeding complete!");
  console.log("📧 Admin login: admin@nbvsubbarao.com / Admin@123");
  console.log("📧 Demo student: student@demo.com / Student@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });