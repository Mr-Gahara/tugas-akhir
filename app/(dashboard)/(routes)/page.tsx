import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <p>this is a protected page</p>
      <UserButton />
    </>
  );
}
