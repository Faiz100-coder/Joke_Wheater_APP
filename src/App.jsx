// import React, { useState } from 'react'

import Joker from './Joker';




import React, { useState, useEffect } from 'react';

import axios from 'axios';
const App = () => {

  const [post, setPost] = useState([]); // Initialize post as an empty array



  // Use useEffect to fetch data once when the component mounts

  useEffect(() => {

    axios.get("https://jsonplaceholder.typicode.com/users")

      .then((response) => {

        console.log(response.data);

        setPost(response.data); // Set the fetched data

      })

      .catch((error) => {

        console.error("Error fetching data:", error);

      });

  }, []); // Empty dependency array ensures it runs only once



  return (

    <div style={{ textAlign: 'center' }}>

      <Joker />


    </div>


  );

}



export default App;

