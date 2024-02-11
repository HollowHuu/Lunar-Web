'use client';
import Image from 'next/image';

export default function Link() {
    return (
<div>
        <div className='min-h-screen'>
            <div className='text-center my-5'>
                <h1 className='text-2xl'>A guide on linking your Valorant account to your Discord</h1>
                <p className=''>To use Lunar, you need to link your Discord account to your Valorant account.</p>
                <p className=''>You can do this by going to the <a href="/settings" className='text-indigo-400'>Settings</a> page and clicking the <code>Add Valorant Account</code> button after logging in.</p>
                <p>Images detailing the process can be found below</p>

                <h1 className='text-2xl mt-10'>Step 1</h1>
                <p>Click &quot;Login&quot; in the top right.</p>
                <Image src='https://cdn.discordapp.com/attachments/1150358954564669512/1206358778350665758/image.png?ex=65dbb829&is=65c94329&hm=82053effc4c7df38e6cae1055caed81d763bfe31a286b613baeb696e4850a366&' alt='image' height={500} width={500} className='mx-auto'/>
                
                <h1 className='text-2xl mt-10'>Step 2</h1>
                <p>Sign in with your Discord account</p>
                <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1143120112019312650/image.png' alt='image' height={500} width={500} className='mx-auto'/>
                
                <h1 className='text-2xl mt-10'>Step 3</h1>
                <p>Click Authorize</p>
                <Image src='https://cdn.discordapp.com/attachments/1150358954564669512/1206359283776749668/image.png?ex=65dbb8a2&is=65c943a2&hm=235c6cceda53e660b6e2c38df2b54b51a2cf9c0d449c68dd1dd49b732fe29351&' alt='image' height={500} width={500} className='mx-auto'/>

                <h1 className='text-2xl mt-10'>Step 4</h1>
                <p>Go to <a href="/settings" className='text-blue-500'>settings</a></p>
                <Image src='https://cdn.discordapp.com/attachments/1150358954564669512/1206359574492479508/image.png?ex=65dbb8e7&is=65c943e7&hm=1446082ddb5d7d3ab71ba816e349c2852765bc9f40f152b42a45fbe40d72c136&' alt='image' height={500} width={500} className='mx-auto'/>

                <h1 className='text-2xl mt-10'>Step 5</h1>
                <p>Click &quot;Connect Accoaunt&quot;</p>
                <Image src='https://cdn.discordapp.com/attachments/1150358954564669512/1206359717853794384/image.png?ex=65dbb909&is=65c94409&hm=becdf7f7762508995784743f27eda269159683216e5d43423749b0d66f22d538&' alt='image' height={500} width={500} className='mx-auto'/>

                <h1 className='text-2xl mt-10'>Step 6</h1>
                <p>Enter your username and tagline, then click OK</p>
                <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1143115184618078208/image.png' alt='image' height={500} width={500} className='mx-auto'/>

                <h1 className='text-2xl mt-10'>Step 6</h1>
                <p>Success! Now it should refresh and show you a long ID. If not make sure you entered the right account and you&apos;re playing on European servers.</p>
                <Image src='https://cdn.discordapp.com/attachments/1150358954564669512/1206359777651851264/image.png?ex=65dbb918&is=65c94418&hm=5d89cd92f9da7d519cbf5bc7e447f3dbdb8f3e795ffc946b51c7433dba41954a&' alt='image' height={500} width={500} className='mx-auto'/>
            </div>

        </div>
    </div>
    )
}
