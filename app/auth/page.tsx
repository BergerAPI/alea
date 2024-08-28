import { redirect } from "next/navigation";
import { SignInForm } from "./sign-in";
import bcrypt from "bcrypt"
import { authenticate } from "@/lib/auth";

export default async function Auth() {
    const user = await authenticate()

    if (user !== null)
        return redirect("/app")

    return (
        <div>
            <SignInForm />
            {bcrypt.hashSync("test", 12)}
        </div>
    );
}
