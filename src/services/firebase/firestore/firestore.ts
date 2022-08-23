import { getFirestore, doc, setDoc, deleteDoc, getDocs, collection, addDoc } from "firebase/firestore"
import { app } from '../firebase'
import { Items } from '../model'

const db = getFirestore(app);

export const deleteItem = async (item: Items) => {
  try {
    await deleteDoc(doc(db, "Items", item.id));
  } catch (e) {
    console.error("Error deleting item: ", e);
  }
}

export const updateItem = async (item: Items) => {
  try {
    await setDoc(doc(db, "Items", item.id), {
      name: item.name,
      type: item.type,
      sub_category: item.sub_category,
      unit_name: item.unit_name,
      stock_limit: item.stock_limit
    });
  } catch (e) {
    console.error("Error updating item: ", e);
  }
}

// export const getDocs = async (col: string, cond: string, limit: number) => {
export const getAllDocs = async (col: string) => {
  const querySnapshot = await getDocs(collection(db, col))
  const items: Array<Items> = []
  querySnapshot.forEach((doc: any) => {
    items.push({ id: doc.id, ...doc.data() })
  });

  return items
}

export const addItem = async (name: string, type: string, sub_category: Array<string>, unit_name: Array<string>, stock_limit: number) => {
  try {
    const docRef = await addDoc(collection(db, "Items"), {
      name: name,
      type: type,
      sub_category: sub_category,
      unit_name: unit_name,
      stock_limit: stock_limit
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding item: ", e);
  }
}

