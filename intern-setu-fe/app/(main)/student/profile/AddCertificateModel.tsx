"use client"

import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { addCertificate } from "@/lib/features/profile/studentProfileSlice"
import { useAppDispatch } from "@/lib/hooks"
import { X } from "lucide-react"
import { useState } from "react"

const AddCertificateModel = ({ onClose}: { onClose: () => void }) => {

    const [name, setName] = useState("");
    const [issuedBy, setIssuedBy] = useState("");
    const [issuedDate, setIssuedDate] = useState("");
    const [url, setUrl] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        try {
            if(isLoading) return;
            setIsLoading(true);
            setError(null);
            if(!name) {
                
                return;
            }
            if(!issuedBy) {
                // show error
                return;
            }

            if(!issuedDate) {
                // show error
                return;
            }

            if(!url) {
                // show error
                return;
            }

            const res = await callBackend("student/profile/certificate", "POST", {
                name,
                issuedBy,
                issuedDate,
                url
            })

            if(!res.success) {
                throw new Error("Failed to add project");
            }

            dispatch(addCertificate(res.data))
            onClose();
        }
        catch (error) {
            setError("Failed to add project. Please try again.");
            console.error("Error adding project:", error);
        }
        finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
            <div className=" absolute inset-0 " onClick={onClose}></div>

            <Card className="relative z-50 max-w-md min-w-80 p-4" onClick={(e)=> e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium pl-2">Add Project</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X />
                    </Button>
                </div>
                <div className="flex flex-col justify-center mt-4 gap-4">
                    <Input type="text" onChange={(e)=> setName(e.target.value)} value={name} label="Certificate Name" placeholder="Enter certificate name"/>
                    <Input type="text" onChange={(e)=> setIssuedBy(e.target.value)} value={issuedBy} label="Issued By" placeholder="Enter issuer name"/>
                    <Input type="date" onChange={(e)=> setIssuedDate(e.target.value)} value={issuedDate} label="Issued Date" placeholder="Enter issued date"/>
                    <Input type="text" onChange={(e)=> setUrl(e.target.value)} value={url} label="Certificate URL" placeholder="Enter certificate URL"/>
                    <Button className="mt-2" onClick={handleSubmit}>Add Certificate</Button>
                </div>
            </Card>
        </div>
    )
}

export default AddCertificateModel