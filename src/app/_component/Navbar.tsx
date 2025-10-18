'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import logo from '../../assets/images/freshcart-logo.svg'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { CartRes } from '../cart/typescript/cart.interface'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { data } = useQuery<CartRes>({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch(`/api/cart`)
      const payload = await res.json()
      return payload
    },
  })

  const [isOpen, setOpen] = useState(true)
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (status !== 'authenticated' || !session?.user?.token) return
      try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: { token: session.user.token },
        })
        const data = await res.json()
        setWishlistCount(data?.count || data?.data?.length || 0)
      } catch (err) {
        console.error(err)
      }
    }

    fetchWishlistCount()
  }, [status, session])

  const links = [
    { path: '/', element: 'home' },
    { path: '/categories', element: 'categories' },
    { path: '/brands', element: 'brands' },
    { path: '/products', element: 'products' },
  ]

  const auths = [
    { path: '/auth/register', element: 'register' },
    { path: '/auth/login', element: 'login' },
  ]

  function handleLogOut() {
    signOut({ callbackUrl: '' })
  }

  return (
    <div>
      <nav className="bg-light w-full border-gray-200 dark:bg-gray-900 shadow-sm ">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-15 py-4">


          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse order-1 md:order-none"
          >
            <Image
              src={logo}
              alt="freshcart"
              className="w-36 md:w-40 h-auto"
            />
          </Link>


          <button
            onClick={() => setOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none order-2 md:order-none ml-auto"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${isOpen ? 'hidden' : ''} w-full md:flex justify-between items-center`}
            id="navbar-default"
          >

            <ul className="font-medium flex flex-col p-10 m-auto md:p-0 mt-4 md:mt-0 md:flex-row gap-1 text-sm">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`block py-2 px-3 rounded-sm transition-all duration-200 ${pathname === link.path
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-500 hover:text-green-500'
                      }`}
                  >
                    {link.element.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>


            <ul className="font-medium flex flex-col md:flex-row items-center gap-4 text-black mt-4 md:mt-0 pr-6">
              {status === 'unauthenticated' ? (
                <>
                  {auths.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className="text-gray-900 block py-2 px-1 rounded-sm"
                      >
                        {link.element.toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  <li className="text-gray-800 font-medium">HI {session?.user?.name}</li>


                  <li className="relative ml-2">
                    <Link href={'/cart'}>
                      <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {data?.numOfCartItems}
                      </span>
                      <i className="fa-solid fa-cart-shopping text-2xl transition-transform duration-200 transform hover:scale-110"></i>
                    </Link>
                  </li>


                  <li className="relative ml-2">
                    <Link href={'/wishlist'}>
                      <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                      <i className="fa-solid fa-heart text-2xl transition-transform duration-200 transform hover:scale-110"></i>
                    </Link>
                  </li>

                  <li
                    className="cursor-pointer text-gray-700 transition-all ml-5 underline underline-offset-2"
                    onClick={handleLogOut}
                  >
                    LogOut
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
