import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import './MovieDetails.scss';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { Theme, useTheme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import theme from '../../theme';
import { Movie } from '../../models/movie.interface';
import { Series } from '../../models/series.interface';
import { useHistory } from 'react-router-dom';

interface IMovieDetailsProps {
  modalOpen: boolean;
  closeModal: any;
  modalData: Movie | Series;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '1200px',
  height: '90%',
  bgcolor: 'background.paper',
  backgroundColor: '#101011',
  border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: 24,
  borderRadius: 12,
  p: 4,
};


const rows = [
  createData('Episode 01', 'Temp title 1'),
  createData('Episode 02', 'Temp title 2'),
  createData('Episode 03', 'Temp title 3'),
  createData('Episode 04', 'Temp title 4'),
  createData('Episode 05', 'Temp title 5'),
];
function createData(
  episodes: string,
  title: string
) {
  return { episodes, title };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Season 1',
  'Season 2',
  'Season 3',
  'Season 4',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MovieDetails: React.FunctionComponent<IMovieDetailsProps> = (props) => {

  const getPlot = (plot: string) => {
    const sentences = plot.match(/\S.*?\."?(?=\s|$)/g);
    return sentences?.length ? sentences[0] + sentences[1] : plot
  };
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const { title, runningTime, rated, images, imagesVertical, imdbRating, slug } = (props.modalData as Movie);
  const { noOfEpisodes } = (props.modalData as Series);
  const plot = getPlot(props.modalData.plot || '')
  const thumbNail = images.length > 1 ? images[1].location.cloudFrontUrl : images[0].location.cloudFrontUrl
  const verticalImage = images.length > 1 ? imagesVertical[1].location.cloudFrontUrl : imagesVertical[0].location.cloudFrontUrl
  const history = useHistory();

  const onWatch = () => {
    let path = `movie/${slug}`;
    history.push(path);
  }
  const handleChange = (event: any) => {
    const {
      target: { value },

    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalOpen}
        onClose={props.closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="movie-details-modal"
      >
        <Fade in={props.modalOpen}>
          <Box sx={style} className="modal-modal">
            <div className="modal-bg-img" style={{ backgroundImage: `url(${thumbNail})` }}>
            </div>
            <div className="close-button" onClick={props.closeModal}>
              <CloseIcon />
            </div>
            <div className="header-content">
              <div className="home-poster">
                <img src={verticalImage} alt="poster" />
              </div>
              <div className="poster-details">
                <div className="poster-details-1">
                  <h1 className="movie-title">{title}</h1>
                  <div className="movie-details">
                    <div className="movie-details-details">{runningTime} - {rated}</div>
                    <div className="movie-details-details">Drama/Mystery</div>
                    <div className="movie-details-details">Rating: {imdbRating}</div>
                  </div>
                  <p className="movie-description">
                    {plot}
                  </p>
                  <div className="movie-options">
                    <Button variant="contained" color="primary" onClick={onWatch} className="movie-options-options">Watch</Button>
                    {noOfEpisodes ?
                      <div className="movie-options-options">
                        <FormControl>
                          <Select
                            displayEmpty
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected: any) => {
                              if (selected.length === 0) {
                                return <em>Seasons</em>;
                              }

                              return selected.join(', ');
                            }}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem disabled value="">
                              <em>Seasons</em>
                            </MenuItem>
                            {names.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      : null}
                    <Button variant="outlined" color="primary">+ Add to My List</Button>
                  </div>
                </div>
                {!noOfEpisodes ?
                  <div className="poster-details-2">
                    {images.length ? <img src={images[0].location.cloudFrontUrl} alt="poster" /> : null}
                    {images.length > 1 ? <img src={images[1].location.cloudFrontUrl} alt="poster1" /> : null}
                  </div>
                  :
                  <div className="modal-dropdown">
                    <div className="episodes-table">
                      <TableContainer component={Paper} className="episodes-table-table">
                        <Table className="table">
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.episodes}
                                className="table-row"
                              >
                                <TableCell component="th" scope="row">
                                  {row.episodes}
                                </TableCell>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell align="right" className="table-row-play"><PlayCircleFilledWhiteOutlinedIcon /></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                }
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default MovieDetails;
