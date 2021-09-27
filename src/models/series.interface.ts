import { Genre } from "./genres.interface";
import { Images } from "./images.interface";

export interface Series {
    _id: string;
    genres: Genre[];
    title: string;
    slug: string;
    images: Images[];
    imagesVertical: Images[];
    videoTrailer: string;
    yearOfRelease: string;
    dateOfRelease: string;
    director: string;
    productionHouse: string;
    imdbRating?: string;
    actors?: string[];
    plot?: string;
    rated: string;
    createdAt: string;
    isPublised: string;
    subscriptionRequired: boolean;
    noOfEpisodes: number;
}
