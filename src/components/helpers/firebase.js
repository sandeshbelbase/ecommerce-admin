// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { firebaseConfig } from "./firebase_config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const firestore = getFirestore(app);
const auth = getAuth();

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unSub;
  }, [currentUser]);
  return currentUser;
}
export async function logOut() {
  try {
    await signOut(auth);
    return;
  } catch {
    console.log("failed");
  }
}

export async function getImageUrl(file, folderName, subFolderName) {
  let storageRef;
  if (subFolderName) {
    storageRef = ref(storage, `/${folderName}/${subFolderName}${file?.name}`);
  } else {
    storageRef = ref(storage, `/${folderName}/${file?.name}`);
  }
  let uploadTask = await uploadBytes(storageRef, file, {
    contentType: file?.type ?? "image/jpeg",
  });
  const path = uploadTask.ref.fullPath;
  const url = await getDownloadURL(uploadTask.ref);
  return {
    path,
    url,
  };
}

export async function addProduct(reqProduct) {
  const { update, image, ...product } = reqProduct;
  const ref = doc(collection(firestore, "products"));
  if (!product?.productCode)
    product.productCode = "#1000-" + Math.floor(Math.random() * 1000);

  console.log({ product });
  if (!update) {
    product.updatedAt = null;
    product.createdAt = Date.now();

    product.id = ref.id;
    await setDoc(ref, product);
  } else {
    product.updatedAt = Date.now();
    const docRef = doc(firestore, "products", product.id);
    await setDoc(docRef, product, {
      merge: true,
    });
  }
}

export async function addBanner(banner, id) {
  const ref = doc(collection(firestore, "banners"));
  if (id) {
    banner.updatedAt = Date.now();
    const docRef = doc(firestore, "banners", id);
    await setDoc(docRef, banner, {
      merge: true,
    });
  } else {
    banner.updatedAt = null;
    banner.createdAt = Date.now();
    banner.id = ref.id;
    await setDoc(ref, banner);
  }
}

export async function getBanners() {
  const querySnapshot = await getDocs(collection(firestore, "banners"));
  return querySnapshot.docs.map((doc) => doc.data());
}
export async function deleteBanner(id) {
  const docRef = doc(firestore, "banners", id);
  await deleteDoc(docRef);
}
export async function getBannerById(id) {
  const bannerRef = doc(firestore, "banners", id);
  const bannerSnap = await getDoc(bannerRef);
  if (bannerSnap.exists) {
    return bannerSnap.data();
  }
}

export async function deleteStoragereference(path) {
  try {
    const deleteRef = ref(storage, path);
    return await deleteObject(deleteRef);
  } catch (e) {
    console.log(e);
  }
}
export async function deleteDocument(id, collectionName) {
  return await deleteDoc(doc(firestore, `${collectionName}/${id}`));
}

export async function getAllProduct(cb) {
  const docSnap = collection(firestore, "products");
  const q = query(docSnap, orderBy("createdAt", "desc"));

  onSnapshot(q, (snap) => {
    const allProduct = [];
    snap.docs.forEach((doc) => {
      allProduct.push(doc.data());
    });
    cb(allProduct);
  });
}
