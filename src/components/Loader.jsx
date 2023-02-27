import React from "react";
import { Spinner, Box, VStack } from "@chakra-ui/react";

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"Center"}>
      <Box transform={"scale(3)"}>
        <Spinner size={"xl"} />
      </Box>
    </VStack>
  );
};

export default Loader;
