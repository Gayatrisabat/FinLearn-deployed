import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingDown, PiggyBank, Target } from "lucide-react";

const budgetTips = [
  {
    icon: TrendingDown,
    title: "Track Your Spending",
    description: "Monitor where your money goes by reviewing expenses weekly.",
    color: "text-blue-500",
  },
  {
    icon: PiggyBank,
    title: "Build Emergency Fund",
    description: "Save 3-6 months of expenses for unexpected situations.",
    color: "text-green-500",
  },
  {
    icon: Target,
    title: "Set Clear Goals",
    description: "Define specific savings targets to stay motivated.",
    color: "text-purple-500",
  },
];

export const BudgetingSuggestionPanel = () => {
  return (
    <Card className="shadow-card sticky top-20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Budget Tips</CardTitle>
        </div>
        <CardDescription>Quick suggestions to manage your finances</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgetTips.map((tip, idx) => (
          <div key={idx} className="space-y-2 pb-4 border-b last:border-b-0 last:pb-0">
            <div className="flex items-start gap-3">
              <tip.icon className={`h-5 w-5 mt-0.5 ${tip.color}`} />
              <div className="space-y-1 flex-1">
                <h4 className="font-semibold text-sm">{tip.title}</h4>
                <p className="text-xs text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full" size="sm">
          Learn More About Budgeting
        </Button>
      </CardContent>
    </Card>
  );
};
