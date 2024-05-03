import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import AppContext from '@/context/app-context';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cookies } from 'next/headers';
import { AccountResType } from '@/schemaValidations/account.schema';
import { clientSessionToken } from '@/lib/http';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'NFT Marketplace',
  description: 'NFT Marketplace',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  let user: AccountResType['data'] | null = null;
  if (sessionToken) {
    // const data = await accountApiRequest.me(sessionToken.value);
    user = {
      id: 123,
      name: 'son',
      email: 'son@gmail.com',
    };
  }
  return (
    <html lang="en" suppressHydrationWarning={true} className="h-full">
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          poppins.className
        )}
      >
        <Toaster />
        <main className="relative flex flex-col min-h-screen">
          <AppContext
            inititalSessionToken={clientSessionToken?.value}
            user={user}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              <div className="flex-grow flex-1">{children}</div>
              <Footer />
            </ThemeProvider>
          </AppContext>
        </main>
      </body>
    </html>
  );
}
