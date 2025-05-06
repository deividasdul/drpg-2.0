import { NextResponse } from "next/server";
import pool from "../db";

const STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

export async function GET() {
  try {
    const response = await pool.query(`SELECT * FROM users`);
    const users = response.rows;
    return NextResponse.json(users, { status: STATUS.OK });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed" },
      { status: STATUS.SERVER_ERROR }
    );
  }
}

export async function POST(req) {
  const { link, username, token } = await req.json();

  if (!link || !username || !token) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: STATUS.BAD_REQUEST }
    );
  }

  try {
    const result = await pool.query(
      `INSERT INTO users (pixela_user, username, token) VALUES ($1, $2, $3) RETURNING id`,
      [link, username, token]
    );

    const userId = result.rows[0].id;

    await pool.query(
      `INSERT INTO profiles (id, display_name, gravatar_icon_email, title, timezone, about_url, contribute_urls, pinned_graph_id) OVERRIDING SYSTEM VALUE VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, "", "", "", "", "", "", ""]
    );
    return NextResponse.json({ message: "Success" }, { status: STATUS.OK });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed" },
      { status: STATUS.SERVER_ERROR }
    );
  }
}

export async function DELETE(req) {
  const username = await req.json();

  if (!username) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: STATUS.BAD_REQUEST }
    );
  }

  try {
    await pool.query(`DELETE FROM users WHERE username = ($1)`, [username]);
    return NextResponse.json({ message: "Success" }, { status: STATUS.OK });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed" },
      { status: STATUS.SERVER_ERROR }
    );
  }
}

export async function PUT(req) {
  const { token, username } = await req.json();

  if (!token || !username) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: STATUS.BAD_REQUEST }
    );
  }

  try {
    await pool.query(`UPDATE users SET token = ($1) WHERE username = ($2)`, [
      token,
      username,
    ]);
    return NextResponse.json({ message: "Success" }, { status: STATUS.OK });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed" },
      { status: STATUS.SERVER_ERROR }
    );
  }
}
