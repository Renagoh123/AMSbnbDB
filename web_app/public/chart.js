// chart.js - Contains the JavaScript code for rendering charts on the front end using Chart.js.
document.addEventListener('DOMContentLoaded', function () {
    // Bar chart for superhost vs non-superhost satisfaction scores
    const ctx1 = document.getElementById('satisfactionByHostChart').getContext('2d');
    const satisfactionByHostChart = new Chart(ctx1, {
        type: 'bar', // bar type
        data: {
            labels: ['Superhost', 'Non-superhost'],  // labels for the x-axis
            datasets: [{
                label: 'Guest Satisfaction Overall by Superhost Status',  //chart label
                data: [superhostSatisfaction, nonSuperhostSatisfaction],  // data points
                backgroundColor: ['#FFA500', '#36A2EB'],  
                borderColor: ['#FFA500', '#36A2EB'],  
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false  // hides the chart label
                },
                title: {
                    display: true,  // enables the chart title
                    fullSize:true,
                    text: 'Superhost vs. Non-Superhost Average Satisfaction Scores'  // sets the chart title text
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100, // maximum value for the y-axis
                    title: {
                        display: true,
                        text: 'Guest Satisfaction Score' 
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Superhost Status'
                    }
                }
            }
        }
    });


    // Bar chart for the levels of guest satisfaction (rating category) by pricing on weekdays vs weekends
    const ctx2 = document.getElementById('pricingSatisfactionChart').getContext('2d');
    const pricingSatisfactionChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ratingCategories,  // labels for the x-axis
            datasets: [
                {
                    label: 'Weekdays',
                    data: weekends,  // data points for weekdays
                    backgroundColor: 'rgba(54, 162, 235, 0.5)', 
                    borderColor: 'rgba(54, 162, 235, 0.5)',  
                    borderWidth: 1
                },
                {
                    label: 'Weekends',
                    data: weekdays,  // data points for weekends
                    backgroundColor: 'rgba(255, 165, 0, 0.5)',  
                    borderColor: 'rgba(255, 165, 0, 1)', 
                    borderWidth: 1
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,  // enables the chart title
                    fullSize:true,
                    text: 'The Guest Satisfaction Levels by Average Pricing on Different Day Type '  // sets the chart title text
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 100,
                    max: 600, // maximum value for the y-axis
                    ticks: {
                        stepSize: 50 // step size for the y-axis
                    },
                    title: {
                        display: true,
                        text: 'Average Price'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'ratingCategories'
                    }
                }
            }
        }
});  
  
});
