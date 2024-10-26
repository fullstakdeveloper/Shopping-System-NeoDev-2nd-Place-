import Navbar from "./navbar";
import "./dashboard.css";
import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  var logData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const url = `"https://classic-collie-ultimately.ngrok-free./logs?start_data=0&end_date=${},"`
        const response = await fetch('https://classic-collie-ultimately.ngrok-free.app/logs/?start_date=0&end_date=999999999',{headers:{"ngrok-skip-browser-warning": "just-fucking-do-it-already-you-stupid-bastard"}});
        // response=JSON.parse(response)
        // console.log(JSON.parse(response));

        // console.log(fetch('https://classic-collie-ultimately.ngrok-free.app/logs'));
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        logData=result.logs.data
        
        // console.log(logData)
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {    
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
//   console.log(JSON.parse(JSON.stringify(data, null, 2)));
  return (
    <div>
        {/* <h1>{data}</h1> */}
        <h1>Fetched Data:</h1>
        {/* <pre>{logData.map(datum => datum.name + " " + datum.cost)}</pre> */}
    </div>
  );
};

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="infoStack">
        <h1>TRANSACTIONS</h1>
        <div className="container" id="transactionBody">
          <div className="inner-container">
            <DataFetcher />  
          </div>
        </div>
        <h1>INVENTORY</h1>
        <div className="container" id="inventoryBody">
          <div className="inner-container">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
