import Profile from '@/components/public/Profile';
import { getUserInfo } from '@/services/auth/getUserInfo';
import React from 'react';

const AdminProfilePage = async () => {
    const { user } = await getUserInfo();
    return (
        <div>
           <Profile user={user}></Profile>
        </div>
    );
};

export default AdminProfilePage;