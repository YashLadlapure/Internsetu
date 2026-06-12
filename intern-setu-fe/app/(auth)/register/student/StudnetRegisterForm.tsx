"use client"
import { useState } from "react";
import DropDownmenu from "@/components/ui/DropDownmenu";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/dist/client/link";
import { callBackend } from "@/actions/backend-proxy";
import { useRouter } from "next/navigation";

type ErrorState = {
    email: string;
    password: string;
    confirmPassword: string;
    collegeId: string;
    prn: string;
};

type FormState = {
    email: string;
    password: string;
    confirmPassword: string;
    collegeId: number | null;
    prn: string;
};

type FormField = keyof FormState;

type BackendError = {
    message?: string;
    details?: Partial<Record<FormField, string>>;
};


const StudentRegisterForm = ({colleges}: {colleges: {label: string, value: number}[]}) => {


    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const [form, setForm] = useState<FormState>({
        email: "",
        password: "",
        confirmPassword: "",
        collegeId: null,
        prn: ""
    });

    const [errors, setErrors] = useState<ErrorState>({
        email: "",
        password: "",
        confirmPassword: "",
        collegeId: "",
        prn: ""
    });



    const handleSubmit = async () => {

        if(loading) return;

        setLoading(true);
        setErrorMessage("");
        


        if(!form.email) {
            setErrors((prev) => ({...prev, email: "*Email is required"}));
            setLoading(false);
            return;
        }
        if(!form.password) {
            setErrors((prev) => ({...prev, password: "*Password is required"}));
            setLoading(false);
            return;
        }
        if(form.password !== form.confirmPassword) {
            setErrors((prev) => ({...prev, confirmPassword: "*Passwords do not match"}));
            setLoading(false);
            return;
        }
        if(!form.collegeId) {
            setErrors((prev) => ({...prev, collegeId: "*Please select a college"}));
            setLoading(false);
            return;
        }
        if(!form.prn) {
            setErrors((prev) => ({...prev, prn: "*PRN Number is required"}));
            setLoading(false);
            return;
        }

        try {
            const res = await callBackend("/auth/register/student", "POST", {
                email: form.email,
                password: form.password,
                collegeId: form.collegeId,
                prn: form.prn
            });
            
            if(res.success) {
                console.log("Registration successful");
                router.push("/auth/login");
            }
            else {
                const errorData = res.data as BackendError;
                setErrorMessage(errorData.message || "Registration failed")
                const details = errorData.details;
                
                if(details) {
                    const newErrors: ErrorState = {...errors};
                    const newForm: FormState = {...form}; 
                    Object.keys(details).forEach((field) => {
                        if (field in newErrors) {
                            const fieldKey = field as FormField;
                            newErrors[fieldKey] = details[fieldKey] || "";

                            if (fieldKey === "collegeId") {
                                newForm.collegeId = null;
                            } else {
                                newForm[fieldKey] = "";
                            }
                        }
                    });

                    setErrors(newErrors);
                    setForm(newForm);
                }
            }
        } catch (error: unknown) {
            setErrorMessage(error instanceof Error ? error.message : "Registration failed")
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col pt-10 gap-3">
            <Input
                value={form.email}
                onChange={(e) => {
                    setErrors({...errors, email: ""});
                    setForm({...form, email: e.target.value})
                }} 
                label="Email" 
                type="text" 
                placeholder="Email" 
                isError={!!errors.email}
                error={errors.email}
                className="bg-neutral-300 dark:bg-neutral-700"
            />
            <Input
                value={form.password}
                onChange={(e) => {
                    setErrors({...errors, password: ""});
                    setForm({...form, password: e.target.value})
                }}
                label="Password" 
                type="password" 
                placeholder="Password" 
                isError={!!errors.password}
                error={errors.password}
                className="bg-neutral-300 dark:bg-neutral-700"
            />
            <Input
                value={form.confirmPassword}
                onChange={(e) => {
                    setErrors({...errors, confirmPassword: ""});
                    setForm({...form, confirmPassword: e.target.value})
                }}
                label="Confirm Password" 
                type="password" 
                placeholder="Confirm Password" 
                isError={!!errors.confirmPassword}
                error={errors.confirmPassword}
                className="bg-neutral-300 dark:bg-neutral-700"
            />
            <div>
                <p className="text-lg font-semibold px-2">College</p>
                <DropDownmenu 
                    optoins={colleges}
                    onSelect={(value) => {
                        setErrors({...errors, collegeId: ""});
                        setForm({...form, collegeId: Number(value)})
                    }}
                    selectedValue={form.collegeId}
                    placeholder="Select College"
                    className="bg-neutral-300 dark:bg-neutral-700"
                    isSearchable={true}
                    isError={!!errors.collegeId}
                    error={errors.collegeId}
                />
            
            </div>
            <Input
                value={form.prn}
                onChange={(e) => {
                    setErrors({...errors, prn: ""});
                    setForm({...form, prn: e.target.value})
                }}
                label="PRN Number" 
                type="text" 
                placeholder="PRN Number" 
                isError={!!errors.prn}
                error={errors.prn}
                className="bg-neutral-300 dark:bg-neutral-700"
            />
            {errorMessage && <p className="text-red-500 px-2">{errorMessage}</p>}
            <Button
                variant="primary"
                size="md" 
                onClick={handleSubmit}
                className="mt-4"
            >
                {
                    loading ? "Registering..." : "Register"
                }
            </Button>
            <p className="text-gray-500 dark:text-gray-400 pt-5 px-2">
                Already have an Account?  <span className="text-purple-600 cursor-pointer">
                    <Link href="/login">
                        login
                    </Link>
                </span>
            </p>
        </div>
    )
}

export default StudentRegisterForm 
