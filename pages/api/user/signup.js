import prisma from '../../../lib/prisma'
import bcrypt  from 'bcryptjs'

export default async (req,res)=>{
    const { username , email , password  } = req.body

    // if(!username || !email ||!password){
    //     res.status(400).json({
    //         "message":"Please Fill All Fields"
    //     })
    //     return;
    // }
    console.log(username, email, password)
    const checkIfUserExists = await prisma.user.findFirst({
        where:{
            email:email
        }
    })

    const checkIfUsernameExists = await prisma.user.findFirst({
        where:{
            username:username
        }
    })
    if (checkIfUserExists || checkIfUsernameExists) {
        res.status(400).json({ status: 400, message: "User with such email already exists" });
        return;
    }else{
        try {
            const newUser = await prisma.user.create({
                data:{
                    username:username,
                    email:email,
                    password: await bcrypt.hash(password , 8),
                }
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

  }