import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { getMovies, deleteMovie } from "../actions/moviesAction";

const token = localStorage.getItem("token");
axios.defaults.headers.common["x-auth-token"] = token;

class Movies extends React.Component {
  componentDidMount() {
    this.props.getMoviesList();
  }

  render() {
    // const { movies } = this.state;
    const { user } = this.props;
    const { movies } = this.props.movies;

    const m2 = movies.map(m => ({
      actors: m.actors.join(", "),
      name: <Link to={`/movies/${m._id}`}>{m.name}</Link>,
      rate: m.rate,
      img: <img src={m.img} alt="a" style={{ width: 60, height: 70 }} />
    }));

    const columns = [
      {
        name: "img",
        label: "Image"
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "rate",
        label: "Rate",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "actors",
        label: "Actors",
        options: {
          filter: true,
          sort: true
        }
      }
    ];

    const options = {
      onRowsDelete: row => {
        this.props.moveiSelected(row);
        // for (let key of row.data) {
        //   try {
        //     await axios.delete(
        //       `http://localhost:8000/api/genres/${movies[key.index]._id}`
        //     );
        //   } catch (ex) {
        //     const errors = ex.response.data;
        //     toast.error(errors);
        //     this.setState({ errors });
        //   }
        // }
      }
    };

    return (
      <div>
        <a
          class="uk-button uk-button-primary"
          // offset="0"
          href="#target"
          uk-scroll
        >
          Scroll down
        </a>
        <MUIDataTable
          title={"Movies List"}
          data={m2}
          columns={columns}
          options={options}
        />
        {user && (
          <React.Fragment>
            <div
              style={{
                marginTop: "3rem",
                marginBottom: "5rem",
                marginLeft: "auto",
                marginRight: "auto",
                width: "12rem"
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "12rem"
                }}
                href="/movies/new"
              >
                New Movie
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMoviesList: () => {
      dispatch(getMovies());
    },
    moveiSelected: movie => {
      dispatch(deleteMovie(movie));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
