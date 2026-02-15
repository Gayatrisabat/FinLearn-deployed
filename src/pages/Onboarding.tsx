import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FinancialIconsBackground } from "@/components/FinancialIconsBackground";
import { onboardingQuestions, generateLearningPath, mockModules } from "@/data/mockData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Onboarding = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);

  const question = onboardingQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / onboardingQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = async () => {
    if (!answers[question.id]) {
      toast.error("Please provide an answer");
      return;
    }

    if (currentQuestion < onboardingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate AI-powered learning path
      setIsGeneratingPath(true);
      try {
        const { data, error } = await supabase.functions.invoke("recommend-modules", {
          body: { answers, modules: mockModules },
        });
        
        if (error) throw error;
        
        // Reorder modules based on AI recommendation
        const priorityIds = data.priorityModules || [];
        const reorderedModules = [...mockModules].sort((a, b) => {
          const aIndex = priorityIds.indexOf(a.id);
          const bIndex = priorityIds.indexOf(b.id);
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        
        localStorage.setItem("modules", JSON.stringify(reorderedModules));
        localStorage.setItem("aiRecommendation", data.explanation);
        localStorage.setItem("onboardingAnswers", JSON.stringify(answers));
        toast.success("Your personalized path is ready!");
        navigate("/budget-analysis");
      } catch (error) {
        console.error("Error generating path:", error);
        const path = generateLearningPath(Object.values(answers));
        localStorage.setItem("learningPath", JSON.stringify(path));
        localStorage.setItem("onboardingAnswers", JSON.stringify(answers));
        toast.success("Your personalized path is ready!");
        navigate("/budget-analysis");
      } finally {
        setIsGeneratingPath(false);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <FinancialIconsBackground />
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero" />
            <h1 className="text-2xl font-bold">FinLearn</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl animate-fade-in">
          <CardHeader className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentQuestion + 1} of {onboardingQuestions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <CardTitle className="text-2xl">{question.question}</CardTitle>
            <CardDescription>Choose one option</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={answers[question.id]} onValueChange={handleAnswer}>
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value={option} id={`option-${idx}`} />
                    <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex gap-3 pt-4">
              {currentQuestion > 0 && (
                <Button variant="outline" onClick={handleBack} className="flex-1" disabled={isGeneratingPath}>
                  Back
                </Button>
              )}
              <Button variant="hero" onClick={handleNext} className="flex-1" disabled={isGeneratingPath}>
                {isGeneratingPath ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Your Path...
                  </>
                ) : (
                  currentQuestion === onboardingQuestions.length - 1 ? "Complete" : "Next"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};