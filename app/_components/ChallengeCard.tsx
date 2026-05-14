"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Challenge } from "@/lib/sins-data";
import { verifyProofWithAI, AIResponse } from "@/lib/gemini";
import { useAuth } from "@/app/_context/AuthContext";

interface ChallengeCardProps {
  challenge: Challenge;
  sinColor: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  onSubmitProof: (proofText: string, proofUrl?: string, aiVerified?: boolean, score?: number) => Promise<void>;
}

export default function ChallengeCard({
  challenge,
  sinColor,
  isUnlocked,
  isCompleted,
  onSubmitProof,
}: ChallengeCardProps) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [proofText, setProofText] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const difficultyColors: Record<string, string> = {
    hard: "#a1a1aa",
    extreme: "#CC7722",
    legendary: "#B22222",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAiResult(null); // Reset AI result when file changes
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration missing.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", `7ds_proofs/${user?.uid}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed.");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleVerify = async () => {
    if (!proofText.trim()) {
      setError("Please describe your proof first.");
      return;
    }
    if (challenge.requiresImage && !file) {
      setError("This challenge requires an image proof.");
      return;
    }

    setIsVerifying(true);
    setError(null);
    setAiResult(null);

    try {
      let imageBuffer: ArrayBuffer | undefined;
      if (file) {
        imageBuffer = await file.arrayBuffer();
      }

      const result = await verifyProofWithAI(
        challenge.description,
        challenge.proofRequired,
        proofText,
        imageBuffer,
        file?.type
      );

      setAiResult(result);
      
      // Proactively upload to Cloudinary if verified and has file
      if (result.verified && file && !uploadedUrl) {
        const url = await uploadToCloudinary(file);
        setUploadedUrl(url);
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError("Verification failed. Please try again.");
    }
    setIsVerifying(false);
  };

  const handleSubmit = async () => {
    if (!aiResult || !aiResult.verified) return;

    setIsSubmitting(true);
    try {
      await onSubmitProof(proofText, uploadedUrl || undefined, true, aiResult.score);
      setSubmitted(true);
      setProofText("");
      setFile(null);
      setFilePreview(null);
    } catch (err: any) {
      setError("Final submission failed.");
    }
    setIsSubmitting(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#34A853"; // Green
    if (score >= 60) return "#FBBC05"; // Yellow
    return "#EA4335"; // Red
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-lg transition-all duration-300 ${
        isCompleted
          ? "bg-card border-border opacity-60"
          : isUnlocked
          ? "bg-card border-border hover:border-muted"
          : "bg-background border-border opacity-30 pointer-events-none"
      }`}
    >
      <button
        onClick={() => isUnlocked && setExpanded(!expanded)}
        disabled={!isUnlocked}
        className="w-full text-left p-4 cursor-pointer"
        id={`challenge-${challenge.id}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Challenge Number */}
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-xs font-mono shrink-0"
              style={{
                backgroundColor: isCompleted
                  ? `${sinColor}20`
                  : isUnlocked
                  ? `${sinColor}15`
                  : "transparent",
                color: isCompleted || isUnlocked ? sinColor : "#27272a",
                border: `1px solid ${
                  isCompleted || isUnlocked ? `${sinColor}30` : "#27272a"
                }`,
              }}
            >
              {isCompleted ? "✓" : challenge.id}
            </div>

            <div className="min-w-0">
              <h4
                className={`text-sm font-medium truncate ${
                  isCompleted
                    ? "text-muted line-through"
                    : isUnlocked
                    ? "text-foreground"
                    : "text-muted"
                }`}
              >
                {challenge.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{
                    color: difficultyColors[challenge.difficulty],
                  }}
                >
                  {challenge.difficulty}
                </span>
                <span className="text-[10px] text-muted">
                  {challenge.duration}
                </span>
              </div>
            </div>
          </div>

          {isUnlocked && !isCompleted && (
            <svg
              className={`w-4 h-4 text-muted shrink-0 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && isUnlocked && !isCompleted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              <div className="bg-background rounded-md p-3 border border-border">
                <p className="text-xs text-muted mb-1 font-medium">
                  Proof Required
                </p>
                <p className="text-xs text-accent">
                  {challenge.proofRequired}
                </p>
              </div>

              {!submitted ? (
                <div className="space-y-4">
                  <textarea
                    id={`proof-input-${challenge.id}`}
                    ref={textareaRef}
                    value={proofText}
                    onChange={(e) => {
                      setProofText(e.target.value);
                      setAiResult(null);
                      adjustTextareaHeight();
                    }}
                    placeholder="Describe your completion details..."
                    rows={2}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder-muted resize-none focus:border-muted focus:outline-none transition-colors overflow-hidden"
                  />
                  
                  {/* Conditional Image Upload */}
                  {challenge.requiresImage && (
                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-3 border-2 border-dashed border-border rounded-md text-xs text-muted hover:border-muted hover:text-foreground transition-all flex flex-col items-center gap-1"
                      >
                        {file ? (
                          <span className="text-accent truncate px-4 w-full">Selected: {file.name}</span>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Upload required photo/video</span>
                          </>
                        )}
                      </button>
                      
                      {filePreview && (
                        <div className="mt-2 rounded-md overflow-hidden border border-border">
                          <img src={filePreview} alt="Preview" className="w-full h-32 object-cover" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Results Section */}
                  <AnimatePresence>
                    {aiResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-md border"
                        style={{ borderColor: `${getScoreColor(aiResult.score)}40`, backgroundColor: `${getScoreColor(aiResult.score)}05` }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: getScoreColor(aiResult.score) }}>
                            AI Rating
                          </span>
                          <span className="text-lg font-mono font-bold" style={{ color: getScoreColor(aiResult.score) }}>
                            {aiResult.score}/100
                          </span>
                        </div>
                        
                        {aiResult.isAiGenerated && (
                          <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-400 font-bold uppercase tracking-widest flex items-center gap-2">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            AI-Generated Content Detected
                          </div>
                        )}

                        <p className="text-xs text-foreground leading-relaxed">
                          {aiResult.feedback}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <p className="text-xs text-red-400 bg-red-400/10 p-2 rounded border border-red-400/20">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={handleVerify}
                      disabled={isVerifying || isSubmitting || !proofText.trim() || (challenge.requiresImage && !file)}
                      className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-md border border-border bg-card text-foreground hover:border-muted transition-all cursor-pointer disabled:opacity-40"
                    >
                      {isVerifying ? "AI ANALYZING..." : aiResult ? "RE-VERIFY" : "VERIFY WITH AI"}
                    </button>

                    {aiResult && aiResult.verified && (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || aiResult.score < 50}
                        className="flex-1 px-4 py-2.5 text-xs font-bold rounded-md transition-all cursor-pointer disabled:opacity-40"
                        style={{
                          backgroundColor: sinColor,
                          color: "#fff",
                        }}
                      >
                        {isSubmitting ? "SUBMITTING..." : "CONFIRM SUBMISSION"}
                      </button>
                    )}
                  </div>
                  
                  {aiResult && aiResult.score < 50 && (
                    <p className="text-[10px] text-center text-muted italic">
                      Score too low to submit. Please improve your proof.
                    </p>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 bg-background/50 rounded-md border border-border"
                >
                  <p className="text-sm font-medium" style={{ color: sinColor }}>
                    ✓ Sin challenge conquered
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
