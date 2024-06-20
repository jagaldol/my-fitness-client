import { ResponsiveBar } from "@nivo/bar"
import { standardMuscle, standardWeight } from "@/utils/inbodyUtils"

const theme = {
  text: {
    fill: "#FFFFFF",
  },
  tooltip: {
    container: {
      background: "#555555",
      color: "#fff",
    },
  },
  crosshair: {
    line: {
      stroke: "#FFFFFF",
    },
  },
}

function BarChart({
  data,
  tickValues,
}: {
  data: { average: number; below: number; above: number; id: string }
  tickValues: number[]
}) {
  return (
    <ResponsiveBar
      data={[data]}
      valueScale={{
        type: "linear",
        min: tickValues[0],
        max: tickValues[tickValues.length - 1],
        clamp: true,
      }}
      theme={theme}
      keys={["below", "average", "above"]}
      colors={["#7BCCC4", "#2B8CBE", "#084081"]}
      margin={{ right: 10, bottom: 30, left: 95 }}
      padding={0.3}
      layout="horizontal"
      axisLeft={{}}
      axisBottom={{
        tickValues,
      }}
      gridXValues={tickValues}
      enableGridX
      enableGridY={false}
      enableLabel={false}
      isInteractive={false}
    />
  )
}

interface Props {
  height: number
  gender: number
  weight: string
  muscle: string
  fat: string
}

export default function InbodyBarChartContainer({ height, gender, weight, muscle, fat }: Props) {
  const percentWeight = (Number(weight) / standardWeight(height, gender)) * 100
  const percentMuscle = (Number(muscle) / standardMuscle(height, gender)) * 100
  const pbf = (Number(fat) / Number(weight)) * 100
  const minNormalPBF = gender === 1 ? 18 : 10
  const maxNormalPBF = gender === 1 ? 28 : 20

  return (
    <>
      <div className="h-12">
        <BarChart
          data={{
            id: "체중(백분율)",
            below: percentWeight >= 85 ? 85 : percentWeight,
            average: percentWeight >= 115 ? 30 : percentWeight - 85,
            above: percentWeight >= 115 ? percentWeight - 115 : 0,
          }}
          tickValues={[55, 70, 85, 100, 115, 130, 145, 160]}
        />
      </div>
      <div className="h-12">
        <BarChart
          data={{
            id: "골격근량(백분율)",
            below: percentMuscle >= 90 ? 90 : percentMuscle,
            average: percentMuscle >= 110 ? 20 : percentMuscle - 90,
            above: percentMuscle >= 110 ? percentMuscle - 110 : 0,
          }}
          tickValues={[70, 80, 90, 100, 110, 120, 130, 140]}
        />
      </div>
      <div className="h-12">
        <BarChart
          data={{
            id: "체지방률(%)",
            below: pbf >= minNormalPBF ? minNormalPBF : pbf,
            average: pbf >= maxNormalPBF ? maxNormalPBF - minNormalPBF : pbf - minNormalPBF,
            above: pbf >= maxNormalPBF ? pbf - maxNormalPBF : 0,
          }}
          tickValues={gender === 1 ? [8, 13, 18, 23, 28, 33, 38, 43] : [0, 5, 10, 15, 20, 25, 30, 35]}
        />
      </div>
    </>
  )
}
