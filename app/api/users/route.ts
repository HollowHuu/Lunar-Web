import type { NextApiRequest, NextApiResponse } from 'next';
import { headers } from 'next/headers'
import { NextResponse } from 'next/server';

type ResponseData = {
    name: string;
    avatar: string;
    banner: string;
}[];

const users: ResponseData = [
    { name: 'HollowHuu',  banner: 'https://cdn.discordapp.com/banners/605442511997108224/44a7941815510b51e8b4fef0dbe5284f.png?size=480', avatar: 'https://cdn.discordapp.com/avatars/605442511997108224/eba8032b39c996e37c22946db5ecad29.webp' },
    { name: 'idontdothis4fun', banner: '', avatar: 'https://cdn.discordapp.com/avatars/593436987911045140/0ef3b108a288a569a4fb1b1649940801.webp'},
    { name: 'TrickFire', banner: '', avatar: 'https://cdn.discordapp.com/avatars/326996761908609024/b257c2333231c8739bac0bcf2a9f54fe.webp'},
    {name: "Alice Smith", banner: "https://cdn.discordapp.com/banners/605442511997108224/182dcae400d302686499aeeda2c5c42a.png?size=480", avatar: "https://cdn.discordapp.com/avatars/605442511997108224/eaf657c5aa4f03c13b809d133b4bfbed.webp"},
    {name: "Ethan Johnson", banner: "https://cdn.discordapp.com/banners/605442511997108224/182dcae400d302686499aeeda2c5c42a.png?size=480", avatar: "https://cdn.discordapp.com/avatars/605442511997108224/eaf657c5aa4f03c13b809d133b4bfbed.webp"},
    {name: "John Doe", banner: "https://cdn.discordapp.com/banners/605442511997108224/182dcae400d302686499aeeda2c5c42a.png?size=480", avatar: "https://cdn.discordapp.com/avatars/605442511997108224/eaf657c5aa4f03c13b809d133b4bfbed.webp"},
    {name: "Sarah Brown", banner: "https://cdn.discordapp.com/banners/605442511997108224/182dcae400d302686499aeeda2c5c42a.png?size=480", avatar: "https://cdn.discordapp.com/avatars/605442511997108224/eaf657c5aa4f03c13b809d133b4bfbed.webp"},
    {name: "Michael Lee", banner: "https://cdn.discordapp.com/banners/1150233221255151696/1d97831e75be8e41c964505092db2fcf.png?size=480", avatar: "https://cdn.discordapp.com/avatars/605442511997108224/eaf657c5aa4f03c13b809d133b4bfbed.webp"},        
]


export function GET() {
    const headerList = headers()

    const name = headerList.get('name')
    console.log({name})
    if(!name) return Response.json({error: 'No name provided'})

    let selectedUsers = users.filter(user => user.name.toLowerCase().includes(name.toString().toLowerCase()));
    return Response.json(selectedUsers);
}