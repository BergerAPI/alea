import { attemptLogin, generateJWT } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const SignInForm = () => {
    return <form action={async (formData) => {
        "use server"

        const email = formData.get("email")?.toString()
        const password = formData.get("password")?.toString()

        if (!email || !password)
            return

        const user = await attemptLogin(email, password)

        if (!user)
            return

        cookies().set("AUTH", generateJWT(user))
        redirect("/app")
    }}>
        <input name="email" id="email" placeholder="Email" />
        <input name="password" id="password" placeholder="Password" />
        <button>Sign In</button>
    </form>
}