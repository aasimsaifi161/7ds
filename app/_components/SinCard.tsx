"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sin } from "@/lib/sins-data";

interface SinCardProps {
  sin: Sin;
  index: number;
  progress: number;
}

export default function SinCard({ sin, index, progress }: SinCardProps) {
  const totalChallenges = sin.challenges.length;
  const progressPercent = (progress / totalChallenges) * 100;
  const isCompleted = progress >= totalChallenges;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/sin/${sin.id}`} id={`sin-card-${sin.id}`}>
        <div className="group bg-card border border-border rounded-lg p-5 hover:border-muted transition-all duration-300 cursor-pointer h-full">
          {/* Symbol and Name */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className="text-2xl"
                style={{ color: sin.color }}
              >
                {sin.symbol}
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-white transition-colors">
                  {sin.name}
                </h3>
                <p className="text-xs text-muted font-mono">{sin.latin}</p>
              </div>
            </div>

            {isCompleted && (
              <span className="text-xs px-2 py-0.5 rounded bg-card-hover text-muted border border-border">
                Conquered
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
            {sin.description}
          </p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted">
                {progress} / {totalChallenges} challenges
              </span>
              <span className="text-xs text-muted">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: sin.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
