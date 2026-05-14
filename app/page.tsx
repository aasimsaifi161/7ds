"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./_components/Header";
import SinCard from "./_components/SinCard";
import { sins } from "@/lib/sins-data";
import { getUserProfile } from "@/lib/firestore";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchProgress() {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile?.progress) {
            setProgress(profile.progress);
          }
        } catch (error) {
          console.error("Failed to fetch progress:", error);
        }
        setLoadingProgress(false);
      }
    }
    fetchProgress();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-5 h-5 border border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  const totalChallenges = sins.reduce(
    (acc, sin) => acc + sin.challenges.length,
    0
  );
  const completedChallenges = Object.values(progress).reduce(
    (acc, val) => acc + val,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            The Seven Deadly Sins
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Each sin holds 10 challenges designed to break your chains. Complete
            them in order — prove your discipline, or remain bound.
          </p>

          {/* Overall Progress */}
          {!loadingProgress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex items-center gap-4"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-foreground font-mono">
                  {completedChallenges}
                </span>
                <span className="text-xs text-muted">
                  / {totalChallenges} total
                </span>
              </div>
              <div className="flex-1 max-w-xs h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-foreground rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedChallenges / totalChallenges) * 100}%`,
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Sin Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sins.map((sin, index) => (
            <SinCard
              key={sin.id}
              sin={sin}
              index={index}
              progress={progress[sin.id] || 0}
            />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted">
            Complete each challenge with proof to unlock the next.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
