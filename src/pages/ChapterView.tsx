import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FinancialIconsBackground } from "@/components/FinancialIconsBackground";
import { ArrowLeft, ChevronRight, RotateCcw, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Chapter, Module } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type ViewMode = "intro" | "flashcards" | "quiz" | "results";

export const ChapterView = () => {
  const { moduleId, chapterId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("intro");
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [generatedFlashcards, setGeneratedFlashcards] = useState<any[]>([]);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState<string>("");

  useEffect(() => {
    const savedModules = localStorage.getItem("modules");
    if (savedModules) {
      const modules = JSON.parse(savedModules);
      const foundModule = modules.find((m: Module) => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
        const foundChapter = foundModule.chapters.find((c: Chapter) => c.id === chapterId);
        setChapter(foundChapter || null);
        
        // Fetch YouTube video for this chapter
        if (foundChapter) {
          fetchYoutubeVideo(foundChapter.title);
        }
      }
    }
  }, [moduleId, chapterId]);

  const fetchYoutubeVideo = async (chapterTitle: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("fetch-youtube-videos", {
        body: { 
          searchQuery: `${chapterTitle} financial literacy tutorial`,
          maxResults: 1 
        },
      });
      
      if (error) throw error;
      
      if (data.videos && data.videos.length > 0) {
        setYoutubeVideoUrl(data.videos[0].embedUrl);
      }
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
      // Keep the default video URL from mock data if API fails
    }
  };

  const generateFlashcardsAndQuiz = async () => {
    if (!chapter) return;
    
    setIsGeneratingFlashcards(true);
    try {
      // Generate flashcards
      const { data: flashcardsData, error: flashcardsError } = await supabase.functions.invoke("generate-flashcards", {
        body: { chapterTitle: chapter.title, chapterIntro: chapter.intro },
      });
      
      if (flashcardsError) throw flashcardsError;
      
      if (flashcardsData.flashcards && flashcardsData.flashcards.length > 0) {
        setGeneratedFlashcards(flashcardsData.flashcards);
      } else {
        // Fallback to mock flashcards
        setGeneratedFlashcards(chapter.flashcards);
      }
      
      // Generate quiz
      const { data: quizData, error: quizError } = await supabase.functions.invoke("generate-quiz", {
        body: { chapterTitle: chapter.title, chapterIntro: chapter.intro },
      });
      
      if (quizError) throw quizError;
      
      if (quizData.questions && quizData.questions.length > 0) {
        setGeneratedQuestions(quizData.questions.map((q: any, idx: number) => ({
          ...q,
          id: `ai-q${idx}`,
        })));
      }
      
      setViewMode("flashcards");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate AI content, using default");
      setGeneratedFlashcards(chapter.flashcards);
      setViewMode("flashcards");
    } finally {
      setIsGeneratingFlashcards(false);
    }
  };

  const handleNextFlashcard = () => {
    const flashcards = generatedFlashcards.length > 0 ? generatedFlashcards : chapter?.flashcards || [];
    if (currentFlashcard < flashcards.length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
      setShowAnswer(false);
    } else {
      setViewMode("quiz");
    }
  };

  const handleSubmitQuiz = () => {
    if (!chapter) return;

    const questions = generatedQuestions.length > 0 ? generatedQuestions : chapter.quiz.questions;
    const answered = Object.keys(quizAnswers).length;
    if (answered < questions.length) {
      toast.error("Please answer all questions");
      return;
    }

    let correct = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = (correct / questions.length) * 100;
    setQuizScore(score);
    setViewMode("results");

    if (score >= 60) {
      // Update chapter completion and module progress
      const savedModules = localStorage.getItem("modules");
      if (savedModules && module) {
        const modules = JSON.parse(savedModules);
        const moduleIndex = modules.findIndex((m: Module) => m.id === moduleId);
        if (moduleIndex !== -1) {
          const chapterIndex = modules[moduleIndex].chapters.findIndex((c: Chapter) => c.id === chapterId);
          if (chapterIndex !== -1) {
            modules[moduleIndex].chapters[chapterIndex].completed = true;
            
            // Update module progress
            const completedChapters = modules[moduleIndex].chapters.filter((c: Chapter) => c.completed).length;
            modules[moduleIndex].progress = Math.round((completedChapters / modules[moduleIndex].chapters.length) * 100);
            
            // Unlock next module if current is complete
            if (modules[moduleIndex].progress === 100 && moduleIndex < modules.length - 1) {
              modules[moduleIndex + 1].locked = false;
            }
            
            localStorage.setItem("modules", JSON.stringify(modules));
            
            // Update user progress
            const savedProgress = localStorage.getItem("userProgress");
            const progress = savedProgress ? JSON.parse(savedProgress) : { completedChapters: [], moduleProgress: {}, globalProgress: 0, level: "Not Started" };
            if (!progress.completedChapters.includes(chapterId)) {
              progress.completedChapters.push(chapterId);
            }
            progress.moduleProgress[moduleId!] = modules[moduleIndex].progress;
            
            const totalChapters = modules.reduce((acc: number, m: Module) => acc + m.chapters.length, 0);
            progress.globalProgress = Math.round((progress.completedChapters.length / totalChapters) * 100);
            
            localStorage.setItem("userProgress", JSON.stringify(progress));
          }
        }
      }
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizScore(null);
    setGeneratedQuestions([]);
    setViewMode("quiz");
  };

  if (!chapter || !module) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <FinancialIconsBackground />
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/module/${moduleId}`)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{chapter.title}</h1>
              <p className="text-sm text-muted-foreground">{module.title}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {viewMode === "intro" && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Introduction</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{chapter.intro}</p>
              
              {/* Key Points Section */}
              <div className="mt-6 space-y-3">
                <h3 className="text-xl font-semibold">Key Points:</h3>
                <ul className="space-y-2 ml-6">
                  <li className="text-muted-foreground list-disc">Understanding the fundamental concepts and their real-world applications</li>
                  <li className="text-muted-foreground list-disc">Practical strategies you can implement immediately</li>
                  <li className="text-muted-foreground list-disc">Common mistakes to avoid when managing your finances</li>
                  <li className="text-muted-foreground list-disc">Tools and resources to help you succeed</li>
                </ul>
              </div>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Video Lesson</CardTitle>
                <CardDescription>Watch this video to learn the key concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={youtubeVideoUrl || chapter.videoUrl}
                    title={chapter.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="hero" size="lg" onClick={generateFlashcardsAndQuiz} disabled={isGeneratingFlashcards}>
                {isGeneratingFlashcards ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    Continue to Flashcards
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {viewMode === "flashcards" && (
          <div className="space-y-8 animate-fade-in">
            {(() => {
              const flashcards = generatedFlashcards.length > 0 ? generatedFlashcards : chapter.flashcards;
              return (
                <>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Flashcards</h2>
                    <p className="text-muted-foreground">
                      Card {currentFlashcard + 1} of {flashcards.length}
                      {generatedFlashcards.length > 0 && " (AI-generated)"}
                    </p>
                  </div>

                  <Card
                    className="min-h-[300px] cursor-pointer shadow-soft hover:shadow-card transition-all"
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    <CardContent className="flex items-center justify-center min-h-[300px] p-8">
                      <div className="text-center space-y-4">
                        <p className="text-sm text-muted-foreground uppercase tracking-wide">
                          {showAnswer ? "Answer" : "Question"}
                        </p>
                        <p className="text-2xl font-medium">
                          {showAnswer
                            ? flashcards[currentFlashcard]?.back
                            : flashcards[currentFlashcard]?.front}
                        </p>
                        <p className="text-sm text-muted-foreground">Click to flip</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button variant="hero" size="lg" onClick={handleNextFlashcard}>
                      {currentFlashcard === flashcards.length - 1 ? "Start Quiz" : "Next Card"}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {viewMode === "quiz" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Chapter Quiz</h2>
              <p className="text-muted-foreground">
                {generatedQuestions.length > 0 ? "AI-generated quiz - " : ""}Score 60% or higher to complete this chapter
              </p>
            </div>

            <div className="space-y-6">
              {(generatedQuestions.length > 0 ? generatedQuestions : chapter.quiz.questions).map((question, idx) => (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {idx + 1}. {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={quizAnswers[question.id]?.toString()}
                      onValueChange={(value) =>
                        setQuizAnswers({ ...quizAnswers, [question.id]: parseInt(value) })
                      }
                    >
                      <div className="space-y-3">
                        {question.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                          >
                            <RadioGroupItem value={optIdx.toString()} id={`q${idx}-opt${optIdx}`} />
                            <Label htmlFor={`q${idx}-opt${optIdx}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button variant="hero" size="lg" onClick={handleSubmitQuiz}>
                Submit Quiz
              </Button>
            </div>
          </div>
        )}

        {viewMode === "results" && quizScore !== null && (
          <div className="space-y-8 animate-fade-in">
            <Card className={`shadow-soft ${quizScore >= 60 ? "border-success" : "border-destructive"}`}>
              <CardHeader className="text-center space-y-4 py-12">
                <div
                  className={`h-24 w-24 mx-auto rounded-full flex items-center justify-center text-4xl font-bold ${
                    quizScore >= 60 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {quizScore}%
                </div>
                <CardTitle className="text-3xl">
                  {quizScore >= 60 ? "Congratulations!" : "Keep Practicing"}
                </CardTitle>
                <CardDescription className="text-lg">
                  {quizScore >= 60
                    ? "You passed! This chapter is now complete."
                    : "You need 60% to pass. Review the material and try again."}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="flex gap-4 justify-center">
              {quizScore < 60 && (
                <Button variant="outline" size="lg" onClick={handleRetakeQuiz}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
              )}
              <Button variant="hero" size="lg" onClick={() => navigate(`/module/${moduleId}`)}>
                {quizScore >= 60 ? "Continue Learning" : "Back to Module"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
