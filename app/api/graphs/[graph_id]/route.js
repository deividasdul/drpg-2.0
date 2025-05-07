import { NextResponse } from "next/server";
import pool from "../../db";

export async function DELETE(req, context) {
  const params = await context.params;

  try {
    await pool.query(`DELETE FROM graphs WHERE graph_id = $1`, [
      params.graph_id,
    ]);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" });
  }
}

export async function PUT(req, context) {
  const params = await context.params;
  const { graph_name, graph_unit, graph_color } = await req.json();

  try {
    console.log(params.graph_id);
    await pool.query(
      `UPDATE graphs SET graph_name = $1, graph_unit = $2, graph_color = $3 WHERE graph_id = $4`,
      [graph_name, graph_unit, graph_color, params.graph_id]
    );
    return NextResponse.json({ message: "Succes" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed" });
  }
}
