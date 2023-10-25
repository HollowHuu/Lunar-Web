'use client';
import { useState, useEffect } from "react";

import ChangeBanner from "@/components/menus/changeBanner";
import ChangeUsername from "@/components/menus/changeUsername";

export default function Settings() {
    const [menu, setMenu] = useState("connections")

    return (
        <div className="min-h-screen box-border mt-[2rem] mx-[1.5rem]">
            <div className="box-border grid grid-cols-3 gap-[1rem] mb-[1rem]">
                <button className="block p-[.5rem] border-solid border-white border-2 rounded-lg hover:bg-purple-400" onClick={e => setMenu('connections')}>Connections</button>
                <button className="block p-[.5rem] border-solid border-white border-2 rounded-lg hover:bg-purple-400" onClick={e => setMenu('change-banner')}>Change Banner</button>
                <button className="block p-[.5rem] border-solid border-white border-2 rounded-lg hover:bg-purple-400" onClick={e => setMenu('change-username')}>Change Username</button> 
            </div>
            <div className="p-[1.5rem] border-2 rounded-lg">
                {menu == 'connections' && (
                    <p>Test</p>
                )}
                {menu == 'change-banner' && (
                    <ChangeBanner />
                )}
                {menu == 'change-username' && (
                    <ChangeUsername />
                )}
            </div>
        </div>
    )
}