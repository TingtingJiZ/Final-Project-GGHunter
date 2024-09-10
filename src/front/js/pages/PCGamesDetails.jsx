import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PcGameDetails = () => {
    const { store, actions } = useContext(Context)
    // const [item, setItem] = useState(store.currentPcGames)

    const dataStores = async (storeID) => {
        await actions.getIsStores(storeID);
    }

    useEffect(() => {
        dataStores()
    }, [])
    return (
        <div className="container my-4 w-75">
            <ul className="nav nav-underline">
                <li className="nav-item">
                    <p className="nav-link active" aria-current="page" href="#">PC</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link" href="#">PlayStation</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link" href="#">Nintendo</p>
                </li>
            </ul>
            <div className="characteristic w-100">
                <div className="row rounded card-body p-3">
                    <div className="col-12 col-md-4 text-center">
                        <img src="https://image.api.playstation.com/vulcan/img/rnd/202011/0204/kK0Z7D3DChDmP3WCowrezihC.png" className="img-fluid my-3" alt="Game Image" />
                    </div>
                    <div className="col-12 col-md-8">
                        <h3 className="mt-1">Buy Divinity: Original Sin - Enhanced Edition PC</h3>
                        <h6>Gather your party and get ready for the kick-ass new version of GameSpot's PC Game of the Year 2014. With hours of new content, new game modes, full voiceovers, split-screen multiplayer, and thousands of improvements, there's never been a better time to explore the epic world of Rivellon!</h6>
                    </div>
                </div>
            </div>
            <div className="shop mt-3">
                {store.isStores && store.isStores.length > 0 ? (
                    store.isStores.map((item) => (
                        <div className="row rounded price-item bg-dark text-white py-2 mb-1" key={item.storeID}>
                            <div className="col-md-2 store-logo d-flex align-items-center">
                                <img src={`https://www.cheapshark.com${item.images.logo}`} alt={`${item.storeName} Logo`} className="img-fluid" style={{ maxHeight: '40px' }} />
                            </div>
                            <div className="col-md-6 d-flex flex-column justify-content-center">
                                <h5 className="mb-2" style={{ fontSize: '19px' }}>{item.storeName}</h5>
                            </div>
                            <div className="col-md-4 d-flex flex-column align-items-md-end">
                                <p className="mb-1" style={{ fontSize: '19px' }}>
                                    <span className="discount">29,99€</span>{" "}
                                </p>
                                <p className="end-time mb-1" style={{ fontSize: '0.75rem' }}>End: in 4 days</p>
                                <button className="btn btn-shop py-1 px-2 btn-success">Shop Now</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading stores...</p>
                )}
            </div>
        </div>
    )
}

{/* <div className="container">
                {store.deals && store.deals.length > 0 ? (
                    store.deals.map((deal) => {
                        const associatedStore = findStoreById(deal.storeID);
                        return (
                            <div className="row price-item mt-3 bg-white" key={deal.dealID}>
                                <div className="col-md-2 store-logo">
                                    {associatedStore && (
                                        <img src={`https://www.cheapshark.com${associatedStore.images.logo}`} alt={`${associatedStore.storeName} Logo`} className="img-fluid my-2"/>)}
                                </div>
                                <div className="col-md-6">
                                    <h5 className="mt-1">{deal.title}</h5>
                                    <p>DRM: {associatedStore ? associatedStore.storeName : "Unknown"}</p>
                                </div>
                                <div className="col-md-4 price-details">
                                    <p>
                                        <span className="discount">{deal.normalPrice}€</span>{" "}
                                        <span className="price text-success">{deal.salePrice}€</span>
                                    </p>
                                    <p className="end-time">Discount: {deal.savings}% off</p>
                                    <button className="btn btn-success mb-1">Shop Now</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading deals...</p>
                )}
            </div> */}