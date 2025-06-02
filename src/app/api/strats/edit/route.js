import { NextResponse } from "next/server";
import DBConnection from "@/lib/db";
import getSession from "@/lib/auth";

export async function POST(request) {
  const formData = await request.formData();

  const name = formData.get("name");
  const section = formData.get("section");
  const video = formData.get("video");
  const markdown = formData.get("markdown");
  const chapter = formData.get("chapter");
  const stratID = formData.get("stratID"); 

  if (!name || !section || !markdown) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const user = await getSession();
  const dbConnection = await DBConnection();
  if(user.error) return NextResponse.json({message: 'You are not logged in'});
  if(user.banned == 1) return NextResponse.json({message: 'You are banned'});
  let query;
  if (stratID) {
    query = `
      UPDATE strats 
      SET stratName = ?, stratDescription = ?, stratVideo = ?, chapterID = ?, sectionID = ?
      WHERE stratID = ? AND userID = ?
    `;
    await dbConnection.execute(query, [name, markdown, video || null, chapter, section, stratID, user.userID]);
    return NextResponse.json({ message: "strat updated successfully" });
  }
    return NextResponse.json({ message: "strat doesn't exist" });
  
}