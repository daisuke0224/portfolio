//@ts-nocheck
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
initializeApp();
const auth = getAuth();
const firestore = getFirestore();

export const addUser = onCall(async (request) => {
  console.log("Hello from Firebase!");
  const userName = request.data.userName;
  const mailAddress = request.data.mailAddress;
  const password = request.data.password;
  const teamId = request.auth.uid;
  console.log(userName, mailAddress, password);
  const userId = await auth
    .createUser({
      email: mailAddress,
      password: password,
    })
    .then((userRecord) => {
      console.log("Successfully created user:", userRecord.uid);
      return userRecord.uid;
    });
  await firestore.collection("users").doc(userId).set({
    name: userName,
    email: mailAddress,
    id: userId,
    isTeamAdmin: false,
    isValid: true,
    teamId: teamId,
  });
});

export const deleteUser = onCall(async (request) => {
  console.log("Hello from Firebase!");
  const userId = request.data.userId;
  console.log(userId);
  await auth.deleteUser(userId);
  // await firestore.collection("users").doc(userId).set({
  //   name: userName,
  //   email: mailAddress,
  //   id: userId,
  //   isTeamAdmin: false,
  //   isValid: true,
  //   teamId: teamId,
  // });
});
