"use client"
import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import DropDownmenu from "@/components/ui/DropDownmenu"
import Input from "@/components/ui/Input"
import {  updateAbout, updateBranch, updateCourse, updateDateOfBirth, updateGender, updateGraduationYear, updatePanel, updatePhoneNumber, updatePrn, updateResumeLink } from "@/lib/features/profile/studentProfileSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Edit, FileText, Save, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


type Gender = "MALE" | "FEMALE" | "OTHER" | null;



const Identity = ({prn, branch, course, panel, gender, phoneNumber, dateOfBirth,  graduationYear, resumeLink}: {prn: string, branch: string | null, gender: Gender, phoneNumber: string | null, dateOfBirth: string | null, course: string | null, panel: string | null, graduationYear: string | null, resumeLink?: string | null}) => {
    const dispatch = useAppDispatch();
    const [edit, setEdit ] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const genderOptions = [
        {value: "MALE", label: "Male"},
        {value: "FEMALE", label : "Female"},
        {value: "OTHER", label: "Other"}
    ];

    const [form, setForm] = useState({
        prn: prn || "",
        branch: branch || "",
        course: course || "",
        graduationYear: graduationYear || "",
        resumeLink: resumeLink || "",
        panel: panel || "",
        gender: gender || "",
        phoneNumber: phoneNumber || "",
        dateOfBirth: dateOfBirth || ""
    })

    const handleSave = async () => {
        
        if(isLoading) return;
        setIsLoading(true);
        setError(null);

        try {

            if(!prn) {
                return;
            }
            
            const res = await callBackend("student/profile/identity", "PUT", {
                prn: form.prn,
                branch: form.branch,
                course: form.course,
                graduationYear: form.graduationYear,
                resumeLink: form.resumeLink,
                panel: form.panel,
                gender: form.gender,
                phoneNumber: form.phoneNumber,
                dateOfBirth: form.dateOfBirth
            });

            if(!res.success) {
                throw new Error("Failed to save identity");
            }
            
            dispatch(updatePrn(form.prn));
            dispatch(updateResumeLink(form.resumeLink));
            dispatch(updateDateOfBirth(form.dateOfBirth));
            dispatch(updatePhoneNumber(form.phoneNumber));
            dispatch(updateBranch(form.branch));
            dispatch(updateCourse(form.course));
            dispatch(updatePanel(form.panel));
            dispatch(updateGender(form.gender));
            dispatch(updateGraduationYear(form.graduationYear));

        }
        catch (error) {
            setError("Failed to save changes. Please try again.");
            console.error("Error saving identity:", error);
        }
        finally {
            setIsLoading(false);
            setEdit(false);
        }
    }

    const handleCancel = () => {
        setForm({
            prn: prn || "",
            branch: branch || "",
            course: course || "",
            graduationYear: graduationYear || "",
            resumeLink: resumeLink || "",
            panel: panel || "",
            gender: gender || "",
            phoneNumber: phoneNumber || "",
            dateOfBirth: dateOfBirth || ""
        });
        setEdit(false);
        setError(null);
    }

  return (
    <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
                Identity
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

        <div className="space-y-6">
            <div className="w-full">
                {
                    edit ? (
                        <Input size="sm" type="text" value={form.prn} label="PRN Number" onChange={(e)=> setForm({...form, prn: e.target.value})} />
                    ) : (
                        <div className="space-y-2">
                            <p className="text-xs text-neutral-400 uppercase tracking-wide">PRN Number</p>
                            <p className="text-sm font-medium dark:text-white">
                                {prn}
                            </p>
                        </div>
                    )
                }
            </div>

            <div className="w-full">
                {
                    edit ? (
                        <div className="flex flex-col gap-4">
                            <Input size="sm" type="text" value={form.branch} label="Branch" onChange={(e)=> setForm({...form, branch: e.target.value})} />
                            <Input size="sm" type="text" value={form.course} label="Course" onChange={(e)=> setForm({...form, course: e.target.value})} />
                            <Input size="sm" type="text" value={form.graduationYear} label="Graduation Year" onChange={(e)=> setForm({...form, graduationYear: e.target.value})} />
                            <Input size="sm" type="text" value={form.panel} label="Panel" onChange={(e)=> setForm({...form, panel: e.target.value})} />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-xs text-neutral-400 uppercase tracking-wide">Department</p>
                            <p className="text-sm font-medium dark:text-white">
                                {branch} {course && `• ${course}`} {graduationYear && `• ${graduationYear}`} {panel && `• Panel ${panel}`}
                            </p>
                        </div>
                    )
                }
            </div>

            <div className="w-full">
                {
                    edit ? (
                        <div className="flex flex-col gap-4">
                            <DropDownmenu
                                optoins={genderOptions.map((opt) => ({value: opt.value, label: opt.label}))}
                                onSelect={(value)=> { 
                                        setForm({...form, gender: value ? value as string : ""})
                                }} 
                                label="Gender"
                                className="w-full bg-neutral-700"
                                listClassName="h-20"
                                selectedValue={form.gender || null} 
                            />
                            <Input size="sm" type="text" value={form.phoneNumber} label="Phone Number" onChange={(e)=> setForm({...form, phoneNumber: e.target.value})} />
                            <Input size="sm" type="date" value={form.dateOfBirth} label="Date of Birth" onChange={(e)=> setForm({...form, dateOfBirth: e.target.value})} />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-xs text-neutral-400 uppercase tracking-wide">Personal Info</p>
                            <div className="space-y-1.5">
                                {gender && <p className="text-sm dark:text-gray-300"><span className="text-neutral-500">Gender:</span> {gender.toLowerCase()}</p>}
                                {phoneNumber && <p className="text-sm dark:text-gray-300"><span className="text-neutral-500">Phone:</span> {phoneNumber}</p>}
                                {dateOfBirth && <p className="text-sm dark:text-gray-300"><span className="text-neutral-500">DOB:</span> {dateOfBirth}</p>}
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="w-full">
                {
                    edit ? (
                        <Input size="sm" type="text" value={form.resumeLink} label="Resume Link" onChange={(e)=> setForm({...form, resumeLink: e.target.value})} />
                    ) : resumeLink && (
                        <Link
                            href={resumeLink}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 font-medium hover:underline text-sm"
                        >
                            <FileText className="w-4 h-4" />
                            View Resume
                        </Link>
                    )
                }
            </div>

            { edit && (
                <div className="pt-2">
                    <Button onClick={handleSave} className="px-4 w-full">
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            )}
        </div>
    </Card>
  )
}

export default Identity