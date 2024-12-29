import { courseOutlineAIModel } from "@/configs/AiModal";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, topic, courseType, difficultyLevel, createBy } =
    await req.json();

  const PROMPT =
    "Generate a study material for " +
    topic +
    " for " +
    courseType +
    " and level of difficulty will be " +
    difficultyLevel +
    " with summary of course, List of Chapters along with summary  for each chapter, Topic list in each chapter all result in JSON format";

  //! Generate the course layout based on the user input
  const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);

  const aiResult = JSON.parse(aiResp.response.text());

  //! Save the course layout to the database
  const dbResult = await db
    .insert(STUDY_MATERIAL_TABLE)
    .values({
      courseId: courseId,
      courseType: courseType,
      createdBy: createBy,
      topic: topic,
      courseLayout: aiResult,
    })
    .returning({ STUDY_MATERIAL_TABLE });
  console.log(dbResult);

  return NextResponse.json({ result: dbResult[0] });
}
