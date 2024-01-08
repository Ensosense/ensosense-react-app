import { useEffect, useState } from "react";
import ArtworkModel from "../../models/ArtworkModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";

export const ArtworkCheckoutPage = () => {

    const [artwork, setArtwork] = useState<ArtworkModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const artworkId = (window.location.pathname).split('/')[2];

    useEffect(() => {

        const fetchArtwork = async () => {

            const baseUrl: string = `http://localhost:8080/api/artworks/${artworkId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();


            const loadedArtwork: ArtworkModel = {
                id: responseJson.id,
                title: responseJson.title,
                description: responseJson.description,
                category: responseJson.category,
                price: responseJson.price,
                available: responseJson.available,
                img: responseJson.img,
            };


            setArtwork(loadedArtwork);
            setIsLoading(false);
        };

        fetchArtwork().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message)
        })

    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }
    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {artwork?.img ?
                            <img src={artwork?.img} width='226' height='349' alt='Artwork' />
                            :
                            <img src={require('./../../Images/Artworkimages/piece-2.png')} width='226'
                                height='349' alt='Artwork' />
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{artwork?.title}</h2>
                            <h5 className='text-primary'>{artwork?.price} kr</h5>
                            <p className='lead'>{artwork?.description}</p>
                            <StarsReview rating={4.5} size={32} />
                        </div>
                    </div>
                    {/*  <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount} 
                    isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} 
                    checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview}/> */}
                </div>
                <hr />
                {/* <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} /> */}
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center alighn-items-center'>
                    {artwork?.img ?
                        <img src={artwork?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../Images/Artworkimages/piece-2.png')} width='226'
                            height='349' alt='Book' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{artwork?.title}</h2>
                        <h5 className='text-primary'>{artwork?.price} kr</h5>
                        <p className='lead'>{artwork?.description}</p>
                        <StarsReview rating={2.5} size={32} />
                    </div>
                </div>
                {/*  <CheckoutAndReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount} 
                isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} 
                checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview}/> */}
                <hr />
                {/* <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} /> */}
            </div>
        </div>
    );
}