import { SignIn } from '@clerk/nextjs'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-primary mb-2">StockFlow</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>
          <SignIn path="/sign-in" routing="path" fallbackRedirectUrl="/dashboard" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
