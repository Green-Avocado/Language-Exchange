import * as React from "react";
import { Flex, Spacer, Box, HStack, Center, Container } from "@chakra-ui/react";
import { SetupProfile } from "./SetupProfile";

export const LandingPage = () => {
  return (
    <Container>
      <Center>
        <HStack>
          <Box minW='xl' w='100%' bg='tomato' p='4'>
            1
          </Box>
          <Box minW='xl' w='100%' p='4'>
            <SetupProfile />
          </Box>
        </HStack>
      </Center>
    </Container>
  );
};
