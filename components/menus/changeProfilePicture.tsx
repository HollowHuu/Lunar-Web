import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect, ChangeEvent } from 'react'
import Link from 'next/link'

export default function ChangePofilePicture() {
    const { data: session, status } = useSession()
    const [image, setImage] = useState(new File([], ''));

    function getBase64(e: File) {
        return new Promise ((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target?.result);
            }

            reader.onerror = (err) => {
                reject(err);
            }

            reader.readAsDataURL(e);
        })
    }

    const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        setImage(e.target.files[0]);
      };

      useEffect(() => {
        async function sendImage() {
            if(!image) return;
            if(!image.name) return;

            // Make a buffer to send to the server
            const buffer = await getBase64(image);
            
            // TODO - Send the image to the server, and save it to the user's account.
            fetch('/api/account/banner', {
                method: 'POST',
                body: JSON.stringify({
                    image: buffer
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
          });
        }
        sendImage();
      }, [image])

    if(status == 'loading') return (
        <div>
            Loading...
        </div>
    )

    if(status == 'unauthenticated') return (
        <div className='mx-auto text-center'>
        <h1>Access Denied<br />You must be signed in to view this page</h1>
        <br />
        <p>
            <Link
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                href="/api/auth/signin"
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}
            >
                Sign In
            </Link>
        </p>
      </div>
    )
    return (
        <div>
            <div className="text-center text-[1.5rem] pb-[1rem] border-b-2 border-b-slate-300 mb-[1rem]">Change Profile Picture (NOT WORKING)</div>
            <form className="box-border outline-0" action="">
                <div className="grid grid-cols-4 gap-[1rem] mb-[1rem] items-center">
                    <label className="text-right pr-[1rem]" htmlFor="currentBanner">Current Banner</label>
                    <img src={session?.user.image || '/images/default-banner.jpg'} alt="Current Banner" />
                </div>
                <div className="grid grid-cols-4 gap-[1rem] mb-[1rem] items-center">
                        {/* Image upload */}
                        <label className="text-right pr-[1rem]" htmlFor="newBanner">New Banner</label>
                        <input type="file" accept='image/png, image/jpeg' onChange={changeImage} />
                </div>
            </form>
        </div>
    )
}