"use client"

import { callBackend } from "@/actions/backend-proxy";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useState } from "react"

const Page = () => {
  const [status, setStatus] = useState<{msg: string, error: boolean} | null>(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [tpoEmail, setTpoEmail] = useState("");

  const handleInvite = async (role: 'teacher' | 'tpo', email: string) => {
    setStatus(null);
    try {
        const result = await callBackend(`/college-admin/invite/${role}?email=${encodeURIComponent(email)}`, 'GET');
        if(!result.success) {
            throw new Error(result.data || 'Failed to send invite');
        }
        setStatus({msg: `Invitation sent successfully to ${email}`, error: false});
        if(role === 'teacher') setTeacherEmail("");
        if(role === 'tpo') setTpoEmail("");
    }
    catch (error) {
        console.error('Error sending invite:', error);
        setStatus({msg: `Failed to send invitation to ${email}`, error: true});
    }
  };

  return (
    <div className="w-full mx-auto px-4 lg:px-8 py-10">
      <div className="pb-4 mb-6">
        <h1 className="text-2xl font-bold">Invite Staff</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Send invitations to teachers and TPO staff</p>
      </div>

      {status && (
        <Card className={`p-4 mb-6 border-l-4 ${status.error ? 'bg-red-50 dark:bg-red-900/20 border-red-500' : 'bg-green-50 dark:bg-green-900/20 border-green-500'}`}>
          <p className={status.error ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}>
            {status.msg}
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teacher Invite Section */}
        <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
          <h2 className="text-lg font-bold mb-4">Invite Teacher</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Send an invitation to a teacher to join the platform</p>
          <div className="space-y-3">
            <Input
              label="Email Address"
              type="email"
              placeholder="teacher@college.com"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
            />
            <Button 
              variant="primary"
              className="w-full"
              onClick={() => handleInvite('teacher', teacherEmail)}
            >
              Send Invitation
            </Button>
          </div>
        </Card>

        {/* TPO Invite Section */}
        <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
          <h2 className="text-lg font-bold mb-4">Invite TPO</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Send an invitation to a TPO staff member to join the platform</p>
          <div className="space-y-3">
            <Input
              label="Email Address"
              type="email"
              placeholder="tpo@college.com"
              value={tpoEmail}
              onChange={(e) => setTpoEmail(e.target.value)}
            />
            <Button 
              variant="primary"
              className="w-full"
              onClick={() => handleInvite('tpo', tpoEmail)}
            >
              Send Invitation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Page
