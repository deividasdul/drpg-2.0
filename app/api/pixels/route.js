import { NextResponse } from "next/server";
import pool from "../db";

export async function GET() {
  try {
    const response = await pool.query(`
      SELECT pixels.id, graphs.graph_id, graph_name, graph_unit, graph_type, date, quantity, description
      FROM pixels
      INNER JOIN graphs ON pixels.graph_id = graphs.id
`);
    const pixels = response.rows;
    return NextResponse.json(pixels);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" });
  }
}

export async function POST(req) {
  const { id, date, quantity, description } = await req.json();
  try {
    await pool.query(
      `INSERT INTO pixels (graph_id, date, quantity, description) VALUES ($1, $2, $3, $4)`,
      [id, date, quantity, description]
    );
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" });
  }
}
