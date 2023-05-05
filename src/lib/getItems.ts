import { firestore } from "@/lib/firebase";
import { IItem } from "@/store/items";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";

const itemsCollection = collection(firestore, "items");

export const getItems = async (id: string) => {
  const itemsQuery = query(
    itemsCollection,
    orderBy("name", "asc"),
    where("categoryId", "==", id)
  );

  const querySnapshot = await getDocs(itemsQuery);

  const results: IItem[] = [];

  for (const snapshot of querySnapshot.docs) {
    results.push({
      id: snapshot.id,
      ...snapshot.data(),
    } as IItem);
  }

  return results;
};
