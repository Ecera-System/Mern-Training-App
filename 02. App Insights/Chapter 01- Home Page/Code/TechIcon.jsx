import Slider from "react-slick";

const TechIcon = () => {
    const data = [
        {
            img: '/images/tech-icon/html-5.png',
            title: 'HTML'
        },
        {
            img: '/images/tech-icon/css-3.png',
            title: 'CSS'
        },
        {
            img: '/images/tech-icon/bootstrap.png',
            title: 'Bootstrap'
        },
        {
            img: '/images/tech-icon/tailwind.png',
            title: 'TailwindCSS'
        },
        {
            img: '/images/tech-icon/javascript.png',
            title: 'JavaScript'
        },
        {
            img: '/images/tech-icon/react.png',
            title: 'React.js'
        },
        {
            img: '/images/tech-icon/nodejs.png',
            title: 'Node.js'
        },
        {
            img: '/images/tech-icon/redux.png',
            title: 'Redux'
        },
        {
            img: '/images/tech-icon/expressjs.png',
            title: 'Express.js'
        },
        {
            img: '/images/tech-icon/mongodb.png',
            title: 'MongoDB'
        },
        {
            img: '/images/tech-icon/git.png',
            title: 'Git'
        },
    ];


    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    }

    return (
        <section className='pt-16 pb-20'>
            <div className='2xl:w-[1280px] sm:w-11/12 w-4/5 mx-auto text-center'>
                <div className='w-full'>
                    <Slider {...settings}>
                        {
                            data.map((item, index) =>
                                <div key={index}>
                                    <div className='my-10 sm:mx-3 mx-6'>
                                        <div className='rounded-xl shadow-[0px_2px_20px_0_rgb(124,58,237,0.2)] p-7'>
                                            <div className='w-32 h-32 mx-auto rounded-full bg-violet-50 p-7'>
                                                <img
                                                    className='w-full h-full'
                                                    src={item.img}
                                                    alt={item.title}
                                                />
                                            </div>
                                            <h1 className='text-center text-lg font-medium text-black pt-5'>
                                                {
                                                    item.title
                                                }
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default TechIcon;