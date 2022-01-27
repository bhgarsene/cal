import React from 'react';
import { FcGlobe } from 'react-icons/fc'
import {MdAccessTimeFilled} from 'react-icons/md'
import {AiFillCalendar} from 'react-icons/ai'

export default function Index() {
    return(
        <div className="w-screen h-screen bg-gray-100">
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 p-8 bg-white">
                        <div className="flex flex-col p-8 border-r gap-y">
                            <FcGlobe className="text-7xl"/>
                            <p className="text-lg font-bold text-gray-400">Daniel Tonel</p>
                            <p className="text-3xl font-bold">15Min Meeting</p>
                            <div className="flex items-center gap-2 py-3 text-2xl font-semibold text-gray-400"><MdAccessTimeFilled/><p>15 Min</p></div>
                            <div className="flex items-center gap-2 text-2xl font-semibold text-green-600"><AiFillCalendar/>4:30pm</div>
                        </div>
                        <div className="flex flex-col p-8 gap-y-4">
                            <div className="flex flex-col">
                                <label className="text-lg font-semibold text-left">Your Name</label>
                                <input type="email" name="" id="" className="p-2 my-2 border-2 w-96" placeholder="John Doe"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-lg font-semibold text-left">Email Address</label>
                                <input type="email" name="" id="" className="p-2 my-2 border-2 w-96" placeholder="you@example.com"/>
                            </div>
                            <div className="text-lg font-semibold">
                                <p >Additional Guest</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-lg font-semibold text-left">Additional Notes</label>
                                <textarea type="email" name="" id="" className="p-2 my-2 border-2 w-96" placeholder="Please share anything that will help to prepare for our meeting"/>
                            </div>
                            <div className="flex gap-4">
                                <div className="px-6 py-3 text-lg font-semibold text-white bg-black "><p>Confirm</p></div>
                                <div className="px-6 py-3 text-lg font-semibold border border-black "><p>Cancel</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}