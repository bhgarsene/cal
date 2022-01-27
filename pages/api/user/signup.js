import bcrypt from 'bcryptjs'
import prisma from '../../../lib/prisma'

export default async (req , res)=>{
    const { username , email , password  } = req.body
    
    const checkIfUserNameExists = await prisma.user.findFirst({
        where:{
            username:username
        }
    })
    if(checkIfUserNameExists){
        res.status(400).json({ status: 400, message: "User with such username already exists" });
        return;
    }
    const checkIfUserEmailExists = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if(checkIfUserEmailExists){
        res.status(400).json({ status: 400, message: "User with such email already exists" });
        return;
    }
    try {
        const newUser = await prisma.user.create({
            data:{ username:username, email:email,  password: await bcrypt.hash(password , 8),  }
        })
        if(newUser){
            res.status(200).json({ status: 200, message: "User Created successfully" });
        }
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
}