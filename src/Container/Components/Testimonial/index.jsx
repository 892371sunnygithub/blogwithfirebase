import React from "react";
import Slider from "react-slick";
import { ImageProvider } from "../../Services/ImageProvider";
import StarRating from "../../StarRating";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomTestimonialData } from "./customTestimonialData";

const Testimonial = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial">
      <div className="container">
        <h2 className="heading">{CustomTestimonialData.sectionheading} </h2>
        <div className="pt-2">
          <Slider {...settings}>
            {CustomTestimonialData.card.map((curElm, index) => (
              <div className="card" key={index}>
                <div className="testimonialcard">
                  <div className="imagedata">
                    <img
                      src={curElm.imageurl}
                      alt="testimonialimage"
                      className="clientimage"
                    />
                  </div>
                  <div className="textdata">
                    <h6 className="mb-0">{curElm.clientname} </h6>
                    <div className="d-flex">
                      {Array.from({ length: curElm.starrating }).map(
                        (_, index) => (
                          <div key={index} className="me-1">
                            <StarRating />
                          </div>
                        )
                      )}
                    </div>
                    <div className="commasimage d-flex justify-content-end">
                      <img
                        src={ImageProvider.Commaimage}
                        alt="commaapp"
                        className="commaimage"
                      />
                    </div>
                    <p>{curElm.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
