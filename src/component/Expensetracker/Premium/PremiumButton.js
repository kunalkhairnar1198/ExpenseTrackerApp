import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import './Premium.css'
import { useDispatch, useSelector } from 'react-redux'
import { themeAction } from '../../../ReduxStore/ThemeReducer/theme-slice'
import Papa from 'papaparse';

const PremiumButton = () => {
  const darkModeState = useSelector(state => state.theme.darkMode)
  const expenseLists = useSelector(state => state.expense.expenseData)
  const [isDarkmode, setIsDarkmode] = useState(darkModeState)
  const dispatch = useDispatch()

  const darkModeHandler =()=>{
    setIsDarkmode(!darkModeState)
  }
    
  const ToggleDarkMode =()=>{
    dispatch(themeAction.toggleTheme())
  }

  const DownloadCsv = (filename, data) => {

    const csvContent = Papa.unparse(data)
    const blob = new Blob([csvContent], { type: 'text/csv' });
  
    const url = URL.createObjectURL(blob);
  
    // Create an anchor element to trigger download
    const downloadableLink = document.createElement('a');
    downloadableLink.href = url;
    downloadableLink.setAttribute('download', filename);
  
    // trigger then execute to click
    downloadableLink.click();
  
  };
  

  const convertObjectToCsv =()=>{
    const csv =[]
    csv.push(['description','category','price'])

    for(const name in expenseLists){
      const row = []

      row.push(expenseLists[name].description)
      row.push(expenseLists[name].category)
      row.push(expenseLists[name].price)
      csv.push(row)
    }
    console.log(csv)
    DownloadCsv('expense.csv', csv)
    return csv
   
  }

  const downloadHandler =()=>{
    convertObjectToCsv()
  }

  return (
    <>
    <div className='d-flex align-items-center gap-3'>
      <Button className='btn' variant='danger' onClick={darkModeHandler}>
        Premium Activate
      </Button>

     {isDarkmode &&  <label className='switch'>
        <span className='sun'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
        <span className='moon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
        <input type="checkbox" className='input' name='Dark Mode Toggle' onChange={ToggleDarkMode}></input>
        <span className='slider'></span>
      </label>}

      {isDarkmode && <button className="Btn" onClick={downloadHandler}>
          <svg
            className="svgIcon"
            viewBox="0 0 384 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
            ></path>
          </svg>
          <span className="icon2"></span>
          <span className="tooltip">Download</span>
        </button>}

    </div>
    </>
  )
}

export default PremiumButton
