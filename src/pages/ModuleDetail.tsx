import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FinancialIconsBackground } from "@/components/FinancialIconsBackground";
import { ArrowLeft, Play, Lock, CheckCircle2 } from "lucide-react";
import { Module } from "@/types";
import { BudgetingSuggestionPanel } from "@/components/BudgetingSuggestionPanel";

export const ModuleDetail = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    const savedModules = localStorage.getItem("modules");
    if (savedModules) {
      const modules = JSON.parse(savedModules);
      const found = modules.find((m: Module) => m.id === moduleId);
      setModule(found || null);
    }
  }, [moduleId]);

  if (!module) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <FinancialIconsBackground />
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-hero" />
              <h1 className="text-2xl font-bold">FinLearn</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-8">
        {/* Module Header */}
        <section className="space-y-4 animate-fade-in">
          <h2 className="text-4xl font-bold">{module.title}</h2>
          <p className="text-lg text-muted-foreground">{module.description}</p>
          
          <div className="bg-gradient-card rounded-2xl p-6 space-y-3 shadow-card">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Module Progress</span>
              <span className="text-muted-foreground">{module.progress}%</span>
            </div>
            <Progress value={module.progress} variant={module.progress === 100 ? "success" : "default"} className="h-3" />
          </div>
        </section>

        {/* Chapters List */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Chapters</h3>
          <div className="space-y-4">
            {module.chapters.map((chapter, idx) => {
              const isLocked = idx > 0 && !module.chapters[idx - 1].completed;
              
              return (
                <Card
                  key={chapter.id}
                  className={`cursor-pointer transition-all ${
                    isLocked ? "opacity-60" : "hover:scale-[1.01]"
                  } animate-slide-up`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  onClick={() => !isLocked && navigate(`/chapter/${module.id}/${chapter.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            {idx + 1}
                          </div>
                          <CardTitle className="text-xl">{chapter.title}</CardTitle>
                        </div>
                        <CardDescription className="line-clamp-2">{chapter.intro}</CardDescription>
                      </div>
                      {isLocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : chapter.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Play className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>
          </div>
          
          {/* Budgeting Suggestion Panel */}
          <aside className="hidden lg:block">
            <BudgetingSuggestionPanel />
          </aside>
        </div>
      </main>
    </div>
  );
};
