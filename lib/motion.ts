/**
 * Premium reveal animation config — buttery smooth, cinematic feel.
 * Used across sections to keep CLS = 0 and consistent UX.
 */

export const PREMIUM_REVEAL = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  transition: {
    duration: 1,
    ease: [0.25, 0.1, 0.25, 1] as const,
  },
  transitionWithDelay: (delay: number) => ({
    duration: 1,
    ease: [0.25, 0.1, 0.25, 1] as const,
    delay,
  }),
  viewport: {
    once: true,
    amount: 0.2,
  },
} as const;
