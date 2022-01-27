import prisma from "../../lib/prisma";

export default async (req,res) =>{
    const { names , email , description , booking_id} = req.body
console.log (req.body)
    if(!names || !email ||!description ){
        res.status(400).json({
            "message":"Please Fill All Fields",
        })
        return;
    }
    if(!booking_id){
        res.status(400).json({
            "message":"The Booking is missing",
        })
        return;
    }
    console.log ('gettin it')
    try {
        const newGuest = await prisma.guest.create({
            data:{ name:names, email:email, note:description, event_id:booking_id }
        })
        if(newGuest){
            res.status(200).json({ status: 200, message: "Guest Created successfully" });
        }
        
    console.log ('gettin it')
    } catch (error) {
        res.status(500).json({
            "message":error
        })
        return;
    }
} 