import { db } from "@/configs/db";
import { inngest } from "./client";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

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
