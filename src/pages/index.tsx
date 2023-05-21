import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { NextPage, NextPageContext } from "next";

// localhost:3000/api/auth/signin
// localhost:3000/api/auth/signout
export default function Home() {
  const { data: session } = useSession();
  console.log('client side session->', session);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        {session ? (
            <div className="flex flex-col gap-1 items-center">
              <h2>{session?.user?.name}</h2>

              <img
                  src={session?.user?.image!}
                  alt=""
                  className="w-32 h-32 rounded-full"
              />

              <h4>{session?.user?.email}</h4>

              <button onClick={() => signOut()}>SIGN OUT</button>
            </div>
        ) : (
            <button onClick={() => signIn()}>SIGN IN</button>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  console.log('getServerSideProps session', session);

  return {
    props: {
      session
    },
  };
}
