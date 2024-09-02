import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function QuestionView({ params: { id } }: { params: { id: string } }) {
    const question = await prisma.question.findFirst({ where: { id } })

    if (question === null)
        return redirect("/")

    return (
        <main>
            <h1>{question.content}</h1>
            <p>{question.description}</p>
        </main>
    );
}
