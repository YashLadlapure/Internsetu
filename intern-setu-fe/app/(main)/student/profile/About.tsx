"use client"
import { callBackend } from "@/actions/backend-proxy";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { updateAbout } from "@/lib/features/profile/studentProfileSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Edit, X } from "lucide-react";
import { useState } from "react";

const About = ({ about }: { about: string | null }) => {

  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();
  const [aboutText, setAboutText] = useState(about || "");

  const handleSave = async () => {
    if(aboutText.trim() === "") {
      return;
    }

    try {
      const res = await callBackend("/student/profile/about?about=" + encodeURIComponent(aboutText), "PUT")
      if(!res.success) {
        throw new Error(res.data || "Failed to update about section");
      }
      dispatch(updateAbout(aboutText));
    }
    catch (error) {
      console.error("Failed to update about section:", error);
    }
    finally {
      setEdit(false);
    }
  }

  const handleCancel = () => {
    setEdit(false);
    setAboutText(about || "");
  }

  return (
    <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
                About
            </h3> 
            <Button variant="ghost" className="px-4" onClick={() => {
                if(edit) {
                    handleCancel();
                } else {
                    setEdit(true);
                }
            }}>
                {edit ? <X className="size-4" /> : <Edit className="size-4"/>}
            </Button>
        </div>
        {
          edit ? 
          <div>
            <Input value={aboutText || ""} onChange={(e)=>setAboutText(e.target.value)} label="about" className="mb-4" /> 
            <Button variant="primary" onClick={handleSave} className="px-4">
              Save
            </Button>
          </div>
            :  
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-5xl">
              {about || "Write a short, powerful summary highlighting your skills, goals, and interests."}
            </p>
        }

    </Card>
  )
}

export default About

