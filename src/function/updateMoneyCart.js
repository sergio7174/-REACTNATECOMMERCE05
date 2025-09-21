import { collection, getDocs, query, where, updateDoc, addDoc, doc } from "firebase/firestore";
import app from '../firebase/firebaseConfig';
import { useUser } from "@clerk/clerk-react";

export default function UpdateMoneyCart() {

  const db = getFirestore(app);
    // comes from clerk user
  const { user } = useUser();
  const email = user.primaryEmailAddress.emailAddress;

const userRef = collection(db, 'user');
    getDocs(query(userRef, where('email', '==', email)))
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          let key = '';
          querySnapshot.forEach((doc) => {
            key = doc.id;
          })
          updateDoc(doc(db, 'user', key), { email: email, money: money })
            .then(() => {
            })
            .catch(error => console.error(error));
        }
        else if (querySnapshot.empty) {
          addDoc(collection(db, 'user'), { email: email, money: money })
        }
      });

return UpdateMoneyCart;
}