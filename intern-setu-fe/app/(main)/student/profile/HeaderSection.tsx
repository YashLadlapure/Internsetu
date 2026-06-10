import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";



const HeaderSection = ({ email, role}: { email: string; role: string;}) => {
  return (
    <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-8 border border-neutral-300 dark:border-neutral-600">
        <div className="flex items-center gap-4 md:gap-6 ">
            <div className="bg-sky-700 text-white rounded-full w-12 h-12 md:w-24 md:h-24 flex items-center text-lg md:text-3xl justify-center cursor-pointer">
                {email.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
                <h1 className="md:text-4xl font-bold hidden md:block">
                    {email.split("@")[0]}
                </h1>
                <div className="flex flex-col justify-center md:justify-start items-center mt-2">
                    <p className="text-zinc-500 font-medium">{email}</p>
                </div>
            </div>
        </div>
        <div>
            <Tag>{role}</Tag>
        </div>
    </Card>
  )
}

export default HeaderSection