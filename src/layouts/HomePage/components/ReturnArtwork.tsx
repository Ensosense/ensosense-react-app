import React from 'react'
import ArtworkModel from '../../../models/ArtworkModel';
import { Link } from 'react-router-dom';



export const ReturnArtwork: React.FC<{ artwork: ArtworkModel }> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {props.artwork.img ?
                          <img
                          src={props.artwork.img}
                          width='151'
                          height='233'
                          alt="artwork"
                      />
                    :
                    <img
                        src={require('./../../../Images/Artworkimages/piece-1.png')}
                        width='151'
                        height='233'
                        alt="artwork"
                    />
                }
                <h6 className='mt-2'>{props.artwork.title}</h6>
                <p>{props.artwork.description}</p>
                <Link className='btn main-color text-white' to={`checkout/${props.artwork.id}`}>Add to cart</Link>
            </div>
        </div>
    );
}
