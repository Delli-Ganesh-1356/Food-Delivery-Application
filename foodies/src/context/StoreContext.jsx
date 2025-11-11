import { createContext, useEffect, useState, useMemo } from "react";
import { fetchFoodList, loginUser } from "../Service/FoodService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ------------------------------
  // Cart Functions
  // ------------------------------
  const increaseQty = (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
  };

  const decreaseQty = (foodId) => {
    setQuantities((prev) => {
      if (!prev[foodId]) return prev;
      const updated = { ...prev };
      if (prev[foodId] === 1) {
        delete updated[foodId];
      } else {
        updated[foodId] -= 1;
      }
      return updated;
    });
  };

  const removeFromCart = (foodId) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[foodId];
      return updated;
    });
  };

  // ------------------------------
  // Login Function
  // ------------------------------
  const login = async (credentials) => {
    try {
      setLoading(true);
      const data = await loginUser(credentials);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      return true;
    } catch (err) {
      setError("Login failed. Please check credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Load token on startup
  // ------------------------------
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // ------------------------------
  // Fetch foods whenever token changes
  // ------------------------------
  useEffect(() => {
    async function loadData() {
      if (!token) {
        setFoodList([]);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFoodList(token);
        setFoodList(data);
      } catch (err) {
        setError("Failed to load food list.");
        setFoodList([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  // ------------------------------
  // Memoized Context Value
  // ------------------------------
  const contextValue = useMemo(
    () => ({
      foodList,
      increaseQty,
      decreaseQty,
      quantities,
      removeFromCart,
      token,
      setToken,
      login,
      loading,
      error,
    }),
    [foodList, quantities, token, loading, error]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
