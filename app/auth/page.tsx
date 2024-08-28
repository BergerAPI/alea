import { redirect } from "next/navigation";
import { SignInForm } from "./sign-in";
import { authenticate } from "@/lib/auth";

export default async function Auth() {
    const user = await authenticate()

    if (user !== null)
        return redirect("/app")

    return (
        <div>
            <SignInForm />
        </div>
    );
}
