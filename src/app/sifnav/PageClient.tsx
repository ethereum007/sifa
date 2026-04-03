"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavTable from "@/components/NavTable";



const Nav = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <NavTable />
      </main>
      <Footer />
    </div>
  );
};

export default Nav;
