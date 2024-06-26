import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [Search, setSearch] = useState('');
    const [BeingFoody_items, setBeingFoody_items] = useState([]);
    const [BeingFoody_category, setBeingFoody_category] = useState([]);
    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/foodData', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setBeingFoody_items(response[0]);
        setBeingFoody_category(response[1]);
    }
    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <div><Navbar /></div>



            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" style={{ maxHeight: "500px" }}>
                        <div className="carousel-caption" style={{ zIndex: "7" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn btn-success" type="submit">Search</button> */}
                            </div>

                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?samosa" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>



            <div className='container'>
                {
                    BeingFoody_category !== []
                        ? BeingFoody_category.map((data) => {
                            return (
                                <div className="row mb-3">
                                    <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                    <hr />
                                    {
                                        BeingFoody_items !== []
                                            ? BeingFoody_items.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase()))).map((filterItems) => {
                                                return (
                                                    <>
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>

                                                            {/* <Card foodName={filterItems.name} options={filterItems.options[0]} imgSrc={filterItems.img} /> */}

                                                            <Card foodItems={filterItems}
                                                            options={filterItems.options[0]}></Card>
                                                            </div>
                                                    </>
                                                )
                                            }) : <div>No such data found</div>
                                    }
                                </div>

                            )
                        })
                        : ""
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
