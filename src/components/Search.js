import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

export default function Search() {

    const [search, setSearch] = useState();
    const [results, setResults] = useState();
    const [progress, setProgress] = useState(false);

    function handleTextchange(e){
        setSearch(e.target.value);
    }

    function googleSearch(){
        if (search !== undefined) {
          const api_Key = "5391ac12f805b937eb815538808e137d";
          const url =
            "http://api.serpstack.com/search?access_key=" +
            api_Key +
            "&type=web&query=" +
            search;

          const userAction = async () => {
            setProgress(true);
            const response = await fetch(url);
            const resultJson = await response.json(); //extract JSON from the http response
            setResults(resultJson);
            setProgress(false);
          };
          userAction();
        }
    }

    function ShowResults(){
        if(results!==undefined && search!==undefined){
            console.table(results.organic_results);
            return (
              <div
                style={{
                  textAlign: "left",
                  width: "50%",
                  marginLeft: "15rem",
                }}
              >
                {results.organic_results.map((item) => {
                  return (
                    <div
                      key={item.title}
                      style={{
                        marginBottom: "2rem",
                      }}
                    >
                      <h4
                        style={{
                          marginBottom: "0",
                          color:'#1a0dab',
                          fontWeight:'500'
                        }}
                      >
                        {item.title}
                      </h4>
                      <a href={item.url} style={{color:'green'}}>{item.url}</a>
                      <p style={{color:"#4d5156",marginTop:"3px"}}>{item.snippet}</p>
                    </div>
                  );
                })}
              </div>
            );
        }else{
            return null;
        }
       
    }

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      {progress ? (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
          }}
        />
      ) : (
        ""
      )}
      <Typography
        variant="h3"
        component="h3"
        style={{
          marginBottom: "3rem",
        }}
      >
        Google Search Results
      </Typography>
      <form autoComplete="off">
        <TextField
          id="search"
          label="Search"
          type="search"
          style={{
            width: "50%",
          }}
          onChange={handleTextchange}
        ></TextField>
        <Button variant="contained" color="primary" onClick={googleSearch}>
          <Typography variant="h5" component="h5">
            Search
          </Typography>
        </Button>
      </form>
      <ShowResults></ShowResults>
    </div>
  );
}
