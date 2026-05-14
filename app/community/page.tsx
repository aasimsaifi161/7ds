"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/_components/Header";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CommunityPage() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    // Real-time listener for the global stats document
    const statsRef = doc(db, "stats", "global");
    
    const unsubscribe = onSnapshot(statsRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserCount(docSnap.data().userCount || 0);
      } else {
        setUserCount(0);
      }
    }, (error) => {
      console.error("Stats listener error:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Link
          href="/"
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

        <div className="flex flex-col items-center justify-center text-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-border/50 text-[10px] font-bold tracking-widest text-accent uppercase">
              Community Hub
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              The Hall of <span className="text-accent">Saints</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted max-w-lg mx-auto leading-relaxed">
              A sanctuary for those breaking their chains. Join others on the path to absolute discipline.
            </p>

            {/* Total Members Count */}
            <div className="py-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex flex-col items-center p-6 rounded-2xl bg-card border border-border shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2 relative z-10">Total Slayers Joined</span>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-5xl font-bold font-mono text-foreground tracking-tighter">
                    {userCount !== null ? userCount.toLocaleString() : "..."}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
                </div>
              </motion.div>
            </div>
            
            <div className="pt-8">
              <div className="flex items-center justify-center gap-4 text-xs font-mono text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent"></span>
                  Global Leaderboards
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent"></span>
                  Shared Proofs
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent"></span>
                  Slayer Tiers
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
