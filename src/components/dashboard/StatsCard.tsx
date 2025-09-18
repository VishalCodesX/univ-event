import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatsCard({ title, value, change, icon: Icon, description, trend }: StatsCardProps) {
  const getTrendColor = () => {
    if (!change) return "text-muted-foreground";
    return change.type === "increase" ? "text-success" : "text-destructive";
  };

  const getTrendIcon = () => {
    if (!change) return null;
    return change.type === "increase" ? "↗" : "↘";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-gradient-card shadow-lg hover:shadow-xl transition-all duration-300 border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {typeof value === "number" ? value.toLocaleString() : value}
              </div>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            {change && (
              <div className={`flex items-center text-sm ${getTrendColor()}`}>
                <span className="mr-1">{getTrendIcon()}</span>
                <span>{Math.abs(change.value)}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}