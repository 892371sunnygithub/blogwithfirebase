import { createContext, useContext, useEffect, useState } from "react";
import { app, fireDB } from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState(null);
  const [realData, setRealData] = useState([]);
  const getData = JSON.parse(localStorage.getItem("user"));
  const getFirebaseData = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "users"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsers(fetchedData);
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };
  const getFirebaseBlogs = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(fireDB, "blogs"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      setLoading(false);
    }
  };

  const dbRef = getDatabase(app);
  const getRealtimeData = () => {
    const starCountRef = ref(dbRef, "realtimeuserdata");
    onValue(starCountRef, (snapshot) => {
      const dataObject = snapshot.val();
      if (dataObject) {
        const dataArray = Object.keys(dataObject).map((key) => ({
          id: key,
          ...dataObject[key],
        }));
        setRealData(dataArray);
      }
    });
  };

  useEffect(() => {
    setUserData(getData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        allUsers,
        setLoading,
        getFirebaseData,
        setAllUsers,
        userData,
        setUserData,
        blogs,
        setBlogs,
        getFirebaseBlogs,
        realData,
        setRealData,
        getRealtimeData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
