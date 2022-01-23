import React from 'react'
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { BiLink } from 'react-icons/bi'
import { BsCalendarFill } from 'react-icons/bs'
import { HiLogout } from 'react-icons/hi'

export default function sidebar({ session }) {
    return (
        <div className='fixed w-full h-screen'>
            <div className='flex flex-col justify-between h-full px-4 py-6'>
                <div className='flex flex-col gap-6'>
                    <p className='text-3xl font-bold'>Cal.com</p>
                    <div className='text-2xl text-gray-400 '>
                        <div className='flex items-center gap-4 '>
                            <BiLink className='' />
                            <Link href="/booking/eventType">
                                <a className='font-semibold'>Event Types</a>
                            </Link>
                        </div>
                        <div className='flex items-center gap-4 my-2'>
                            <BsCalendarFill className='' />
                            <Link href="/booking">
                                <a className='font-semibold'>Bookings</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-4 text-xl'>
                    <div className='w-4 h-4 bg-gray-600'>
                        <div></div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>{session.user.username}</span>
                            <span onClick={signOut} className='ml-3 text-gray-400 cursor-pointer font-semi-bold'>cal.com/{session.user.username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}