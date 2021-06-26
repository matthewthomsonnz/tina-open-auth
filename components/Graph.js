import React from 'react';
import PropTypes from 'prop-types';
// import './graph.css';
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
/**
 * Primary UI component for user interaction
 */
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

    var chartData = {

      options: {
        legend: {
          align: 'end',
          labels: {
            usePointStyle: true,
            fontColor: this.props.colorB,
            filter: function(item, chart,a) {
              // console.log(item);
              return item.text !== undefined;
            },
            generateLabels: function(chart){
              const data = chart.data.datasets;
              return data.map((data, i) => {
                // console.log(data);
                return {
                    text: data.label,
                    fillStyle: data.borderColor,
                    fontColor: 'red',
                    
                    index: i
                  };
              })
           
            }
          }
        },
        scales: {
          yAxes: [{
            ticks:{
              fontColor: "#c2c2c2",
              fontSize: 14,
              max: 1,
              min: 0,
              stepSize:0.1,
              callback: function(value, index, values) {
                return isNaN(value ) ? value : value;
              }
            }
          }],
          xAxes:[{
            ticks:{
              fontColor: "#c2c2c2",
                        fontSize: 14,
                        // stepSize: 1,
                        // beginAtZero: true
            },
            scaleLabel: {
              display: true,  
              fontColor: '#c2c2c2',
              labelString: this.props.xAxisLabel
            }
          }]
          
        }
      },
      type: this.props.graphStyle,

      data: {
        datasets: [{
            data: this.props.datasetA,
            backgroundColor: this.props.colorA,
            order: 1,
            scaleOverride:true,
            scaleSteps:1,
            scaleStartValue:1,
            scaleStepWidth:1,
            label: undefined,
            pointRadius:0
            
        },
        {
          type: 'line',
          borderColor: this.props.colorB,
          backgroundColor: this.props.colorB.replace('1)','0.1)'),
          data: this.props.datasetB,
          order: 1,
          pointRadius:0,
          label: this.props.datasetBLabel
      }
        ],
        labels: ['Now', '5', '10', '15','20','25','30 '],
    }
    };
    this.myChart = new Chart(this.chartRef.current, chartData);

  }
  render(state,props) {
 
    return (
      <div className="container graph">
        <h2>{this.props.title}</h2>
        <canvas ref={this.chartRef} />
        <InfoModal/>
      </div>
    );
  }
};


Graph.propTypes = {
  graphStyle: PropTypes.oneOf([ 'bar']),
  colorA:PropTypes.string,
  colorB:PropTypes.string,
  xAxisLabel:PropTypes.string,
  /**
   * Graph contents
   */
  title: PropTypes.string.isRequired,
  datasetA: PropTypes.array,
  datasetB: PropTypes.array,
  datasetBLabel: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Graph.defaultProps = {
  title: 'cool',
  onClick: Graph.toggleInfo
};
