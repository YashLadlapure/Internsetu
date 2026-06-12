"use client"
import { useState } from "react"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { callBackend } from "@/actions/backend-proxy"

type ResetPasswordFormProps = {
    token: string
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async () => {
        if (loading) return

        setLoading(true)
        setErrorMessage("")
        setSuccessMessage("")

        // Validation
        if (!password) {
            setErrorMessage("*Password is required")
            setLoading(false)
            return
        }

        if (password.length < 6 || password.length > 20) {
            setErrorMessage("*Password must be 6 to 20 characters long")
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage("*Passwords do not match")
            setLoading(false)
            return
        }

        try {
            const res = await callBackend("/auth/reset-password", "POST", {
                resetToken: token,
                password: password
            })

            if(!res.success) {
                throw new Error(res.data || "Failed to reset password");                
            }
            
            router.push("/login");            

        } catch (error: unknown) {            
            setErrorMessage(error instanceof Error ? error.message : "Failed to reset password. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col pt-10 gap-3">
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="New Password"
                type="password"
                placeholder="Enter new password (6-20 characters)"
                className="bg-neutral-300 dark:bg-neutral-700"
            />
            <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                type="password"
                placeholder="Confirm new password"
                className="bg-neutral-300 dark:bg-neutral-700"
            />
            {errorMessage && <p className="text-red-500 px-2">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 px-2">{successMessage}</p>}
            <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                className="mt-4"
                disabled={loading}
            >
                {loading ? "Resetting..." : "Reset Password"}
            </Button>
        </div>
    )
}

export default ResetPasswordForm
