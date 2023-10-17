'use client';

import React, { useState, useEffect } from 'react'

export default function Header() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted) return null;
    return (
        <div className="flex items-center h-[60px] text-right m-0 right-0 left-0 top-0 font-medium">
            <img className='mr-[16px]' src="https://cdn.discordapp.com/attachments/774650675593609268/1136331735265722408/Bot_logo_witout_back.png" alt="logo" width="40" />
            <a href="/">Lunar App</a>
            <div className="flex-auto text-center justify-evenly text-lg">
                <a href="/profile" className="pr-5 ">
                    <span className=''>Profile</span>
                    {/* <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg> */}
                </a>

                <a href="/search" className='pr-5'>
                    <span>Search</span>
                    {/* <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg> */}
                </a>
            </div>
            <div className="relative inline-block text-white ">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path d="M1510 2865 l0 -245 1410 0 1410 0 0 245 0 245 -1410 0 -1410 0 0-245z"/><path d="M1510 2005 l0 -245 1410 0 1410 0 0 245 0 245 -1410 0 -1410 0 0-245z"/><path d="M1510 1115 l0 -245 1410 0 1410 0 0 245 0 245 -1410 0 -1410 0 0-245z"/></g></svg>
                {/* Insert dropdown on hover */}
            </div>
        </div>
    )
}