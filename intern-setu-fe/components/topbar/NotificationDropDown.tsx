import Link from "next/link"
import Card from "../ui/Card"
import { timeAgo } from "@/lib/utils/dateFormat"


const NotificationDropDown = ({NotificationDropDownOpen, NotificationDropDownRef}: {NotificationDropDownOpen: boolean, NotificationDropDownRef: React.RefObject<HTMLDivElement | null>}) => {

  const notificications = [
    {id: 1, message: "Your application has been approved.", read: false, link: "/applications/1", avatar: "M", timeStamp: "2025-12-17T16:20:30Z"}, 
    {id: 2, message: "New internship opportunities available.", read: true, link: "/internships", avatar: "I", timeStamp: "2025-12-17T16:20:30Z"},
    {id: 3, message: "Reminder: Interview scheduled for tomorrow.", read: false, link: "/interviews/1", avatar: "R", timeStamp: "2025-12-17T16:20:30Z"},
  ]


  return (
    <Card 
        ref={NotificationDropDownRef}
        className={`
            absolute right-0 mt-2 w-80
            bg-neutral-200 
            dark:bg-neutral-800
            ${NotificationDropDownOpen ? 'block' : 'hidden'}
        `}
    >
      <h1 className="p-2 text-lg font-semibold" >Notifications</h1>
      <div className="w-full border-t border-neutral-400 dark:border-neutral-500"></div>
      <div>
        {notificications.map((notification, index) => (
          <Link 
            href={notification.link} 
            key={notification.id} 
            className={`flex gap-2 items-center justify-between p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 `}
          >
            <div className="flex gap-2">
              <div 
              className="bg-sky-700 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                {notification.avatar}
              </div>
              <div className="flex flex-col flex-1">
                <div className="text-sm">{notification.message}</div>
                <div className="text-sm text-neutral-500">{timeAgo(notification.timeStamp)}</div>
              </div>
            </div>
            <div>
              {!notification.read && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}

export default NotificationDropDown