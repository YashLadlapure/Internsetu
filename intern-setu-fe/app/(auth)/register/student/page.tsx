import { callBackend } from "@/actions/backend-proxy";
import StudentRegisterForm from "./StudnetRegisterForm";
import Card from "@/components/ui/Card"


const page = async () => {
  
  let colleges: { id: number; name: string }[] = [];

  try {
    const res = await callBackend("/public/college");

    if(!res.success) {
      throw new Error("Failed to fetch colleges");
    }
      
    colleges = res.data;
  }
  catch {
    return <div className="flex-1 flex justify-center items-center ">
      Error fetching data
      </div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center ">
          <Card className="p-6 lg:p-10 w-96">
            <h1 className="font-bold text-xl lg:text-2xl pt-4 pb-2">Welcome to InternSetu</h1>
            <p className="text-gray-500 ">Please register as a student to continue</p>
            <StudentRegisterForm colleges={colleges.map((college) => ({ label: college.name, value: college.id }))} />
          </Card>
      </div>
    </div>
  )
}

export default page
