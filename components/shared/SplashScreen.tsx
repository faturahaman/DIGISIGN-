"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timeoutId = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 5200);

    return () => {
      window.clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, []);

  const closeSplash = () => {
    setVisible(false);
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Arvion Creative opening animation"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] overflow-hidden bg-[#fafafc]"
        >
          <motion.div
            initial={{ x: 220, y: -180, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 h-[31%] w-[36%]"
          >
            <svg viewBox="0 0 520 280" className="h-full w-full" aria-hidden="true">
              <path d="M128 280C230 170 355 95 520 38V0H380C280 62 210 168 128 280Z" fill="#F47721" />
              <path d="M220 280C330 150 420 73 520 38V168C410 192 308 246 220 280Z" fill="#FFF" opacity=".75" />
            </svg>
          </motion.div>

          <motion.svg
            viewBox="0 0 520 260"
            initial={{ x: -220, y: 160, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 h-[30%] w-[48%]"
            aria-hidden="true"
          >
            <path d="M0 18C150 4 300 88 520 260H0V18Z" fill="#F47721" />
            <path d="M0 72C170 52 330 125 520 260H0V72Z" fill="#171A22" />
          </motion.svg>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="absolute left-6 top-8 flex items-center gap-3 sm:left-12 sm:top-12"
          >
            <span className="h-7 w-1.5 bg-[#F47721]" />
            <span className="text-[10px] font-bold tracking-[0.42em] text-[#171A22] sm:text-sm">
              DIGITAL AGENCY
            </span>
          </motion.div>

          <div
            className="absolute grid gap-2 opacity-70"
            style={{
              left: "clamp(28px, 7vw, 88px)",
              top: "19%",
              gridTemplateColumns: "repeat(5, 5px)",
            }}
            aria-hidden="true"
          >
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.7 + index * 0.025 }}
                className="h-1 w-1 rounded-full bg-[#B3B7C0]"
              />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-5">
            <div className="w-full max-w-[940px] -translate-y-[2%]">
              <motion.div
                initial={{ y: 12 }}
                animate={{ y: [12, 0, 6, 0] }}
                transition={{ duration: 4.3, times: [0, 0.35, 0.75, 1] }}
                className="relative mx-auto h-[170px] w-[92vw] max-w-[820px] sm:h-[230px] lg:h-[300px]"
              >
                <motion.img
                  src="/splash/logo-mark.png"
                  alt=""
                  initial={{ clipPath: "inset(0 100% 0 0)", x: -35, opacity: 0, scale: 0.92 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-[20%] left-[3%] h-[70%] w-[38%] object-contain object-left"
                />
                <motion.img
                  src="/splash/logo-word.png"
                  alt="Arvion"
                  initial={{ clipPath: "inset(0 100% 0 0)", x: -55, opacity: 0 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", x: 0, opacity: 1 }}
                  transition={{ duration: 1.05, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-[39%] left-[37%] h-[43%] w-[68%] object-contain object-left"
                />
                <motion.img
                  src="/splash/logo-creative.png"
                  alt="Creative"
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0, scaleX: 0.88 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.75, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-[19%] left-[39%] h-[16%] w-[48%] object-contain object-left"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.05 }}
              >
                <div className="mt-[-2%] flex items-center justify-center gap-5 sm:gap-8">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 2.05 }}
                    className="h-[3px] w-10 origin-right bg-[#F47721] sm:w-16"
                  />
                  <motion.h1
                    initial={{ y: 45, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.75, delay: 2.15, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center text-[clamp(1.7rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-[#171A22]"
                  >
                    Web &amp; Design Agency
                  </motion.h1>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 2.05 }}
                    className="h-[3px] w-10 origin-left bg-[#F47721] sm:w-16"
                  />
                </div>

                <motion.p
                  initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, delay: 2.55 }}
                  className="mt-4 text-center text-[clamp(0.75rem,2vw,1.25rem)] text-[#707581]"
                >
                  Modern websites and strategic design for growing brands.
                </motion.p>
              </motion.div>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            initial={{ x: 180, y: -90, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[11%] right-[-9%] h-[31%] w-[40%] rotate-[-4deg] rounded-[50%] border border-[#dfe3ea]"
          />

          <button
            type="button"
            onClick={closeSplash}
            className="absolute right-5 top-5 z-10 rounded-full border border-[#ECEEF1] bg-white/80 px-3 py-1.5 text-[11px] font-bold text-[#707581] backdrop-blur-sm transition-colors hover:border-[#F47721] hover:text-[#F47721] sm:right-8 sm:top-8"
          >
            Lewati
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
