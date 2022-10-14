var cpu_data;
var gpu_data;
var ram_data;

document.addEventListener('DOMContentLoaded', function () {
    
   // Loads csv files and stores them
   Promise.all([d3.csv('data/CPU_UserBenchmarks.csv'),d3.csv('data/GPU_UserBenchmarks.csv'), d3.csv('data/RAM_UserBenchmarks.csv')])
        .then(function (values) {
            console.log('data loaded');
            cpu_data = values[0];
            gpu_data = values[1];
            ram_data = values[2];
        });
});

function draw_chart_1() {

}

function draw_chart_2() {

}
