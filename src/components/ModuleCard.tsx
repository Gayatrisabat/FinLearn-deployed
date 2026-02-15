import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle2 } from "lucide-react";
import { Module } from "@/types";

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

export const ModuleCard = ({ module, onClick }: ModuleCardProps) => {
  const isCompleted = module.progress === 100;
  
  return (
    <Card 
      className={`cursor-pointer transition-all ${module.locked ? 'opacity-60' : 'hover:scale-[1.02]'}`}
      onClick={() => !module.locked && onClick()}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{module.title}</CardTitle>
          {module.locked ? (
            <Lock className="h-5 w-5 text-muted-foreground" />
          ) : isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : null}
        </div>
        <CardDescription className="line-clamp-2">{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{module.progress}%</span>
          </div>
          <Progress value={module.progress} variant={isCompleted ? "success" : "default"} />
        </div>
      </CardContent>
    </Card>
  );
};
