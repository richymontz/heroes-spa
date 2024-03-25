import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";
import { useMemo } from "react";

export const HeroPage = () => {
  const { id } = useParams();

  const hero = useMemo(() => getHeroById(id), [id]);

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1)
  };

  if (!hero) {
    return (<Navigate to="/" />)
  }

  return (
    <>
      <h1>{hero.superhero}</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <img
            src={`/assets/heroes/${id}.jpg`}
            className="img-thumbnail border-dark animate__animated animate__fadeInLeft"
            alt={hero.superhero}>
          </img>
        </div>
        <div className="col-md-6">
          <h3>{hero.alter_ego}</h3>
          <hr />
          <p className="text-left"> <b>Publisher:</b> {hero.publisher} </p>
          <p className="text-left"> <b>First Appearance:</b> {hero.first_appearance} </p>
          <p className="text-left"> <b>Publisher:</b> {hero.publisher} </p>
          <h4>Characters</h4><hr />
          <p className="text-lef"> {hero.characters}</p><hr />

          <button
            className="btn btn-outline-secondary"
            onClick={onNavigateBack}
          >
            Back
          </button>
        </div>
      </div>
    </>
  )
}
