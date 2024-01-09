import { Link } from "react-router-dom";
import ArtworkModel from "../../models/ArtworkModel";

export const CheckoutAndReviewBox: React.FC<{ artwork: ArtworkModel | undefined, mobile: boolean }> = (props) => {
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>0/5 </b>
                        artworks checked out
                    </p>
                    <hr />
                    {props.artwork && props.artwork.available && props.artwork.available === true ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                </div>
                {/* {buttonRender()} */}
                <Link to='/#' className='btn btn-success btn-lg'>Sign in</Link>
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                <p>Sign in to be able to leave a review</p>
                {/* {reviewRender()} */}
            </div>
        </div>
    );
}