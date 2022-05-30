import { Slider } from "antd";
import { useCallback, useState } from "react";
import Circle from "./Circle"

const Wrapper = () => {
  const [progress, setProgress] = useState(0.5);

  const handleChange = useCallback((value: number) => setProgress(value / 100.0), []);

  return (
    <div>
      <Circle percentage={progress} />

      <Slider style={{ width: 150 }} value={progress * 100} min={0} max={100} onChange={handleChange} />
    </div>
  )
}
export default Wrapper;