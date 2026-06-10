"use client"

import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Tag from "@/components/ui/Tag"
import CompanyActionModal from "./CompanyActionModal"
import { Globe, MapPin, ShieldCheck, Link2, Linkedin, Briefcase, Mail, Check, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

export interface TpoCompanyVerificationState {
  company : {
    id: number
    description: string | null,
    hrEmail: string,
    isVerified: boolean,
    linkedinProfile: string | null,
    location: string  | null,
    name: string,
    websiteUrl: string | null,
    industryType: string | null
  },
  docs: string,
  status: "APPROVED" | "PENDING" | "REJECTED" | "BLACKLISTED",
  text: string | null
}


const TpoCompanies = () => {
  const [companiesVerification, setCompaniesVerification] = useState<TpoCompanyVerificationState[]>([])
  const [filter, setFilter] = useState("ALL")
  const [loading, setLoading] = useState(true)
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean
    action: 'APPROVED' | 'REJECTED' | null
    companyId: number | null
    companyName: string
  }>({
    isOpen: false,
    action: null,
    companyId: null,
    companyName: ''
  })

  const filteredVerification = useMemo(() => {
    if (filter === "ALL") return companiesVerification
    return companiesVerification.filter(c => c.status === filter)
  }, [companiesVerification, filter])

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const res = await callBackend("/tpo/company")   
      console.log(res.data);
      if (res.success) {
        setCompaniesVerification(res.data)
      }
    } catch (error) { 
      console.error("Failed to fetch companies:", error) 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCompanies() }, [])

  const handleOpenActionModal = (action: 'APPROVED' | 'REJECTED', companyId: number, companyName: string) => {
    setActionModal({
      isOpen: true,
      action,
      companyId,
      companyName
    })
  }

  const handleCloseActionModal = () => {
    setActionModal({
      isOpen: false,
      action: null,
      companyId: null,
      companyName: ''
    })
  }

  const handleSubmitAction = async (reason: string) => {
    if (!actionModal.companyId || !actionModal.action) return

    try {
      const endpoint = `/tpo/company/${actionModal.companyId}/verify`

        const res = await callBackend(endpoint, "POST", {
            status: actionModal.action,
            text: reason
        })

      if (res.success) {
        setCompaniesVerification(prevVerification => 
          prevVerification.map(verification => 
            verification.company.id === actionModal.companyId 
              ? { 
                  ...verification, 
                  status: actionModal.action === 'APPROVED' ? 'APPROVED' : 'REJECTED',
                  text: reason
                } 
              : verification
          )
        )
        handleCloseActionModal()
      } else {
        throw new Error(res.data || 'Failed to submit action')
      }
    } catch (error) {
      console.error(`Failed to ${actionModal.action} company:`, error)
    }
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold">Company Verifications</h1>
        </div>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar">
        {["ALL", "APPROVED", "PENDING", "REJECTED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === f 
              ? "bg-black text-white dark:bg-white dark:text-black" 
              : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVerification.map((verification) => (
          <Card key={verification.company.id} className="flex flex-col group h-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-all">
            <div className="p-5 flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold flex items-center gap-1.5 mb-3">
                    <p className="flex gap-1 items-center">
                        <span>{verification.company.name}</span>
                        <span>
                            {verification.company.isVerified && (
                                <ShieldCheck className="w-4 h-4 text-blue-500" fill="currentColor" fillOpacity={0.2} />
                            )}
                        </span>
                    </p>
                    {
                      verification.company.industryType && <p>
                          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 ml-0.5">
                              {verification.company.industryType.toLocaleLowerCase().replace("_", " ")}
                          </span>
                      </p>    
                    }
                  </h2>
                </div>
                <Tag size="sm">
                  {verification.status}
                </Tag>
              </div>

              <div className="space-y-2.5">
                {
                    verification.company.location && <p className="flex items-start text-neutral-600 dark:text-neutral-400 gap-2 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> 
                        <span>{verification.company.location}</span>
                    </p>
                }
                <div className="flex flex-wrap gap-3 py-2">
                  {verification.company.websiteUrl && (
                    <Link href={verification.company.websiteUrl} target="_blank" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors">
                      <Tag size="sm" >website</Tag>
                    </Link>
                  )}
                  {verification.company.linkedinProfile && (
                    <Link href={verification.company.linkedinProfile} target="_blank" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors">
                      <Tag size="sm" >linkedin</Tag>
                    </Link>
                  )}
                  {verification.company.hrEmail && (
                    <p className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                      <Mail className="w-4 h-4" />  {verification.company.hrEmail}
                    </p>
                  )}
                </div>

                {       
                    verification.company.description && (   
                        <p className="text-xs text-neutral-500 line-clamp-2 italic">
                            {verification.company.description}
                        </p>
                    )
                }

                {verification.docs && (
                  <Link 
                    href={verification.docs} 
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-fit hover:underline"
                  >
                    <Link2 className="w-3 h-3" />
                    Company Documents
                  </Link>
                )}
              </div>

              {verification.text && (
                <div className="mt-4 pt-3 border-t border-neutral-50/50 dark:border-neutral-900/50">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/50 p-2 rounded italic">
                    "{verification.text}"
                  </p>
                </div>
              )}

              {verification.status === "PENDING" && (
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
                  <Button
                    onClick={() => handleOpenActionModal('APPROVED', verification.company.id, verification.company.name)}
                    className="flex gap-2 items-center justify-center px-2"
                    size="sm"
                  >
                    <Check className="size-5"/>
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleOpenActionModal('REJECTED', verification.company.id, verification.company.name)}
                    className="flex gap-2 items-center justify-center px-2"
                    size="sm"
                  >
                    <X className="size-5"/>
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredVerification.length === 0 && !loading && (
        <div className="text-center py-20 text-neutral-500">
          No companies found for the selected filter.
        </div>
      )}

      <CompanyActionModal
        isOpen={actionModal.isOpen}
        action={actionModal.action}
        companyName={actionModal.companyName}
        onClose={handleCloseActionModal}
        onSubmit={handleSubmitAction}
      />
    </div>
  )
}

export default TpoCompanies