import {useContext} from 'react';
import styles from './MealsItem.module.css';
import MealsItemForm from './MealsItemForm';
import CartContext from '../../../store/cart-context';

const MealsItems = (props) => {
    const ctx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const add = amount => {
        ctx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        })
    }
    return(

        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description} >{props.description}</div>
                <div className={styles.price} >{price}</div>
            </div>
            <div>
                <MealsItemForm  onAdd={add}/>
            </div>
        </li>
    )
};

export default MealsItems;
