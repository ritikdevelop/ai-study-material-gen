import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { email, fullName } = await req.json();

    const user = {
        fullName: fullName || 'Default Name', // Ensure userName is provided
        primaryEmailAddress: {
            emailAddress: email
        }
    };

    const result = await inngest.send({
        name: 'user.create',
        data: {
            user: user
        }
    });

    return NextResponse.json({ result: result });
}