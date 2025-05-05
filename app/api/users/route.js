import { NextResponse } from "next/server";
import pool from "../db";

export async function GET() {
  try {
    const response = await pool.query(`SELECT * FROM users`);
    const users = response.rows;
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}

export async function POST(req) {
  const { link, username, token } = await req.json();

  if (!link || !username || !token) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    await pool.query(
      `INSERT INTO users (pixela_user, username, token) VALUES ($1, $2, $3)`,
      [link, username, token]
    );
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const username = await req.json();

  if (!username) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    await pool.query(`DELETE FROM users WHERE username = ($1)`, [username]);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}

export async function PUT(req) {
  const { token, username } = await req.json();

  if (!token || !username) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  console.log(`token ${token}`);
  console.log(`username ${username}`);

  try {
    await pool.query(`UPDATE users SET token = ($1) WHERE username = ($2)`, [
      token,
      username,
    ]);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
