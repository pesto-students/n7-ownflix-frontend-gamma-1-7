import { Box, Typography } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import * as React from "react";
import { useSelector } from "react-redux";
import PosterCard from "../../components/PosterCard/PosterCard";
import { RootState } from "../../redux/rootReducer";
import "./Watchlist.scss";

interface IWatchlistProps {}

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

const Watchlist: React.FunctionComponent<IWatchlistProps> = (props) => {
  const watchlist = useSelector((state: RootState) => state.watchlist);

  const movies = watchlist.movies;
  const series = watchlist.series;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="Watchlist">
      <div className="Watchlist__Header">
        <h1>Watchlist</h1>
      </div>
      <div className="Watchlist__wrp">
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
          {movies && movies.length > 0 ? (
            movies.map((watchlist: any) => (
              <PosterCard key={watchlist.watchlistId} data={watchlist.movie} />
            ))
          ) : (
            <h2 className="Watchlist__title">No results found.</h2>
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {series && series.length > 0 ? (
            series.map((watchlist: any) => (
              <PosterCard key={watchlist.watchlistId} data={watchlist.series} />
            ))
          ) : (
            <h2 className="Watchlist__title">No results found.</h2>
          )}
        </TabPanel>
      </div>
    </div>
  );
};

export default Watchlist;
