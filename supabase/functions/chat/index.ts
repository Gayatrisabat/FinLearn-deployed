import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are FinLear, a friendly financial-guidance assistant.

Your job is to:
1. Collect the user's monthly spending details.
2. After getting spending details, always ask: "Do you earn? If yes, how much per month?"
3. If the user says yes, collect their monthly income amount.
4. Once you have both income + expenses, generate a clear financial management plan including:
   - Savings recommendation
   - EMI/loan management (if mentioned)
   - Budget allocation (needs/wants/savings)
   - Credit-score improvement suggestions
   - Personalized tips based on their spending behavior

Rules:
- Keep questions short and simple.
- Do not give advice until you have both income and expense details.
- If income or expenses are missing, ask again politely.
- Always end with a follow-up question until all data is collected.
- Give suggestions in simple, beginner-friendly language.
- Use bold text for emphasis and short lists when helpful.

When enough data is collected, provide:
1. Monthly snapshot (Income vs Expenses)
2. Savings % and how to increase it
3. Risk areas (overspending, high EMIs, irregular expenses)
4. A clear 30-day + 90-day improvement plan
5. Action steps the user can follow immediately

If asked about anything unrelated to finance, respond ONLY with:
"I can only assist with financial topics. Please ask something related to money management, budgeting, or personal finance."`,
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
