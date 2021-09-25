import { Genre } from "./genres.interface";
import { Images } from "./images.interface";

export interface Movie {
    _id: string;
    genre: Genre;
    title: string;
    slug: string;
    images: Images[];
    imagesVertical: Images[];
    videoTrailer: string;
    videoMain: any;
    yearOfRelease: string;
    dateOfRelease: string;
    runningTime: string;
    director: string;
    productionHouse: string;
    imdbRating?: string;
    actors?: string[];
    plot?: string;
    rated: string;
    createdAt: Date;
    isPublised: string;
    subscriptionRequired: boolean;
}

