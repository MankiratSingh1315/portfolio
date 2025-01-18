"use client"

import Intro from "./components/Intro";
import Hero from "./Sections/Hero";
import Projects from "./Sections/Project";
import { useAppContext, AppProvider } from "./AppContext";

function Main() {
  const { isIntroPlayed } = useAppContext();
  return (
    <>
      {!isIntroPlayed && <Intro />}
      {isIntroPlayed && (
        <>
          <Hero />
          <Projects />
        </>
      )}
    </>
  );
}


export default function Home() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>

  );
}