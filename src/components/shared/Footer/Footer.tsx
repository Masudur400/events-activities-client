import Image from 'next/image'; 
import logo from '../../../../public/images/event.logo-2.png'

const Footer = () => {
    return (
        <div>
            <footer className="w-full border-t mt-10 bg-white dark:bg-neutral-900 dark:border-neutral-700 border-neutral-200 px-5">
                <div className="container mx-auto px-5 py-10 grid md:grid-cols-2 gap-10">
                   <div className='space-y-5'>
                     {/* Logo & About */}
                    <div className=''>
                        <div className="flex items-center gap-2 mb-4"> 
                            <Image 
                            alt='image' 
                            src={logo} 
                            className='w-16'
                            />
                            <span className="text-lg font-bold text-yellow-700/90">
                               <p>
                                 EVENT &<br />
                                ENTERTAINMENT
                               </p>
                                
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Discover and join amazing events & activities around you.
                        </p>
                    </div>


                    {/* Links */}
                    <div className=''>
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quick Links</h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                            <li className="hover:text-yellow-500 cursor-pointer w-fit">Home</li>
                            <li className="hover:text-yellow-500 cursor-pointer w-fit">Events</li>
                            <li className="hover:text-yellow-500 cursor-pointer w-fit">Activities</li>
                            <li className="hover:text-yellow-500 cursor-pointer w-fit">Dashboard</li>
                        </ul>
                    </div>
                   </div>


                    <div className='space-y-5'>
                        {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Support</h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                            <li className="hover:text-yellow-500 cursor-pointer w-fit">FAQ</li>
                            <li className="hover:text-yellow-500 cursor-pointer w-fit">Contact Us</li>
                            <li className="hover:text-yellow-500 cursor-pointer w-fit">Privacy Policy</li>
                            <li className="hover:text-yellow-500 cursor-pointer w-fit">Terms & Conditions</li>
                        </ul>
                    </div>


                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Stay Updated</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Subscribe to receive latest updates.
                        </p>
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-[80%] px-3 py-2 rounded-lg border dark:border-neutral-700 border-neutral-300 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-200 text-sm focus:outline-none"
                            />
                            <button className="px-4 py-2 font-medium rounded-lg bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50 text-sm cursor-pointer">
                                Join
                            </button>
                        </div>
                    </div>
                    </div>
                </div>


                <div className="border-t border-neutral-200 dark:border-neutral-700 py-4 text-center text-sm ark:text-gray-400 text-yellow-700/90 font-medium">
                    © {new Date().getFullYear()} Event&Entertainment — All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;