"use client";

import React from "react";
import { UniverseId } from "@/lib/types";
import HeroShieldGame from "./HeroShieldGame";
import ConstellationSevenGame from "./ConstellationSevenGame";
import WaterBottleCatchGame from "./WaterBottleCatchGame";
import StreetFoodScrambleGame from "./StreetFoodScrambleGame";
import ErrandSprintGame from "./ErrandSprintGame";
import AmbaaaSoundboardGame from "./AmbaaaSoundboardGame";
import DanceStepSyncGame from "./DanceStepSyncGame";
import NakhreSpoilMeterGame from "./NakhreSpoilMeterGame";
import WafeeqaButterflyGame from "./WafeeqaButterflyGame";
import AanBetaSoundboardGame from "./AanBetaSoundboardGame";
import SnackAttackChaosGame from "./SnackAttackChaosGame";
import ZenReflectionPondGame from "./ZenReflectionPondGame";

interface MiniGameDispatcherProps {
  gameType: UniverseId;
  onComplete: () => void;
  themeColor: string;
}

export default function MiniGameDispatcher({
  gameType,
  onComplete,
  themeColor,
}: MiniGameDispatcherProps) {
  switch (gameType) {
    case "abbu":
      return <HeroShieldGame onComplete={onComplete} themeColor={themeColor} />;
    case "afrid":
      return <ConstellationSevenGame onComplete={onComplete} themeColor={themeColor} />;
    case "sameer":
      return <WaterBottleCatchGame onComplete={onComplete} themeColor={themeColor} />;
    case "jhansi":
      return <StreetFoodScrambleGame onComplete={onComplete} themeColor={themeColor} />;
    case "awez":
      return <ErrandSprintGame onComplete={onComplete} themeColor={themeColor} />;
    case "manohar":
      return <AmbaaaSoundboardGame onComplete={onComplete} themeColor={themeColor} />;
    case "mubeena":
      return <DanceStepSyncGame onComplete={onComplete} themeColor={themeColor} />;
    case "qurayba":
      return <NakhreSpoilMeterGame onComplete={onComplete} themeColor={themeColor} />;
    case "wafeeqa":
      return <WafeeqaButterflyGame onComplete={onComplete} themeColor={themeColor} />;
    case "shahid":
      return <AanBetaSoundboardGame onComplete={onComplete} themeColor={themeColor} />;
    case "muskan":
      return <SnackAttackChaosGame onComplete={onComplete} themeColor={themeColor} />;
    case "sana":
      return <ZenReflectionPondGame onComplete={onComplete} themeColor={themeColor} />;
    default:
      return null;
  }
}
