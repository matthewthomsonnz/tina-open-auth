import React from 'react';
import InfoModal from './InfoModal';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

export class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();

    this.state = {
      showInfo:false
    }
  }
  componentDidMount() {
    this.renderGraph();
  }
  toggleInfo(){
    this.setState({showInfo: this.state.showInfo ? false : true})
  }
  componentDidUpdate(){
    this.myChart.destroy();
    this.renderGraph();
  }
  renderGraph(){
    var graphFormat = this.props.datasetA && this.props.datasetA.slice(0, this.props.limit).map((item, i)=>{
      if (this.props.xAxis) return {x: item[this.props.xAxis], y:item[this.props.yAxis]}
      var xKey = 0;
      xKey = i === 0 ? "Now" : (i * 5).toString();
      console.log(i);
      return {x: xKey, y:item[this.props.yAxis]}
    })
    console.log(this.props.xAxis);
    var chartData = { 
      type: this.props.graphStyle,
      options: {

        plugins: {
            // title: {
            //     display: true,
            //     text: 'Chart Title'
            // },
            legend: {
              align: 'end',

              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                filter: (a,b)=>{
                  console.log(a);
                  return a.text

                }
              }
            }
        },
        scales: {
            y: {
              beginAtZero: false,
                // suggestedMin: 0,
                suggestedMax: 0,
                // max: 0,
            }
        }
    },
      data: {
        datasets: [{
            data: graphFormat,
            backgroundColor: this.props.colorA,
            order: 1,
            scaleOverride:true,
            scaleSteps:1,
            scaleStartValue:1,
            scaleStepWidth:1,
            label: null,
            pointRadius:0,
        },
        {
          type: 'line',
          data: graphFormat,
          borderColor: this.props.colorB,
          backgroundColor: this.props.colorB.replace('1)','0.1)'),
          order: 1,
          pointRadius:0,
          label: this.props.datasetBLabel
        }],
      }
    };
    this.myChart = new Chart(this.chartRef.current, chartData);

    console.log(this.myChart);
  }
  render(state,props) {
    return (
      <div className="container graph">
 <style global jsx>{`
 .btn-show-info {
  border-radius: 999px;
  width: 30px;
  height: 30px;
  border: 1px solid white;
  text-align: center;
  background-color: rgba(255,255,255,0.1);
  cursor: pointer;
  user-select: none;
  top: 0;
  right: 0;
  bottom:0;
  line-height: 30px;
}

.graph {
  position: relative;
}
.graph .btn-show-info {
  position: absolute;

}

.info {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0f1c32;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  z-index: 5;
}

.info.active{
  background-color: #bce162;
}

        `}</style>



        <h2>{this.props.title}</h2>
        <canvas ref={this.chartRef} />
        <InfoModal/>
      </div>
    );
  }
};