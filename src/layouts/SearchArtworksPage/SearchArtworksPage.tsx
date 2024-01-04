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
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Artwork category');


    useEffect(() => {
        const fetchArtworks = async () => {
            const baseUrl: string = "http://localhost:8080/api/artworks";

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${artworksPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

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
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('')
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size${artworksPerPage}`)
        }
        setCategorySelection('Artwork category')
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        if(
            value.toLocaleLowerCase() === 'landscape' ||
            value.toLocaleLowerCase() === 'abstract' ||
            value.toLocaleLowerCase() === 'urban' ||
            value.toLocaleLowerCase() === 'seascape' 
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${artworksPerPage}`)
        } else{
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${artworksPerPage}`)
        }
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
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success' onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className=' btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Landscape')}>
                                        <a className='dropdown-item' href='#'>
                                            Landscape
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Abstract')}>
                                        <a className='dropdown-item' href='#'>
                                            Abstract
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Urban')}>
                                        <a className='dropdown-item' href='#'>
                                            Urban
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Seascape')}>
                                        <a className='dropdown-item' href='#'>
                                            Seascape
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountsOfArtworks > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results({totalAmountsOfArtworks})</h5>
                            </div>
                            <p>
                                {indexOfFirstartwork + 1} to {lastItem} of {totalAmountsOfArtworks} items:
                            </p>
                            {artworks.map(artwork => (
                                <SearchArtwork artwork={artwork} key={artwork.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>Can't find what you are looking for?</h3>
                            <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white' href="#">Artshop services</a>

                        </div>
                    }
                    {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
                </div>
            </div>
        </div>
    );

}