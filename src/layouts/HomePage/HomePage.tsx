import { Carousel } from "./components/Carousel";
import { CustomService } from "./components/CustomService";
import { ExploreArtworks } from "./components/ExploreArtworks";
import { Heros } from "./components/Heros";

export const HomePage = () =>{
    return(
        <>
        <ExploreArtworks />
        <Carousel />
        <Heros />
        <CustomService />
        </>
    );
}