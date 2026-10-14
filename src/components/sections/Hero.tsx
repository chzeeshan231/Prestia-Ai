"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Zap,
  Play,
  Pause,
  Activity,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  RotateCcw,
  Film,
  Lock,
  Globe2,
  DollarSign,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "@/i18n/context";
import { formatMoney, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const PLAN_CENTS = 7900;
const BUMP_CENTS = 1900;
const UPSELL_CENTS = 3900;

interface LiveEvent {
  city: string;
  flag: string;
  action: string;
  item: string;
  time: string;
  badge: string;
  amountCents: number;
}

const LIVE_EVENTS: LiveEvent[] = [
  {
    city: "San Francisco, US",
    flag: "🇺🇸",
    action: "1-Click Upsell Accepted",
    item: "Analytics Pro Engine",
    time: "Just now",
    badge: "+$39",
    amountCents: 3900,
  },
  {
    city: "London, UK",
    flag: "🇬🇧",
    action: "Order Bump Added",
    item: "Priority Onboarding",
    time: "2s ago",
    badge: "+$19",
    amountCents: 1900,
  },
  {
    city: "Tokyo, JP",
    flag: "🇯🇵",
    action: "Checkout Converted",
    item: "Growth Plan + Upsells",
    time: "5s ago",
    badge: "$137",
    amountCents: 13700,
  },
  {
    city: "Dubai, AE",
    flag: "🇦🇪",
    action: "1-Click Upsell Accepted",
    item: "5 Growth Seats",
    time: "8s ago",
    badge: "+$25",
    amountCents: 2500,
  },
  {
    city: "Berlin, DE",
    flag: "🇩🇪",
    action: "Order Bump Added",
    item: "VIP Onboarding Bump",
    time: "11s ago",
    badge: "+$19",
    amountCents: 1900,
  },
  {
    city: "Singapore, SG",
    flag: "🇸🇬",
    action: "1-Click Upsell Accepted",
    item: "Done-For-You Funnel Setup",
    time: "14s ago",
    badge: "+$149",
    amountCents: 14900,
  },
];

function MiniSparkline() {
  return (
    <div className="relative h-6 w-16 shrink-0" aria-hidden="true">
      <svg
        viewBox="0 0 64 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="heroSparklineGrad" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a855f7" />
            <stop offset="0.5" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="heroSparklineArea" x1="0" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" stopOpacity="0.25" />
            <stop offset="1" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 2,18 Q 14,15 22,12 T 40,14 T 52,6 T 62,3"
          fill="none"
          stroke="url(#heroSparklineGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 2,18 Q 14,15 22,12 T 40,14 T 52,6 T 62,3 L 62,22 L 2,22 Z"
          fill="url(#heroSparklineArea)"
        />
        <circle cx="62" cy="3" r="2.8" fill="#34d399" className="animate-pulse" />
      </svg>
    </div>
  );
}

export function Hero() {
  const { t, locale } = useLocale();
  const { hero } = t;

  // Background Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>("/videos/team-ideas.mp4");
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  // Live Interactive Checkout Simulator State
  const [hasBump, setHasBump] = useState<boolean>(true);
  const [hasUpsell, setHasUpsell] = useState<boolean>(true);
  const [isAutoSimulating, setIsAutoSimulating] = useState<boolean>(true);
  const [celebrationFlash, setCelebrationFlash] = useState<boolean>(false);

  // Live Event Matrix Stream & Numbers
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [liveOrdersCount, setLiveOrdersCount] = useState<number>(2542);
  const [liveDailyVolume, setLiveDailyVolume] = useState<number>(148920);
  const [recentDelta, setRecentDelta] = useState<string | null>("+$39.00");
  const [liveAovFluctuation, setLiveAovFluctuation] = useState<number>(38.4);

  // Video Play/Pause toggle
  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  // Switch video source
  const switchVideo = () => {
    const nextSrc =
      videoSrc === "/videos/team-ideas.mp4"
        ? "/videos/team-meeting.mp4"
        : "/videos/team-ideas.mp4";
    setVideoSrc(nextSrc);
    setIsVideoPlaying(true);
  };

  // Real-time ticking numbers: updates every 2.4s to show active live streaming transactions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => {
        const nextIdx = (prev + 1) % LIVE_EVENTS.length;
        const event = LIVE_EVENTS[nextIdx];

        // Increment live orders count
        setLiveOrdersCount((c) => c + 1);

        // Increment daily volume by transaction amount
        setLiveDailyVolume((v) => v + event.amountCents / 100);

        // Show floating delta badge
        setRecentDelta(event.badge);
        setTimeout(() => setRecentDelta(null), 1800);

        // Micro-fluctuate AOV lift slightly
        const randomShift = (Math.random() * 0.4 - 0.2);
        setLiveAovFluctuation((aov) => +(aov + randomShift).toFixed(1));

        return nextIdx;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Automatic simulation cycle demonstrating 1-click upsell
  useEffect(() => {
    if (!isAutoSimulating) return;

    let step = 0;
    const simTimer = setInterval(() => {
      step = (step + 1) % 4;
      if (step === 0) {
        setHasBump(false);
        setHasUpsell(false);
      } else if (step === 1) {
        setHasBump(true);
        setCelebrationFlash(true);
        setTimeout(() => setCelebrationFlash(false), 900);
      } else if (step === 2) {
        setHasUpsell(true);
        setCelebrationFlash(true);
        setTimeout(() => setCelebrationFlash(false), 1200);
      } else if (step === 3) {
        // Full celebration hold
        setCelebrationFlash(true);
        setTimeout(() => setCelebrationFlash(false), 1400);
      }
    }, 4000);

    return () => clearInterval(simTimer);
  }, [isAutoSimulating]);

  // Calculations
  const bumpCents = hasBump ? BUMP_CENTS : 0;
  const upsellCents = hasUpsell ? UPSELL_CENTS : 0;
  const currentTotalCents = PLAN_CENTS + bumpCents + upsellCents;
  const currentLiftPercent = Math.round(
    ((bumpCents + upsellCents) / PLAN_CENTS) * 100
  );

  const activeEvent = LIVE_EVENTS[currentEventIndex];

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white flex flex-col justify-center">
      {/* 1. Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/solutions/saas.jpg"
          src={videoSrc}
          className="h-full w-full object-cover scale-105 opacity-30 mix-blend-luminosity filter contrast-125 brightness-90 transition-opacity duration-1000"
        />

        {/* Cinematic dark scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/75 to-ink-950" />

        {/* Atmospheric Tech Dot Grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-60" />

        {/* Radial Ambient Glowing Orbs */}
        <div
          className="pointer-events-none absolute -top-32 end-0 h-[650px] w-[650px] rounded-full animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(132, 61, 255, 0.28) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 start-0 h-[550px] w-[550px] rounded-full animate-pulse-glow"
          style={{
            animationDelay: "3s",
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.20) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* 2. Ambient Video & Audio Control Bar */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 flex justify-end">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/80 px-3 py-1 text-xs font-medium text-ink-300 shadow-lg backdrop-blur-md"
        >
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-75",
                  isVideoPlaying ? "animate-ping bg-emerald-400" : "bg-ink-500"
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  isVideoPlaying ? "bg-emerald-400" : "bg-ink-500"
                )}
              />
            </span>
            <span className="text-[11px] font-semibold text-white/90">
              {isVideoPlaying ? "Live Video BG" : "Video Paused"}
            </span>
          </span>

          <span className="h-3 w-px bg-white/15" />

          <button
            onClick={toggleVideo}
            title={isVideoPlaying ? "Pause background video" : "Play background video"}
            className="flex items-center gap-1 text-[11px] text-ink-300 hover:text-white transition-colors"
          >
            {isVideoPlaying ? (
              <>
                <Pause className="h-3 w-3" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-white" />
                <span className="hidden sm:inline">Play</span>
              </>
            )}
          </button>

          <span className="h-3 w-px bg-white/15" />

          <button
            onClick={switchVideo}
            title="Switch background video scene"
            className="flex items-center gap-1 text-[11px] text-brand-300 hover:text-brand-200 transition-colors"
          >
            <Film className="h-3 w-3" />
            <span className="hidden sm:inline">Switch Angle</span>
          </button>
        </motion.div>
      </div>

      {/* 3. Main Hero Content Grid - Compact and Viewport-Optimized */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-8">
        {/* Left Column (7 cols) - High-Impact Typography & Real-time Live Number Counters */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow Badges with LIVE TICKING COUNTER */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 flex-wrap"
          >
            <Badge
              tone="brand"
              className="border border-white/20 bg-brand-500/15 text-brand-200 ring-brand-400/20 backdrop-blur-md px-3 py-1 text-xs font-semibold shadow-sm"
            >
              <span className="relative flex h-2 w-2 me-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
              </span>
              {hero.badge}
            </Badge>

            {/* LIVE CHECKOUTS TICKING COUNTER */}
            <motion.div
              key={liveOrdersCount}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-md shadow-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{liveOrdersCount.toLocaleString()} live checkouts today</span>
            </motion.div>

            {/* LIVE DAILY REVENUE VOLUME TICKER */}
            <div className="relative hidden sm:inline-flex items-center gap-1.5 rounded-full border border-brand-400/25 bg-brand-500/10 px-3 py-1 text-[11px] font-bold text-brand-300 backdrop-blur-md">
              <DollarSign className="h-3 w-3 text-brand-400" />
              <span>${liveDailyVolume.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} processed</span>
              {recentDelta && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="rounded-full bg-emerald-500/30 px-1.5 py-0.2 text-[10px] font-extrabold text-emerald-300"
                >
                  {recentDelta}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Heading with Glowing Gradient Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            {hero.title}{" "}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(132,61,255,0.45)]">
              {hero.titleAccent}
            </span>
          </motion.h1>

          {/* Subtitle with High Legibility */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-3.5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg font-normal drop-shadow-sm"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-6 flex flex-wrap items-center gap-3.5"
          >
            <Link href="/pricing">
              <Button
                size="lg"
                icon={<ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />}
                className="shadow-[0_0_25px_rgba(132,61,255,0.4)] hover:shadow-[0_0_35px_rgba(132,61,255,0.6)] hover:scale-[1.02] transition-all"
              >
                {hero.ctaPrimary}
              </Button>
            </Link>
            <Link href="/#calculator">
              <Button size="lg" variant="light" className="border border-white/15 hover:bg-white/15">
                <Sparkles className="h-4 w-4 me-1.5 text-brand-300" />
                Revenue Calculator
              </Button>
            </Link>
          </motion.div>

          {/* Trust Microcopy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-300"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              {hero.microcopy}
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-300" />
              Stripe 256-bit tokenized
            </span>
          </motion.div>

          {/* 4. Live Matrices HUD (Compact, alive with dynamic fluctuating metrics) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3.5 border-t border-white/10 pt-4"
          >
            {/* Matrix Card 1: Revenue Lift (Dynamic Fluctuating Number) */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-md hover:border-emerald-500/40 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center justify-between gap-1">
                <motion.span
                  key={liveAovFluctuation}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight"
                >
                  +{liveAovFluctuation}%
                </motion.span>
                <MiniSparkline />
              </div>
              <p className="mt-1 text-[11px] font-medium text-ink-300 leading-snug truncate">
                Avg. revenue lift per order
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                <span>▲ 14.2% live stream</span>
              </div>
            </div>

            {/* Matrix Card 2: 1-Click Upsell */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-md hover:border-brand-400/40 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  1-click
                </span>
                <span className="rounded-full bg-brand-500/20 px-1.5 py-0.5 text-[9px] font-bold text-brand-300 border border-brand-400/30">
                  LIVE
                </span>
              </div>
              <p className="mt-1 text-[11px] font-medium text-ink-300 leading-snug truncate">
                Saved card tokenization
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-brand-400 to-indigo-400" />
                </div>
                <span className="text-[10px] font-bold text-ink-300">64%</span>
              </div>
            </div>

            {/* Matrix Card 3: 15 Funnel Steps */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-md hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  1.8s
                </span>
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <p className="mt-1 text-[11px] font-medium text-ink-300 leading-snug truncate">
                15 zero-code funnel steps
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-cyan-400">
                <Lock className="h-3 w-3" />
                <span>Zero card re-entry</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (5 cols) - Interactive Live Checkout Simulator & Real-Time Stream */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          {/* Glowing Aura Ring */}
          <div
            className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-brand-500/30 via-indigo-500/20 to-cyan-500/30 blur-xl opacity-75 animate-pulse-glow"
            aria-hidden="true"
          />

          {/* Interactive Card Body */}
          <div className="relative rounded-3xl border border-white/20 bg-white p-5 text-ink-900 shadow-2xl sm:p-6 backdrop-blur-xl">
            {/* Header: Title + Live Indicator + Secure */}
            <div className="mb-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {hero.mockup.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Engine 2.0
                </span>
              </div>
              <Badge tone="ink" className="text-[10px] font-bold">
                {t.common.secure}
              </Badge>
            </div>

            {/* Line Items List with Clickable Interactive States */}
            <div className="space-y-2 text-sm">
              {/* 1. Base Plan (Locked active) */}
              <div className="flex items-center justify-between rounded-xl bg-ink-50/90 border border-ink-100 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-600 text-white shadow-xs">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <span className="font-semibold text-ink-900 text-xs sm:text-sm">{hero.mockup.plan}</span>
                </div>
                <span className="font-bold text-ink-900 text-xs sm:text-sm">
                  {formatMoney(PLAN_CENTS, locale)}
                </span>
              </div>

              {/* 2. Order Bump (Interactive Toggle) */}
              <button
                type="button"
                onClick={() => {
                  setIsAutoSimulating(false);
                  setHasBump((prev) => !prev);
                  setCelebrationFlash(true);
                  setTimeout(() => setCelebrationFlash(false), 800);
                }}
                className={cn(
                  "group flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all text-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  hasBump
                    ? "bg-emerald-50/70 border-emerald-300 shadow-xs"
                    : "bg-ink-50/50 border-ink-200 hover:border-ink-300 opacity-60"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-4.5 w-4.5 items-center justify-center rounded-full transition-colors",
                      hasBump
                        ? "bg-emerald-500 text-white"
                        : "border border-ink-300 bg-white text-transparent"
                    )}
                  >
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <div>
                    <span className="font-semibold text-ink-900 block leading-tight text-xs sm:text-sm">
                      {hero.mockup.bump}
                    </span>
                    <span className="text-[10px] text-ink-500 font-medium">
                      One-click priority onboarding
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <span
                    className={cn(
                      "font-bold text-xs sm:text-sm block",
                      hasBump ? "text-emerald-600" : "text-ink-400 line-through"
                    )}
                  >
                    +{formatMoney(BUMP_CENTS, locale)}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-ink-400">
                    {hasBump ? "Added" : "+ Tap to add"}
                  </span>
                </div>
              </button>

              {/* 3. 1-Click Upsell (Interactive Toggle) */}
              <button
                type="button"
                onClick={() => {
                  setIsAutoSimulating(false);
                  setHasUpsell((prev) => !prev);
                  setCelebrationFlash(true);
                  setTimeout(() => setCelebrationFlash(false), 800);
                }}
                className={cn(
                  "group flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all text-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  hasUpsell
                    ? "bg-brand-50/80 border-brand-300 shadow-xs"
                    : "bg-ink-50/50 border-ink-200 hover:border-ink-300 opacity-60"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-4.5 w-4.5 items-center justify-center rounded-full transition-colors",
                      hasUpsell
                        ? "bg-brand-600 text-white"
                        : "border border-ink-300 bg-white text-transparent"
                    )}
                  >
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <div>
                    <span className="font-semibold text-ink-900 block leading-tight text-xs sm:text-sm">
                      {hero.mockup.upsell}
                    </span>
                    <span className="text-[10px] text-ink-500 font-medium">
                      Analytics Pro tokenized
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <span
                    className={cn(
                      "font-bold text-xs sm:text-sm block",
                      hasUpsell ? "text-brand-600" : "text-ink-400 line-through"
                    )}
                  >
                    +{formatMoney(UPSELL_CENTS, locale)}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-brand-600">
                    {hasUpsell ? "Accepted" : "+ Tap to add"}
                  </span>
                </div>
              </button>
            </div>

            {/* Dashed Separator */}
            <div className="my-3 border-t border-dashed border-ink-200" />

            {/* Total Row with Live Lift Indicator */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-ink-700 block text-xs sm:text-sm">
                  {hero.mockup.total}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <Sparkles className="h-3 w-3" />
                  <span>+{currentLiftPercent}% AOV Lift Active</span>
                </span>
              </div>
              <div className="text-end">
                <motion.span
                  key={currentTotalCents}
                  initial={{ scale: 1.15, color: "#10b981" }}
                  animate={{ scale: 1, color: "#0f172a" }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight block"
                >
                  {formatMoney(currentTotalCents, locale)}
                </motion.span>
                <span className="text-[9px] font-medium text-ink-400">
                  Zero card re-entry
                </span>
              </div>
            </div>

            {/* Interactive Simulation Status Bar */}
            <div className="mt-3 pt-2.5 border-t border-ink-100 flex items-center justify-between text-xs">
              <span className="text-ink-500 font-medium flex items-center gap-1.5 text-[11px]">
                <RotateCcw className="h-3 w-3 text-brand-500" />
                <span>
                  {isAutoSimulating ? "⚡ Auto-Demo Live" : "Interactive Mode"}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsAutoSimulating((prev) => !prev);
                  setHasBump(true);
                  setHasUpsell(true);
                  setCelebrationFlash(true);
                  setTimeout(() => setCelebrationFlash(false), 900);
                }}
                className="font-bold text-[11px] text-brand-600 hover:text-brand-700 transition-colors cursor-pointer"
              >
                {isAutoSimulating ? "Pause Auto-Demo" : "Resume Auto-Demo"}
              </button>
            </div>
          </div>

          {/* 5. Floating Badge Top: 1-Click Upsell Accepted */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 end-1 sm:-top-6 sm:end-0 z-20 rounded-2xl border border-white/20 bg-ink-900/95 px-3.5 py-2 text-xs shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
              </span>
              <p className="font-semibold text-white/90 text-[11px]">{hero.mockup.upsell}</p>
              <span className="rounded-md bg-brand-500/20 px-1.5 py-0.2 font-display text-xs font-bold text-brand-300">
                +$39
              </span>
            </div>
          </motion.div>

          {/* 6. Floating Badge Bottom: +38% Lift */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-5 start-1 sm:-bottom-6 sm:start-0 z-20 rounded-2xl border border-white/20 bg-ink-900/95 px-3.5 py-2 text-xs shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <TrendingUp className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white leading-none">
                  +{liveAovFluctuation}%
                </p>
                <p className="mt-0.5 text-[10px] text-ink-300 leading-none">
                  {hero.stats[0].label}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 7. Live Activity Stream / Transaction Matrix Docked at Bottom */}
          <div className="mt-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.city + activeEvent.item}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.08] px-3.5 py-2 shadow-lg backdrop-blur-md text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-sm" role="img" aria-label={activeEvent.city}>
                    {activeEvent.flag}
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-white me-1 text-[11px] truncate">
                      {activeEvent.city}:
                    </span>
                    <span className="text-ink-300 text-[11px] truncate">{activeEvent.item}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ms-2">
                  <span className="font-display font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.2 text-[10px]">
                    {activeEvent.badge}
                  </span>
                  <span className="text-[9px] text-ink-400">{activeEvent.time}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom gradient fade transition into the rest of the page */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-ink-950 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
