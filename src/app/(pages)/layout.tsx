import Footer from "../components/navbar/footer";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/navbar/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen ml-64 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
