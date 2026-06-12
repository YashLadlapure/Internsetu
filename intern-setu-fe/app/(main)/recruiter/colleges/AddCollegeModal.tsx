"use client"

import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import DropDownmenu from "@/components/ui/DropDownmenu"
import { addCompanyVerification } from "@/lib/features/employer/employerSlice"
import { useAppDispatch } from "@/lib/hooks"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

const AddCollegeModal = ({ onClose }: { onClose: () => void }) => {
    const [collegeId, setCollegeId] = useState("")
    const [docs, setDocs] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [colleges, setColleges] = useState<{ id: number; name: string }[]>([])

    const dispatch = useAppDispatch()

    const fetchColleges = async () => {
        try {
            const res = await callBackend("/public/college");

            if(!res.success) {
            throw new Error("Failed to fetch colleges");
            }
            
            setColleges(res.data);
        }
        catch (error) {
            return <div className="flex-1 flex justify-center items-center ">
                        Error fetching data
                </div>
        }
    }

    useEffect(()=> {
        fetchColleges()
    }, [])
    

    const handleSubmit = async () => {
        try {
            if (isLoading) return
            setIsLoading(true)
            setError(null)
            
            if (!collegeId) {
                setError("Please select a college")
                return
            }
            if (!docs) {
                setError("Please provide document link")
                return
            }

            const res = await callBackend("/hr/verification-request-to-college", "POST", {
                collegeId,
                docs
            })

            if (!res.success) {
                throw new Error(res.data || "Failed to submit request")
            }

            dispatch(addCompanyVerification(res.data));
            
            onClose()

        } catch (error) {
            setError("Failed to submit request. Please try again.")
            console.error("Error submitting college request:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
            <div className="absolute inset-0" onClick={onClose}></div>

            <Card className="relative z-50 max-w-md min-w-80 p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium pl-2">Request College Verification</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X />
                    </Button>
                </div>
                <div className="flex flex-col justify-center mt-4 gap-4">
                    <DropDownmenu
                        placeholder="Select college"
                        optoins={colleges.map((college) => ({ 
                            label: college.name, 
                            value: college.id 
                        }))}
                        selectedValue={collegeId}
                        onSelect={(value) => setCollegeId(value ? value.toString() : "")}
                        className="bg-neutral-200 dark:bg-neutral-700"
                        listClassName="bg-neutral-200 dark:bg-neutral-700"
                        isSearchable
                    />
                    <Input 
                        type="text" 
                        onChange={(e) => setDocs(e.target.value)} 
                        value={docs} 
                        label="Verification Documents" 
                        placeholder="Link to documents"
                        className="bg-neutral-200 dark:bg-neutral-700"
                    />
                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                    <Button 
                        className="mt-2" 
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit Request"}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default AddCollegeModal
