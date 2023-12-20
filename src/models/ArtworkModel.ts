class ArtworkModel {
    id: string;
    title: string;
    description?: string;
    category?: string;
    price?: number;
    available?: boolean;
    img?: string;

    constructor(id: string, title: string, description: string, category: string, price: number, available: boolean, img: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.available = available;
        this.img = img;
    }
}
export default ArtworkModel;