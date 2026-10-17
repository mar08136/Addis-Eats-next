
"use client";

import { useCallback, useEffect, useState } from "react";

const emptyForm = {
  name: "",
  category: "Fast Food",
  price: "",
  image: "",
  description: "",
  rating: "0",
};

export default function AdminMenuPage() {
  const [dishes, setDishes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadDishes = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/dishes?all=true");
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Could not load menu.");

      setDishes(data.dishes || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function startEdit(dish) {
    setEditingId(dish.id);
    setForm({
      name: dish.name || "",
      category: dish.category || "Fast Food",
      price: String(dish.price ?? ""),
      image: dish.image || "",
      description: dish.description || "",
      rating: String(dish.rating ?? 0),
    });

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/dishes", {
        method: editingId === null ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id: editingId,
          price: Number(form.price),
          rating: Number(form.rating),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not save the dish.");
      }

      resetForm();
      await loadDishes();
      setMessage(editingId === null ? "Dish added successfully." : "Dish updated successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

   
async function removeDish(dish) {
  const confirmed = window.confirm(
    `Remove "${dish.name}" from the customer menu?`
  );

  if (!confirmed) return;

  setMessage("");

  try {
    const response = await fetch("/api/dishes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: dish.id }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    setDishes((current) =>
      current.filter((item) => String(item.id) !== String(dish.id))
    );

    if (String(editingId) === String(dish.id)) {
      resetForm();
    }

    setMessage(`${dish.name} was removed successfully.`);
  } catch (error) {
    setMessage(error.message || "Could not remove the dish.");
  }
}

  const visibleDishes = dishes.filter((dish) =>
    `${dish.name} ${dish.category}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adminPage">
      <div className="adminPageHeader">
        <div>
          <h1>Menu Management</h1>
          <p>Add, edit, and remove dishes from the customer menu.</p>
        </div>
      </div>

      <div className="adminStatsGrid">
        <div className="adminStatCard">
          <span>Total Dishes</span>
          <strong>{dishes.length}</strong>
        </div>

        <div className="adminStatCard">
          <span>Categories</span>
          <strong>{new Set(dishes.map((dish) => dish.category)).size}</strong>
        </div>

        <div className="adminStatCard">
          <span>Menu Status</span>
          <strong className="adminMenuSource">Connected</strong>
        </div>
      </div>

      <section className="adminTableCard adminDishFormCard">
        <div className="adminTableHeader">
          <h2>{editingId === null ? "Add a Dish" : "Edit Dish"}</h2>
          {editingId !== null && (
            <button className="adminSecondaryButton" onClick={resetForm} type="button">
              Cancel
            </button>
          )}
        </div>

        <form className="adminDishForm" onSubmit={handleSubmit}>
          <label>
            Dish name
            <input name="name" value={form.name} onChange={updateField} required />
          </label>

          <label>
            Category
            <select name="category" value={form.category} onChange={updateField}>
              {[
                "Fast Food",
                "Chicken & Fish",
                "Sweets",
                "Breakfast",
                "Drinks",
                "Traditional Food",
              ].map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            Price (ETB)
            <input
              name="price"
              type="number"
              min="1"
              step="0.01"
              value={form.price}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Rating
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={updateField}
            />
          </label>

          <label className="adminDishFormWide">
            Image path or URL
            <input
              name="image"
              value={form.image}
              onChange={updateField}
              placeholder="/images/dish.jpg"
              required
            />
          </label>

          <label className="adminDishFormWide">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              rows={3}
              required
            />
          </label>

          <div className="adminDishFormWide">
            <button className="adminPrimaryButton" disabled={saving} type="submit">
              {saving ? "Saving..." : editingId === null ? "Add Dish" : "Save Changes"}
            </button>
          </div>
        </form>

        {message && <p className="adminDishMessage" role="status">{message}</p>}
      </section>

      <section className="adminTableCard">
        <div className="adminTableHeader adminMenuListHeader">
          <h2>Existing Dishes</h2>
          <input
            className="adminMenuSearch"
            placeholder="Search dishes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {loading ? (
          <p className="adminEmptyState">Loading menu...</p>
        ) : visibleDishes.length === 0 ? (
          <p className="adminEmptyState">No matching dishes found.</p>
        ) : (
          <div className="adminMenuGrid">
            {visibleDishes.map((dish) => (
              <article className="adminMenuCard" key={dish.id}>
                <div className="adminMenuImage">
                  <img src={dish.image} alt={dish.name} />
                </div>

                <div className="adminMenuCardBody">
                  <div className="adminMenuCardTop">
                    <span className="adminMenuCategory">{dish.category}</span>
                    {dish.rating != null && (
                      <span className="adminMenuRating">★ {dish.rating}</span>
                    )}
                  </div>

                  <h2>{dish.name}</h2>
                  <p className="adminMenuDescription">{dish.description}</p>

                  <div className="adminMenuCardFooter">
                    <strong>{dish.price} ETB</strong>
                  </div>

                  <div className="adminDishActions">
                    <button
                      className="adminSecondaryButton"
                      onClick={() => startEdit(dish)}
                      type="button"
                    >
                      Edit
                    </button>

                    <button
                      className="adminDangerButton"
                      onClick={() => removeDish(dish)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
