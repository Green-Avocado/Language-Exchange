import { useState, React } from 'react'
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react'
import { Button, Flex, IconButton, Link, Box } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

let name = "Guest";
const auth = getAuth();

const NavBar = () => {
    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [display, changeDisplay] = useState("none");

    const nextUser = () => {
        let temp = [...users];
        temp.splice(0, 1);
        setUsers(temp);
      };

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
        <Flex bg='#b6ccfe' w='100vw' h='100px'>
            <Flex
                // pos="fixed"
                // top='1rem'
                // right='1rem'
                align='center'
                justifyContent='flex-end'
            >
                <Flex display={["none", "none", "flex", "flex"]}>
                    <Link href='/'>
                        <Button color='#03045e' as='a' variant='ghost' aria-label='Home' my={5} w='100%'>
                            Home
                        </Button>
                    </Link>
                    <Link href='/search'>
                        <Button color='#03045e' as='a' variant='ghost' aria-label='Search' my={5} w='100%'>
                            Search
                        </Button>
                    </Link>
                    {user && (
                        <>
                            <Popover>
                                <PopoverTrigger>
                                    <Button
                                        color='#03045e'
                                        as='a'
                                        variant='ghost'
                                        aria-label='Landing'
                                        my={5}
                                        w='100%'
                                    >
                                        Matches
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader fontWeight='bold'>Matches:</PopoverHeader>
                                    <PopoverBody>
                                        <Box bg='#d7e3fc' padding='5px'>
                                        <Text fontWeight='semibold' id='match'>
                                            Jason - 19 
                                            (jasonemail@gmail.com)
                                        </Text>
                                        <Text>English - Advanced</Text>
                                        <Text>French - Intermediate</Text>
                                        <Text>Spanish - Beginner</Text>
                                        </Box>
                                        <Box>
                                        <Text fontWeight='semibold' id='match2'>
                                            John - 30
                                            (johnemail@gmail.com)
                                        </Text>
                                        <Text>English - Beginner</Text>
                                        </Box>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                            <Link href='/'>
                                <Button
                                    color='#03045e'
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
                        </>
                    )}
                    <Text color='#03045e' as='a' my={7} w='100%' ml={1}>
                        {user?.displayName}
                    </Text>
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
                        ml={2} 
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
                            <Popover>
                                <PopoverTrigger>
                                    <Button
                                        color='#03045e'
                                        as='a'
                                        variant='ghost'
                                        aria-label='Landing'
                                        my={5}
                                        w='100%'
                                    >
                                        Matches
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader fontWeight='bold'>Matches:</PopoverHeader>
                                    <PopoverBody>Display matches here</PopoverBody>
                                </PopoverContent>
                            </Popover>
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
                        </>
                    )}
                    <Text as='a' my={7} w='100%' ml={1}>
                        {user?.displayName}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default NavBar;
