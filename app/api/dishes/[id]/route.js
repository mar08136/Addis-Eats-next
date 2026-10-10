
import { dishes } from "../../../lib/dishes";

export async function GET(request, { params }) {
  const { id } = await params;

  const dish = dishes.find((item) => item.id === Number(id));

  if (!dish) {
    return Response.json(
      { error: "No such dish" },
      { status: 404 }
    );
  }

  return Response.json(dish);
}