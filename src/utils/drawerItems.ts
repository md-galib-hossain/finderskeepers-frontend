import { USER_ROLE } from "@/constants/role";
import { TDrawerItem, TUserRole } from "@/types";
//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TryIcon from '@mui/icons-material/Try';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export const drawerItems = (role : TUserRole) : TDrawerItem[]=>{



const roleMenus : TDrawerItem[] = []
const defaultMenus = [
    {
       title: 'Profile',
       path: `${role}/profile`,
       icon: PersonIcon,
    },
    {
       title: 'Change Password',
       path: `change-password`,
       icon: KeyIcon,
    },
 ];

switch(role){
    case USER_ROLE.SUPER_ADMIN: 
        roleMenus.push({
            title : "Dashboard",
            path: `${role}`,
            icon : DashboardIcon,
        },
        {
            title : "Manage Users",
            path: `${role}/manage-users`,
            icon : GroupIcon,
        },)
        break;
        
        case USER_ROLE.ADMIN:
            roleMenus.push(
               {
                  title: 'Dashboard',
                  path: `${role}`,
                  icon: DashboardIcon,
               },
               {
                  title: 'Users',
                  path: `${role}/users`,
                  icon: TryIcon,
               },
               {
                  title: 'Lost Items',
                  path: `${role}/lost-items`,
                  icon: MedicalInformationIcon,
               },
               {
                  title: 'Found Items',
                  path: `${role}/found-items`,
                  icon: CalendarMonthIcon,
               },
               {
                  title: 'Claims',
                  path: `${role}/claims`,
                  icon: BookOnlineIcon,
               },
               {
                  title: 'Item Categories',
                  path: `${role}/item-categories`,
                  icon: ReviewsIcon,
               }
            );
            break;
   
         case USER_ROLE.USER:
            roleMenus.push(
               {
                  title: 'Dashboard',
                  path: `${role}`,
                  icon: DashboardIcon,
               },
               {
                  title: 'Lost Items',
                  path: `${role}/lostitems`,
                  icon: CalendarMonthIcon,
               },
               {
                  title: 'Found Items',
                  path: `${role}/founditems`,
                  icon: BookOnlineIcon,
               },
             
               
            );
            break;
   
   
         default:
            break;
}
return [...roleMenus, ...defaultMenus];
}