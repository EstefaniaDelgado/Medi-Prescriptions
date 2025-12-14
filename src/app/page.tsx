import { Header } from './components/Header';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-center">
      <Navbar/>
      <Header />
    </main>
  );
}
