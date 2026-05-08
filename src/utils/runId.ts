export const RUN_ID =
  process.env.RUN_ID ||
  new Date()
    .toISOString()
    .replace(/[:.]/g, "-");