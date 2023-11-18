import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { VscClose } from 'react-icons/vsc';
import DesktopView from './DesktopView';
import MobileView from './MobileView';

const Header = ({ profile, textColor = 'text-gray-600' }) => {
    const [scroll, setScroll] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    // <!-- Navbar Scroll Effect -->
    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 48) {
            setScroll(true);
        }
        else {
            setScroll(false);
        }
    });

    return (
        <header className={`w-full h-[76px]`}>
            <nav
                className={`w-full ${scroll ? 'fixed top-0 left-0 right-0 backdrop-blur-sm bg-white/70 z-40 shadow' : `bg-transparent ${textColor} relative z-40`}`}
            >
    <div className='2xl:w-[1280px] xl:w-full mx-auto flex items-center justify-between 2xl:px-0 lg:px-14 sm:px-6 px-3 py-2'>

                    {/* <== == == == Right Logo == == == ==> */}
                    <div>
                        <Link to={'/'}>
                            <img
                                className='w-14 h-14'
                                src="/images/ecera-system-logo.png"
                                alt="ecera-system-logo"
                            />
                        </Link>
                    </div>

                    {/* <== == == == Left Menu items == == == ==> */}
                    {/* <!-- Desktop view --> */}
                    <DesktopView profile={profile} />

                    {/* <!-- Mobile view --> */}
                    <div className='lg:hidden relative grid place-items-center'>
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className='w-10 h-10 relative'
                        >
                            <VscClose
                                className={`absolute inset-0 text-[40px] leading-none duration-300 ${openMenu ? 'opacity-100 visible rotate-0' : 'opacity-0 invisible rotate-90'}`}
                            />
                            <HiBars3CenterLeft
                                className={`absolute inset-0 text-[40px] leading-none duration-300 ${openMenu ? 'opacity-0 invisible rotate-90' : 'opacity-100 visible rotate-0'}`}
                            />
                        </button>

                        <MobileView
                            openMenu={openMenu}
                            setOpenMenu={setOpenMenu}
                        />
                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Header;