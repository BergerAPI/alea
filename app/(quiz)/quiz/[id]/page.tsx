import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function QuizView({ params: { id } }: { params: { id: string } }) {
    const quiz = await prisma.quiz.findFirst({ where: { id } })

    if (quiz === null)
        return redirect("/")

    return (
        <main>{quiz.title}</main>
    );
}
