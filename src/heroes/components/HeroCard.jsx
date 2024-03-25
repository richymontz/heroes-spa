import { Link } from "react-router-dom";

const CharactersByHero = ({ alter_ego, characters }) => {
  return (alter_ego === characters) ? (<></>) : (<li className="list-group-item">{characters}</li>)
}

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters
}) => {

  const heroImageUrl = `/assets/heroes/${id}.jpg`;

  return (
    <>
      <div className="card border-dark">
        <img src={heroImageUrl} className="card-img-top animate__animated animate__fadeIn" alt={superhero}></img>
        <div className="card-body">
          <h5 className="card-title">{superhero}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{alter_ego}</li>

          <CharactersByHero {...{ alter_ego, characters }} />

          <li className="list-group-item">{first_appearance}</li>
        </ul>
        <div className="card-footer">
          <small className="text-muted">
            <Link to={`/hero/${id}`}>
              More Info
            </Link>
          </small>
        </div>
      </div>
    </>
  )
}
