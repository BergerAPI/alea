import { User } from "@prisma/client"
import { prisma } from "./db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

/**
 * Figuring out, whether credentials are valid and can be assigned to a user
 * @param email Credential
 * @param password Credential
 * @returns The user object
 */
export const attemptLogin = async (email: string, password: string) => {
    const user = await prisma.user.findFirst({ where: { email } })

    if (user === null || !(await bcrypt.compare(password, user.password)))
        return console.log(user, !(await bcrypt.compare(password, user?.password ?? "")))

    return user
}

/**
 * Generating a JWT-Token for further authentication
 * @param user The user to create an authentication token for
 */
export const generateJWT = (user: User) => {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? "NOT_PROD", {
        expiresIn: "30d",
        subject: "alea"
    })
}

/**
 * Getting a user by its jwt-token
 * @param token The token to check
 */
export const getUserByToken = async (token: string) => {
    try {
        const payload: any = jwt.verify(token, process.env.JWT_SECRET ?? "NOT_PROD")

        if (!payload.userId)
            return null

        return await prisma.user.findFirst({ where: { id: payload.userId } })
    } catch {
        return null
    }
}

/**
 * Gets the JWT-Token (if available) from the cookies and finds the user by
 * the token
 */
export const authenticate = async () => {
    const token = cookies().get("AUTH")

    if (!token)
        return null

    return await getUserByToken(token.value)
}