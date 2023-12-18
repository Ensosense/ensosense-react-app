import React from 'react'



export const ReturnArtwork = () => {
    return(
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
        <div className='text-center'>
                <img
                    src={require('./../../Images/Artworkimages/piece-1.png')}
                    width='151'
                    height='233'
                    alt="book"
                />
            <h6 className='mt-2'>Artwork</h6>
            <p>Ensosense</p>
            <a className='btn main-color text-white' href='#'>Reserve</a>
        </div>
    </div>
    );
}
