import React, { useState } from 'react';
import { AiFillClockCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import Sidebar from '../../component/sidebar'
import { getSession, useSession } from 'next-auth/client'
import prisma from '../../lib/prisma'
import { IoMdAdd } from 'react-icons/io'
import Popup from './newType'
import axios from 'axios'
import Link from 'next/link'
import { BounceLoader } from "react-spinners";

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

    const bookings = await prisma.eventType.findMany({
        where: {
            userId: session.user.id
        },
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
export default function EventType({ actualBookings }) {
    console.log(actualBookings)
    const [session, loading] = useSession()
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [length, setLength] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const endpoint = "/api/createEventType"

    const togglePopup = () => {
        setHasError(false)
        setErrorMessage("");
        setTitle('')
        setUrl('')
        setDescription('')
        setLength('')
        setIsOpen(!isOpen);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true)
        setHasError(false)
        setErrorMessage("");
        if (title.trim() === "" || description.trim() === "" || length.trim() === "") {
            console.log(title, description, length)
            setIsLoading(false)
            setHasError(true)
            setErrorMessage("Please provide all fields..");
            return;
        }
        try {
            const user = session.user
            const res = await axios.post(endpoint, {
                title,
                url: title,
                description,
                length,
                user
            })
            if (res.data.status == 200) {
                setIsLoading(false)
                setTitle('')
                setUrl('')
                setDescription('')
                setLength('')
                setIsOpen(false)
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
            // if (error.response.status !== 200) {
            //     setIsLoading(false)
            //     setErrorMessage(error.response.data.message)
            //     setHasError(true)
            // }
        }
    }

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
                                <p className="text-2xl font-bold">Event Types</p>
                                <p className="mt-2 text-sm text-gray-400">Create events to share for people to book on your calendar.</p>
                            </div>
                            <div className="flex items-center gap-3 px-6 py-3 text-xl font-semibold text-white bg-black" onClick={togglePopup}>
                                <IoMdAdd />
                                <button className="">New Event Type</button>
                            </div>
                        </div>
                        <div className="">
                            {
                                actualBookings ?
                                    <div className="bg-white border">
                                        {
                                            actualBookings.map((bookings) => {
                                                return (
                                                    <div className="flex items-center justify-between p-6 border-t" key={bookings.id}>
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-xl font-semibold">{bookings.title} Meeting</p>
                                                                <p className="text-sm text-gray-400">/{session.user.username + '/' + bookings.URL}</p>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-lg text-gray-400">
                                                                <div className="flex items-center gap-2">
                                                                    <AiFillClockCircle />
                                                                    <p>{bookings.length} Min</p>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <FaUser />
                                                                    <p>1-on-1</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link href={{
                                                            pathname: '/events/[user]/[event]',
                                                            query: { event: bookings.id, user: session.user.username }
                                                        }}>
                                                            <a target="_blank">
                                                                <div className="flex gap-4 text-2xl text-gray-400 hover:text-black">
                                                                    <HiExternalLink />
                                                                    <FiLink />
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div>
                                        <p className="text-3xl font-semibold">No event Type creates yet</p>
                                    </div>
                            }

                        </div>
                    </div>
                    {isOpen && <Popup
                        content={<>
                            <div className="">
                                <p className="text-xl font-semibold">Add a new event type</p>
                                <p className="font-semibold text-gray-400">Create a new event type for people to book times with.</p>
                                <div className="flex flex-col max-w-2xl gap-4 py-6">
                                    <div className="flex flex-col">
                                        <label className="text-lg font-semibold text-left">Title</label>
                                        <input type="email" name="" id="" className="w-full p-2 border" placeholder="Quick Chat" value={title} onChange={e => setTitle(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-lg font-semibold text-left">Url</label>
                                        <div className="flex items-center">
                                            <p className="p-2 px-4 font-semibold text-gray-400 border-t border-b border-l bg-gray-50">https://cal.com/{session.user.username}/</p>
                                            <input type="email" name="" id="" className="w-full px-4 py-2 border" placeholder="" value={title} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-lg font-semibold text-left">Description</label>
                                        <textarea name="" id="" cols="12" placeholder="A Quick Video Meeting" className="w-full px-4 py-2 border" value={description} onChange={e => setDescription(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-lg font-semibold text-left">Length</label>
                                        <div className="flex border">
                                            <input type="email" name="" id="" className="w-full px-4 py-2" placeholder="" value={length} onChange={e => setLength(e.target.value)} />
                                            <p className="p-2 px-4 text-gray-400 ">Minutes</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <button className="p-2 px-4 border" onClick={togglePopup}>Cancel</button>
                                        <button className="p-2 px-4 text-white bg-black" onClick={handleSubmit}>Continue</button>
                                    </div>
                                    {
                                        hasError &&
                                        <div className='flex justify-center'>
                                            <span className='font-bold text-red-500'>{errorMessage}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </>}
                        handleClose={togglePopup}
                    />}
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