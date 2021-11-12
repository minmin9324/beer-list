import React from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <Container>
      <Box>
        <BeerCardTitle>About a variety of beers!</BeerCardTitle>
        <BeerCard
          hoverable
          cover={<img alt="beerIconImg" src="./images/Flat-Beer.svg" />}
          onClick={() => history.push("/beerlist")}
        >
          <Card.Meta
            title="You can see the beer list!"
            description="Click !!"
          />
        </BeerCard>
      </Box>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Box = styled.div`
  margin: auto 0;
`;

const BeerCardTitle = styled.h1`
  color: RGB(239, 199, 74);
`;

const BeerCard = styled(Card)`
  width: 340px;
  padding: 20px;
`;
