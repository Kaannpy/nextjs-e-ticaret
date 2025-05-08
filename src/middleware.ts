import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/register','/api/public']

// Tüm istekler için araya girer.

// Bu middleware'i belirli istekler için devreye alıp diğer istekler için almayacak şekilde güncelleyin. 
// Eğer istek ön yüzden geliyorsa middleware login sayfasına redirect etmeli.
export async function middleware(request:NextRequest)
{
    console.log(request.nextUrl.pathname)
    if( PUBLIC_PATHS.some( path => request.nextUrl.pathname.startsWith(path) )   )
        // Eğer istek /api/auth/login gibi bir açık yol üzerindeyse, middleware devreye girmez, doğrudan devam eder.
    {
        return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value!;
    // Eğer kullanıcı önceden giriş yaptıysa, çerezlerde (cookies) bir token olmalı.

    console.log(`Token geldi: ${token}`)

    const secret = process.env.JWT_SECRET!;
    // jwt dogrılaması için gizli anhatrı .env alır

    const secret_key = new TextEncoder().encode(secret);

    try {
       await jwtVerify(token, secret_key);
    }catch(err)
    {
        console.log(err);
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
  // tokeni varmı diye kontrol ettik, eğer yoksa 401 hatası döneriz.

    return NextResponse.next(); // 
}

export const config = {
    matcher:['/api/:path*']
//     Middleware’in yalnızca /api/ ile başlayan yollarda çalışacağını söylüyor.

// Yani frontend sayfalarında değil, sadece API isteklerinde çalışır.


}

// composeMiddleware() -> Nextjs


export async function userMiddleware() {

}

export async function languageMiddleware() {

}