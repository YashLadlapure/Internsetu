"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "../ui/Button";

const ToggleTheme = () => {

    const {theme, setTheme} = useTheme();

    const [mounted, setMounted] =  useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) {
        return null;
    }

    return (
        <div> 
            <Button
                variant="ghost"
                className="rounded-none" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                <div className="flex gap-2">{theme === "dark" ? <Sun  /> : <Moon />} Toggle Theme</div>
            </Button>
        </div>
    )
}

export default ToggleTheme