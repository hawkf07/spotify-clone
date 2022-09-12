import { signIn, useSession ,signOut} from "next-auth/react"


const Navbar = () => {
  const {data,status} = useSession()

  return (
    <>
    
    <nav className="flex dark:text-white justify-between mobile:justify-between w-full items-center p-5 mobile:p-3  bg-primary-400 h-navbar">
      <header className="text-2xl mobile:text-md mobile:text-white">
        <h1>LOGO</h1>
      </header>
      <ul className="w-5/12 justify-around gap-3 flex items-center">
       {data ? <li onClick={()=> signIn()}><a href="#">Log In</a></li> : <li onClick={()=> signOut()}><a href="#">Log out</a></li>} 
       <li><a href="#">About Us</a></li>
       <li><a href="#">Status</a></li>
      </ul>

    </nav>
    </>
  )
}

export {Navbar}