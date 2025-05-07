import { NextResponse } from "next/server";
import pool from "../db";

export async function GET() {
  try {
    const response = await pool.query(`SELECT * FROM graphs`);
    const graphs = response.rows;
    return NextResponse.json(graphs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" });
  }
}

export async function POST(req) {
  const { graph_id, graph_name, graph_unit, graph_type, graph_color } =
    await req.json();

  try {
    await pool.query(
      `INSERT INTO graphs (graph_id, graph_name, graph_unit, graph_type, graph_color) VALUES ($1, $2, $3, $4, $5)`,
      [graph_id, graph_name, graph_unit, graph_type, graph_color]
    );
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" });
  }
}
