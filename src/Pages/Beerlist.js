import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeIndex } from "../Modules/column";

const Beerlist = () => {
  const number = useSelector((state) => state.column);
  const dispatch = useDispatch();
  const [allBeerlist, setAllBeerlist] = useState([]);
  const [beer, setBeer] = useState([]);

  const [abvScope, setAbvScope] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({ method: "GET", url: "https://api.punkapi.com/v2/beers" })
      .then((res) => {
        setBeer(res.data);
        setAllBeerlist(res.data);
      })
      .catch((error) => console.log(error));
  };

  const beerData =
    beer &&
    beer.map((ele) => {
      return { name: ele.name, tagline: ele.tagline, abv: ele.abv };
    });

  const handleAbv = (e) => {
    const { id, value } = e.target;
    id === "min"
      ? setAbvScope((prevState) => ({ ...prevState, min: value }))
      : setAbvScope((prevState) => ({ ...prevState, max: value }));
  };

  const handlefilterSubmit = () => {
    let filterResult = allBeerlist.filter((ele) => {
      return Number(abvScope.min) <= ele.abv && ele.abv <= Number(abvScope.max);
    });

    setBeer(filterResult);
  };

  return (
    <BeerlistContainer>
      <BeerlistBox>
        <MaterialTable
          class="table"
          onColumnDragged={(a, b) => {
            dispatch(changeIndex([a, b]));
          }}
          columns={[
            { title: number[0], field: number[0] },
            { title: number[1], field: number[1] },
            { title: number[2], field: number[2] },
          ]}
          data={beerData}
          title="Demo Title"
          options={{
            sorting: false,
            headerStyle: {
              backgroundColor: "#efc74a",
              color: "#FFF",
            },
          }}
          actions={[
            {
              icon: "save",
              tooltip: "Save User",
              onClick: (event, rowData) => alert("You saved " + rowData.name),
            },
          ]}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <AbvInput
                  value={abvScope.min}
                  id="min"
                  onChange={(e) => handleAbv(e)}
                  placeholder="0"
                />
                ~
                <AbvInput
                  value={abvScope.max}
                  id="max"
                  onChange={(e) => handleAbv(e)}
                  placeholder="55"
                />
                <button onClick={handlefilterSubmit}>filter</button>
              </div>
            ),
            Action: (props) => {
              return (
                <Button
                  onClick={(event) => props.action.onClick(event, props.data)}
                  color="red"
                  variant="contained"
                  size="small"
                >
                  My Button
                </Button>
              );
            },
          }}
        ></MaterialTable>
      </BeerlistBox>
    </BeerlistContainer>
  );
};

export default Beerlist;

const BeerlistContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BeerlistBox = styled.div`
  width: 80%;
`;

const Button = styled.button`
  text-transform: "none";
`;

const AbvInput = styled.input`
  width: 50px;
  margin: 10px;
`;
