import { useNavigate } from "react-router-dom";
import "./PrevNextContainer.css";

const  PrevNextContainer  = () => {
  const navigate = useNavigate();

  return (
    <div className="prev-next-container">
      <button onClick={() => navigate(-1)}>&#8678;</button>
      <button onClick={() => navigate(1)}>&#8680;</button>
    </div>
  );
};

export default PrevNextContainer;