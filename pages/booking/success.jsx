import React from 'react';
import { FcCheckmark } from 'react-icons/fc'
import {AiOutlineGoogle} from 'react-icons/ai'
import {SiMicrosoftoffice} from 'react-icons/si'
import {SiMicrosoftoutlook} from 'react-icons/si'
export default function success () {
    return(
        <div className="w-screen h-screen text-xl bg-gray-100">
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col gap-6 text-center">
                    <div className="p-8 bg-white">
                        <div className="flex justify-center">
                            <div className="p-3 bg-green-200 rounded-full">
                                <FcCheckmark className="text-4xl"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-4 border-b-2">
                            <p className="text-3xl font-bold">This meeting is scheduled</p>
                            <p>We emailed you and the other attendees a calendar invitation with all the details</p>
                        </div>
                        <div className="flex flex-col gap-6 py-6 border-b-2">
                            <div className="flex gap-12">
                                <p className="font-bold">What</p>
                                <p className="font-semibold">15 Min meeting between Daniel and Test</p>
                            </div>
                            <div className="flex gap-12">
                                <p className="font-bold">When</p>
                                <div>
                                    <p className="font-semibold">Wednesday, 29 December 2021</p>
                                    <p className="font-semibold">4:30 - 15 min <span className="text-gray-400">(Europe/Vienna)</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b-2">
                            <div><p className="font-bold">Add to Calendar</p></div>
                            <div className="flex gap-6 pr-20 text-3xl">
                                <div className="p-3 border"><AiOutlineGoogle/></div>
                                <div className="p-3 border"><SiMicrosoftoffice/></div>
                                <div className="p-3 border"><SiMicrosoftoutlook/></div>
                            </div>
                        </div>
                        <div>
                            <p className="py-4 text-center text-gray-400">Create your own booking Link with Cal.com</p>
                        </div>
                        <div>
                            <div className="flex w-full">
                                <input type="text" name="" id="" className="w-4/5 px-4 py-2 border" placeholder="asdf@asdf.asdf"/>
                                <p className="w-1/5 py-2 text-white bg-black">Try for Free</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}