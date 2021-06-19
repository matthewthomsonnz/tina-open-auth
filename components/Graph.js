import React from 'react';
import PropTypes from 'prop-types';
// import './graph.css';
import InfoModal from './InfoModal';
import Chart from 'chart.js';
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
      data: {
        datasets: [{
            type: this.props.graphStyle,
            data: this.props.datasetA,
            backgroundColor: this.props.colorA,
            order: 3,
            scaleOverride:true,
            scaleSteps:20,
            scaleStartValue:30,
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
  graphStyle: PropTypes.oneOf(['line', 'bar']),
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
