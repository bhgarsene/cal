import React, { useState } from 'react';
import { getSession, useSession } from 'next-auth/client'
import { FcGlobe } from 'react-icons/fc'
import { MdAccessTimeFilled } from 'react-icons/md'
import { AiFillCalendar } from 'react-icons/ai'
import { BounceLoader } from "react-spinners";
import { useRouter } from 'next/router'
import prisma from '../../lib/prisma'
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
    const { event, date } = context.query
    const eventType = await prisma.eventType.findUnique({
        where: {
            id: event
        },
        include: {
            event: true
        }
    })
    const actualEventType = JSON.parse(JSON.stringify(eventType))
    return {
        props: { actualEventType, date }
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


export default function Index({ actualEventType }) {

    const booking_id = actualEventType.event[0].id
    console.log(actualEventType)
    const router = useRouter()
    const [session, loading] = useSession()
    const [names, setNames] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const endpoint = "/api/createGuest"

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            e.stopPropagation()
            const response = await axios.post(endpoint, {
                names, email, description, booking_id
            })
            if (response.data.status == 200) {
                router.push({
                    pathname: "/booking/success",
                    query: {
                        eventId: actualEventType.id,
                        bookingId: booking_id,
                        guestNames: names
                    }
                })
            }
        } catch (error) {
            if (error.response.status !== 200) {
                setIsLoading(false)
                setErrorMessage(error.response.data.message)
                setHasError(true)
            }
        }
    }

    function hideErrorMessage() {
        setHasError(false)
    }
    function clearForm() {
        setHasError(false)
        setIsLoading(false)
        setErrorMessage('')
        setNames('')
        setDescription('')
        setEmail('')
    }
    if (!loading) {
        if (isSessionValid(session)) {
            return (

                <div className="w-screen h-screen bg-gray-100">
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 p-8 bg-white">
                                <div className="flex flex-col p-8 border-r gap-y">
                                    <FcGlobe className="text-7xl" />
                                    <p className="text-lg font-bold text-gray-400">{session.user.username}</p>
                                    <p className="text-3xl font-bold">{actualEventType.length}Min Meeting</p>
                                    <div className="flex items-center gap-2 py-3 text-2xl font-semibold text-gray-400"><MdAccessTimeFilled /><p>{actualEventType.length} Min</p></div>
                                    <div className="flex items-center gap-2 text-2xl font-semibold text-green-600"><AiFillCalendar />{actualEventType.event[0].from}</div>
                                </div>
                                <div className="flex flex-col p-8 gap-y-4">
                                    <div className="flex flex-col">
                                        <label className="text-lg font-semibold text-left">Your Name</label>
                                        <input type="email" name="" id="" className="p-2 my-2 border-2 w-96" placeholder="John Doe" value={names} onChange={e => setNames(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-lg font-semibold text-left">Email Address</label>
                                        <input type="email" name="" id="" className="p-2 my-2 border-2 w-96" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    {/* <div className="text-lg font-semibold">
                                        <p >Additional Guest</p>
                                    </div> */}
                                    <div className="flex flex-col">
                                        <label className="text-lg font-semibold text-left">Additional Notes</label>
                                        <textarea type="email" name="" id="" className="p-2 my-2 border-2 w-96" placeholder="Please share anything that will help to prepare for our meeting" value={description} onChange={e => setDescription(e.target.value)} /> 
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="px-6 py-3 text-lg font-semibold text-white bg-black " onClick={handleSubmit}><p>Confirm</p></div>
                                        <div className="px-6 py-3 text-lg font-semibold border border-black "><p>Cancel</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='wrapper'>
                    <p>You are not logged in</p>
                </div>
            )
        }
    } else {
        return (
            <div className="flex items-center justify-center h-screen px-auto">
                <BounceLoader />
            </div>
        )
    }
}