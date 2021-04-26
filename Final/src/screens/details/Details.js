import React, { useEffect, useState } from "react";
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

const Details = (props) => {


    const[movie, setMovie] = useState({
        genres: [],
        trailer_url: "",
        artists: []
    });

    const [starIcons, setStarIcons] = useState([{
        id: 1,
        stateId: "star1",
        color: "black"
    },
        {
            id: 2,
            stateId: "star2",
            color: "black"
        },
        {
            id: 3,
            stateId: "star3",
            color: "black"
        },
        {
            id: 4,
            stateId: "star4",
            color: "black"
        },
        {
            id: 5,
            stateId: "star5",
            color: "black"
        }]);



    useEffect(() => {
        let dataMovie = null;

        fetch(props.baseUrl + "movies/" + props.match.params.id , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataMovie,
        })
            .then((response) => response.json())
            .then((response) => {
                setMovie(response);


            });
    }, []);




    const onClickArtist = (url) => {
        window.location = url;
    }


    const onClickStart = (id) => {
        let starIconList = [];
        for (let star of starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            starIconList.push(starNode);
        }
        setStarIcons( starIconList);
    }

// let movie = movie;
    const opts = {
        height: '300',
        width: '700',
        playerVars: {
            autoplay: 1
        }
    }
//

    return(

        <div className="details-container">
            <Header id={props.match.params.id} baseUrl={props.baseUrl} showBookShowButton="true" />
            <div className="back">
                <Typography>
                    <Link to="/">  &#60; Back to Home</Link>
                </Typography>
            </div>
            <div className="flex-containerDetails">
                <div className="leftSection">
                    <img src={movie.poster_url} alt={movie.title} />
                </div>

                <div className="middleSection">
                    <div>
                        <Typography variant="headline" component="h2">{movie.title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography>
                            <span className="bold">Genres: </span> {movie.genres.join(",")}

                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Duration:</span> {movie.duration} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Release Date:</span> {new Date(movie.release_date).toDateString()} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold"> Rating:</span> {movie.critics_rating}  </Typography>
                    </div>
                    <div className="marginTop">
                        <Typography><span className="bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline} </Typography>
                    </div>
                    <div className="trailerContainer">
                        <Typography>
                            <span className="bold">Trailer:</span>
                        </Typography>
                        <YouTube
                            videoId={movie.trailer_url.split("?v=")[1]}
                            opts={opts}
                            onReady={props._onReady}
                        />
                    </div>
                </div>

                <div className="rightSection">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    {starIcons.map(star => (
                        <StarBorderIcon
                            className={star.color}
                            key={"star" + star.id}
                            onClick={() => onClickStart(star.id)}
                        />
                    ))}

                    <div className="bold marginBottom marginTop">
                        <Typography>
                            <span className="bold">Artists:</span>
                        </Typography>
                    </div>
                    <div className="paddingRight">
                        <GridList cellHeight={160} cols={2}>
                            {movie.artists != null && movie.artists.map(artist => (
                                <GridListTile
                                    className="gridTile"
                                    onClick={() => onClickArtist(artist.wiki_url)}
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar
                                        title={artist.first_name + " " + artist.last_name}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>)

}

export default Details;