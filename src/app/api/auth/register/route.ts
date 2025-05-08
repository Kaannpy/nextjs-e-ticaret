import { connectToDatabase } from "@/lib/db/mongodb";

import { User } from "@/lib/db/models/User";

export async function POST(request: Request) {

     await connectToDatabase();


     const {name,email,password}=await request.json();

     if(!name||!email||!password){

        return new Response(JSON.stringify({message:"Missing required fiedls"}),{
            status: 400, headers: { "Content-Type": "application/json" }
        });

}


        const user=await User.create({name,email,password});
        return new Response(JSON.stringify({ user, message: "User created successfully" }), {
            status: 200, headers: { "Content-Type": "application/json" }
        }); 



}