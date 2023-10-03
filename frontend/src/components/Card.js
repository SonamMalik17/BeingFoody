import React, { useEffect,useRef,useState } from 'react';
import {  useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    const handleAddToCart = async () => {
        let food=[];
        for(const item of data)
        {
            if(item.id===props.foodItems._id)
            {
                food=item;
                break;
            }
        }
        if(food!==[])
        {
            if(food.size===size)
            {
                await dispatch({type:"Update",id:props.foodItems._id,price:finalPrice,qty:qty})
                return;
            }
            else if(food.size!==size)
            {
                await dispatch({ type: "Add", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size, img: props.foodItems.img });
                return;
            }
        }
        else if(food===[])
        {
            await dispatch({ type: "Add", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size, img: props.foodItems.img });
        }
        // console.log(data);
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])
    return (
        <div>

            <div className="card mt-3" style={{ width: "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItems.name}</h5>
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-dark rounded" style={{ color: "white" }} onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1} style={{ color: "white" }}>{i + 1}</option>
                                ) 
                            })}
                        </select>
                        <select className="m-2 h-100 bg-dark rounded" ref={priceRef} style={{ color: "white" }} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return (
                                    <option key={data} value={data} style={{ color: "white" }}>{data}</option>
                                )
                            })}
                        </select>
                        <div className='d-inline h-100 fw-bold'>
                            ₹{finalPrice}/-
                        </div>
                        <hr />
                        <div className="d-flex justify-content-center">
                            <div className='btn btn-success mx-auto' onClick={handleAddToCart}>Add to Cart</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
