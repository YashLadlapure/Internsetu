import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import DropDownmenu from "@/components/ui/DropDownmenu"
import Input from "@/components/ui/Input"
import Tag from "@/components/ui/Tag"
import { updateSocials } from "@/lib/features/profile/studentProfileSlice"
import { SocialMediaPlatform, StudentSocialLinks } from "@/lib/features/profile/types"
import { useAppDispatch } from "@/lib/hooks"
import { Edit, ExternalLink, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const Socials = ({socials}: {socials: StudentSocialLinks[]}) => {

    const dispatch = useAppDispatch();
    const [availableSocials, setAvailableSocials] = useState<SocialMediaPlatform[]>([]);

    const [selectedSocialPlatform, setSelectedSocialPlatform] = useState<SocialMediaPlatform | null>(null);
    const [link, setLink] = useState<string>("");
    const [edit, setEdit] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingLink, setEditingLink] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState(false);



    const fetchAvailableSocials = async () => {
        try {
            const res = await callBackend("/public/social-media");
            if(!res.success) {
                throw new Error("Failed to fetch social media platforms");
            }        
            setAvailableSocials(res.data);
        }
        catch (error) {
            console.error("Error fetching social media platforms:", error);
        }
    }

    const handleAddSocial = async () => {
        if(!selectedSocialPlatform || !link) return;

        try {
            const res = await callBackend("/student/profile/social/"+ selectedSocialPlatform.id + "?link=" + link, "POST");
            if(!res.success) {
                throw new Error("Failed to add social link");
            }
            dispatch(updateSocials([...socials, res.data]));
            setSelectedSocialPlatform(null);
            setLink("");
        }
        catch (error) {
            console.error("Error adding social link:", error);
        }
    }

    useEffect(()=>{
        fetchAvailableSocials();
    }, [])

    const handleCancel = () => {
        setEdit(false);
        setEditingId(null);
        setEditingLink("");
    }

    const handleUpdateSocial = async (socialId: number) => {
        if(!editingLink.trim()) return;

        try {
            setIsUpdating(true);
            const res = await callBackend("/student/profile/social/" + socialId + "?link=" + editingLink, "PUT");
            if(!res.success) {
                throw new Error("Failed to update social link");
            }
            const updatedSocials = socials.map(s => 
                s.id === socialId ? { ...s, link: editingLink } : s
            );

            dispatch(updateSocials(updatedSocials));
            setEditingId(null);
            setEditingLink("");
        }
        catch (error) {
            console.error("Error updating social link:", error);
        } finally {
            setIsUpdating(false);
        }
    }

    const handleDeleteSocial = async (socialId: number) => {
        try {
            const res = await callBackend("/student/profile/social/" + socialId, "DELETE");
            if(!res.success) {
                throw new Error("Failed to delete social link");
            }
            const updatedSocials = socials.filter(s => s.id !== socialId);
            dispatch(updateSocials(updatedSocials));
        }
        catch (error) {
            console.error("Error deleting social link:", error);
        }
    }

  return (
    <Card className="flex flex-col justify-between gap-4 p-6 border border-neutral-300 dark:border-neutral-600 overflow-visible">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
                Network
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
        <div className="flex flex-wrap gap-3">
            {socials.map((social) => (
             !edit ? 
                <Link
                    key={social.id}
                    href={social.link}
                    target="_blank"
                >
                    <Tag className="flex gap-2"  >
                        <p>{social.socialMediaPlatform.name}</p>
                        <ExternalLink className="w-4 h-4 ml-1" />
                    </Tag>
                </Link>
            :
                <div key={social.id} className="flex gap-2 items-center">
                    {editingId === social.id ? (
                        <>
                            <Input 
                                value={editingLink} 
                                onChange={(e) => setEditingLink(e.target.value)} 
                                className="mt-0" 
                                placeholder="Profile Link..."  
                            />
                            <Button 
                                onClick={() => handleUpdateSocial(social.id)} 
                                disabled={isUpdating}
                                className="px-4" 
                            >
                                {isUpdating ? "Saving..." : "Save"}
                            </Button>
                            <Button 
                                onClick={() => {
                                    setEditingId(null);
                                    setEditingLink("");
                                }}
                                variant="outline"
                                className="px-4" 
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Input value={social.link} onChange={(e) => {}} />
                            <Button 
                                onClick={() => {
                                    setEditingId(social.id);
                                    setEditingLink(social.link);
                                }} 
                                variant="outline"
                                className="px-4" 
                            >
                                Edit
                            </Button>
                            <Button onClick={() => handleDeleteSocial(social.id)} variant="secondary" className="px-4" >Delete</Button>
                        </>
                    )}
                </div>
            ))}
            {
                edit &&  <div className="flex gap-2">
                    <DropDownmenu 
                        optoins={availableSocials.filter(s => !socials.find(social => social.socialMediaPlatform.id === s.id)).map(s => ({label: s.name, value: s.id}))}
                        onSelect={(value)=> setSelectedSocialPlatform(availableSocials.find(s => s.id === value) || null)}
                        placeholder="+ Add Social"
                        isSearchable={true}
                        className="w-full bg-neutral-700"
                        listClassName="h-20"
                        selectedValue={null}
                    />
                    <Input value={link} onChange={(e) => setLink(e.target.value)} className="mt-0" placeholder="Profile Link..."  />
                    <Button onClick={()=> handleAddSocial()}  className="px-4" >Add</Button>
                </div>
            }
        </div>
    </Card>
  )
}

export default Socials