let cpu_data;
let gpu_data;
let ram_data;

document.addEventListener('DOMContentLoaded', function () {
    
   // Loads csv files and stores them
   Promise.all([d3.csv('data/CPU_UserBenchmarks.csv'),d3.csv('data/GPU_UserBenchmarks.csv'), d3.csv('data/RAM_UserBenchmarks.csv')])
        .then(function (values) {
            console.log('data loaded');
            cpu_data = values[0];
            gpu_data = values[1];
            ram_data = values[2];

            cpu_data.map(function(d) {
                d["Benchmark"] = +d["Benchmark"];

                var option1 = document.createElement("option");
                option1.value = d["Brand"] + " " + d["Model"];
                option1.innerHTML = d["Brand"] + " " + d["Model"];
                var option2 = document.createElement("option");
                option2.value = d["Brand"] + " " + d["Model"];
                option2.innerHTML = d["Brand"] + " " + d["Model"];
                document.getElementById("cpu_1").appendChild(option1);
                document.getElementById("cpu_2").appendChild(option2);
                console.log("add opt");
            });
            gpu_data.map(function(d) {
                d["Benchmark"] = +d["Benchmark"];
                
                var option1 = document.createElement("option");
                option1.value = d["Brand"] + " " + d["Model"];
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
                option1.value = d["Brand"] + " " + d["Model"];
                option1.innerHTML = d["Brand"] + " " + d["Model"];
                var option2 = document.createElement("option");
                option2.value = d["Brand"] + " " + d["Model"];
                option2.innerHTML = d["Brand"] + " " + d["Model"];
                document.getElementById("ram_1").appendChild(option1);
                document.getElementById("ram_2").appendChild(option2);  
            });

        });
});

function draw_chart_1() {
        console.log(cpu_data)
        console.log(gpu_data);
        console.log(ram_data);
}

function draw_chart_2() {

}
