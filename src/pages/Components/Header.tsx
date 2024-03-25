import Link from 'next/link';
import router from 'next/router';
import { useState, useEffect } from 'react';

const Header = () => {
    const [cookieValue, setCookieValue] = useState(false);
    useEffect(() => {
        if (getCookieValue('loginToken')) {
            setCookieValue(true);
        }
    }, []);

    const getCookieValue = (name: string) => {
        if (typeof document === 'undefined') {
            return undefined;
        }
        const value = document.cookie;
        if (value.includes(name)) {
            return true;
        }
        return false;
    };

const logout = () => {
    document.cookie="name=loginToken; expires=Sun, 20 Aug 2000 12:00:00 UTC"; 
    router.push('/login').catch((err)=> console.log(err)); 
}
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
                    {!cookieValue ? (<Link href="/login">
                        <a>Login</a>
                    </Link>) : (
                        <>
                    <button
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none max-w-24"
                        onClick={() => logout()}>Log out
                    </button></>
                    )}

                </div>
            </div>
        </nav>
    </header>
);
};

export default Header;
