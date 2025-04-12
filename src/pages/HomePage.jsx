import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full h-auto mt-20">
        <Modal />
      </div>
    </div>
  );
};

export default HomePage;
