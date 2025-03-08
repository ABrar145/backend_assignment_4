import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import  serviceAccount from "../../assignment04-ba6c3-firebase-adminsdk-fbsvc-b4a4168fe9.json";
 
// Initialize Firebase Admin SDK
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});
 
const auth: Auth = getAuth();
const db: Firestore = getFirestore();
 
export { auth, db };