'use client';
import { Navigation } from './Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import NavItems from './NavItems';
interface NavbarProps {
  categories: Navigation[] | undefined;
}

const Navbar = ({ categories }: NavbarProps) => {
  return (
    <header className="relative py-6">
      <MaxWidthWrapper>
        <div className=" border-b-gray-200">
          <NavItems categories={categories} />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
