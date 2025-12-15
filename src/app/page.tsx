import { Header } from "./components/Header";
import Navbar from "./components/Navbar";
import Services from "./components/Services";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-center">
      <Navbar />
      <Header />
      <Services />
    </main>
  );
}
