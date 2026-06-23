'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  variant?: 'default' | 'accent' | 'success';
}

export function StatCard({
  title,
  value,
  change,
  icon,
  trend,
  variant = 'default',
}: StatCardProps) {
  const bgColor = {
    default: 'bg-card hover:bg-secondary/50',
    accent: 'bg-primary/5 hover:bg-primary/10',
    success: 'bg-accent/5 hover:bg-accent/10',
  };

  const borderColor = {
    default: 'border-border',
    accent: 'border-primary/20',
    success: 'border-accent/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${bgColor[variant]} ${borderColor[variant]} rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>
          {change !== undefined && (
            <div className="mt-3 flex items-center gap-1">
              {trend === 'up' && (
                <>
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">{change}%</span>
                </>
              )}
              {trend === 'down' && (
                <>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">{change}%</span>
                </>
              )}
              {trend === 'stable' && (
                <span className="text-sm font-medium text-muted-foreground">-{change}%</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-primary"
          >
            {icon}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
