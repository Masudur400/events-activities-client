export const dynamic = 'force-dynamic';
import Profile from '@/components/public/Profile';
import { getUserInfo } from '@/services/auth/getUserInfo'; 

const HostProfilePage = async () => {
    const { user } = await getUserInfo();
    return (
        <div> 
           <Profile user={user}></Profile>
        </div>
    );
};

export default HostProfilePage;