import * as React from "react";
import { Button, Box, HStack, Center, Container } from "@chakra-ui/react";
import { SetupProfile } from "./SetupProfile";

export const LandingPage = () => {
  return (
    <Container>
      <Center>
        <HStack>
          <Box minW='xl' w='100%' bg='tomato' p='4'>
            1
          </Box>
          <Box minW='xl' w='100%' minV='100%' p='4'>
            <Center>
              <Button>Sign in with Google</Button>
            </Center>
            {/* <SetupProfile /> */}
          </Box>
        </HStack>
      </Center>
    </Container>
  );
};
