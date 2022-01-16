import { useState, React } from 'react'
import { Button, Flex, IconButton, Link } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

const NavBar = () => {
    const [display, changeDisplay] = useState('none')
    return (
        <Flex>
            <Flex 
                pos="fixed"
                top='1rem'
                right='1rem'
                align='center'>

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
            </Flex>
            </Flex>
        </Flex>
    )
}

export default NavBar
