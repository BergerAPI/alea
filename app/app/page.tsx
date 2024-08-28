import { authenticate } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AppHome() {
  const user = await authenticate()

  if (!user)
    return redirect("/auth")

  const quizzes = await prisma.quiz.findMany({ where: { authorId: user.id } })

  return (
    <div>
      <main>Authorized! Hello, {user.email}!</main>

      <ul>
        {quizzes.map(quiz => (
          <li><Link href={`/quiz/${quiz.id}`}>{quiz.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}
