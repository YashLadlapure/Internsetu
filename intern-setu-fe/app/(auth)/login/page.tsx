"use client"
import LoginForm from "./LoginForm"
import Card from "@/components/ui/Card"
import Link from "next/dist/client/link"


const page = () => {
  

  return (
    <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center ">
            <Card className="p-6 lg:p-10 w-96 ">
                <h1 className="font-bold text-xl lg:text-2xl pt-4 pb-2">Welcome back to InternSetu</h1>
                <p className="text-gray-500">Please login to continue</p>
                <LoginForm />
                <p className="text-gray-500 dark:text-gray-400 pt-5 px-2">
                    Don't have an Account? sign up as  <span className="text-purple-600 cursor-pointer">
                        <Link href="/register/student">
                            Student
                        </Link>
                    </span> or <span className="text-purple-600 cursor-pointer">
                        <Link href="/register/company">
                            Company
                        </Link>
                    </span>
                </p>
            </Card>
        </div>
    </div>
    
  )
}

export default page