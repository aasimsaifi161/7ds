"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/app/_components/Header";
import ChallengeCard from "@/app/_components/ChallengeCard";
import { sins } from "@/lib/sins-data";
import { getSinProgress, submitChallengeProof } from "@/lib/firestore";

export default function SinPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sinId = params.id as string;

  const [progress, setProgress] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(true);

  const sin = sins.find((s) => s.id === sinId);

  const fetchProgress = useCallback(async () => {
    if (user && sinId) {
      try {
        const p = await getSinProgress(user.uid, sinId);
        setProgress(p);
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      }
      setLoadingProgress(false);
    }
  }, [user, sinId]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-5 h-5 border border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!sin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="text-muted mb-4">Sin not found.</p>
          <Link href="/" className="text-sm text-foreground hover:text-accent">
            ← Back to sins
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitProof = async (challengeId: number, proofText: string, proofUrl?: string, aiVerified?: boolean, aiScore?: number) => {
    if (!user) return;
    await submitChallengeProof(user.uid, sinId, challengeId, proofText, proofUrl, aiVerified, aiScore);
    await fetchProgress();
  };

  const progressPercent = (progress / sin.challenges.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Back Link */}
        <Link
          href="/"
          id="back-to-home"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors mb-8"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>

        {/* Sin Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl" style={{ color: sin.color }}>
              {sin.symbol}
            </span>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {sin.name}
              </h1>
              <p className="text-xs text-muted font-mono">{sin.latin}</p>
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-6">
            {sin.description}
          </p>

          {/* Progress */}
          {!loadingProgress && (
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-xl font-bold font-mono"
                  style={{ color: sin.color }}
                >
                  {progress}
                </span>
                <span className="text-xs text-muted">
                  / {sin.challenges.length}
                </span>
              </div>
              <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: sin.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <span className="text-xs text-muted">
                {Math.round(progressPercent)}%
              </span>
            </div>
          )}
        </motion.div>

        {/* Challenges */}
        <div className="space-y-3">
          <h2 className="text-xs font-medium text-muted uppercase tracking-wider mb-4">
            Challenges
          </h2>

          {sin.challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              sinColor={sin.color}
              isUnlocked={challenge.id <= progress + 1}
              isCompleted={challenge.id <= progress}
              onSubmitProof={(text, url, verified, score) =>
                handleSubmitProof(challenge.id, text, url, verified, score)
              }
            />
          ))}
        </div>

        {/* Completion Message */}
        {progress >= sin.challenges.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center py-8 bg-card border border-border rounded-lg"
          >
            <span className="text-3xl mb-3 block" style={{ color: sin.color }}>
              {sin.symbol}
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Sin Conquered
            </h3>
            <p className="text-sm text-muted">
              You have broken free from {sin.name}. The chain is shattered.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
