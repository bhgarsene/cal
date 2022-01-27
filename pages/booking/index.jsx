import React, { useState } from 'react';
import { MdOutlineAccessTime } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import Sidebar from '../../component/sidebar'
import { getSession, useSession } from 'next-auth/client'
import prisma from '../../lib/prisma'
import { AiOutlineCalendar } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import Popup from './newType'
import { BounceLoader } from "react-spinners";
import axios from 'axios'


export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const bookings = await prisma.event.findMany({
        where: {
            userId: session.user.id
        },
        include:{
            eventType: true,
            guests: true,
        }
    })
    const actualBookings = JSON.parse(JSON.stringify(bookings))
    return {
        props: {
            actualBookings
        }
    }
}

const isSessionValid = (session) => {
    if (typeof session !== typeof undefined && session !== null && typeof session.user !== typeof undefined) {
        return true;
    }
    else {
        return false;
    }
}



/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Index({ actualBookings }) {
    console.log(actualBookings)
    const [session, loading] = useSession()

    if (!loading) {
        if (isSessionValid(session)) {
            return (
                <div className="flex flex-row min-h-screen">
                    <div className="w-1/6 border-2">
                        <Sidebar session={session} />
                    </div>
                    <div className="w-5/6 p-8 bg-gray-100">
                        <div className="flex justify-between py-8">
                            <div className="">
                                <p className="text-2xl font-bold">Booking</p>
                                <p className="mt-2 text-sm text-gray-400">See upcoming and past events booked through your event type links</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex gap-6 font-semibold ">
                                <p className="h-full pb-4 border-b-2 border-black">Upcoming</p>
                                <p className="text-gray-400">Past</p>
                                <p className="text-gray-400">Cancelled</p>
                            </div>
                            {
                                actualBookings.length > 0 ?
                                    <div className="my-8 border">
                                        {
                                            actualBookings.map((booking) => {
                                                return (
                                                    <div key={booking.id} className="flex justify-between px-8 py-6 text-sm font-semibold bg-white border-b">
                                                        <div className="flex gap-8">
                                                            <div className="">
                                                                <p className="">{new Date(booking.event_date).toISOString().slice(0,10)}</p>
                                                                <p className="text-gray-400">{booking.from}</p>
                                                            </div>
                                                            <div>
                                                                <p className="">{booking.eventType.length} Min meeting between {session.user.username} {booking.guests[0] ? `and ${booking.guests[0].name}` : ""}</p>
                                                                <p className="text-gray-400">{booking.eventType.title}</p>
                                                                <p className="">{booking.eventType.email}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex flex-row gap-4 ">
                                                                <div className="flex flex-row gap-2 px-4 py-2 border">
                                                                    <MdOutlineCancel className="text-xl" />
                                                                    <p>Cancel</p>
                                                                </div>
                                                                <div className="flex flex-row gap-2 px-4 py-2 border">
                                                                    <MdOutlineAccessTime className="text-xl" />
                                                                    <p>Reschedule</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <div className="flex items-center justify-center w-full p">
                                            <div className="bg-gray-400">
                                                <p className="px-6 py-2 text-white">No more Result</p>
                                            </div>
                                        </div> */}
                                    </div>
                                    :
                                    <div className="flex flex-col items-center w-full mt-4 border">
                                        <div className="flex flex-col items-center my-24">
                                            <div className="p-4 text-6xl bg-white rounded-full">
                                                <AiOutlineCalendar />
                                            </div>
                                            <div className="my-4 text-center">
                                                <p className="text-2xl font-semibold">No Upcoming bookings, yet</p>
                                                <p>You have no Upcoming bookings. As soon as someone books a</p>
                                                <p>time with you it will show up here.</p>
                                            </div>
                                        </div>
                                    </div>
                            }

                        </div>

                    </div>
                </div>
            )
        } else {
            <div className='wrapper'>
                <p>You are not logged in</p>
            </div>
        }
    } else {
        return (
            <div className="flex items-center justify-center h-screen px-auto">
                <BounceLoader />
            </div>
        )
    }
}