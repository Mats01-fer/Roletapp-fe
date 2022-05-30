import { FC } from 'react'

type Props ={
  percentage: number
}

const Circle: FC<Props> = ({ percentage }) => {
    const radius = 4.5;
    const x = percentage * (2 * radius * Math.PI);
    const y = 2 * radius * Math.PI;


    return (
      <div style={{
        width: 100,
        height: 100,
        margin: '10vh auto',
        position: "relative"
      }}>
        <svg viewBox="0 0 10 10">
          <path
            className="outline"
            d="M5 0.5 a 4.5 4.5 0 0 1 0 9 a 4.5 4.5 0 0 1 0 -9"
            stroke='#cae7fc'
            fill="none"
            strokeDasharray="100, 100" />

          <path className="ring"
            d="M5 0.5 a 4.5 4.5 0 0 1 0 9 a 4.5 4.5 0 0 1 0 -9"
            fill="none"
            stroke="#69c0ff"
            stroke-width="1"
            stroke-dasharray={`${x}, ${y}`} />
        </svg>
      </div>
    )
  }
export default Circle;