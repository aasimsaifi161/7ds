"use client";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  increment,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserProgress {
  sinId: string;
  challengeId: number;
  completed: boolean;
  proofText: string;
  proofUrl: string | null;
  aiVerified: boolean;
  completedAt: Timestamp | null;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Timestamp;
  progress: Record<string, number>; // sinId -> highest completed challenge number
}

// Create user profile on signup
export async function createUserProfile(
  uid: string,
  email: string,
  displayName: string
) {
  const userRef = doc(db, "users", uid);
  const existing = await getDoc(userRef);
  
  // ONLY run this if the user does NOT already exist in the DB
  if (!existing.exists()) {
    // 1. Create the user document
    await setDoc(userRef, {
      uid,
      email,
      displayName: displayName || email.split("@")[0],
      createdAt: Timestamp.now(),
      progress: {
        pride: 0,
        greed: 0,
        lust: 0,
        envy: 0,
        gluttony: 0,
        wrath: 0,
        sloth: 0,
      },
    });

    // 2. Increment the total user count by exactly 1
    const statsRef = doc(db, "stats", "global");
    try {
      await updateDoc(statsRef, {
        userCount: increment(1)
      });
    } catch (e) {
      // If the stats document doesn't exist yet, create it with 1
      await setDoc(statsRef, { userCount: 1 }, { merge: true });
    }
  }
}

// Get global stats
export async function getGlobalStats() {
  const statsRef = doc(db, "stats", "global");
  const snap = await getDoc(statsRef);
  return snap.exists() ? snap.data() : { userCount: 0 };
}

// Get user profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    return snapshot.data() as UserProfile;
  }
  return null;
}

// Get progress for a specific sin
export async function getSinProgress(
  uid: string,
  sinId: string
): Promise<number> {
  const profile = await getUserProfile(uid);
  if (profile && profile.progress) {
    return profile.progress[sinId] || 0;
  }
  return 0;
}

// Submit challenge proof
export async function submitChallengeProof(
  uid: string,
  sinId: string,
  challengeId: number,
  proofText: string,
  proofUrl?: string,
  aiVerified?: boolean,
  aiScore?: number
) {
  // Save the proof inside user subcollection: users/{uid}/proofs/{sinId}_{challengeId}
  const proofRef = doc(db, "users", uid, "proofs", `${sinId}_${challengeId}`);
  await setDoc(proofRef, {
    sinId,
    challengeId,
    proofText,
    proofUrl: proofUrl || null,
    aiVerified: aiVerified || false,
    aiScore: aiScore || 0,
    completedAt: Timestamp.now(),
    status: "completed",
  });

  // Update user progress summary in the main user document
  const userRef = doc(db, "users", uid);
  const profile = await getUserProfile(uid);
  if (profile) {
    const newProgress = { ...profile.progress };
    if (challengeId > (newProgress[sinId] || 0)) {
      newProgress[sinId] = challengeId;
    }
    await updateDoc(userRef, { progress: newProgress });
  }
}

// Get all proofs for a user and sin
export async function getUserProofs(uid: string, sinId: string) {
  // Collection group query or direct subcollection query
  const proofsRef = collection(db, "users", uid, "proofs");
  const q = query(
    proofsRef,
    where("sinId", "==", sinId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}
