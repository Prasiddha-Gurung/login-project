import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-lg"><Link href="/">ECOMMERCE</Link></div>
          <div className="space-x-4">
            <Link href="/categories">
              <a>Categories</a>
            </Link>
            <Link href="/sale">
              <a>Sale</a>
            </Link>
            {/* Add more links as needed */}
          </div>
          <div>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
