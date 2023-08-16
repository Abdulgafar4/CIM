import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { message } from "antd";

 export const fetchData = async (userId, collectionName, setLoading, setData) => {
  setLoading(true);
  try {
    const querySnapshot = await getDocs(collection(db, `users/${userId}/${collectionName}`), orderBy('createAt', 'asc'));
    const fetchedData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setData(fetchedData);
    setLoading(false);
  } catch (error) {
    message.error(error.code);
    setLoading(false);
  }
};

export const handleDelete = async (id, userId, title, collectionName, setLoading, setData) => {
  try {
    const docRef = doc(db, `users/${userId}/${collectionName}/${id.toString()}`);
    await deleteDoc(docRef);
    message.success(`${title} deleted successfully`);
    fetchData(userId, collectionName, setLoading, setData)
  } catch (error) {
    message.error(error.code);
  }
};

export const create = async (userId, values, title, collectionName) => {
  try {
    const collectionRef = collection(db, `users/${userId}/${collectionName}`);
    const docRef = await addDoc(collectionRef, values);
    const documentId = docRef.id;
    const documentRef = doc(db, `users/${userId}/${collectionName}/${documentId}`);
    const updatedValues = { ...values, id: documentId, createAt: serverTimestamp()};
    await updateDoc(documentRef, updatedValues);
    message.success(`${title} Added Successfully`);
  } catch (error) {
    message.error(error.message);
  }
};