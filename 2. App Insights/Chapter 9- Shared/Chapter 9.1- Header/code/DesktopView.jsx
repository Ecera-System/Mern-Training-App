import { useContext, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import { contextProvider } from '../../../Context/ContextProvider';
import HeaderProfile from './HeaderProfile';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';

const DesktopView = ({ profile }) => {
    const { isLoggedIn } = useContext(contextProvider);

    return (
        <ul className='list-none hidden lg:flex items-center justify-between gap-10 text-lg font-normal'>
            {
                profile ? <>
                    <li></li>
                </> : <>
                    <li className='relative group/program'>
                        <div
                            // to='/programs'
                            className='py-2 group-hover/program:text-violet-600 duration-300 relative hover-border flex items-center gap-1'
                        >
                            Programs <RiArrowDownSLine className='text-xl' />
                        </div>

                        <ul className={`w-max max-w-md py-4 list-none absolute top-12 left-0 scale-x-100 scale-y-0 group-hover/program:scale-y-100 duration-300 origin-top rounded-lg bg-white overflow-hidden shadow-[0_1px_5px_0_rgb(0,0,0,0.2)] text-gray-600`}>
                            <li className='w-full'>
                                <NavLink
                                    to='/programs/mern-stack-web-development'
                                    className='block w-full h-auto py-3 px-8 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300'
                                    end
                                >
                                    MERN Stack Web Development
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink
                            to='/projects'
                            className='py-2 hover:text-violet-600 duration-300 relative hover-border'
                        >
                            Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/placements'
                            className='py-2 hover:text-violet-600 duration-300 relative hover-border'
                        >
                            Placements
                        </NavLink>
                    </li>
                </>
            }
            {
                isLoggedIn ?
                    <HeaderProfile />
                    :
                    <li className='flex items-center justify-between gap-5'>
                        <Link
                            to={'/sign-in'}
                            className='text-base font-medium py-1.5 px-6 bg-transparent hover:bg-violet-600 duration-300 text-white-600 hover:text-white border-2 border-violet-600 rounded-full'
                        >
                            Sign in
                        </Link>

                        <Link
                            to={'/sign-up'}
                            className='text-base font-medium py-1.5 px-6 bg-transparent hover:bg-violet-600 duration-300 text-white-600 hover:text-white border-2 border-violet-600 rounded-full'
                        >
                            Sign up
                        </Link>
                        
                    </li>

            }
        </ul >
    );
};

export default DesktopView;