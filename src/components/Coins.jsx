import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setpage] = useState(1);
  const [currency, setcurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setpage(page);
    setloading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setcoins(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fetchCoins();
  }, [currency, page, error]);

  if (error) return <Error message={"Error while fetching coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR ₹</Radio>
              <Radio value={"usd"}>USD $</Radio>
              <Radio value={"eur"}>EUR €</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                symbol={i.symbol}
                price={i.current_price}
                img={i.image}
                key={i.id}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} p={"8"} overflowX={"auto"}>
            {btns.map((item, index) => (
              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                key={index}
                onClick={() => changePage(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
