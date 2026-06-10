import { type ReactNode } from "react";

interface HeaderProps {
  // image: string;
  image: {
    src: string;
    alt: string;
  };
  // we can define children prop like this (can make optional too)
  // well GOOGLING I found out about PropsWithChildren and ig we should use it instead for cleaner syntax
  // basically it's a generic type and we can simply use it like {props}: PropsWithChildren<HeaderProps>
  // alternatively we can extend it or do a union type and then use our prop type/interface as usual
  children: ReactNode;
}

// for just props (without children prop) we define interface/type and then simply use it
// function Header({ image }: HeaderProps) {

function Header({ image, children }: HeaderProps) {
  return (
    <header>
      <img {...image}></img>
      {children}
    </header>
  );
}

export default Header;
