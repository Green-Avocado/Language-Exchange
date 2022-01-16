import { Box, Flex, Center, Button, Spinner } from "@chakra-ui/react";
import { login } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export const LandingPage = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    navigate("/profile");
  }

  if (loading) {
    return <Spinner />;
  }

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
