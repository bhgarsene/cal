import { session, useSession } from "next-auth/client";
import prisma from "../../lib/prisma";

export default async(req , res)=>{
    try {
        const { title , url , description , length , user } = req.body;
        
        console.log("submitted")
        console.log (title, description, length, url)
        //Inputs validation
        // if(!title || !url ||!description || !length){
        //     res.status(400).json({
        //         "message":"Please Fill All Fields"
        //     })
        //     return;
        // }
        //make event title unique to a user
        const checkTitleForCurrentUser = await prisma.eventType.findFirst({
            where:{
                userId:user.id,
                AND:{
                    title:title
                }
            }
        })
        if(checkTitleForCurrentUser){
            res.status(400).json({
                "message":`Your already have an event titled ${title}`
            })
            return;
        }
        const newEvent = await prisma.eventType.create({
            data:{ title:title,  URL:url,
                description:description, userId:user.id, ength:length
            }
        })
    
       res.status(200).send({status:200 , message:"New event created successfully"})
    } catch (error) {
        throw error
        res.status(500).json({
            "message":error
        })
        return;
    }
}