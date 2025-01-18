"use client"

import Intro from "./components/Intro";
import Hero from "./Sections/Hero";
import Projects from "./Sections/Project";
import { useAppContext, AppProvider } from "./AppContext";
import ExpAndAcheivements from "./Sections/ExpAndAcheivement";

function Main() {
  const { isIntroPlayed } = useAppContext();
  // const isIntroPlayed = true;
  return (
    <>
      {!isIntroPlayed && <Intro />}
      {isIntroPlayed && (
        <>
          <Hero />
          <Projects />
          <ExpAndAcheivements />
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