import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {success, z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    if(request.method!=='GET'){
        return Response.json({
            success: false,
            message: 'Only GET method allowed'
        },
        {status: 405}
    )
    }
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        // validate with zod
        const result = usernameQuerySchema.safeParse(queryParam)
        console.log(result)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: "Invalid query parameter"
            },
            {status: 500}
        )
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username,isVerified: true})
        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: "User already exists"
            },
            {status: 500}
        )
        }else{
            return Response.json({
                success: true,
                message: "Username is unique!"
            })
        }

    } catch (error) {
        console.log("Error checking username", error);
        return Response.json({
            success: false,
            message: "Failed to check username"
        },
        {status: 500}    
    )
    }
}