import { SideMenu } from "./SideMenu";
import { Snow } from "./Snow";
import { MusicPlayer } from "./MusicPlayer";

import { DonationButton } from "./DonationButton";

export type LayoutProps = {
  menuItems: React.ReactNode[];
  children: React.ReactNode;
};

export function Layout({ menuItems, children }: LayoutProps) {
  return (
    <div className="min-h-screen flex justify-center p-4 py-8 relative">
      <Snow />
      <MusicPlayer />
      <div className="container mx-auto max-w-5xl relative z-10">
        <SideMenu>
          {menuItems}
        </SideMenu>

        <div className="my-12 md:my-16 flex flex-col justify-around lg:flex-row gap-12 md:gap-16">
          {children}
        </div>
        <DonationButton />
        <footer className="mt-12 text-center text-xs">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-gray-800">
            <p>
              Basado en el proyecto <a href="https://github.com/arcanis/secretsanta" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600 font-medium transition-colors">Secret Santa</a> de Maël Nison
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
