
export const Heros = () => {
    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Immerse yourself in the world of artistry!</h1>
                            <p className='lead'>
                            Connect with us at Ensosense and share your inspirations. Whether it's about your artistic passions or creative influences, we're here to curate the perfect collection that resonates with your unique vision!
                            </p>
                        
                                <a className='btn main-color btn-lg text-white' href='#'>Sign up</a>
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                            Welcome to Ensosense, where minimalism, nature, and Zen tradition inspire our ever-changing art collection. Visit often to explore our evolving gallery. Our dedication ensures an accurate and growing selection for art enthusiasts.
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>Immerse yourself in the world of artistry!</h1>
                            <p className='lead'>
                             Connect with us at Ensosense and share your inspirations. Whether it's about your artistic passions or creative influences, we're here to curate the perfect collection that resonates with your unique vision.!
                            </p>
                          
                                <a className='btn main-color btn-lg text-white'
                                    href='#'>Sign up</a>
                            </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                            Welcome to Ensosense, where minimalism, nature, and Zen tradition inspire our ever-changing art collection. Visit often to explore our evolving gallery. Our dedication ensures an accurate and growing selection for art enthusiasts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}