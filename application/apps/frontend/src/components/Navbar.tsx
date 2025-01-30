import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-10">
      <div className="px-6 py-6 h-20">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold text-gray-800">
            Team Pookies 🎀
          </div>
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-lg font-semibold text-gray-800">
              Home
            </Link>
            <Link href="/" className="text-lg font-semibold text-gray-800">
              Features
            </Link>
            <Link href="/" className="text-lg font-semibold text-gray-800">
              About Us
            </Link>
            <Link href="/" className="text-lg font-semibold text-gray-800">
              Contact Us
            </Link>
            <div className="flex gap-4 items-center">
              <button className="text-lg text-gray-800 rounded-full border border-gray-800 px-4 py-1.5">
                Sign In
              </button>
              <button className="text-lg text-white bg-gray-900 rounded-full border border-gray-800 px-4 py-1.5 flex items-center group">
                Sign Up
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
