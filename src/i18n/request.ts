import { cookies } from "next/headers";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const locale =
    cookieLocale && hasLocale(routing.locales, cookieLocale)
      ? cookieLocale
      : routing.defaultLocale;

  return {
    locale,
    messages: {
      Common: (await import(`../../messages/${locale}/common.json`)).default,
      Navbar: (await import(`../../messages/${locale}/navbar.json`)).default,
      Footer: (await import(`../../messages/${locale}/footer.json`)).default,
      Home: (await import(`../../messages/${locale}/home.json`)).default,
      Products: (await import(`../../messages/${locale}/products.json`)).default,
      Cart: (await import(`../../messages/${locale}/cart.json`)).default,
      Checkout: (await import(`../../messages/${locale}/checkout.json`)).default,
      OrderSuccess: (await import(`../../messages/${locale}/order-success.json`)).default,
      Orders: (await import(`../../messages/${locale}/orders.json`)).default,
      About: (await import(`../../messages/${locale}/about.json`)).default,
      Contact: (await import(`../../messages/${locale}/contact.json`)).default,
    },
  };
});
