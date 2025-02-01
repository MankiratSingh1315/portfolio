"use client"

import Intro from "./components/Intro";
import Hero from "./Sections/Hero";
import Projects from "./Sections/Project";
import { useAppContext, AppProvider } from "./AppContext";
import ExpAndAcheivements from "./Sections/ExpAndAcheivement";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProgressIndicator from "./components/Progress";

function Main() {
  const { isIntroPlayed } = useAppContext();
  return (
    <>
      {!isIntroPlayed && <Intro />}
      {isIntroPlayed && (
        <>
          <Header />
          <ProgressIndicator />
          <Hero />
          <Projects />
          <ExpAndAcheivements />
          <Footer />
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