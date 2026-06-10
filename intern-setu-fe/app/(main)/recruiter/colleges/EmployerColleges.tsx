"use client"

import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import { Plus, MapPin, Link2} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import AddCollegeModal from "./AddCollegeModal"
import Tag from "@/components/ui/Tag"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectCompanyVerifications, setCompanyVerifications } from "@/lib/features/employer/employerSlice"

export interface EmployerCompanyVerification {
  college: {
    address: string | null,
    emailDomain: string | null,
    id: number,
    name: string,
    website: string | null,
  },
  docs: string | null,
  status: "APPROVED" | "PENDING" | "REJECTED" | "BLACKLISTED",
  text: string | null,
}

const EmployerColleges = ({ showAddButton = false }: { showAddButton?: boolean }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState("ALL")

  const dispatch = useAppDispatch();
  const companyVerifications = useAppSelector(selectCompanyVerifications)

  const filteredCompanyVerifications = useMemo(() => {
    if (filter === "ALL") return companyVerifications
    return companyVerifications.filter(c => c.status === filter)
  }, [companyVerifications, filter])

  const fetchColleges = async () => {
    try {
      const res = await callBackend("/employer/college")
      
      if (res.success) dispatch(setCompanyVerifications(res.data))
    } catch (error) { 
      console.error(error) 
    }
  }

  useEffect(() => { fetchColleges() }, [dispatch])

  return (
    <div className="">
      {showAddModal && <AddCollegeModal onClose={() => setShowAddModal(false)} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl font-bold">Partner Colleges</h1>
        {showAddButton && (
          <Button onClick={() => setShowAddModal(true)} className="flex gap-2">
            <Plus /> Request College
          </Button>
        )}
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
        {filteredCompanyVerifications.map((companyVerification) => (
          <Card key={companyVerification.college.id} className="flex flex-col group h-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-all">
            <div className="p-5 flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold flex items-center gap-1.5 mb-3">
                    <p className="flex flex-col">
                        <span>{companyVerification.college.name}</span>
                        <span>
                            {companyVerification.college.emailDomain && (
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                    {companyVerification.college.emailDomain}
                                </span>
                            )}
                        </span>
                    </p>
                  </h2>
                </div>
                <Tag size="sm">
                  {companyVerification.status}
                </Tag>
              </div>

              <div className="space-y-2.5">
                {
                    companyVerification.college.address && <p className="flex items-start text-neutral-600 dark:text-neutral-400 gap-2 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> 
                        <span>{companyVerification.college.address}</span>
                    </p>
                }
                <div className="flex flex-wrap gap-3 py-2">
                 {companyVerification.college.website && (
                    <Link href={companyVerification.college.website} target="_blank" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors">
                      <Tag size="sm" >website</Tag>
                    </Link>
                  )}
                </div>
                {companyVerification.docs && (
                  <Link 
                    href={companyVerification.docs} 
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-fit hover:underline"
                  >
                    <Link2 className="w-3 h-3" />
                    Documents
                  </Link>
                )}
              </div>
              {companyVerification.text && (
                <div className="mt-4 pt-3 border-t border-neutral-50/50 dark:border-neutral-900/50">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/50 p-2 rounded italic">
                    "{companyVerification.text}"
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default EmployerColleges