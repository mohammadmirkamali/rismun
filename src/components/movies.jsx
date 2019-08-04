import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
axios.defaults.headers.common["x-auth-token"] = token;

class Movies extends React.Component {
  state = {
    movies: [],
    data: "",
    errors: ""
  };

  async componentDidMount() {
    const { data: movies } = await axios.get(
      "http://localhost:3001/api/genres"
    );
    this.setState({ movies });
  }

  render() {
    const { movies } = this.state;
    const { user } = this.props;

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
      onRowsDelete: async row => {
        for (let key of row.data) {
          try {
            await axios.delete(
              `http://localhost:3001/api/genres/${movies[key.index]._id}`
            );
          } catch (ex) {
            const errors = ex.response.data;
            toast.error(errors);
            this.setState({ errors });
          }
        }
      }
    };

    return (
      <div>
        <MUIDataTable
          title={"Movies List"}
          data={m2}
          columns={columns}
          options={options}
        />
        {user && (
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              style={{
                margin: 40,
                marginLeft: 300,
                width: 500,
                textAlign: "center"
              }}
              href="/movies/new"
            >
              New Movie
            </Button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Movies;
