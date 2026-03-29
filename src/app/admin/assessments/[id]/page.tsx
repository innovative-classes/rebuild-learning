import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AssessmentEditForm from "./edit-form";

export default async function AdminAssessmentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const assessment = await prisma.assessment.findUnique({
    where: { id },
    include: {
      questions: { orderBy: { questionNumber: "asc" } },
      reports: { orderBy: { tierLevel: "asc" } },
    },
  });

  if (!assessment) {
    notFound();
  }

  return (
    <div>
      <AssessmentEditForm assessment={JSON.parse(JSON.stringify(assessment))} />
    </div>
  );
}
