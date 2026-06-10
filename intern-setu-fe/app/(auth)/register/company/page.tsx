import CompanyRegisterForm from "./CompanyRegisterForm";
import Card from "@/components/ui/Card"


const page = () => {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center ">
          <Card className="p-6 lg:p-10 w-96">
            <h1 className="font-bold text-xl lg:text-2xl pt-4 pb-2">Welcome to InternSetu</h1>
            <p className="text-gray-500 ">Please register your company</p>
            <CompanyRegisterForm />
          </Card>
      </div>
    </div>
  )
}

export default page