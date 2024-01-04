import { NavLink } from "react-router-dom";

 export const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Love Art</span>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Artworks</NavLink>
                        </li>
                    </ul>
                </div>
                <div className='d-flex'>
                    <a type='button' className='btn btn-outline-light' href='#'>Sign in</a>
                </div>
            </div>
        </nav>
    );
} 
