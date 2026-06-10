"use client"
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginAction } from "@/actions/auth";
import Link from "next/link";
import { callBackend } from "@/actions/backend-proxy";

type FormState = {
    email: string;
    password: string;
};


const LoginForm = () => {


    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

    const [form, setForm] = useState<FormState>({
        email: "",
        password: "",
    });


    const handleSubmit = async () => {
        if(loading) return; 

        setLoading(true);
        setErrorMessage("");

        if(!form.email) {
            setErrorMessage("*Email is required");
            setLoading(false);
            return;
        }
        if(!form.password) {
            setErrorMessage("*Password is required");
            setLoading(false);
            return;
        }

        try {
            const res = await loginAction({email: form.email, password: form.password});

            if(res?.error) {
                setErrorMessage(res.error);
                setLoading(false);
                return;
            }

        } catch (error: any) {
            setErrorMessage(error.response?.data?.message)
        }
        finally {
            setLoading(false);
        }
    }

    const handleForgotPassword = async () => {
        if(forgotPasswordLoading) return;

        setForgotPasswordLoading(true);
        setForgotPasswordMessage("");

        if(!forgotPasswordEmail) {
            setForgotPasswordMessage("*Email is required");
            setForgotPasswordLoading(false);
            return;
        }

        try {
            const res = await callBackend("/auth/forgot-password", "POST", {email: forgotPasswordEmail});

            if(!res.success) {
                console.log(res.data);
                setForgotPasswordMessage("Failed to send reset email. Please try again.");
                setForgotPasswordLoading(false);
                return;
            }
            console.log(res.data);
            
            setShowForgotPassword(false);
        } catch (error: any) {
            setForgotPasswordMessage("An error occurred. Please try again.");
        }
        finally {
            setForgotPasswordLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-col pt-10 gap-3">
                <Input
                    value={form.email}
                    onChange={(e) => {
                        setForm({...form, email: e.target.value})
                    }} 
                    label="Email" 
                    type="text" 
                    placeholder="Email" 
                    className="bg-neutral-300 dark:bg-neutral-700"
                />
                <Input
                    value={form.password}
                    onChange={(e) => {
                        setForm({...form, password: e.target.value})
                    }}
                    label="Password" 
                    type="password" 
                    placeholder="Password" 
                    className="bg-neutral-300 dark:bg-neutral-700"
                />
                <div className="flex justify-end">
                    <button 
                        onClick={() => setShowForgotPassword(true)}
                        className="text-purple-600 text-sm hover:underline"
                    >
                        Forgot password?
                    </button>
                </div>
                {errorMessage && <p className="text-red-500 px-2">{errorMessage}</p>}
                <Button
                    variant="primary"
                    size="md" 
                    onClick={handleSubmit}
                    className="mt-4"
                >
                    {
                        loading ? "Logging in..." : "Login"
                    }
                </Button>
            </div>

            {/* forgot password */}
            {showForgotPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="font-bold text-xl mb-4">Forgot Password</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <Input
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            className="bg-neutral-300 dark:bg-neutral-700"
                        />
                        {forgotPasswordMessage && (
                            <p className={`text-sm mt-3 px-2 ${forgotPasswordMessage.includes("✓") ? "text-green-500" : "text-red-500"}`}>
                                {forgotPasswordMessage}
                            </p>
                        )}
                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleForgotPassword}
                                className="flex-1"
                            >
                                {forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setShowForgotPassword(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LoginForm