import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { courseOutlineAIModel, generateNotesAIModel } from "@/configs/AiModal";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    // Get the user from the event
    const result = await step.run(
      "Check User if user not exist then create new user in database",
      async () => {
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        if (result?.length == 0) {
          //! If user is new then add the user to the database
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName || "Default Name", // Ensure userName is provided
              email:
                user?.primaryEmailAddress?.emailAddress ||
                "default@example.com", // Ensure email is provided
            })
            .returning({ id: USER_TABLE.id });

          console.log(userResp);
        }
        return result;
      }
    );
    return "Success";
  }

  //   Step is to send s
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    //! Generate the Notes for Each chapter with AI
    const notesResult = await step.run("Generate Chapter Notes", async () => {
      const Chapters = course?.courseLayout.chapters;
      let index = 0;
      Chapters.forEach(async (chapter) => {
        const PROMPT =
          "Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTMLK , Head, Body, title tag), The chapters : " +
          JSON.stringify(chapter);

        const result = await generateNotesAIModel.sendMessage(PROMPT);
        const aiResp = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResp,
        });
        index = index + 1;
      });
      return "Completed";
    });

    //! Update Status to Generating
    const updateCourseStatusResult = await step.run(
      "Update Course Status to Ready",
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: "Ready",
          })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

        return "Success";
      }
    );
  }
);
