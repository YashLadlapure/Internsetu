import { ReactNode } from "react"
import StoreProvider from "./StoreProvider"
import { ThemeProvider } from "next-themes"

const Providers = ({children}: {children: ReactNode}) => {
  return (    
    <div>
        <StoreProvider>
            <ThemeProvider attribute="class" enableSystem defaultTheme="system" >
              <div className="min-h-screen bg-white dark:bg-black">
                {children}
              </div>
            </ThemeProvider>
        </StoreProvider>
    </div>
  )
}

export default Providers