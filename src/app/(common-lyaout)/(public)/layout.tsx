import Footer from '@/components/shared/Footer/Footer';  
import NavBar from '@/components/shared/NavBar/NavBar';
import { getUserInfo } from '@/services/auth/getUserInfo';
import React from 'react';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const { user } = await getUserInfo(); 
    return (
        <div>
            <div className='h-20'>  
                <NavBar user={user}></NavBar>
            </div>
            <div className="min-h-[calc(100vh-250px)]">
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default PublicLayout;