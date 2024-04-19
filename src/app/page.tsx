import Image from "next/image";
import HomepageCard from "./components/HomepageCard";

export default function Home() {
  return (
    <main className='flex p-10'>
      <div>
      <HomepageCard/>
      </div>
    </main>
  );
}
