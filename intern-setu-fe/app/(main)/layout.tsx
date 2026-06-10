import Topbar from "@/components/topbar/Topbar"
import Sidebar from "@/components/sidebar/Sidebar"
import { ReactNode } from "react"

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="z-20 sticky top-0">
        <Topbar />
      </div>  
      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 flex flex-col p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

export default layout