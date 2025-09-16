"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/Hero";
import FeaturesSection from "@/components/sections/Features";
import Loader from "@/components/common/Loader";
import BubbleLoader from "@/components/sections/Bubbleloader";

// Lazy-load heavy sections with Loader fallback
const StatsSection = dynamic(() => import("@/components/sections/Stats"), {
  ssr: false,
  loading: () => <Loader />,
});

const LiveDemoSection = dynamic(() => import("@/components/sections/Demo"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <LiveDemoSection />
    </div>
  );
}
