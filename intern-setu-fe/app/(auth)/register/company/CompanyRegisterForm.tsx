"use client"
import { useState } from "react";
import Input from "../../../../components/ui/Input"
import Button from "../../../../components/ui/Button";
import Link from "next/link";
import { callBackend } from "@/actions/backend-proxy";
import { useRouter } from "next/navigation";

type ErrorState = {
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
    websiteUrl: string;
};

type FormState = {
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
    websiteUrl: string;
};

type FormField = keyof FormState;


const CompanyRegisterForm  = () => {


    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const [form, setForm] = useState<FormState>({
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        websiteUrl: ""
    });

    const [errors, setErrors] = useState<ErrorState>({
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        websiteUrl: ""
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
        if(!form.companyName) {
            setErrors((prev) => ({...prev, companyName: "*Please select a college"}));
            setLoading(false);
            return;
        }
        if(!form.websiteUrl) {
            setErrors((prev) => ({...prev, websiteUrl: "*websiteUrl Number is required"}));
            setLoading(false);
            return;
        }

        try {
            const res = await callBackend("/auth/register/company", "POST", {
                email: form.email,
                password: form.password,
                companyName: form.companyName,
                websiteUrl: form.websiteUrl
            });
        
            if(res.success) {
                console.log("Registration successful");
                router.push("/auth/login");
            }
            else {
                throw {
                    response: {
                        data: res.data
                    }
                }
            }
        } catch (error: any) {

            setErrorMessage(error.response?.data?.message)
            const details = error.response?.data?.details as Record<FormField, string> | undefined; 

            console.log(details);
            
            
            if(details) {
                const newErrors: ErrorState = {...errors};
                const newForm: FormState = {...form}; 
                Object.keys(details).forEach((field) => {
                    if (field in newErrors) {


                        const fieldKey = field as FormField;
                        newErrors[fieldKey] = details[fieldKey];
                            
                        newForm[fieldKey] = "";
                    
                    }
                });

                setErrors(newErrors);
                setForm(newForm);
            }
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
            <Input 
                value={form.companyName}
                onChange={(e) => {
                    setErrors({...errors, companyName: ""});
                    setForm({...form, companyName: e.target.value})
                }}
                label="Company Name" 
                type="text" 
                placeholder="Company Name" 
                isError={!!errors.companyName}
                error={errors.companyName}
                className="bg-neutral-300 dark:bg-neutral-700"
            />
            <Input
                value={form.websiteUrl}
                onChange={(e) => {
                    setErrors({...errors, websiteUrl: ""});
                    setForm({...form, websiteUrl: e.target.value})
                }}
                label="websiteUrl" 
                type="text" 
                placeholder="websiteUrl" 
                isError={!!errors.websiteUrl}
                error={errors.websiteUrl}
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

export default CompanyRegisterForm 