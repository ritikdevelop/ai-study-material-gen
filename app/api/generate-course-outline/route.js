import { courseOutlineAIModel } from "@/configs/AiModal";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
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
    " with summary of course, List of Chapters along with summary and Emoji icon for each chapter, Topic list in each chapter all result in JSON format";

  //! Generate the course layout based on the user input
  const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);

  const aiResult = JSON.parse(aiResp.response.text());

  //! Ensure courseType is not null or undefined
  // if (!courseType) {
  //   throw new Error("courseType cannot be null or undefined");
  // }

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

  //! Trigger the Inngest function to generate Chapter notes
  const result = await inngest.send({
    name: "notes.generate",
    data: {
      course: dbResult[0],
    },
  });
  console.log(result);

  return NextResponse.json({ result: dbResult[0] });
}
