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

            //some good ole fashion data wrangling and also sets up the selects
            cpu_data.map(function(d) {
                d["Benchmark"] = +d["Benchmark"];

                var option1 = document.createElement("option");
                option1.value = d["Model"];
                option1.innerHTML = d["Brand"] + " " + d["Model"];
                var option2 = document.createElement("option");
                option2.value = d["Model"];
                option2.innerHTML = d["Brand"] + " " + d["Model"];
                document.getElementById("cpu_1").appendChild(option1);
                document.getElementById("cpu_2").appendChild(option2);
            });
            gpu_data.map(function(d) {
                d["Benchmark"] = +d["Benchmark"];
                
                var option1 = document.createElement("option");
                option1.value = d["Model"];
                option1.innerHTML = d["Brand"] + " " + d["Model"];
                var option2 = document.createElement("option");
                option2.value = d["Brand"] + " " + d["Model"];
                option2.innerHTML = d["Brand"] + " " + d["Model"];
                document.getElementById("gpu_1").appendChild(option1);
                document.getElementById("gpu_2").appendChild(option2);
            });
            ram_data.map(function(d) {
                d["Benchmark"] = +d["Benchmark"];

                var option1 = document.createElement("option");
                option1.value = d["Model"];
                option1.innerHTML = d["Brand"] + " " + d["Model"];
                var option2 = document.createElement("option");
                option2.value = d["Model"];
                option2.innerHTML = d["Brand"] + " " + d["Model"];
                document.getElementById("ram_1").appendChild(option1);
                document.getElementById("ram_2").appendChild(option2);  
            });

            draw_chart_1();
            draw_chart_2();
        });
});

function draw_chart_1() {
    var select_cpu_1 = document.getElementById("cpu_1").selectedIndex;
    var select_gpu_1 = document.getElementById("gpu_1").selectedIndex;
    var select_ram_1 = document.getElementById("ram_1").selectedIndex;

    var aggScore = cpu_data[select_cpu_1]["Benchmark"] + gpu_data[select_gpu_1]["Benchmark"] + ram_data[select_ram_1]["Benchmark"];
    document.getElementById("agg_score_1").textContent = aggScore;


    //d3 stuff
}

function draw_chart_2() {
    var select_cpu_2 = document.getElementById("cpu_2").selectedIndex;
    var select_gpu_2 = document.getElementById("gpu_2").selectedIndex;
    var select_ram_2 = document.getElementById("ram_2").selectedIndex;

    var aggScore = cpu_data[select_cpu_2]["Benchmark"] + gpu_data[select_gpu_2]["Benchmark"] + ram_data[select_ram_2]["Benchmark"];
    document.getElementById("agg_score_2").textContent = aggScore;


    //d3 stuff
}
