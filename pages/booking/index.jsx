import React from 'react';
import { MdOutlineAccessTime } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";


export default function index() {
    return(
        <div className="min-h-screen px-6 py-12 bg-gray-100">
            <div className="pt-12">
                <div className="py-12">
                    <p className="text-2xl font-bold">Booking</p>
                    <p className="mt-2 text-sm text-gray-400">See upcoming and past events booked through your event type links</p>
                </div>
                <div className="">
                    <div className="flex gap-6 font-semibold ">
                        <p className="h-full pb-4 border-b-2 border-black">Upcoming</p>
                        <p className="text-gray-400">Past</p>
                        <p className="text-gray-400">Cancelled</p>
                    </div>
                    <div className="flex justify-between px-8 py-6 my-8 text-sm font-semibold bg-white">
                        <div className="flex gap-8">
                            <div className="">
                                <p className="">Wed, 29 Dec</p>
                                <p className="text-gray-400">16:30 - 16:45</p>
                            </div>
                            <div>
                                <p className="">15 Min meeting between Danile Tuchel and Mr. Q</p>
                                <p className="text-gray-400">Mr. Tuchel</p>
                                <p className="">tuchel@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row gap-4 ">
                                <div className="flex flex-row gap-2 px-4 py-2 border">
                                    <MdOutlineCancel className="text-xl"/>
                                    <p>Cancel</p>
                                </div>
                                <div className="flex flex-row gap-2 px-4 py-2 border">
                                    <MdOutlineAccessTime className="text-xl"/>
                                    <p>Reschedule</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full p">
                    <div className="bg-gray-400">
                        <p className="px-6 py-2 text-white">No more Result</p>
                    </div>
                </div>
            </div>
        </div>
    )
}