import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr', 'ru', 'es', 'de', 'pt', 'nl', 'pl', 'zh', 'sv', 'fi'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|.*\\..*).*)'
  ]
};
