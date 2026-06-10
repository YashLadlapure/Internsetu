"use client"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Card from "@/components/ui/Card"
import ResetPasswordForm from "./ResetPasswordForm"

const ResetPasswordContent = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <Card className="p-6 lg:p-10 w-96">
            <h1 className="font-bold text-xl lg:text-2xl pt-4 pb-2 text-red-500">Invalid Reset Link</h1>
            <p className="text-gray-500">The password reset link is invalid or has expired.</p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <Card className="p-6 lg:p-10 w-96">
          <h1 className="font-bold text-xl lg:text-2xl pt-4 pb-2">Reset Password</h1>
          <p className="text-gray-500">Enter your new password below</p>
          <ResetPasswordForm token={token} />
        </Card>
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <Card className="p-6 lg:p-10 w-96">
            <p>Loading...</p>
          </Card>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}

export default Page
