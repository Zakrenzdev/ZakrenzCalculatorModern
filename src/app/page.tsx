"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import HomePage from "./main/page";

export default function Home() {
  const [ready, setReady] = useState(false);

  return ready ? (
    <HomePage />
  ) : (
    <Preloader onDone={() => setReady(true)} minDuration={2200} />
  );
}
