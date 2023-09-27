// components
import { useSession } from "next-auth/react";
import Header from "~/components/Header";
import MainContent from "~/sections/MainContent";

export default function Index() {
  const { data: session } = useSession();

  return (
    <>
      <Header session={session}></Header>
      <main></main>
    </>
  );
}
