import { doc, setDoc, updateDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from '../FirebaseConfig/FirebaseConfig';
import './CartCard.css'
import deletebtn from '../Components/Assets/deletebtn.png'


const CartCard = (props) => {
    const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);

    let p = props.itemdata.product.price
    let mrp = parseInt(p)
    const saleprice = (mrp) * prodquantity


    const increasequantity = async () => {
        setProdQuantity(prodquantity + 1)

        const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref, {
            quantity: prodquantity + 1
        }).then(() => { console.log('changed quantity') })
        console.log(itemref)
        // console.log(props.itemdata.id)
    }
    const decreasequantity = async () => {
        if (prodquantity >= 1) {
            setProdQuantity(prodquantity - 1)

            const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
            await updateDoc(itemref, {
                quantity: prodquantity - 1
            }).then(() => { console.log('changed quantity') })
            console.log(itemref)
        }
        else {
            await deleteDoc(doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)).then(() => { console.log('doc deleted') })
        }
    }

    const deletecartitem = async () => {
        await deleteDoc(doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)).then(() => { console.log('doc deleted') })
    }

    // const useGetData = () => {
    //     const [data, setData] = useState([])
    //     const collectionRef = collection(db, "customizereq")

    //     useEffect(() => {
    //         const getData = async () => {
    //             await onSnapshot(collectionRef, (snapshot) => {
    //                 setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //             });
    //         }
    //         getData()
    //     }, [])

    //     return { data };
    // };

    // const { data: customData } = useGetData('customizereq')


    return (
        <div className='cart-prod-container'>
            <div className='cart-prod-imgtitle'>
                <div className='prod-image'><img src={props.itemdata.product.productimage} alt='' /> </div>
                <div className='prod-title'>{props.itemdata.product.producttitle}
                <p className='customize-text'>{props.itemdata.producttext}</p></div>


            </div>
            <div className='prodquantity-div'>
                <button onClick={increasequantity}>+</button>
                <p>{prodquantity}</p>
                <button onClick={decreasequantity}>-</button>
            </div>
            <div className='prodprice'>Rs {saleprice}</div>
            <button className='deletebtn' onClick={deletecartitem}>
                <img src={deletebtn} alt='' />
            </button>

        </div >


    )
}

export default CartCard