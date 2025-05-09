import { NextResponse } from "next/server";
import pool from "../../db";
import STATUS from "@/app/constants/status";

export async function DELETE(_, context) {
  const { id } = await context.params;

  try {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return NextResponse.json(
      { message: "User successfully deleted" },
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

export async function PUT(req, context) {
  const { token } = await req.json();
  const { id } = await context.params;

  if (!token) {
    return NextResponse.json(
      { message: "The token field cannot be empty" },
      { status: STATUS.BAD_REQUEST }
    );
  }

  try {
    await pool.query(`UPDATE users SET token = $1 WHERE id = $2`, [token, id]);
    return NextResponse.json(
      { message: "User token successfully updated" },
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
