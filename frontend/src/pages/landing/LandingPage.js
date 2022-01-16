import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { SetupProfile } from "./SetupProfile";

export const LandingPage = () => {
  return (
    <Flex justify='space-between'>
      <Box minW='xl' w='100%' minH='100vh' bg='tomato' p='4'>
        Description
      </Box>
      <Box minW='xl' w='100%' minH='100%' p='4'>
        {/* <Center>
              <Button>Sign in with Google</Button>
            </Center> */}
        <SetupProfile />
      </Box>
    </Flex>
  );
};
