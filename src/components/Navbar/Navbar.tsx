import { signIn, useSession, signOut } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import {useNavbarStore} from '../../utils/useEventStore'
interface NavListInterface {
  navbarIsOpen?:boolean,
}

const NavList : FC<NavListInterface> = () => {
  const {data,status} = useSession()
  const meData = trpc.useQuery(["spotify.me"])
  return (
    <>

      <ul  className="w-full mobile:w-full text-gray-200 justify-around gap-5   flex items-center mobile:flex-col  bg-primary-400  mobile:child:p-3">
        {!data ? (
          <li className="mobile:w-full hover:bg-blue-600 text-center rounded cursor-pointer"  onClick={() => signIn()}>
            <a href="#">Log In</a>
          </li>
        ) : (
          <li className="mobile:w-full hover:bg-blue-600 text-center rounded cursor-pointer" onClick={() => signOut()}>
            <a href="#">Log out</a>
          </li>
        )}
        <li className="mobile:w-full hover:bg-blue-600 text-center rounded cursor-pointer">
          <a href="#">About Us</a>
        </li>
        <li className="mobile:w-full hover:bg-blue-600 text-center rounded cursor-pointer">
          <a href="#">Status</a>
        </li>
        <li className="mobile:w-full uppercase mobile:hidden hover:bg-blue-600 text-center rounded cursor-pointer">
          <a href="#">{ data&& meData.data?.display_name}</a>
        </li>
        
      </ul>
    </>
  );
};

const Navbar = () => {
  const { data, status } = useSession();
  const {navbarIsOpen,navbarTogglerhandler} = useNavbarStore()
  return (
    <>
      <nav className="flex dark:text-white justify-between mobile:justify-between w-full items-center p-7 mobile:p-3  bg-primary-400 h-navbar">
        <header className="text-2xl mobile:text-md mobile:text-white">
          <a href="#">
            <h1>LOGO</h1>{" "}
          </a>
        </header>
        <div className="mobile:hidden">
        <NavList navbarIsOpen={navbarIsOpen} />
        </div>
        <div className="hidden mobile:flex items-center">
          <p className="cursor-pointer">{data?.user?.name}</p>
        <button className="mobile:block hidden p-1 px-3 rounded " onClick={() => navbarTogglerhandler()} >=</button>
        </div>
        
      </nav>
      {navbarIsOpen && <NavList/>}
    </>
  );
};

export { Navbar };
