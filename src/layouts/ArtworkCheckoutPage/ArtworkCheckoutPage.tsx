import { useEffect, useState } from "react";
import ArtworkModel from "../../models/ArtworkModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import { error } from "console";

export const ArtworkCheckoutPage = () => {

    const { authState } = useOktaAuth();

    const [artwork, setArtwork] = useState<ArtworkModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review state
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft , setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true)

    // Is book Check out
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    
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
                copiesAvailable: responseJson.copiesAvailable,
                img: responseJson.img,
            };


            setArtwork(loadedArtwork);
            setIsLoading(false);
        };

        fetchArtwork().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message)
        })

    }, [isCheckedOut]);

    useEffect(() => {
        const fetchArtworkReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByArtworkId?artworkId=${artworkId}`;

            const responsReviews = await fetch(reviewUrl);

            if (!responsReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responsReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    artwork_id: responseData[key].artworkId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;

            }
            
            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            
            setReviews(loadedReviews);
            setIsLoadingReview(false);

        };
        fetchArtworkReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewArtwork = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/reviews/secure/user/artwork/?artworkId=${artworkId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error('Something went wrong');
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewArtwork().catch((error:any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message)
        })
}, [authState]);

    if (isLoading || isLoadingReview || isLoadingUserReview) {
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

    async function checkoutArtwork() {
        const url = `http://localhost:8080/api/artworks/secure/checkout/?artworkId=${artwork?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type':'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok){
            throw new Error('Something went wrong!')
        }
        setIsCheckedOut(true);
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
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox artwork={artwork} mobile={false} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} checkoutArtwork={checkoutArtwork} isReviewLeft={isReviewLeft} />
                    {   
                     /* submitReview={submitReview}/> */}
                </div>
                <hr />
                <LatestReviews reviews={reviews} artworkId={artwork?.id} mobile={false} />
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
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox artwork={artwork} mobile={true} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}  checkoutArtwork={checkoutArtwork} isReviewLeft={isReviewLeft}/>
                {
              /*  checkoutBook={checkoutBook}  */ /* submitReview={submitReview}/> */}
                <hr />
                <LatestReviews reviews={reviews} artworkId={artwork?.id} mobile={true} />
            </div>
        </div>
    );
}