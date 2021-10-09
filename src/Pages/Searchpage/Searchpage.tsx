import * as React from "react";
import { useLocation } from "react-router-dom";
import PosterCard from "../../components/PosterCard/PosterCard";
import "./Searchpage.scss";
import axios from "../../utils/axiosInstance";
import { AxiosResponse } from "axios";
import { Movie } from "../../models/movie.interface";
import SkeletonPoster from "../../components/SkeletonPoster/SkeletonPoster";
import { Helmet } from "react-helmet";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Box, Typography } from "@material-ui/core";
import { Series } from "../../models/series.interface";
interface ISearchpageProps {}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Searchpage: React.FunctionComponent<ISearchpageProps> = (props) => {
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("q");
  const [moviesloading, setMoviesLoading] = React.useState(false);
  const [seriesloading, setSeriesLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [series, setSeries] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    setMoviesLoading(true);
    setSeriesLoading(true);
    axios.get(`/movies?search=${query}`).then((res: AxiosResponse<any>) => {
      setMoviesLoading(false);
      setMovies(res.data.docs);
    });
    axios.get(`/series?search=${query}`).then((res: AxiosResponse<any>) => {
      setSeriesLoading(false);
      setSeries(res.data.docs);
    });
  }, [query]);
  return (
    <div className="Searchpage">
      <Helmet defer={false}>
        <title>
          Search Results for: {query} - {process.env.REACT_APP_NAME}
        </title>
      </Helmet>
      <div className="Searchpage__Search">
        <h2>Search Results for: </h2>{" "}
        <h1 className="Searchpage__Search--Query">{query}</h1>
      </div>
      <div className="Searchpage__wrp">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Movies" />
          <Tab label="Series" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {!moviesloading ? (
            movies && movies.length > 0 ? (
              movies.map((movie: Movie, i: number) => (
                <PosterCard data={movie} key={i} />
              ))
            ) : (
              <h2 className="Searchpage__title">
                No search results found in movies.
              </h2>
            )
          ) : (
            <SkeletonPoster></SkeletonPoster>
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {!seriesloading ? (
            series && series.length > 0 ? (
              series.map((serie: Series, i: number) => (
                <PosterCard data={serie} key={i} />
              ))
            ) : (
              <h2 className="Searchpage__title">
                No search results found in series.
              </h2>
            )
          ) : (
            <SkeletonPoster></SkeletonPoster>
          )}
        </TabPanel>
      </div>
    </div>
  );
};

export default Searchpage;
