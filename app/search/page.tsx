"use client";

import React, { useState, useEffect, useRef, ChangeEvent, ReactHTMLElement } from "react";

interface User {
  name: string;
  image: string;
  banner: string;
}



const filterUsers = (users: User[], search: string) => {
    let filteredUsers: User[] = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

    // Cut at 50 results
    if(filteredUsers.length > 50) {
        filteredUsers = filteredUsers.slice(0, 50);
    }
    return filteredUsers;
}

const sortedUsers = (users: User[], search: string) => {

    users.sort((a, b) => {
        const aName = a.name.toLowerCase().indexOf(search.toLowerCase());
        const bName = b.name.toLowerCase().indexOf(search.toLowerCase());

        if(aName < bName) return -1;
        if(aName > bName) return 1;
        return 0;
    });
    
    return users;
}

export default function Search() {
  const [result, setResult] = useState([<></>]);
  const [search, setSearch] = useState("");        

  useEffect(() => {
    if (search != "") {
      fetch("/api/users", {
        headers: {
          "name": search,
        }
      })
        .then((res) => res.json())
        .then((data) => {
            let html: React.JSX.Element[] = [];
            let users: User[] = data;
            // users = filterUsers(users, search);
            users = sortedUsers(users, search);

            for(let i = 0; i < users.length; i++) {

                const style = {
                    '--image-url': `url(${users[i].banner})`
                } as React.CSSProperties;

                html.push(
                    <>
                        <div style={style} className="text-center items-center mb-[10px] p-[10px] rounded-md border-2 border-[#ccc] w-[480px] bg-[image:var(--image-url)] bg-cover">
                            <p className="m-0 text-[2rem] font-[600] [text-shadow:_2px_2px_2px_rgb(0_0_0_/_50%)]">
                                {users[i].name}
                            </p>
                            <img
                                className="rounded-full m-auto"
                                src={users[i].image}
                                alt="Profile picture"
                            />
                        </div>
                    </>
                )
            }
            setResult(html);
        });
    }
  }, [search]);

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center h-full">
      <div className="mt-5">
        <div>
          <input
            className="w-[500px] h-[50px] border-2 border-[#ccc] rounded-lg text-center outline-none text-slate-900 placeholder:text-slate-600 focus:border-slate-700"
            type="text"
            placeholder="Search"
            onChange={changeSearch}
          />
          <div>
            <i></i>
          </div>
        </div>

        {/* Search results */}
        <div className="w-full w-[500px] mt-[20px]">{result}</div>
      </div>
    </div>
  );
}
