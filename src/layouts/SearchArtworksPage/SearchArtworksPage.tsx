import { useEffect, useState } from "react";
import ArtworkModel from "../../models/ArtworkModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchArtwork } from "./components/SearchArtwork";
import { Pagination } from "../Utils/Pagination";

export const SearchArtworksPage = () => {

    const [artworks, setArtworks] = useState<ArtworkModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [artworksPerPage] = useState(5);
    const [totalAmountsOfArtworks, setTotalAmountsOfArtworks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchArtworks = async () => {

            const baseUrl: string = "http://localhost:8080/api/artworks";

            const url: string = `${baseUrl}?page=${currentPage - 1}&size=${artworksPerPage}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.artworks;


            setTotalAmountsOfArtworks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);


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
        window.scroll(0, 0);
    }, [currentPage]);

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

    const indexOfLastArtwork: number = currentPage * artworksPerPage;
    const indexOfFirstartwork: number = indexOfLastArtwork - artworksPerPage;
    let lastItem = artworksPerPage * currentPage <= totalAmountsOfArtworks ? artworksPerPage * currentPage : totalAmountsOfArtworks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search' />
                                <button className='btn btn-outline-success'>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className=' btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Category
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Front End
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Back End
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Data
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h5>Number of results({totalAmountsOfArtworks})</h5>
                    </div>
                    <p>
                        {indexOfFirstartwork + 1} to {lastItem} of {totalAmountsOfArtworks} items:
                    </p>
                    {artworks.map(artwork => (
                        <SearchArtwork artwork={artwork} key={artwork.id} />
                    ))}
                    {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
                </div>
            </div>
        </div>
    );

}