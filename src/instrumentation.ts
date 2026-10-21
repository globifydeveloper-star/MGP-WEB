// Runs once when a Next.js server instance boots (not during `next build`).
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node');
  }
}
