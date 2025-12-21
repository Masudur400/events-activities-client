export const dynamic = 'force-dynamic';
import Profile from '@/components/public/Profile';
import { getUserInfo } from '@/services/auth/getUserInfo';
import React from 'react';

const UserProfilePage = async () => {
    const { user } = await getUserInfo();
    return (
        <div>
           <Profile user={user}></Profile>
        </div>
    );
};

export default UserProfilePage;