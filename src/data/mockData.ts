import { Module, LearningPath } from "@/types";

// Onboarding questions
export const onboardingQuestions = [
  {
    id: "q1",
    question: "Your Age Group",
    options: ["16–18", "19–22", "23–26"],
  },
  {
    id: "q2",
    question: "Current Status",
    options: [
      "School Student",
      "College Student",
      "Working Professional (Full-time)",
      "Working Professional (Part-time)",
      "Unemployed",
      "Small Business Owner",
    ],
  },
  {
    id: "q3",
    question: "Monthly Income",
    options: [
      "No Income",
      "Less than ₹10,000",
      "₹10,000–₹25,000",
      "₹25,000–₹50,000",
      "More than ₹50,000",
    ],
  },
  {
    id: "q4",
    question: "Monthly Expenses",
    options: [
      "Less than ₹5,000",
      "₹5,000–₹15,000",
      "₹15,000–₹30,000",
      "More than ₹30,000",
    ],
  },
  {
    id: "q5",
    question: "Do you have existing EMIs/Loans?",
    options: [
      "No",
      "Yes – Education Loan",
      "Yes – Personal Loan",
      "Yes – Credit Card EMI",
      "Yes – Business Loan",
      "Multiple EMIs",
    ],
  },
  {
    id: "q6",
    question: "Credit Card Usage",
    options: [
      "No credit card",
      "< 30% of limit",
      "30–60% of limit",
      "> 60% of limit",
    ],
  },
  {
    id: "q7",
    question: "Financial Goal (select one)",
    options: [
      "Learn budgeting",
      "Build savings",
      "Reduce EMI burden",
      "Improve credit score",
      "Prepare for a loan",
      "Learn investment basics",
    ],
  },
  {
    id: "q8",
    question: "Financial Confidence Level",
    options: ["Low", "Medium", "High"],
  },
  {
    id: "q9",
    question: "Knowledge Level (self-rated)",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
];

// Mock learning path generator
export const generateLearningPath = (answers: any[]): LearningPath => {
  // TODO: Replace with Gemini API call
  return {
    pathId: "path-1",
    name: "Your Personalized Path",
    description: "A custom learning journey based on your goals and experience",
    modules: mockModules,
  };
};

// 12 mock modules with chapters
export const mockModules: Module[] = [
  {
    id: "m1",
    title: "Money Basics 101",
    description: "Foundation concepts everyone needs to know",
    locked: false,
    progress: 0,
    chapters: [
      {
        id: "m1c1",
        title: "What is Money?",
        intro: "Learn the fundamental concepts of money, its purpose, and how it works in modern society.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false,
        flashcards: [
          { id: "fc1", front: "What is fiat currency?", back: "Money that has value because the government says it does, not backed by physical commodities." },
          { id: "fc2", front: "What is inflation?", back: "The rate at which the general level of prices rises, reducing purchasing power." },
          { id: "fc3", front: "What is liquidity?", back: "How quickly an asset can be converted to cash without losing value." },
        ],
        quiz: {
          questions: [
            {
              id: "q1",
              question: "Which of the following is NOT a function of money?",
              options: ["Medium of exchange", "Store of value", "Source of happiness", "Unit of account"],
              correctAnswer: 2,
            },
            {
              id: "q2",
              question: "What does inflation do to your purchasing power?",
              options: ["Increases it", "Decreases it", "Has no effect", "Doubles it"],
              correctAnswer: 1,
            },
            {
              id: "q3",
              question: "Which asset is most liquid?",
              options: ["Real estate", "Cash", "Gold", "Stocks"],
              correctAnswer: 1,
            },
            {
              id: "q4",
              question: "What backs fiat currency?",
              options: ["Gold", "Silver", "Government decree", "Bitcoin"],
              correctAnswer: 2,
            },
            {
              id: "q5",
              question: "Why is money called a 'medium of exchange'?",
              options: ["It's in the middle", "It facilitates transactions", "It's average value", "It's medium-sized"],
              correctAnswer: 1,
            },
          ],
          attempts: [],
        },
      },
      {
        id: "m1c2",
        title: "Understanding Income",
        intro: "Explore different types of income and how they affect your financial life.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false,
        flashcards: [
          { id: "fc4", front: "Active income", back: "Money earned from direct work or services performed." },
          { id: "fc5", front: "Passive income", back: "Money earned with minimal ongoing effort, like rental income or dividends." },
        ],
        quiz: {
          questions: [
            { id: "q1", question: "What is active income?", options: ["Rental income", "Salary from job", "Dividend payments", "Interest"], correctAnswer: 1 },
            { id: "q2", question: "Which is passive income?", options: ["Hourly wages", "Freelance work", "Stock dividends", "Overtime pay"], correctAnswer: 2 },
            { id: "q3", question: "Gross income means:", options: ["After taxes", "Before taxes", "Net profit", "Total assets"], correctAnswer: 1 },
            { id: "q4", question: "What is a W-2 form?", options: ["Tax return", "Wage statement", "Bank statement", "Credit report"], correctAnswer: 1 },
            { id: "q5", question: "1099 forms report:", options: ["Employee wages", "Independent contractor income", "Stock sales", "All of the above"], correctAnswer: 3 },
          ],
          attempts: [],
        },
      },
    ],
  },
  {
    id: "m2",
    title: "Budgeting Like a Pro",
    description: "Master the art of tracking and controlling your spending",
    locked: true,
    progress: 0,
    chapters: [
      {
        id: "m2c1",
        title: "Creating Your First Budget",
        intro: "Step-by-step guide to building a budget that actually works for your lifestyle.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false,
        flashcards: [
          { id: "fc6", front: "50/30/20 rule", back: "Budget guideline: 50% needs, 30% wants, 20% savings." },
          { id: "fc7", front: "Fixed expenses", back: "Regular costs that stay the same each month (rent, insurance)." },
        ],
        quiz: {
          questions: [
            { id: "q1", question: "In the 50/30/20 rule, what does 50% represent?", options: ["Wants", "Needs", "Savings", "Debt"], correctAnswer: 1 },
            { id: "q2", question: "Fixed expense example:", options: ["Groceries", "Entertainment", "Rent", "Dining out"], correctAnswer: 2 },
            { id: "q3", question: "Variable expenses change:", options: ["Never", "Monthly", "Yearly", "Daily"], correctAnswer: 1 },
            { id: "q4", question: "Emergency fund should cover:", options: ["1 month expenses", "3-6 months expenses", "1 year expenses", "1 week expenses"], correctAnswer: 1 },
            { id: "q5", question: "Best budgeting app feature:", options: ["Automatic tracking", "Pretty colors", "Social sharing", "None needed"], correctAnswer: 0 },
          ],
          attempts: [],
        },
      },
    ],
  },
  {
    id: "m3",
    title: "Savings Strategies",
    description: "Build wealth through smart saving habits",
    locked: true,
    progress: 0,
    chapters: [
      {
        id: "m3c1",
        title: "Emergency Funds",
        intro: "Why you need an emergency fund and how to build one fast.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false,
        flashcards: [
          { id: "fc8", front: "Emergency fund purpose", back: "Cover unexpected expenses without going into debt." },
        ],
        quiz: {
          questions: [
            { id: "q1", question: "Ideal emergency fund size:", options: ["$100", "$1,000", "3-6 months expenses", "$10,000"], correctAnswer: 2 },
            { id: "q2", question: "Where to keep emergency fund:", options: ["Stocks", "High-yield savings", "Under mattress", "Bitcoin"], correctAnswer: 1 },
            { id: "q3", question: "When to use emergency fund:", options: ["Vacation", "New phone", "Job loss", "Black Friday sale"], correctAnswer: 2 },
            { id: "q4", question: "Best way to build it:", options: ["Win lottery", "Automatic transfers", "Spare change", "Wait for bonus"], correctAnswer: 1 },
            { id: "q5", question: "After using emergency fund:", options: ["Ignore it", "Celebrate", "Replenish it", "Convert to stocks"], correctAnswer: 2 },
          ],
          attempts: [],
        },
      },
    ],
  },
  {
    id: "m4",
    title: "Credit Fundamentals",
    description: "Understand and build excellent credit",
    locked: true,
    progress: 0,
    chapters: [
      {
        id: "m4c1",
        title: "Credit Scores Explained",
        intro: "Demystify credit scores and learn what affects them.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false,
        flashcards: [
          { id: "fc9", front: "Credit score range", back: "300-850, with 670+ considered good." },
        ],
        quiz: {
          questions: [
            { id: "q1", question: "Perfect credit score:", options: ["700", "800", "850", "1000"], correctAnswer: 2 },
            { id: "q2", question: "Biggest credit score factor:", options: ["Payment history", "Credit age", "Inquiries", "Income"], correctAnswer: 0 },
            { id: "q3", question: "Hard inquiry stays how long:", options: ["1 year", "2 years", "5 years", "Forever"], correctAnswer: 1 },
            { id: "q4", question: "Credit utilization should be under:", options: ["10%", "30%", "50%", "100%"], correctAnswer: 1 },
            { id: "q5", question: "Closing old card affects:", options: ["Nothing", "Credit age", "Income", "Address"], correctAnswer: 1 },
          ],
          attempts: [],
        },
      },
    ],
  },
  {
    id: "m5",
    title: "Banking Essentials",
    description: "Navigate checking, savings, and digital banking",
    locked: true,
    progress: 0,
    chapters: [
      { id: "m5c1", title: "Choosing the Right Bank", intro: "Compare traditional vs online banks.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: false, flashcards: [], quiz: { questions: [], attempts: [] } },
    ],
  },
  {
    id: "m6",
    title: "Investing 101",
    description: "Start your investment journey with confidence",
    locked: true,
    progress: 0,
    chapters: [
      { id: "m6c1", title: "Stocks vs Bonds", intro: "Understand different investment types.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: false, flashcards: [], quiz: { questions: [], attempts: [] } },
    ],
  },
  {
    id: "m7",
    title: "Retirement Planning",
    description: "It's never too early to plan for the future",
    locked: true,
    progress: 0,
    chapters: [
      { id: "m7c1", title: "401(k) Basics", intro: "Maximize employer retirement benefits.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: false, flashcards: [], quiz: { questions: [], attempts: [] } },
    ],
  },
  {
    id: "m8",
    title: "Debt Management",
    description: "Strategies to pay off and avoid bad debt",
    locked: true,
    progress: 0,
    chapters: [
      { id: "m8c1", title: "Good Debt vs Bad Debt", intro: "Not all debt is created equal.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: false, flashcards: [], quiz: { questions: [], attempts: [] } },
    ],
  },
  {
    id: "m9",
    title: "Taxes Simplified",
    description: "Understand taxes and maximize deductions",
    locked: true,
    progress: 0,
    chapters: [
      { id: "m9c1", title: "Filing Your First Tax Return", intro: "Step-by-step tax filing guide.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: false, flashcards: [], quiz: { questions: [], attempts: [] } },
    ],
  },
  {
    id: "m10",
    title: "Insurance Basics",
    description: "Protect yourself and your assets",
    locked: true,
    progress: 0,
    chapters: [
      { id: "m10c1", title: "Types of Insurance", intro: "Health, auto, renters - what you need to know.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: false, flashcards: [], quiz: { questions: [], attempts: [] } },
    ],
  },
  {
    id: "m11",
    title: "Side Hustles",
    description: "Boost your income with smart side projects",
    locked: true,
    progress: 0,
    chapters: [
      { id: "m11c1", title: "Finding Your Side Hustle", intro: "Turn skills into extra income.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: false, flashcards: [], quiz: { questions: [], attempts: [] } },
    ],
  },
  {
    id: "m12",
    title: "Financial Independence",
    description: "Long-term wealth building strategies",
    locked: true,
    progress: 0,
    chapters: [
      { id: "m12c1", title: "The FIRE Movement", intro: "Financial Independence, Retire Early explained.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: false, flashcards: [], quiz: { questions: [], attempts: [] } },
    ],
  },
];