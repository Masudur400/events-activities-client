import Footer from '@/components/shared/Footer/Footer';  
import NavBar from '@/components/shared/NavBar/NavBar';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className='h-20'>  
                <NavBar></NavBar>
            </div>
            <div className="min-h-[calc(100vh-250px)]">
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default PublicLayout;