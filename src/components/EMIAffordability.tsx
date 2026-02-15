import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

export const EMIAffordability = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [totalEMI, setTotalEMI] = useState(21000);

  const emiPercentage = (totalEMI / monthlyIncome) * 100;

  const getColor = () => {
    if (emiPercentage < 30) return "text-success";
    if (emiPercentage <= 50) return "text-warning";
    return "text-destructive";
  };

  const getSuggestion = () => {
    if (emiPercentage < 30) return "Great! Your EMI burden is healthy. You have good financial flexibility.";
    if (emiPercentage <= 50) return "Moderate burden. Try to reduce spending or avoid new loans.";
    return "High risk! Your EMIs are too high. Consider consolidating loans or increasing income.";
  };

  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (emiPercentage / 100) * circumference;

  return (
    <Card className="shadow-card hover:shadow-soft transition-all duration-200 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-primary" />
          Affordability Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthly-income">Monthly Income (₹)</Label>
              <Input
                id="monthly-income"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="total-emi">Total EMI (₹)</Label>
              <Input
                id="total-emi"
                type="number"
                value={totalEMI}
                onChange={(e) => setTotalEMI(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="relative">
              <svg className="transform -rotate-90" width="200" height="200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="hsl(var(--muted))"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke={`hsl(var(--${emiPercentage < 30 ? "success" : emiPercentage <= 50 ? "warning" : "destructive"}))`}
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getColor()}`}>{Math.round(emiPercentage)}%</span>
                <span className="text-sm text-muted-foreground">of income</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <p className="text-sm font-medium">Your EMIs use {Math.round(emiPercentage)}% of your income</p>
            <p className="text-sm text-muted-foreground mt-2">{getSuggestion()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
