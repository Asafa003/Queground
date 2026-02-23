"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#141414] border border-[#DC2626]/20 rounded-lg w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <span
          suppressHydrationWarning
          className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-white"
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-[#A1A1AA] mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3 sm:gap-4">
      <TimeBlock value={timeLeft.days} label="Days" />
      <div className="flex items-center text-[#DC2626] text-2xl font-bold self-start mt-5 sm:mt-6">
        :
      </div>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <div className="flex items-center text-[#DC2626] text-2xl font-bold self-start mt-5 sm:mt-6">
        :
      </div>
      <TimeBlock value={timeLeft.minutes} label="Mins" />
      <div className="flex items-center text-[#DC2626] text-2xl font-bold self-start mt-5 sm:mt-6">
        :
      </div>
      <TimeBlock value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
