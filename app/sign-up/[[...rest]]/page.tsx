import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">StockFlow</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>
        <SignUp path="/sign-up" routing="path" redirectUrl="/onboarding" />
      </div>
    </div>
  )
}
