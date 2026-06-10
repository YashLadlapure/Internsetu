"use client"
import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Tag from "@/components/ui/Tag"
import { removeCertificate } from "@/lib/features/profile/studentProfileSlice"
import { Certificate } from "@/lib/features/profile/types"
import { useAppDispatch } from "@/lib/hooks"
import { Award, ExternalLink, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import AddCertificateModel from "./AddCertificateModel"



const Certificates = ({certificates}: {certificates: Certificate[]}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | string | null>(null);
    const dispatch = useAppDispatch();

    const handleDeleteCertificate = async (certificateId: number | string) => {
        try {
            setIsDeleting(certificateId);
            const res = await callBackend("/student/profile/certificate/" + certificateId, "DELETE");
            if(!res.success) {
                throw new Error("Failed to delete certificate");
            }
            dispatch(removeCertificate(certificateId));
        }
        catch (error) {
            console.error("Error deleting certificate:", error);
        } finally {
            setIsDeleting(null);
        }
    }



  return (
    <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
        {
            isModalOpen && <AddCertificateModel onClose={() => setIsModalOpen(false)} />
        }
        <div className='flex justify-between items-center mb-6'> 
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
                Certificates
            </h3>
            <Button variant="secondary" className='px-4' onClick={()=>setIsModalOpen(true)}>
                + Add New Certificate
            </Button>
        </div>


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {certificates.map((cert) => (
            <Card
                key={cert.id}
                className="flex justify-between items-center rounded-2xl p-6 bg-neutral-300 border-neutral-200 dark:bg-neutral-700 dark:border-neutral-600"
            >
                <div className="flex items-center gap-4">
                    <h4 className="font-bold text-sm dark:text-white">
                    {cert.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                    {cert.issuedBy} • {cert.issuedDate}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link href={cert.url} target="_blank">
                        <Tag>
                            <ExternalLink className="size-4" />
                        </Tag>
                    </Link>
                    <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleDeleteCertificate(cert.id)}
                        disabled={isDeleting === cert.id}
                    >
                        {isDeleting === cert.id ? (
                            "Deleting..."
                        ) : (
                            <Trash2 className="size-4" />
                        )}
                    </Button>
                </div>
            </Card>
            ))}
        </div>
    </Card>
  )
}

export default Certificates