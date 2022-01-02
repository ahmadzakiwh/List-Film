import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css"

function Home () {
    const [listFilm, setListFilm] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        axios
            .get("http://localhost:3000/data?_sort=title&_order=asc")
            .then((res) => {
                const {data} = res;
                setListFilm(data);
                console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsReady(true));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        axios
            .get("http://localhost:3000/data?title=" + searchTerm)
            .then((res) => {
                const {data} = res;
                setListFilm(data);
                console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsReady(true));        
    }

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const deleteList = async (item) => {
        
    }

    const handleClick = () => {
        setOpen(!open)
    }

    if (isReady) {
        return (
            <div className="container">
                <div className="d-flex flex-row justify-content-between align-items-center mt-3">
                    <div>
                        <h1>List Film</h1>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-success">ADD LIST</button>
                    </div>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleOnSubmit}>
                        <input className="search" type="search" placeholder="Search" value={searchTerm} onChange={handleOnChange}/>
                    </form>
                </div>
                <div className="d-flex flex-wrap justify-content-between mt-3">
                    {listFilm.map((item) => {
                        return (
                            <div className="listFilm d-flex flex-column justify-content-between border border-danger p-3" key={item.title}>
                                <div className="d-flex flex-row justify-content-between align-items-start">
                                    <h5 onClick={handleClick} >
                                        {item.title}
                                    </h5> 
                                    <h5>{item.rating}</h5>
                                </div>
                                <div className="d-flex flex-column align-items-center mb-2 mt-2" align="center">
                                    <p>{item.quality}</p>
                                    <p>{item.genre}</p>
                                    <p>{item.duration}</p>
                                </div>
                                <div className="d-flex flex-row justify-content-between">
                                    <a href={item.watch} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-success">Watch</button></a>
                                    <a href={item.trailer} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-danger">Trailer</button></a>
                                    <button onClick={() =>deleteList(item)} type="button" className="btn btn-dark">Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}

export default Home;