import { useEffect } from "react";
import { Box, Flex, Center, Button } from "@chakra-ui/react";
import { login } from "../../firebase.js";
import { getAuth } from "firebase/auth";

export const LandingPage = () => {
  const auth = getAuth();
  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <Flex justify='space-between'>
      <Box minW='xl' w='100%' minH='100vh' bg='tomato' p='4'>
        Description
      </Box>
      <Box minW='xl' w='100%' minH='100%' p='4'>
        <Center>
          <Button onClick={login}>Sign in with Google</Button>
        </Center>
      </Box>
    </Flex>
  );
};
