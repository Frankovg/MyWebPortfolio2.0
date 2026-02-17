'use client'

import Burger from "@/icons/burger";

type MobileMenuButtonProps = {
  open: VoidFunction;
  isOpen: boolean;
};

export function MobileMenuButton({ open, isOpen }: MobileMenuButtonProps) {
  return (
    <li className="1100:hidden flex items-center">
      <button
        type="button"
        aria-label="Navigation menu"
        aria-expanded={isOpen}
        onClick={open}
        className="group relative max-600:size-10.5 flex justify-center items-center p-0 600:p-4.5 border border-solid border-whiteText transition duration-300 ease-in overflow-hidden"
      >
        <span className="absolute inset-0 bg-white transform w-0 transition-all duration-300 ease-in-out group-hover:w-full" />
        <Burger aria-hidden="true" className="relative z-10 transition-colors group-hover:stroke-darkGrey max-600:text-white" />
      </button>
    </li>
  );
}
