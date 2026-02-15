import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FinancialIconsBackground } from "@/components/FinancialIconsBackground";
import { BookOpen, TrendingUp, Award, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-learning.jpg";

export const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "12 Comprehensive Modules",
      description: "From budgeting basics to investing strategies, master every aspect of personal finance.",
    },
    {
      icon: Zap,
      title: "Personalized Learning Path",
      description: "AI-powered recommendations based on your goals, experience, and interests.",
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "Visual progress tracking with achievement badges as you level up from Beginner to Advanced.",
    },
    {
      icon: Award,
      title: "Interactive Quizzes",
      description: "Test your knowledge with engaging quizzes after each chapter. Score 60% to unlock the next lesson.",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <FinancialIconsBackground />
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero" />
            <h1 className="text-2xl font-bold">FinLearn</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button variant="hero" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
              Master Your <span className="bg-gradient-hero bg-clip-text text-transparent">Financial Future</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Personalized financial literacy for ages 16–26. Learn budgeting, investing, and money management through
              interactive modules designed just for you.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="hero" size="lg" onClick={() => navigate("/signup")}>
                Start Learning Free
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative animate-slide-up">
            <img
              src={heroImage}
              alt="Young adults learning financial literacy"
              className="rounded-2xl shadow-soft w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-card">
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need to Succeed</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            FinLearn combines expert content, personalized paths, and gamified learning to make financial education
            engaging and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-hero text-primary-foreground border-0 shadow-soft">
          <CardHeader className="text-center space-y-4 py-12">
            <CardTitle className="text-3xl lg:text-4xl">Ready to Take Control of Your Finances?</CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Join thousands of young adults building financial confidence. Start your personalized learning journey
              today.
            </CardDescription>
            <div className="pt-4">
              <Button variant="secondary" size="lg" onClick={() => navigate("/signup")}>
                Create Free Account
              </Button>
            </div>
          </CardHeader>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 FinLearn. Empowering financial literacy for the next generation.</p>
        </div>
      </footer>
    </div>
  );
};
