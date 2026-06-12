import Link from "next/link" 
import Card from "@/components/ui/Card" 

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="p-6 flex items-center justify-between">
        <div>
          <img src="/internSetuLogo2.png" alt="" className="h-7" />
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className={`text-neutral-900 bg-neutral-200 hover:bg-neutral-300 dark:text-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 
                p-2 px-4 text-base rounded-full cursor-pointer
            `} 
          > 
            Login
          </Link>
          <Link 
            href="/register/student"
            className={`text-neutral-100 bg-neutral-900 hover:bg-neutral-800 
            dark:text-neutral-900 dark:bg-neutral-100 dark:hover:bg-neutral-200
              p-2 px-4 text-base rounded-full cursor-pointer
            `}
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 lg:pt-32 lg:pb-24 max-w-5xl mx-auto">
    
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Bridging the gap between <br className="hidden md:block" />
            <span className="bg-clip-text">
              Talent and Opportunity
            </span>
          </h1>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
            InternSetu connects ambitious students with top-tier companies. 
            Streamline your hiring process or kickstart your career with our 
            intelligent placement management system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/register/student" 
              className={`text-neutral-100 bg-neutral-900 hover:bg-neutral-800 
              dark:text-neutral-900 dark:bg-neutral-100 dark:hover:bg-neutral-200
                p-2 px-4 text-base rounded-full cursor-pointer
              `}
            >
              I&apos;m a Student
            </Link>
            
            <Link 
              href="/register/company"
              className={`text-neutral-900 bg-neutral-200 hover:bg-neutral-300 dark:text-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 
                p-2 px-4 text-base rounded-full cursor-pointer
              `}  
            >
              I&apos;m a Recruiter
            </Link>
          </div>
        </div>

        <div className="px-4 py-16 bg-gray-100/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Why choose InternSetu?</h2>
              <p className="text-gray-500 dark:text-gray-400">Everything you need to manage the placement cycle.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:border-purple-500/50 transition-colors">
                <h3 className="font-bold text-lg mb-2">Real-time Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Monitor application status, interview schedules, and offer letters in real-time with our intuitive dashboard.
                </p>
              </Card>

              <Card className="p-6 hover:border-purple-500/50 transition-colors">
              
                <h3 className="font-bold text-lg mb-2">Verified Companies</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  We partner with verified startups and MNCs to ensure students get legitimate and high-quality opportunities.
                </p>
              </Card>

              <Card className="p-6 hover:border-purple-500/50 transition-colors">
               
                <h3 className="font-bold text-lg mb-2">Skill Matching</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Our algorithm matches student profiles with job descriptions to increase the conversion rate for everyone.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 px-6 text-center text-sm ">
        <p>&copy; {new Date().getFullYear()} InternSetu. All rights reserved.</p>
      </div>
    </div>
  )
}

export default page
