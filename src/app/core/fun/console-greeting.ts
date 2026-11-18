/**
 * =============================================================================
 * CONSOLE GREETING 👋
 * -----------------------------------------------------------------------------
 * Fellow developers who open DevTools deserve a smile too.
 * Called once at start-up (see app.config.ts).
 * =============================================================================
 */
export function printConsoleGreeting(): void {
  const title = [
    'font: 700 22px Fredoka, sans-serif',
    'color: #1d1b2f',
    'background: #ffc93c',
    'padding: 6px 14px',
    'border-radius: 10px',
  ].join(';');

  console.log('%cHey, fellow developer! 👋', title);
  console.log(
    '%cCurious how this works? Angular signals + Tailwind + JSON files. ' +
      'Source & docs are in the repo. And psst… try the Konami code. 🕹️',
    'font: 14px Nunito, sans-serif; color: #9b5de5',
  );
}
