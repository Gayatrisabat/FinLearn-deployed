import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Home, Car, GraduationCap, Smartphone } from "lucide-react";

type LoanType = "home" | "car" | "education" | "gadget";

export const FutureLoanPlanner = () => {
  const [selectedType, setSelectedType] = useState<LoanType>("home");
  const [cost, setCost] = useState(2500000);
  const [downPayment, setDownPayment] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(240); // in months

  const loanTypes = [
    { type: "home" as LoanType, icon: Home, label: "Home" },
    { type: "car" as LoanType, icon: Car, label: "Car" },
    { type: "education" as LoanType, icon: GraduationCap, label: "Education" },
    { type: "gadget" as LoanType, icon: Smartphone, label: "Gadget" },
  ];

  const calculateEMI = () => {
    const principal = cost - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi;
  };

  const getRecommendedDownPayment = () => {
    return cost * 0.2; // 20% of cost
  };

  const getAffordabilityTag = (emi: number) => {
    const assumedIncome = 75000;
    const percentage = (emi / assumedIncome) * 100;

    if (percentage < 30) return { label: "Affordable", variant: "default" as const, color: "bg-success" };
    if (percentage <= 50) return { label: "Moderate", variant: "secondary" as const, color: "bg-warning" };
    return { label: "High Risk", variant: "destructive" as const, color: "bg-destructive" };
  };

  const estimatedEMI = calculateEMI();
  const recommendedDownPayment = getRecommendedDownPayment();
  const affordability = getAffordabilityTag(estimatedEMI);

  return (
    <Card className="shadow-card hover:shadow-soft transition-all duration-200 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-primary" />
          Plan a New Loan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="mb-3 block">Loan Type</Label>
          <div className="grid grid-cols-4 gap-2">
            {loanTypes.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.type}
                  onClick={() => setSelectedType(item.type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    selectedType === item.type
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${selectedType === item.type ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cost">Total Cost (₹)</Label>
            <Input
              id="cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="down-payment">Down Payment (₹)</Label>
            <Input
              id="down-payment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="interest">Interest Rate (%)</Label>
            <Input
              id="interest"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="tenure">Tenure (months)</Label>
            <Input
              id="tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated EMI</span>
              <span className="text-2xl font-bold text-primary">₹{Math.round(estimatedEMI).toLocaleString()}/month</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Recommended Down Payment</span>
              <span className="text-lg font-semibold">₹{Math.round(recommendedDownPayment).toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-sm text-muted-foreground">Affordability</span>
              <Badge className={affordability.color}>{affordability.label}</Badge>
            </div>

            <p className="text-xs text-center text-muted-foreground pt-2">
              Based on average income of ₹75,000/month
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
