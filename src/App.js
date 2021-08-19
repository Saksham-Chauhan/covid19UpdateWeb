import React,{useState,useEffect} from "react";
const App = ()=>{
  const [num,setnum]=useState();
  const [data, setdata] = useState([]);
  const [show, setshow] = useState('false');
  const [obj,setobj] = useState({
      Country:'' ,
      CountryCode:'' ,
      date:'' ,
      ID:'' ,
      NewConfirmed:'' ,
      NewDeaths:'' ,
      NewRecovered:'',
      Premium:'',
      Slug:'',
      TotalConfirmed:'',
      TotalDeaths:'',
      TotalRecovered:''
  });
  useEffect(()=>{
    fetch('https://api.covid19api.com/summary').then((dat)=>{
          return dat.json();
                  }).then((data2)=>{
                    let a=data2.Countries;
                    a.map((obj)=>{
                      setdata((p)=>{
                        return [...p,obj]
                      })
                      return null;
                    })
                  }).catch((error)=>{
                    console.log(error);
                  })
        },[]);
        const Click = () =>{
         const {Country, CountryCode, date, ID, NewConfirmed, NewDeaths, NewRecovered,Premium,Slug,TotalConfirmed,TotalDeaths,TotalRecovered} = data[num];
         console.log(data[num]);
         setobj(()=>{
            return {
              Country ,
              CountryCode ,
              date ,
              ID ,
              NewConfirmed ,
              NewDeaths ,
              NewRecovered ,
              Premium,
              Slug,
              TotalConfirmed,
              TotalDeaths,
              TotalRecovered
            }
         })
            setshow(true);
        }
        return(
          <div className='main'>
              <div className='sub'>
                  <h1 className='heading' >Get Covid19 update Live</h1>
                  <select select='' value={num} onChange={(e)=>{
                    setnum(e.target.value);
                    }}>
                    <option>Select Country</option>
                    {
                    data.map((val,ind)=>{
                      return <option value={ind} key={ind}>{val.Country}</option>
                    })   
                  }
                  </select><br />
                  <button onClick={Click}>Search</button>
                      <div className="sec">
                          {
                            show?(
                              <>
                              <h3 className="data">New confirmed case is: {obj.NewConfirmed}</h3>
                              <h3 className="data">New Deaths: {obj.NewDeaths}</h3>
                              <h3 className="data">New Recovered: {obj.NewRecovered}</h3>
                              <h3 className="data">Total confirmed: case is {obj.TotalConfirmed}</h3>
                              <h3 className="data">Total Deaths: {obj.TotalDeaths}</h3>
                              <h3 className="data">Total Recovered: {obj.TotalRecovered}</h3>
                              </>
                            ):null
                          }
                      </div>   
                </div>    
          </div>
        );
}

export default App;
