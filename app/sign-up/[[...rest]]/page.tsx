import { SignUp } from '@clerk/nextjs'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-primary mb-2">StockFlow</h1>
            <p className="text-muted-foreground">Create your account</p>
          </div>
          <SignUp path="/sign-up" routing="path" fallbackRedirectUrl="/onboarding" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
