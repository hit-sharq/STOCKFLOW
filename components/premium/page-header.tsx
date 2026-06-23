'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string | ReactNode;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
  icon,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 flex items-start justify-between"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          {icon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-primary"
            >
              {icon}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold tracking-tight"
          >
            {title}
          </motion.h1>
        </div>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
      </div>
      {action && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
