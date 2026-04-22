import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'zh'] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Keep unprefixed routes pinned to English instead of re-detecting
  // from browser preferences or previously stored locale cookies.
  localeDetection: false,
  localeCookie: false,
  
  // This ensures English doesn't have the /en prefix
  localePrefix: 'as-needed'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
