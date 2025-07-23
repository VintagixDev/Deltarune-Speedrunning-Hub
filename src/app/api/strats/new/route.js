import { NextResponse } from "next/server";
import DBConnection from "@/lib/db";
import getSession from "@/lib/auth";

export async function POST(request) {


  const dbConnection = await DBConnection();
  const user = await getSession();
  const formData = await request.formData();
  

  const name = formData.get("name");
  const section = formData.get("section");
  const video = formData.get("video");
  const markdown = formData.get("markdown");
  const chapter = formData.get("chapter")


  if(user.error) return NextResponse.json({message: 'You are not logged in'});
  if(user.banned == 1) return NextResponse.json({message: 'You are banned'});
  if (!name || !section || !markdown) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }
  var query = `INSERT INTO strats(stratName, stratDescription, chapterID, sectionID, userID) values
  (?, ?, ?, ?, ?)`
  let args = [name, markdown, chapter, section, user.userID];
  if(video){
    query = `INSERT INTO strats(stratName, stratDescription, stratVideo, chapterID, sectionID, userID) values
  (?, ?, ?, ?, ?, ?)`
    args = [name, markdown, video, chapter, section, user.userID];
  }
  dbConnection.execute(query, args)

  return NextResponse.json({ message: "Guide created successfully" });
}