import { ReturnArtwork } from "./ReturnArtwork";
import { useEffect, useState } from 'react';
import ArtworkModel from "../../../models/ArtworkModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";


export const Carousel = () => {

    const [artworks, setArtworks] = useState<ArtworkModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {

        const fetchArtworks = async () => {

            const baseUrl: string = "http://localhost:8080/api/artworks";

            const url: string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.artworks;

            const loadedArtworks: ArtworkModel[] = [];

            for (const key in responseData) {
                loadedArtworks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    description: responseData[key].description,
                    category: responseData[key].category,
                    price: responseData[key].price,
                    available: responseData[key].available,
                    img: responseData[key].img,
                });
            }
        
            setArtworks(loadedArtworks);
            setIsLoading(false);
        };

        fetchArtworks().catch((error: any) => {
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
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next treasure</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {artworks.slice(0, 3).map(artwork => (
                                <ReturnArtwork artwork={artwork} key={artwork.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {artworks.slice(3, 6).map(artwork => (
                                <ReturnArtwork artwork={artwork} key={artwork.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {artworks.slice(6, 9).map(artwork => (
                                <ReturnArtwork artwork={artwork} key={artwork.id} />
                            ))}
                        </div>
                    </div>
                </div>
                <button className='carousel-control-prev' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnArtwork artwork={artworks[7]} key={artworks[7].id} />
                    {/* {artworks.slice(0, 1).map(artwork => (<ReturnArtwork artwork={artwork} key={artwork.id} />))} */}
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View more</Link>
            </div>
        </div>
    );
}