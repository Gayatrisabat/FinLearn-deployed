import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FinancialIconsBackground } from "@/components/FinancialIconsBackground";
import { mockModules } from "@/data/mockData";
import { Plus, Trash2, MessageCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SpendingRow {
  id: string;
  category: string;
  amount: string;
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export const BudgetAnalysis = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rows, setRows] = useState<SpendingRow[]>([
    { id: "1", category: "", amount: "" }
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingModule, setUpcomingModule] = useState<any>(null);

  useEffect(() => {
    const modules = localStorage.getItem("modules");
    if (modules) {
      const parsedModules = JSON.parse(modules);
      setUpcomingModule(parsedModules[0]);
    } else {
      setUpcomingModule(mockModules[0]);
    }
  }, []);

  // Load saved budget entries from DB
  useEffect(() => {
    if (!user) return;
    const loadBudget = async () => {
      const { data } = await supabase
        .from("budget_entries")
        .select("*")
        .order("created_at", { ascending: true });

      if (data && data.length > 0) {
        setRows(data.map((d) => ({
          id: d.id,
          category: d.category,
          amount: String(d.amount),
        })));
      }
    };
    loadBudget();
  }, [user]);

  const addRow = () => {
    setRows([...rows, { id: Date.now().toString(), category: "", amount: "" }]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    } else {
      toast.error("At least one row is required");
    }
  };

  const updateRow = (id: string, field: "category" | "amount", value: string) => {
    setRows(rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const chartData = rows
    .filter(row => row.category && row.amount && parseFloat(row.amount) > 0)
    .map(row => ({
      name: row.category,
      value: parseFloat(row.amount)
    }));

  const totalSpending = chartData.reduce((sum, item) => sum + item.value, 0);

  const handleDone = async () => {
    const validRows = rows.filter(row => row.category && row.amount);

    if (validRows.length === 0) {
      toast.error("Please add at least one spending category with amount");
      return;
    }

    setIsLoading(true);
    setShowChatbot(true);

    // Save budget entries to DB
    if (user) {
      // Clear old entries and save new ones
      await supabase.from("budget_entries").delete().eq("user_id", user.id);
      await supabase.from("budget_entries").insert(
        validRows.map(row => ({
          user_id: user.id,
          category: row.category,
          amount: parseFloat(row.amount),
        }))
      );
    }

    try {
      const spendingData = validRows.map(row => `${row.category}: ₹${row.amount}`).join(", ");
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            {
              role: "user",
              content: `My monthly spending: ${spendingData} | Total: ₹${totalSpending}

Give me SHORT, practical money advice:

1. Quick breakdown: Which expenses are needs vs wants?
2. Where can I save? (mention specific categories from MY spending)
3. Safe EMI limit: What's the max I should take based on ₹${totalSpending}?
4. Quick tip: One immediate action to improve my budget

Keep it brief, friendly, and use simple language. Focus only on the categories I mentioned.`
            }
          ]
        }
      });

      if (error) throw error;

      const suggestionText = data.choices[0].message.content;
      setAiSuggestions(suggestionText);

      // Save AI suggestion to DB
      if (user) {
        await supabase.from("ai_suggestions").insert({
          user_id: user.id,
          suggestion_text: suggestionText,
          spending_summary: spendingData,
          total_amount: totalSpending,
        });
      }
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      setAiSuggestions("Unable to generate suggestions at the moment. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToDashboard = () => {
    navigate("/dashboard");
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

      <div className="flex-1 px-4 py-8">
        <div className="container mx-auto max-w-7xl space-y-6">
          {/* Upcoming Module Card */}
          {upcomingModule && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Your Next Module</CardTitle>
                <CardDescription>Start your financial learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-gradient-hero flex items-center justify-center text-2xl">
                    {upcomingModule.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{upcomingModule.title}</h3>
                    <p className="text-muted-foreground">{upcomingModule.description}</p>
                  </div>
                  <Button variant="hero" onClick={() => navigate(`/module/${upcomingModule.id}`)}>
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Budget Analysis Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Analyze Your Spending</CardTitle>
              <CardDescription>Add your monthly expenses to get personalized financial advice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Spending Table */}
                <div className="space-y-4">
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount (₹)</TableHead>
                          <TableHead className="w-[80px]">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <Input
                                placeholder="e.g., Food, Rent"
                                value={row.category}
                                onChange={(e) => updateRow(row.id, "category", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                placeholder="0"
                                value={row.amount}
                                onChange={(e) => updateRow(row.id, "amount", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeRow(row.id)}
                                disabled={rows.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <Button variant="outline" onClick={addRow} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Row
                  </Button>

                  {totalSpending > 0 && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Monthly Spending</p>
                      <p className="text-2xl font-bold">₹{totalSpending.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                {/* Pie Chart */}
                <div className="flex flex-col items-center justify-center">
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={100}
                          innerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                          stroke="hsl(var(--background))"
                          strokeWidth={3}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => `₹${value}`}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Add spending data to see the chart
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={handleContinueToDashboard} className="flex-1">
                  Skip for Now
                </Button>
                <Button variant="hero" onClick={handleDone} className="flex-1" disabled={isLoading}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {isLoading ? "Analyzing..." : "Get AI Suggestions"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chatbot Dialog */}
      <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Your Personalized Financial Suggestions</DialogTitle>
            <DialogDescription>
              Based on your spending patterns, here's how you can optimize your finances
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{aiSuggestions}</p>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowChatbot(false)} className="flex-1">
              Review Spending
            </Button>
            <Button variant="hero" onClick={handleContinueToDashboard} className="flex-1">
              Continue to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
