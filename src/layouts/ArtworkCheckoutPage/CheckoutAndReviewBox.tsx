import { Link } from "react-router-dom";
import ArtworkModel from "../../models/ArtworkModel";

export const CheckoutAndReviewBox: React.FC<{ artwork: ArtworkModel | undefined, mobile: boolean, isAuthenticated: any, isCheckedOut: boolean, checkoutArtwork: any, isReviewLeft: boolean }> = (props) => {


    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut) {
                return (<button onClick={() => props.checkoutArtwork()} className='btn btn-success btn-lg'>Checkout</button>)
            } else if (props.isCheckedOut) {
                return (<p><b>Congratulations, artwork checked out!</b></p>)
            }
        }
        return (<Link to={'/login'} className='btn btn-success btn-lg'>Sign in</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return (<p>Leave a review component here.</p>)
        } 
        else if (props.isAuthenticated && props.isReviewLeft) {
            return (<p><b>Thank you for your review!</b></p>)
        } 
        return (<div><hr /><p>Sign in to be able to leave a review!</p></div>)
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    {props.artwork && props.artwork.copiesAvailable && props.artwork.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                </div>
                {buttonRender()}
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                <p>Sign in to be able to leave a review</p>
                {reviewRender()}
            </div>
        </div>
    );
}