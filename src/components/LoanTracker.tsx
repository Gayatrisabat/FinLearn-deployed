import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, CreditCard, Car, GraduationCap, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Loan {
  id: string;
  name: string;
  type: "bank" | "credit" | "car" | "education";
  emiAmount: number;
  totalMonths: number;
  remainingMonths: number;
}

const loanIcons = {
  bank: Building2,
  credit: CreditCard,
  car: Car,
  education: GraduationCap,
};

export const LoanTracker = () => {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: "1",
      name: "Education Loan",
      type: "education",
      emiAmount: 5000,
      totalMonths: 60,
      remainingMonths: 42,
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLoan, setNewLoan] = useState({
    name: "",
    type: "bank" as Loan["type"],
    emiAmount: "",
    totalMonths: "",
    remainingMonths: "",
  });
  const { toast } = useToast();

  const addLoan = () => {
    if (!newLoan.name || !newLoan.emiAmount || !newLoan.totalMonths || !newLoan.remainingMonths) {
      toast({
        title: "Missing information",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    const loan: Loan = {
      id: Date.now().toString(),
      name: newLoan.name,
      type: newLoan.type,
      emiAmount: Number(newLoan.emiAmount),
      totalMonths: Number(newLoan.totalMonths),
      remainingMonths: Number(newLoan.remainingMonths),
    };

    setLoans([...loans, loan]);
    setNewLoan({ name: "", type: "bank", emiAmount: "", totalMonths: "", remainingMonths: "" });
    setIsDialogOpen(false);
    toast({
      title: "Loan added",
      description: "Your loan has been added to the tracker",
    });
  };

  const deleteLoan = (id: string) => {
    setLoans(loans.filter((loan) => loan.id !== id));
    toast({
      title: "Loan removed",
      description: "Loan has been removed from tracker",
    });
  };

  const getStatusBadge = (remaining: number, total: number) => {
    const progress = ((total - remaining) / total) * 100;
    if (progress >= 75) return <Badge className="bg-success text-success-foreground">On Track</Badge>;
    if (progress >= 50) return <Badge className="bg-warning text-warning-foreground">Heavy</Badge>;
    return <Badge variant="destructive">Risky</Badge>;
  };

  return (
    <Card className="shadow-card hover:shadow-soft transition-all duration-200 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            My Loans
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Loan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Loan</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loan-name">Loan Name</Label>
                  <Input
                    id="loan-name"
                    placeholder="e.g., Home Loan"
                    value={newLoan.name}
                    onChange={(e) => setNewLoan({ ...newLoan, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="loan-type">Loan Type</Label>
                  <select
                    id="loan-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newLoan.type}
                    onChange={(e) => setNewLoan({ ...newLoan, type: e.target.value as Loan["type"] })}
                  >
                    <option value="bank">Bank Loan</option>
                    <option value="credit">Credit Card</option>
                    <option value="car">Car Loan</option>
                    <option value="education">Education Loan</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="emi-amount">EMI Amount (₹)</Label>
                  <Input
                    id="emi-amount"
                    type="number"
                    placeholder="5000"
                    value={newLoan.emiAmount}
                    onChange={(e) => setNewLoan({ ...newLoan, emiAmount: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="total-months">Total Months</Label>
                  <Input
                    id="total-months"
                    type="number"
                    placeholder="60"
                    value={newLoan.totalMonths}
                    onChange={(e) => setNewLoan({ ...newLoan, totalMonths: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="remaining-months">Remaining Months</Label>
                  <Input
                    id="remaining-months"
                    type="number"
                    placeholder="42"
                    value={newLoan.remainingMonths}
                    onChange={(e) => setNewLoan({ ...newLoan, remainingMonths: e.target.value })}
                  />
                </div>
                <Button onClick={addLoan} className="w-full">
                  Add Loan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loans.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No loans added yet. Click "Add Loan" to get started.</p>
        ) : (
          loans.map((loan) => {
            const Icon = loanIcons[loan.type];
            const progress = ((loan.totalMonths - loan.remainingMonths) / loan.totalMonths) * 100;

            return (
              <Card key={loan.id} className="p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{loan.name}</h4>
                      <p className="text-sm text-muted-foreground">₹{loan.emiAmount.toLocaleString()}/month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(loan.remainingMonths, loan.totalMonths)}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteLoan(loan.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {loan.remainingMonths} of {loan.totalMonths} months remaining
                    </span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </Card>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
