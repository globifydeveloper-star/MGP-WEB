/**
 * Site-wide feature toggles.
 *
 * Keep these as plain constants rather than environment variables: they are
 * read by client components, so an env var would have to be NEXT_PUBLIC_ and
 * baked in at build time anyway, and it would then also need setting on every
 * deploy target.
 */

/**
 * Controls the gold rate card shown in the homepage hero slides and in the
 * /gold-rate page hero.
 *
 * Temporarily switched off at the client's request. Set this back to `true`
 * to restore the card in all three places. Live rates keep flowing to the
 * gold calculator, the branch selector and the gold value form either way.
 */
export const SHOW_GOLD_RATE_CARD: boolean = false;
