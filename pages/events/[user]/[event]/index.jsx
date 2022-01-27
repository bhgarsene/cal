import React, { useState } from 'react';
import { getSession, useSession } from 'next-auth/client'
import prisma from '../../../../lib/prisma'
import { FcGlobe } from 'react-icons/fc'
import { MdAccessTimeFilled } from 'react-icons/md'
import { AiFillCalendar } from 'react-icons/ai'
import { useRouter } from 'next/router'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { BounceLoader } from "react-spinners";
import axios from 'axios';

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
    const { event } = context.query
    const eventType = await prisma.eventType.findUnique({
        where: {
            id: event
        },
        select: {
            id: true,
            title: true,
            description: true,
            URL: true,
            length: true,
            userId: true
        }
    })
    console.log(eventType)
    return {
        props: { eventType }
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


export default function Index({ eventType }) {
    // const router = useRouter()
    const router = useRouter()
    const [session, loading] = useSession()
    const { length, title } = eventType
    const [startDate, setStartDate] = useState(new Date())
    const [eventDate, setEventDate] = useState(new Date())
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const endpoint = "/api/createEvent"
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    const formatTime = (date) => {
        let fromTime = `${date.getHours()}:${date.getMinutes()}`
        setStartDate(date)
        setEventDate(date.toISOString().slice(0, 10))
        setFrom(fromTime)
        setTo(fromTime)
    }

    const submitData = async (e) => {
        console.log('Submit')
        e.preventDefault()
        e.stopPropagation()
        setIsLoading(true)
        setHasError(false)
        setErrorMessage("");
        try {
            const user = session.user
            const res = await axios.post(endpoint, {
                eventDate: startDate,
                from,
                to,
                eventTypeId: eventType.id,
                duration: length,
                user: user
            })
            if (res.data.status == 200) {
                router.push({
                    pathname: "/events/[user]/[event]/[date]",
                    query: {
                        user: session.user.username,
                        event: eventType.id,
                        date: eventDate
                    }
                })
            }
        } catch (error) {
            setHasError(true)
            setErrorMessage('an error occured...please try again')
        }

    }


    if (!loading) {
        if (isSessionValid(session)) {
            return (
                <div className="w-screen h-screen bg-gray-100">
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="flex flex-col gap-6">

                            <div className='flex justify-center'>
                                {
                                    hasError &&
                                    <span className='py-4 font-bold text-red-500'>
                                        {
                                            errorMessage
                                        }
                                    </span>
                                }
                            </div>
                            <div className="grid grid-cols-2 p-8 bg-white">
                                <div className="flex flex-col p-8 border-r gap-y">
                                    <FcGlobe className="text-7xl" />
                                    <p className="text-lg font-bold text-gray-400">{session.user.username}</p>
                                    <p className="text-3xl font-bold">{eventType.title} Min Meeting</p>
                                    <div className="flex items-center gap-2 py-3 text-2xl font-semibold text-gray-400"><MdAccessTimeFilled /><p>{eventType.length} Min</p></div>
                                    {/* <div className="flex items-center gap-2 text-2xl font-semibold text-green-600"><AiFillCalendar />4:30pm</div> */}
                                </div>
                                <div className="flex flex-col p-8 gap-y-4">
                                    <div>
                                        <div className='flex flex-col items-start'>
                                            <span className='mb-2 font-bold'>Select Date and Time</span>
                                            <DatePicker
                                                className='p-2 border'
                                                selected={startDate}
                                                onChange={(date) => formatTime(date)}
                                                filterDate={isWeekday}
                                                minDate={new Date()}
                                                showTimeSelect
                                                timeIntervals={length}
                                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                                maxTime={setHours(setMinutes(new Date(), 10), 20)}
                                            />

                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="p-2 px-4 border">Cancel</button>
                                        <button className="p-2 px-4 text-white bg-black"  onClick={submitData}>Continue</button>
                                    </div>
                                </div>
                            </div>
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