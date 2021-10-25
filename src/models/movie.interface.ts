import { Genre } from "./genres.interface";
import { Images } from "./images.interface";

export interface Movie {
    _id: string;
    genres: Genre[];
    title: string;
    slug: string;
    images: Images[];
    imagesVertical: Images[];
    videoTrailer: string;
    videoMain: any;
    yearOfRelease: string;
    dateOfRelease: string;
    duration: number;
    director: string;
    productionHouse: string;
    imdbRating?: string;
    actors?: string[];
    plot?: string;
    rated: string;
    createdAt: Date;
    isPublised: string;
    subscriptionRequired: boolean;
    halfwatchedTime?: number;
    resumeWatchId?: string;
}

