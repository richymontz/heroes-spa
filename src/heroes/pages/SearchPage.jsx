import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';

import { useForm } from "../../hooks";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const heroes = getHeroesByName(q);

  const showError = (heroes.length === 0 && q !== '')

  const { searchText, onInputChange } = useForm({ searchText: q });

  const onSearchSubmit = (event) => {
    event.preventDefault();

    if (searchText.trim().length <= 1) return;

    navigate(`?q=${searchText}`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-6">
          <form className="form-inline" onSubmit={onSearchSubmit} aria-label="form">
            <div className="form-group mb-2">
              <input
                type="text"
                placeholder="Tyoe hero name here..."
                name="searchText"
                autoComplete="off"
                className="form-control form-control-lg"
                value={searchText}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <button className="btn btn-primary btn-lg"> Search</button>
            </div>
          </form>
        </div>
        <div className="col-6">

          <div aria-label="alert-danger" className="alert alert-danger" style={{ display: showError ? '' : 'none' }}>
            No Heroes found with <b>{searchText}</b>
          </div>

          {heroes.map(hero => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>



    </>
  )
}
