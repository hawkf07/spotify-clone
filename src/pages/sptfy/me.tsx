import axios from "axios";
import { trpc } from "../../utils/trpc";

import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";




export default function Me() {
  const dataMe = trpc.useQuery(["spotify.me"]);
  const userPlaylist = trpc.useQuery(["spotify.user-playlist"]);
  const currentPlayback = trpc.useQuery(['spotify.get-current-playlist'],{
    refetchInterval:500
  })
  const toNearestNumber = (num:number) => Math.floor(num) 

  console.log(userPlaylist.data);
  console.log(dataMe.data?.images);
  return (
    <>
      <Head>
        <title>Profile Info</title>
      </Head>
      <main className="flex dark:bg-gray-800 dark:text-gray-200  flex-col h-[100vh]  items-center justify-center">
        <figure className="">
          <Image
            src={dataMe.data?.images[0].url || ""}
            className="rounded-lg"
            alt="user profile picture"
            height="240"
            width="240"
          />
        </figure>
        <header className="text-5xl uppercase">
          <h1>
            {dataMe.data?.display_name}  | {dataMe.data?.country}
            
          </h1>
        </header>
        <section>
          <header>
            <h1>User Playlist</h1>
          </header>
          <div className="flex ">
            <article>
              {userPlaylist.data?.items.map(item => {
                return (
                  <>
                  <li> Name :{item.name} </li>
                  </>
                )
              })}
            </article>
          </div>
          <div>
            <p>Currently Playing {currentPlayback.data?.item?.name} </p>
            <p> duration {(toNearestNumber(currentPlayback.data?.progress_ms / 1000) /60).toFixed(2) }-{((currentPlayback.data?.item?.duration_ms / 1000)/60).toFixed(2)}  </p>
          </div>
        </section>
      </main>
    </>
  );
}
