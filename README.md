# 💰 FinLearn — Personalized Financial Literacy Platform  

FinLearn is a **modern web-based financial literacy platform** designed for individuals aged **16–26**.  
It simplifies complex financial topics through **personalized learning paths**, **interactive lessons**, **gamified quizzes**, and **progress tracking** — helping young adults gain confidence in managing their money.

---

## 🚀 Key Features  

- 🎯 **Personalized Learning Paths**  
  Users answer a few onboarding questions, and the app tailors a custom financial learning journey based on age, goals, and interests.

- 📚 **12 Structured Learning Modules**  
  Covers everything from **Budgeting**, **Saving**, and **Investing** to **Tax**, **Digital Finance**, and **Entrepreneurship**.

- 🧩 **Engaging Learning Flow**  
  Each module includes:
  - Short **intro videos (YouTube)**
  - **Flashcards** for quick revision
  - **Mini quizzes (5 questions)** after each chapter  
  - **Automatic module unlocking** after passing (≥3/5 correct)

- 📈 **Progress Tracking System**  
  A visual progress bar and achievement levels:
  - 🥉 Beginner – 50%  
  - 🥈 Intermediate – 75%  
  - 🥇 Advanced – 95%  

- 🌗 **Dark & Light Theme**  
  Seamless modern UI with a toggle for both modes.

- ✨ **Smooth Animations & Interactions**  
  Powered by **Framer Motion** and **Tailwind transitions**:
  - Animated modals and cards on hover or click  
  - Page transitions (fade/slide effects)  
  - Progress bar animation updates in real time  
  - Subtle button and input feedback animations  

- 🤖 **Future Integrations**  
  - **Supabase:** For authentication & user data storage  
  - **Gemini API:** For personalized AI learning guidance and chatbot  

---

## 🧠 Tech Stack  

| Category | Technology |
|-----------|-------------|
| Frontend | React + TypeScript + Vite |
| UI Library | shadcn/ui |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Future Backend | Supabase (Auth + DB) |
| AI Layer | Gemini API |
| Hosting | Lovable Platform |

---

## 💬 Gemini Chatbot (Coming Soon)  

FinLearn will soon include **FinBot**, a Gemini-powered chatbot that:  
- Answers **finance-related** and **app support** queries.  
- Uses **simple, professional English**.  
- Politely redirects if asked unrelated questions.  

Example reply:  
> “I can only assist with financial topics or FinLearn app-related issues. Please ask something related to those.”

---

## 🛠️ How to Edit and Run the Project  

You can modify and preview FinLearn using any of the following methods:

---

### 🩵 **Option 1: Use Lovable (Recommended)**  

Visit your project:  
👉 [FinLearn on Lovable](https://lovable.dev/projects/6b4f36ca-3383-4690-b569-16a8941a74bb)  

- Start prompting and editing directly.  
- Changes are auto-committed to your GitHub repo.  

---

### 💻 **Option 2: Local Development (IDE)**  

Requirements: **Node.js + npm**  
([Install using nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

```bash
# Clone your repository
git clone <YOUR_GIT_URL>

# Go to project folder
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Run development server
npm run dev
