import { useState, React } from "react";
import { Text } from "@chakra-ui/react";
import { Button, Flex, IconButton, Link, Spinner } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const NavBar = () => {
    const [user, loading, error] = useAuthState(auth);
    const [display, changeDisplay] = useState("none");

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <Flex w='100vw' h='100px' bg='#b6ccfe'>
            <Flex
                // pos="fixed"
                // top='1rem'
                // right='1rem'
                ml='20px'
                align='center'
                justifyContent='flex-end'
            >
                <Flex display={["none", "none", "flex", "flex"]}>
                    <Link href='/'>
                        <Button fontWeight='bold' color='#5e60ce' as='a' variant='ghost' aria-label='Home' my={5} w='100%'>
                            Home
                        </Button>
                    </Link>
                    <Link href='/search'>
                        <Button fontWeight='bold' color='#5e60ce' as='a' variant='ghost' aria-label='Search' my={5} w='100%'>
                            Search
                        </Button>
                    </Link>
                    {user && (
                        <>
                            <Link href='/'>
                                <Button
                                    as='a'
                                    variant='ghost'
                                    aria-label='Landing'
                                    my={5}
                                    w='100%'
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Button>
                            </Link>
                            <Text as='a' my={7} w='100%' ml={1}>
                                Username
                            </Text>
                        </>
                    )}
                </Flex>
                <IconButton
                    aria-label='Open Menu'
                    size='lg'
                    mr={2}
                    icon={<HamburgerIcon />}
                    display={["flex", "flex", "none", "none"]}
                    onClick={() => changeDisplay("flex")}
                />
            </Flex>

            <Flex
                w='100vw'
                bgColor='gray.50'
                zIndex={20}
                h='100vh'
                pos='fixed'
                top='0'
                left='0'
                overflow='auto'
                flexDir='column'
                display={display}
            >
                <Flex justify='flex-end'>
                    <IconButton
                        mt={2} // margin top
                        mr={2} // margin right
                        aria-label='Close Menu'
                        size='lg'
                        icon={<CloseIcon />}
                        onClick={() => changeDisplay("none")}
                    />
                </Flex>
                <Flex flexDir='column' align='center'>
                    <Link href='/'>
                        <Button as='a' variant='ghost' aria-label='Home' my={5} w='100%'>
                            Home
                        </Button>
                    </Link>
                    <Link href='/search'>
                        <Button as='a' variant='ghost' aria-label='Search' my={5} w='100%'>
                            Search
                        </Button>
                    </Link>
                    {user && (
                        <>
                            <Link href='/'>
                                <Button
                                    as='a'
                                    variant='ghost'
                                    aria-label='Landing'
                                    my={5}
                                    w='100%'
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Button>
                            </Link>
                            <Text as='a' my={7} w='100%' ml={1}>
                                Username
                            </Text>
                        </>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default NavBar;
