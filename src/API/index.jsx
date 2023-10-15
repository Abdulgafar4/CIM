import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../config/firebase"; 
import { message } from "antd";

const formatDate = (date) => {
  const options = { 
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
  };
  return date.toLocaleString('en-US', options);
};

export const fetchData = async (userId, collectionName, setLoading, setData) => {
  setLoading(true);
  try {
    const querySnapshot = await getDocs(collection(db, `users/${userId}/${collectionName}`));
    const fetchedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    // Sort the data by createdAt in descending order
    fetchedData.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));

    setData(fetchedData);
  } catch (error) {
    message.error("Error fetching data: " + error.message);
  } finally {
    setLoading(false);
  }
};


export const handleDelete = async (id, userId, title, collectionName, setLoading, setData) => {
  try {
    const docRef = doc(db, `users/${userId}/${collectionName}/${id}`);
    await deleteDoc(docRef);
    message.success(`${title} with the ID ${id} deleted successfully`);
    await fetchData(userId, collectionName, setLoading, setData);
  } catch (error) {
    message.error("Error deleting data: " + error.message);
  }
};

export const create = async (userId, values, title, collectionName) => {
  try {
    const createdAt = new Date();
    const formattedDate = formatDate(createdAt);

    const collectionRef = collection(db, `users/${userId}/${collectionName}`);
    const docValues = { ...values, createdAt: formattedDate };
    const docRef = await addDoc(collectionRef, docValues);
    const documentId = docRef.id;
    const documentRef = doc(db, `users/${userId}/${collectionName}/${documentId}`);
    const updatedValues = { ...values, id: documentId };
    await updateDoc(documentRef, updatedValues);
  } catch (error) {
    message.error("Error creating data: " + error.message);
    console.log(error);
  }
};
