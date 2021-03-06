import { useState } from 'react'
import { useQuery } from 'react-query'
// Components
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Cart from './Cart/Cart'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import Item from './Item/Item'
import LinearProgress from '@material-ui/core/LinearProgress'
// Styles
import { Wrapper, StyledButton } from './App.styles'
// Types
export type CartItemType = {
    amount: number;
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    title: string;
}

// We are using https://fakestoreapi.com/
const getProducts = async (): Promise<CartItemType[]> =>
    await (await (await fetch('https://fakestoreapi.com/products')).json())

const App = () => {
    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([] as CartItemType[])

    const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

    // console.log(data)

    const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, item) => acc + item.amount, 0)

    const handleAddToCart = (clieckedItem: CartItemType) => {
        setCartItems(prev => {
            const isAdded = prev.find(item => item.id === clieckedItem.id)

            if (isAdded) {
                return prev.map(item => (
                    item.id === clieckedItem.id
                        ? { ...item, amount: ++item.amount }
                        : item
                ))
            }

            return [...prev, { ...clieckedItem, amount: 1 }]
        })
    }

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => (
            prev.reduce((acc, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return acc
                    return [...acc, { ...item, amount: --item.amount }]
                }
                else {
                    return [ ...acc, item ]
                }
            }, [] as CartItemType[] )
        ))
    }

    if (isLoading) return <LinearProgress />
    if (error) return <div>Something went wrong :(</div>

    return (
        <Wrapper>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>

            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                    <AddShoppingCartIcon />
                </Badge>
            </StyledButton>

            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    )
}

export default App
