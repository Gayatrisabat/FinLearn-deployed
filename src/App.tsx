import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Landing } from "./pages/Landing";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Onboarding } from "./pages/Onboarding";
import { BudgetAnalysis } from "./pages/BudgetAnalysis";
import { Dashboard } from "./pages/Dashboard";
import { ModuleDetail } from "./pages/ModuleDetail";
import { ChapterView } from "./pages/ChapterView";
import { LoanHub } from "./pages/LoanHub";
import NotFound from "./pages/NotFound";
import { ChatWidget } from "./components/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/budget-analysis" element={<BudgetAnalysis />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/module/:moduleId" element={<ModuleDetail />} />
            <Route path="/chapter/:moduleId/:chapterId" element={<ChapterView />} />
            <Route path="/loans" element={<LoanHub />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
