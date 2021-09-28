import * as React from 'react';
import './Slider.scss';
import useViewport from '../../hooks/useViewport';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// Swiper
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import SliderPosterCard from '../SliderPosterCard/SliderPosterCard';
import { Movie } from '../../models/movie.interface';
import SkeletonPoster from '../SkeletonPoster/SkeletonPoster';
import SkeletonElement from '../SkeletonElement/SkeletonElement';
SwiperCore.use([Navigation, Pagination]);

interface SliderProps {
    isLarge: boolean;
    title: string;
    sliderData: {
        loading: boolean;
        error: string;
        data: Movie[]
    } | any;
}

const Slider: React.FunctionComponent<SliderProps> = (props) => {
    const { width } = useViewport();
    const { title, sliderData } = props;
    const error = false;
    const genre = title.toLocaleLowerCase();
    const isLarge = props.isLarge
    //Custom Swiper config
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const customSwiperParams = {
        observer: true,
        observeParents: true,
        navigation: {
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
        },
        breakpoints: {
            1378: { slidesPerView: 6, slidesPerGroup: 6 },
            998: { slidesPerView: 4, slidesPerGroup: 4 },
            625: { slidesPerView: 3, slidesPerGroup: 3 },
            330: { slidesPerView: 2, slidesPerGroup: 2 },
            0: { slidesPerView: 1.5, slidesPerGroup: 1.5 }
        },
        loopAdditionalSlides: width >= 1378 ? 5 : width >= 998 ? 3 : width >= 625 ? 2 : 2,
        pagination: true,
        loop: false,
        grabCursor: false,
        draggable: false,
        preventClicksPropagation: true,
        preventClicks: true,
        slideToClickedSlide: false,
        allowTouchMove: true
    };

    const rightMouseOver = (e: any) => {
        if (e.currentTarget.classList.contains('right')) { e.currentTarget.parentElement.classList.add('is-right') }
        else if (e.currentTarget.classList.contains('left')) { e.currentTarget.parentElement.classList.add('is-left') }
    }

    const rightMouseOut = (e: any) => {
        e.currentTarget.parentElement.classList.remove('is-right', 'is-left')
    }

    const insertPositionClassName = (index: number) => {
        const i = index + 1

        if (i === 1) return 'left'
        else if (i === 20) return 'right'

        if (width >= 1378) {
            if ([7, 13, 19].includes(i)) return 'left'
            else if ([6, 12, 18].includes(i)) return 'right'
        } else if (width >= 998) {
            if ([5, 9, 13, 17].includes(i)) return 'left'
            else if ([4, 8, 12, 16].includes(i)) return 'right'
        } else if (width >= 768) {
            if ([4, 7, 10, 13, 16].includes(i)) return 'left'
            else if ([3, 6, 9, 12, 15, 18].includes(i)) return 'right'
        }
    }

    return (
        <div className="SliderPosterCard">
            {sliderData.error && <div className='SliderPosterCard__not-loaded'>Oops, an error occurred.</div>}
            {sliderData.loading ?
                (
                    <div className='SliderPosterCard__not-loaded'>
                        <SkeletonElement type="title" />
                        <SkeletonPoster />
                    </div>
                ) : (
                    <h3 className="SliderPosterCard__title">
                        <Link to={`movies/${genre}`}>
                            <span>{title}</span>
                            <span className='SliderPosterCard__showmore'>Show all <ChevronRightIcon /></span>
                        </Link>
                    </h3>
                )
            }
            {!sliderData.loading && !error && (
                <div className="SliderPosterCard__poster--wrp">
                    <div className="SliderPosterCard__slider--mask left" ref={navigationPrevRef}>
                        <ChevronLeftIcon className="SliderPosterCard__slider--mask-icon left" fontSize="large" style={{ color: 'white' }} />
                    </div>
                    <div className="SliderPosterCard__slider--mask right" ref={navigationNextRef}>
                        <ChevronRightIcon className="SliderPosterCard__slider--mask-icon right" fontSize="large" style={{ color: 'white' }} />
                    </div>
                    <Swiper
                        {...customSwiperParams}
                        onBeforeInit={(swiper: any) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                        }}
                    >
                        {!sliderData.loading &&
                            sliderData.data &&
                            sliderData.data.map((result: Movie, i: number) => (
                                <SwiperSlide
                                    key={i}
                                    className={insertPositionClassName(i)}
                                    onMouseOver={rightMouseOver}
                                    onMouseOut={rightMouseOut}
                                >
                                    <SliderPosterCard data={result}
                                        key={i}
                                        isLarge={isLarge}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Slider;
