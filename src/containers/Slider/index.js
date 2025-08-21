import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri du plus ancien au plus récent (janvier en premier)
  const slides = data?.focus.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Timer automatique pour passer au slide suivant
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, slides]);

  // Fonction sécurisée pour afficher le mois
  const renderMonth = date => {
    if (!date) return "Mois inconnu";
    const month = getMonth(new Date(date));
    return month || "Mois inconnu";
  };

  return (
    <div className="SlideCardList">
      {slides?.map((slide, idx) => (
        <div
          key={`slide-${slide.id || idx}`} // clé unique sécurisée
          className={`SlideCard SlideCard--${index === idx ? 'display' : 'hide'}`}
        >
          <img src={slide.cover} alt={slide.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <div>{renderMonth(slide.date)}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {slides?.map((slide, idx) => (
            <input
              key={`radio-${slide.id || idx}`} // clé unique sécurisée
              type="radio"
              name="slider-radio"
              checked={index === idx}
              onChange={() => setIndex(idx)} // clic sur le point change le slide
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
