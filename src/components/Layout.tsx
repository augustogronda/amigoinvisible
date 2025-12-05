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
      </div>
    </div>
  );
}
