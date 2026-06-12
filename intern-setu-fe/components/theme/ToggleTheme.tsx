"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";
import Button from "../ui/Button";

const ToggleTheme = () => {

    const {theme, setTheme} = useTheme();
    const isDark = theme === "dark";

    return (
        <div> 
            <Button
                variant="ghost"
                className="rounded-none" 
                onClick={() => setTheme(isDark ? "light" : "dark")}
            >
                <div className="flex gap-2">{isDark ? <Sun  /> : <Moon />} Toggle Theme</div>
            </Button>
        </div>
    )
}

export default ToggleTheme
