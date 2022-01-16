import { useState, React } from 'react'
import { Text } from '@chakra-ui/react'
import { Button, Flex, IconButton, Link, Box } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { getAuth, onAuthStateChanged } from "firebase/auth"

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
    const [display, changeDisplay] = useState('none')
    return (
        <Flex w='100vw' h='100px'>
            <Flex
                // pos="fixed"
                // top='1rem'
                // right='1rem'
                align='center'
                justifyContent='flex-end'>

            <Flex 
                display={['none', 'none', 'flex', 'flex']}>
            <Link href='/'>
                <Button
                    as='a'
                    variant='ghost'
                    aria-label='Home'
                    my={5}
                    w='100%'
                >
                    Home
                </Button>
            </Link>
            <Link href='/search'>
                <Button
                    as='a'
                    variant='ghost'
                    aria-label='Search'
                    my={5}
                    w='100%'
                >
                    Search
                </Button>
            </Link>
            <Text
                id='displayName1'
                as='a'
                my={7}
                w='100%'
                ml={1}
                >{name}</Text>
 
            </Flex>
            <IconButton 
                aria-label='Open Menu'
                size='lg' 
                mr={2}
                icon={<HamburgerIcon/>}
                display={['flex', 'flex', 'none', 'none']}
                onClick={() => changeDisplay('flex')}
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
                            icon={<CloseIcon/>}
                            onClick={() => changeDisplay('none')}
                            />
                    </Flex>
            <Flex 
                flexDir='column'
                align='center'>
            <Link href='/'>
                <Button
                    as='a'
                    variant='ghost'
                    aria-label='Home'
                    my={5}
                    w='100%'
                >
                    Home
                </Button>
            </Link>
            <Link href='/search'>
                <Button
                    as='a'
                    variant='ghost'
                    aria-label='Search'
                    my={5}
                    w='100%'
                >
                    Search
                </Button>
            </Link>
            <Text
                id='displayName2'
                as='a'
                my={7}
                w='100%'
                ml={1}
                >{name}</Text>
            
            </Flex>
            </Flex>
        </Flex>
    )
}

export default NavBar
