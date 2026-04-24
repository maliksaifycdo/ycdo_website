'use client';

import {
  motion as framerMotion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
  m as framerM,
} from 'framer-motion';

// Keep DX smooth across existing variants while we keep strict TS build checks on.
export const motion: any = framerMotion;
export const m: any = framerM;
export {
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
};
