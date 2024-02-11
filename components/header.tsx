'use client';

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import HeaderDropdown from './header-dropdown';
import Image from 'next/image'

export default function Header() {

    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    // if(!mounted) return null;
    return (
        <div className="flex items-center h-[60px] text-right m-0 right-0 left-0 top-0 font-medium">
            <Image className='mr-[16px]' src="https://cdn.discordapp.com/attachments/1150358954564669512/1206328373450645554/06d02db78b778e7503a47b5d03ca60c9.png?ex=65db9bd8&is=65c926d8&hm=d29242446c888920a71c5ae9a09a3d4b326c2b65d9697cb0bc2816918e148f98&" alt="logo" height={40} width={40} />
            <a href="/">Luna Web</a>
            <div className="flex-auto text-center justify-evenly text-lg">
                <a href="/profile" className="p-5 ">
                    <span className=''>Profile</span>
                    {/* <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg> */}
                </a>

                <a href="/search" className='p-5'>
                    <span>Search</span>
                    {/* <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg> */}
                </a>
            </div>

            { /* TODO - Find a better way to do icons */}
            <div className="relative inline-block text-white ">
                <Image src="./menu.svg" alt="" onClick={toggleMenu} height={60} width={60} />
                {isMenuOpen && (
                    <HeaderDropdown></HeaderDropdown>
                )}
            </div>
        </div>
    )
}