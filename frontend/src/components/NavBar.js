
import { useState, React } from 'react'
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react'
import { Button, Flex, IconButton, Link, Box } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

let name = "Guest";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        name = user.displayName;
    } else {
        name = "Guest";
    }

    document.getElementById("displayName1").innerText = name;
    document.getElementById("displayName2").innerText = name;
});

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
                align='center'
                justifyContent='flex-end'
            >
                <Flex ml="2rem" display={["none", "none", "flex", "flex", "none"]}>
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
                                    <PopoverBody>Display matches here</PopoverBody>
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
                            <Text
                                color='#03045e'
                                id='displayName2'
                                as='a'
                                my={5}
                                w='100%'
                                ml={1}
                            >{name}</Text>
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
                            <Popover>
                                <PopoverTrigger>
                                    <Button
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
                                    <PopoverHeader>Matches:</PopoverHeader>
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
                            <Text
                                id='displayName2'
                                as='a'
                                my={7}
                                w='100%'
                                ml={1}
                            >{name}</Text>
                        </>)}

                </Flex>
            </Flex>
        </Flex>
    );
};

export default NavBar;
