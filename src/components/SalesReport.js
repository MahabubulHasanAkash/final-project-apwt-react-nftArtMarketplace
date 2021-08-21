import React from "react";
import Highcharts from 'highcharts'

class SalesReport extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }
    componentDidMount() {
        fetch("http://localhost:8000/api/sales_report")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                    });
                    Highcharts.chart('chart-container', {
                        title: {
                            text: 'New user Growth'
                        },
                        subtitle: {
                            text: ""
                        },
                        xAxis: {
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        },
                        yAxis: {
                            title: {
                                text: 'Number of new User'
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle'
                        },
                        plotOptions: {
                            series: {
                                allowPointSelect: true
                            }
                        },
                        series: [{
                            name: 'New User',
                            data: result.sales
                        }],
                        resposive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chatsOptions: {
                                    legend: {
                                        layout: "horizontal",
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    <div id="chart-container"></div>
                </>
            );
        }
    }
}

export default SalesReport;