import { NextResponse } from "next/server";
import pool from "../db";
import STATUS from "@/app/constants/status";

export async function GET() {
  try {
    const response = await pool.query(`SELECT * FROM users`);

    if (response.rows.length > 0) {
      const user = response.rows[0];
      return NextResponse.json(user, { status: STATUS.OK });
    } else {
      return NextResponse.json(null, { status: STATUS.BAD_REQUEST });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Database error",
      status: STATUS.SERVER_ERROR,
    });
  }
}

export async function POST(req) {
  const { link, username, token } = await req.json();

  if (!link || !username || !token) {
    return NextResponse.json(
      { message: "All input fields must be filled in" },
      { status: STATUS.BAD_REQUEST }
    );
  }

  try {
    const result = await pool.query(
      `INSERT INTO users (pixela_user, username, token) VALUES ($1, $2, $3) RETURNING id`,
      [link, username, token]
    );

    const userID = result.rows[0].id;

    await pool.query(
      `INSERT INTO profiles (id, display_name, gravatar_icon_email, pinned_graph_id) OVERRIDING SYSTEM VALUE VALUES ($1, $2, $3, $4)`,
      [userID, "", "", ""]
    );
    return NextResponse.json(
      { message: "User successfully created" },
      { status: STATUS.OK }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Database error",
      status: STATUS.SERVER_ERROR,
    });
  }
}
