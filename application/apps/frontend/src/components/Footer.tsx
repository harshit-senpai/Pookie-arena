import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#F29F7A] h-[50vh]">
      <div className="px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 ">
          <div className="text-4xl font-semibold text-gray-900">
            Team Pookies 🎀
          </div>
          <div className="text-lg font-normal text-gray-700 max-w-lg ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </div>
          <div className="flex flex-col gap-4 ml-10">
            <p className="font-semibold text-lg text-gray-950">Services</p>
            <p className="font-normal text-lg text-gray-700">Emails</p>
            <p className="font-normal text-lg text-gray-700">Ai Dost</p>
          </div>
          <div className="flex flex-col gap-4 ml-10">
            <p className="font-semibold text-lg text-gray-950">About</p>
            <p className="font-normal text-lg text-gray-700">Our Story</p>
            <p className="font-normal text-lg text-gray-700">Benifits</p>
          </div>
          <div className="flex flex-col gap-4 ml-10">
            <p className="font-semibold text-lg text-gray-950">Follow Us</p>
            <div className="flex gap-4">
              <Facebook className="w-6 h-6 text-gray-700" />
              <Twitter className="w-6 h-6 text-gray-700" />
              <Instagram className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
