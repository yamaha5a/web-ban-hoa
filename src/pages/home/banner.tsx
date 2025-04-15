import { Carousel } from "antd";
import { useBanners } from "../hook/banner";

const Banner = () => {
  const { data: banners, isLoading, error } = useBanners();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Không thể tải banner. Vui lòng thử lại!</p>;
  if (!banners || banners.length === 0) return <p>Không có banner nào.</p>;

  return (
    <div style={{ marginTop: 64, width: "100%" }}>
      <Carousel autoplay effect="fade" autoplaySpeed={1500}>
        {banners.map((banner) => (
          <div key={banner.id} style={styles.bannerContainer}>
            <img
              src={
                banner.image.startsWith("http")
                  ? banner.image
                  : `http://localhost:3000${banner.image}`
              }
              alt={banner.title}
              style={styles.bannerImage}
              onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
            />
            <div style={styles.overlay}></div>
            <div style={styles.bannerContent}>
              <h1 style={styles.title}>{banner.title}</h1>
              <p style={styles.description}>{banner.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const styles = {
  bannerContainer: {
    position: "relative",
    width: "100%",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)",
  },
  bannerContent: {
    position: "absolute",
    textAlign: "center",
    color: "white",
    zIndex: 2,
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "20px",
  },
};

export default Banner;
