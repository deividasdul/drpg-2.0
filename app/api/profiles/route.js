import { NextResponse } from "next/server";
import pool from "../db";

export async function GET(req, { params }) {
  try {
    const response = await pool.query(`SELECT * FROM profiles`);
    const profile = response.rows[0];
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}

export async function PUT(req) {
  const {
    displayName,
    gravatarIconEmail,
    title,
    timezone,
    aboutURL,
    contributeURLs,
    pinnedGraphID,
    id,
  } = await req.json();

  try {
    await pool.query(
      `UPDATE profiles SET display_name = $1, gravatar_icon_email = $2, title = $3, timezone = $4, about_url = $5, contribute_urls = $6, pinned_graph_id = $7 WHERE id = $8`,
      [
        displayName,
        gravatarIconEmail,
        title,
        timezone,
        aboutURL,
        contributeURLs,
        pinnedGraphID,
        id,
      ]
    );
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
