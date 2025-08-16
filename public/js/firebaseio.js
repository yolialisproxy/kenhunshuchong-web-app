// static/js/firebaseio.js - Final Modular API Version

import { initializeApp } from "firebase/app";
// [核心修改] 导入 serverTimestamp 函数，移除 ServerValue
import { getDatabase, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAIiUuTYuLA-r0qVgCGAAh5MqD3PHf2tgY",
  authDomain: "kenhunshuchong.firebaseapp.com",
  databaseURL: "https://kenhunshuchong-default-rtdb.firebaseio.com",
  projectId: "kenhunshuchong",
  storageBucket: "kenhunshuchong.firebasestorage.app",
  messagingSenderId: "393081601809",
  appId: "1:393081601809:web:17cbc58d6c6a72cf1916b0",
  measurementId: "G-QDKFP4QCT8"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 获取 Realtime Database 服务实例并导出
export const database = getDatabase(app);

// [核心修改] 导出 serverTimestamp 函数，以便其他模块可以使用
export { serverTimestamp };
