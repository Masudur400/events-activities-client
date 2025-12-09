import Footer from '@/components/shared/Footer/Footer';
import Link from 'next/link';
import React from 'react';

const PublicLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div> 
            <div className='flex gap-3 bg-linear-to-br from-yellow-900/5 via-yellow-800/70 to-yellow-900/5 p-5'>
                <Link href='/'>Home</Link>
                <Link href='/event'>event</Link>
                <Link href='/about'>about</Link>
                <Link href='/service'>service</Link>
                <Link href='/contact'>contact</Link>
            </div>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default PublicLayout;