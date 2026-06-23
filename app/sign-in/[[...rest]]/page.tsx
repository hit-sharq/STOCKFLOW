import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">StockFlow</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <SignIn path="/sign-in" routing="path" redirectUrl="/dashboard" />
      </div>
    </div>
  )
}
