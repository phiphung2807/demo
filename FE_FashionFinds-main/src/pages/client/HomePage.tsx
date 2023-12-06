
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderHomePage from "../../components/slider/SliderHomePage";
import { v4 } from "uuid";
import ProductListCategory from "../../components/product/ProductListCategory";
const HomePage = () => {

  return (
    <>
      <main className="body">
        <section className="px-5 mb-10 overflow-hidden slider-home page-container">
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            grabCursor={true}
            slidesPerView={"auto"}
            className="mySwiper"
          >
            {new Array(10).fill(0).map(() => (
              <SwiperSlide key={v4()}>
                <SliderHomePage key={v4()}></SliderHomePage>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="px-5 mb-10 product-male page-container">
          <ProductListCategory categoryId="64bbad761bf229520476dbfc" />

        </section>
        <section className="px-5 mb-10 product-male page-container">
          <ProductListCategory categoryId="64bbada61bf229520476dbff" />
        </section>
      </main>
    </>
  );
};

export default HomePage;
