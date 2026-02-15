import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";

export const InterestSaver = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(60);
  const [extraPayment, setExtraPayment] = useState(0);

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 12 / 100;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  const calculateSavings = () => {
    const normalEMI = calculateEMI(loanAmount, interestRate, loanTenure);
    const newEMI = normalEMI + extraPayment;
    const monthlyRate = interestRate / 12 / 100;

    // Calculate new tenure with extra payment
    let remainingPrincipal = loanAmount;
    let months = 0;
    
    while (remainingPrincipal > 0 && months < loanTenure) {
      const interestComponent = remainingPrincipal * monthlyRate;
      const principalComponent = newEMI - interestComponent;
      remainingPrincipal -= principalComponent;
      months++;
    }

    const monthsSaved = loanTenure - months;
    const totalNormalPayment = normalEMI * loanTenure;
    const totalNewPayment = newEMI * months;
    const interestSaved = totalNormalPayment - totalNewPayment;

    return {
      monthsSaved: Math.max(0, monthsSaved),
      interestSaved: Math.max(0, interestSaved),
    };
  };

  const { monthsSaved, interestSaved } = calculateSavings();

  return (
    <Card className="shadow-card hover:shadow-soft transition-all duration-200 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Interest Saver
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
            <Input
              id="loan-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="loan-tenure">Loan Tenure (months)</Label>
            <Input
              id="loan-tenure"
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Extra Monthly Payment (₹)</Label>
              <span className="text-sm font-medium text-primary">+₹{extraPayment.toLocaleString()}</span>
            </div>
            <Slider
              value={[extraPayment]}
              onValueChange={(value) => setExtraPayment(value[0])}
              max={10000}
              step={100}
              className="mt-2"
            />
          </div>
        </div>

        {extraPayment > 0 && (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Saved</p>
                <p className="text-lg font-bold">{Math.round(monthsSaved)} months earlier</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interest Saved</p>
                <p className="text-lg font-bold">₹{Math.round(interestSaved).toLocaleString()}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-center text-muted-foreground">
                By paying +₹{extraPayment.toLocaleString()}/month, finish your loan {Math.round(monthsSaved)} months earlier
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
