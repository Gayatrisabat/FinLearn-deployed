import { FinancialIconsBackground } from "@/components/FinancialIconsBackground";
import { LoanTracker } from "@/components/LoanTracker";
import { EMIAffordability } from "@/components/EMIAffordability";
import { InterestSaver } from "@/components/InterestSaver";
import { FutureLoanPlanner } from "@/components/FutureLoanPlanner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LoanHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <FinancialIconsBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Loan & EMI Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your loans, track EMIs, and plan future borrowing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoanTracker />
          <EMIAffordability />
          <InterestSaver />
          <FutureLoanPlanner />
        </div>
      </div>
    </div>
  );
};
