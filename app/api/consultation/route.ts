import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const comment = formData.get("comment") as string | null;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;
    if (FORMSPREE_ENDPOINT) {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          comment: comment || "",
        }),
      });
      if (!res.ok) throw new Error("Formspree error");
    } else {
      console.log("Consultation request:", { name, email, phone, service, comment });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Consultation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
