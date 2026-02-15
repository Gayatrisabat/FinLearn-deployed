import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProgressBadge } from "@/components/ProgressBadge";
import { ModuleCard } from "@/components/ModuleCard";
import { FinancialIconsBackground } from "@/components/FinancialIconsBackground";
import { LogOut, Calculator } from "lucide-react";
import { mockModules } from "@/data/mockData";
import { Module, UserProgress } from "@/types";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedChapters: [],
    moduleProgress: {},
    globalProgress: 0,
    level: "Not Started",
  });

  useEffect(() => {
    // Load saved data or use defaults
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    
    const savedModules = localStorage.getItem("modules");
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    } else {
      setModules(mockModules);
      localStorage.setItem("modules", JSON.stringify(mockModules));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getProgressLevel = (progress: number): UserProgress["level"] => {
    if (progress === 0) return "Not Started";
    if (progress < 50) return "Beginner";
    if (progress < 75) return "Intermediate";
    return "Advanced";
  };

  const currentLevel = getProgressLevel(userProgress.globalProgress);

  return (
    <div className="min-h-screen bg-background relative">
      <FinancialIconsBackground />
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero" />
            <h1 className="text-2xl font-bold">FinLearn</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/loans")}
              className="gap-2"
              variant="outline"
            >
              <Calculator className="h-4 w-4" />
              Loan & EMI Hub
            </Button>
            <ProgressBadge level={currentLevel} />
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <section className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-4xl font-bold mb-2">Your Learning Journey</h2>
            <p className="text-lg text-muted-foreground">
              Continue building your financial knowledge, one module at a time.
            </p>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 space-y-4 shadow-card">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold mb-1">Overall Progress</h3>
                <p className="text-muted-foreground">
                  {userProgress.completedChapters.length} chapters completed
                </p>
              </div>
              <ProgressBadge level={currentLevel} />
            </div>
            <Progress value={userProgress.globalProgress} variant={userProgress.globalProgress >= 95 ? "success" : "default"} className="h-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{userProgress.globalProgress}% Complete</span>
              <span>Next milestone: {userProgress.globalProgress < 50 ? "50% (Intermediate)" : userProgress.globalProgress < 75 ? "75% (Advanced)" : "95% (Expert)"}</span>
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold">Your Learning Path</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, idx) => (
              <div key={module.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <ModuleCard
                  module={module}
                  onClick={() => navigate(`/module/${module.id}`)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
