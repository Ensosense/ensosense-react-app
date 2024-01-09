class ReviewModel {

    id: number;
    userEmail: string;
    date: string;
    rating: number;
    artwork_id: number;
    reviewDescription?: string;

    constructor(id: number, userEmail: string, date: string, rating: number, artwork_id: number, reviewDescription: string){
        this.id = id;
        this.userEmail = userEmail;
        this.date = date;
        this.rating = rating;
        this.artwork_id = artwork_id;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewModel;