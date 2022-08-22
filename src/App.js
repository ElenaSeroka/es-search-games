// @ts-nocheck
import './App.css';
import React from 'react';

import MyChart from './components/customers/MyChart.tsx'
import GamesPerYearButton from './components/customers/GamesPerYearButton.tsx';
import GamesCompareJapanEUPAL from './components/customers/GamesCompareJapanEUPAL.tsx';
import GamesPerPublisherButton from './components/customers//GamesPerPublisherButton.tsx';


import { useState, useEffect } from 'react';

function App() {

  const [labels, setLabels] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const [title, setTitle] = useState([]);
  const [lowerLabels1, setlowerLables1] = useState([]);
  const [lowerlabels2, setlowerLables2] = useState([]);

  const ClearGraph = () => {
    setLabels('')
    setFilteredData('')
    setFilteredData2('')
    setTitle('')
    setlowerLables1('')
    setlowerLables2('')
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/games-per-year');
      const dataArrayJSON = await data.json();
      console.log(dataArrayJSON)
      ClearGraph()
      setLabels(dataArrayJSON.length === 0 ? ["pink"] : dataArrayJSON[0].labels)
      setFilteredData(dataArrayJSON.length === 0 ? [0, 0, 0, 0, 0, 0] : dataArrayJSON[0].data.values)
      setTitle(['Games Released Per Year Between 2000 and 2013'])
      setlowerLables1('Total games 2000-2013')
    }

    /* // call the function */
    fetchData()
      /* // make sure to catch any error */
      .catch(console.error);
  }, [])

  const fetchData = async (url) => {
    const data = await fetch(url);
    /* // convert the data to json */
    const dataArrayJSON = await data.json();
    return dataArrayJSON;
  }



  const gamesPerYearChangeData = async () => {
    ClearGraph()
    const dataArrayJSON = await fetchData('/api/games-per-year')
    setLabels(dataArrayJSON.length === 0 ? ["pink"] : dataArrayJSON[0].labels)
    setFilteredData(dataArrayJSON.length === 0 ? [0, 0, 0, 0, 0, 0] : dataArrayJSON[0].data.values)
    setTitle(['Games Released Per Year Between 2000 and 2013'])
    setlowerLables1(['Total games 2000-2013'])
  }

  const gamesPerPublisher = async () => {
    ClearGraph()
    const dataArrayJSON = await fetchData('/api/games-per-publisher');
    setLabels(dataArrayJSON.length === 0 ? ["pink"] : dataArrayJSON[0].labels)
    setFilteredData(dataArrayJSON.length === 0 ? [0, 0, 0, 0, 0, 0] : dataArrayJSON[0].data[0].values)
    setTitle(['Games Released Per Publisher Between 2000 and 2013'])
    setlowerLables1(['Games Released Per Publisher Between 2000 and 2013'])

  }

  const gamesCompareJapanEUPAL = async () => {
    ClearGraph()
    const dataArrayJSON = await fetchData('/api/games-all-years-JP-EU');
    setLabels(dataArrayJSON.length === 0 ? ["pink"] : dataArrayJSON[0].labels)
    setFilteredData(dataArrayJSON.length === 0 ? [0, 0, 0, 0, 0, 0] : dataArrayJSON[0].data[0].values)
    setFilteredData2(dataArrayJSON.length === 0 ? [0, 0, 0, 0, 0, 0] : dataArrayJSON[0].data[1].values)
    setTitle(['Games Released in Japan and EU Between 2000 and 2013'])
    setlowerLables1(dataArrayJSON[0].dataset.country1)
    setlowerLables2(dataArrayJSON[0].dataset.country2)
  }

  return (
    <div className="App">
      <MyChart
        labels={labels}
        data1={filteredData}
        data2={filteredData2}
        title={title}
        lowerLabelRed={lowerLabels1}
        lowerLabelBlue={lowerlabels2}
      />
      <button onClick={() => window.location.reload()}>Refresh page</button>

      <br />

      <GamesPerYearButton
        clickAction={gamesPerYearChangeData}
      />
      <GamesCompareJapanEUPAL
        clickAction={gamesCompareJapanEUPAL} />
      <GamesPerPublisherButton
        clickAction={gamesPerPublisher} />

    </div>
  );
}

export default App;
