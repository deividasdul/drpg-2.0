import { NextResponse } from "next/server";
import pool from "../../db";

export async function DELETE(req, context) {
  const { id } = await context.params;
  console.log(id);

  try {
    await pool.query(`DELETE FROM pixels WHERE id = $1`, [id]);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const { newQuantity, newDescription } = await req.json();

  try {
    await pool.query(
      `UPDATE pixels SET quantity = $1, description = $2 WHERE id = $3`,
      [newQuantity, newDescription, id]
    );
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" });
  }
}
