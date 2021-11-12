import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeIndex } from "../Modules/column";

const Beerlist = () => {
  const number = useSelector((state) => state.column);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);
  const [beer, setBeer] = useState([]);

  const getData = () => {
    axios({ method: "GET", url: "https://api.punkapi.com/v2/beers" })
      .then((res) => {
        setBeer(res.data);
      })
      .catch((error) => console.log(error));
  };

  const beerData =
    beer &&
    beer.map((ele) => {
      return { name: ele.name, tagline: ele.tagline, abv: ele.abv };
    });

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
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
      />
    </div>
  );
};

export default Beerlist;
