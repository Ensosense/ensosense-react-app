class ArtworkModel {
    id: number;
    title: string;
    description?: string;
    category?: string;
    price?: number;
    copiesAvailable?: number;
    img?: string;

    constructor(id: number, title: string, description: string, category: string, price: number, copiesAvailable: number, img: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.copiesAvailable = copiesAvailable;
        this.img = img;
    }
}
export default ArtworkModel;