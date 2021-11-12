import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import styled from "styled-components";
import { getDefaultNormalizer } from "@testing-library/dom";

const Beerlist = () => {
  useEffect(() => {
    getData();
  }, []);
  const [beer, setBeer] = useState([]);
  const [index, setIndex] = useState({ 0: "name", 1: "tagline", 2: "abv" });

  const getData = () => {
    axios({ method: "GET", url: "https://api.punkapi.com/v2/beers" })
      .then((res) => {
        setBeer(res.data);
        console.log(res);
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
          const changeIndex = { ...index };
          changeIndex[a] = index[b];
          changeIndex[b] = index[a];
          setIndex(changeIndex);
        }}
        columns={[
          { title: index[0], field: index[0] },
          { title: index[1], field: index[1] },
          { title: index[2], field: index[2] },
        ]}
        data={beerData}
        title="Demo Title"
      />
    </div>
  );
};

export default Beerlist;
