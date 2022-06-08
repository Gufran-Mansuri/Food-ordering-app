import React, {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [btn,setBtn] = useState(false);
    const ctx = useContext(CartContext);
    const numberOfCartItems = ctx.item.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0 )
    const buttonClasses = `${styles.button} ${btn ? styles.bump: ""}`;
    const {item} = ctx;
    useEffect(() => {
        if(ctx.item.length === 0){
            return;
        }
        setBtn(true)
        const timer = setTimeout(() => {
            setBtn(false)
        }, 300)
        return () => {
            clearTimeout(timer);
        }
    } , [item]);
    
    return(
        <button className={buttonClasses} onClick={props.onClick} >
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge} > 
                 {numberOfCartItems}
            </span>
        </button>
    )
};

export default HeaderCartButton;