import { createContext, useState, useEffect } from "react";

export const UnicornContext = createContext();

const API_URL = 'https://crudcrud.com/api/b6c7047d3ae145a2a116bed7821e82fb/unicorns';

export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const [editingUnicorn, setEditingUnicorn] = useState(null);

  // GET
  const getUnicorns = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUnicorns(data);
    } catch (error) {
      console.error("Error al obtener unicornios:", error);
    }
  };

  // POST
  const createUnicorn = async (values) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) getUnicorns();
    } catch (err) {
      console.error("Error al crear unicornio:", err);
    }
  };

  // PUT
  const updateUnicorn = async (values) => {
    if (!editingUnicorn) return;
    try {
      await fetch(`${API_URL}/${editingUnicorn._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setEditingUnicorn(null);
      getUnicorns();
    } catch (err) {
      console.error("Error al actualizar unicornio:", err);
    }
  };

  // DELETE
  const deleteUnicorn = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      getUnicorns();
    } catch (err) {
      console.error("Error al eliminar unicornio:", err);
    }
  };

  useEffect(() => {
    getUnicorns();
  }, []);

  return (
    <UnicornContext.Provider
      value={{
        unicorns,
        getUnicorns,
        createUnicorn,
        updateUnicorn,
        deleteUnicorn,
        editingUnicorn,
        setEditingUnicorn,
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
};
