export interface Movie {
    genreId: string[];
    title: string;
    slug: string;
    images: string[];
    imagesVertical: string[];
    videoTrailer: string;
    videoMain: string;
    yearOfRelease: string;
    dateOfRelease: string;
    runningTime: string;
    director: string;
    productionHouse: string;
    imdbRating?: string;
    actors?: string[];
    plot?: string;
    rated: string;
    createdAt: string;
}