import ArtworkModel from "../../../models/ArtworkModel";

export const SearchArtwork: React.FC<{artwork: ArtworkModel}> = (props) => {
   
    return(
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
        <div className='row g-0'>
            <div className='col-md-2'>
                <div className='d-none d-lg-block'>
                    {props.artwork.img ?
                        <img src={props.artwork.img}
                            width='123'
                            height='196'
                            alt='Artwork'
                        />
                        :
                        <img src={require('../../../Images/Artworkimages/piece-1.png')}
                            width='123'
                            height='196'
                            alt='Artwork'
                        />
                    }
                </div>
                <div className='d-lg-none d-flex justify-content-center 
                    align-items-center'>
                    {props.artwork.img ?
                        <img src={props.artwork.img}
                            width='123'
                            height='196'
                            alt='Artwork'
                        />
                        :
                        <img src={require('../../../Images/Artworkimages/piece-1.png')}
                            width='123'
                            height='196'
                            alt='Artwork'
                        />
                    }
                </div>
            </div>
            <div className='col-md-6'>
                <div className='card-body'>
                    <h5 className='card-text'>
                        {props.artwork.description}
                    </h5>
                    <h4>
                        {props.artwork.title}
                    </h4>
                    <p className='card-text'>
                      Price: {props.artwork.price} kr
                    </p>
                </div>
            </div>
            <div className='col-md-4 d-flex justify-content-center align-items-center'>
                <a className='btn btn-md main-color text-white' href="#">
                    View Details
                </a>
            </div>
        </div>
    </div>
);
    
}