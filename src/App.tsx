import { useState } from 'react'
import { useQuery } from 'react-query'
// Components
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import Item from './Item/Item'
import LinearProgress from '@material-ui/core/LinearProgress'
// Styles
import { Wrapper } from './App.styles'
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
    const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

    console.log(data)

    const getTotalItems = () => null

    const handleAddToCart = (clieckedItem: CartItemType) => null

    const handleRemoveFromCart = () => null

    if (isLoading) return <LinearProgress />
    if (error) return <div>Something went wrong :(</div>

    return (
        <Wrapper>
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
