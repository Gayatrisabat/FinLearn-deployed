import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProgressBadgeProps {
  level: "Beginner" | "Intermediate" | "Advanced" | "Not Started";
}

export const ProgressBadge = ({ level }: ProgressBadgeProps) => {
  const config = {
    "Not Started": { color: "bg-muted text-muted-foreground", icon: false },
    "Beginner": { color: "bg-primary/10 text-primary border-primary/20", icon: true },
    "Intermediate": { color: "bg-primary/20 text-primary border-primary/30", icon: true },
    "Advanced": { color: "bg-success/20 text-success border-success/30", icon: true },
  };

  const { color, icon } = config[level];

  return (
    <Badge variant="outline" className={`${color} gap-1.5 px-3 py-1`}>
      {icon && <Award className="h-3.5 w-3.5" />}
      {level}
    </Badge>
  );
};
