// Components
import CartItem from '../CartItem/CartItem'
// Styles
import { Wrapper } from './Cart.styles'
// Types
import { CartItemType } from '../App'

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calcTotal = (items: CartItemType[]) =>
        items.reduce((acc, item) => acc + item.amount * item.price, 0)

    return <Wrapper>
        <h2>Your shopping cart</h2>

        {cartItems.length === 0 && <p>No items in the cart</p>}

        {cartItems.map(item => (
            <CartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
            />
        ))}

        <h2>Total: ${calcTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
}

export default Cart
