import { AppThunk } from "../store";
import { genresActionTypes } from "./genrs.types";
import axios from '../../utils/axiosInstance';
import { Genre } from "../../models/genres.interface";
import { AxiosResponse } from "axios";

export const fetchAllGenres = (genres: Genre[]) => ({
    type: genresActionTypes.FETCH_ALL_GENRES,
    payload: genres
});

export const fetchAllGenresAsync = (fetchUrl: string): AppThunk => {
    return (dispatch: any) => {
        axios
            .get(fetchUrl)
            .then((res: AxiosResponse<Genre[]>) => {
                dispatch(fetchAllGenres(res.data.map((genre) => {
                    return { _id: genre._id, deleted: genre.deleted, slug: genre.slug, title: genre.title }
                })));
            })
    };
};