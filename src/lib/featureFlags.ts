/**
 * Site-wide feature toggles.
 *
 * Keep these as plain constants rather than environment variables: they are
 * read by client components, so an env var would have to be NEXT_PUBLIC_ and
 * baked in at build time anyway, and it would then also need setting on every
 * deploy target.
 */

/**
 * Controls every live gold rate shown to visitors. Temporarily switched off at
 * the client's request; set it back to `true` to restore all of them at once.
 *
 * It covers:
 *  - the rate card in the homepage hero, both slides, desktop and mobile
 *  - the rate card in the /gold-rate page hero
 *  - the "Today's Gold Rate" badge on the gold value form, which appears on
 *    the homepage and on /gold-rate
 *  - the rate in the branch locator bar and in its minimized tab
 *
 * Rates are still fetched, so the estimate the gold value form produces after
 * a visitor submits it is unaffected.
 */
export const SHOW_GOLD_RATE_CARD: boolean = false;
