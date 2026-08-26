import confetti from 'canvas-confetti';

export function fireGrandConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#22c55e', '#eab308', '#ec4899', '#3b82f6', '#f97316'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#fbbf24', '#a855f7', '#06b6d4', '#f43f5e'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#4ade80', '#fb7185', '#38bdf8', '#facc15'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireGentleConfetti() {
  confetti({
    particleCount: 25,
    spread: 60,
    origin: { y: 0.2 },
    zIndex: 9999,
    colors: ['#4ade80', '#facc15', '#ec4899'],
  });
}
