import React, { useState } from 'react';
import Popup from './newType'

export default function eventType() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [length, setLength] = useState('')

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <div>
                <input
                    type="button"
                    value="Click to Open Popup"
                    onClick={togglePopup}
                />

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
                                        <p className="p-2 px-4 font-semibold text-gray-400 border-t border-b border-l bg-gray-50">https://cal.com/bihogo/</p>
                                        <input type="email" name="" id="" className="w-full px-4 py-2 border" placeholder="" value={url} onChange={e => setUrl(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-lg font-semibold text-left">Description</label>
                                    <textarea name="" id="" cols="12" placeholder="A Quick Video Meeting" className="w-full px-4 py-2 border"  value={description} onChange={e => setDescription(e.target.value)}/>
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
                                    <button className="p-2 px-4 text-white bg-black">Continue</button>
                                </div>
                            </div>
                        </div>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>
        </div>
    )
}