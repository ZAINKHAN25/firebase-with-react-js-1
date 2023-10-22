import './App.css';

import Singlcomment from './singlecommnet.jsx';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBeuJEvkTZ0IxoaaOONHiZyKgu1kH93v90",
  authDomain: "react-js-d298f.firebaseapp.com",
  projectId: "react-js-d298f",
  storageBucket: "react-js-d298f.appspot.com",
  messagingSenderId: "171843228959",
  appId: "1:171843228959:web:9b149701f606a49e3b4c2a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  let [headinginput, setheadinginput] = useState('');
  let [descriptioninput, setdescriptioninput] = useState('');
  let [allPosts, setallPosts] = useState([]);

  async function addDataToDb() {
    const docRef = await addDoc(collection(db, "posts"), {
      headinginput,
      descriptioninput
    });
    console.log("Document written with ID: ", docRef.id);
  }

  useEffect(() => {
    async function getalldatafromposts() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push(doc.data());
      });
      setallPosts(postsData); // Update allPosts with the array of post data
    }
    getalldatafromposts();
  }, []);

  return (
    <>
      <div className="inputdiv">
        <input className='inputheading' type='text' placeholder='Enter a title here' onChange={(e) => { setheadinginput(e.target.value) }} />
        <textarea className='descriptioninputofinput' onChange={(e) => { setdescriptioninput(e.target.value) }}></textarea>
        <button onClick={addDataToDb}>Click me to post</button>
      </div>
      <div className="jobpostarea">
        {allPosts.map((x, i) => <Singlcomment data={x} key={i} />)}
      </div>
    </>
  )
}
