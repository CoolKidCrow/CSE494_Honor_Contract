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
    var data = [
        { name: 'CPU Score', score : cpu_data[select_cpu_1]["Benchmark"]},
        { name: 'GPU Score', score : gpu_data[select_gpu_1]["Benchmark"]},
        { name: 'RAM Score', score : ram_data[select_ram_1]["Benchmark"]}
    ];

    var padding = 60;
    var width = 480;
    var height = 400;
    var radius = ((Math.min(width, height) - padding) / 2);
    var donutWidth = 60;

    var color = d3.scaleOrdinal(d3.schemeSet3);

    var svg = d3.select('#pie_svg_1')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
          
    var pie = d3.pie()
        .value(function(d) { return d.score; })
        .sort(null);

    var text = svg.append('text')
        .attr('text-anchor', 'middle')
        .text('');

    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .style('stroke', 'black')
        .style('stroke-width', '1')
        .attr('fill', function(d, i) { 
          return color(d.data.name);
        })
        .on('mouseover', function(d, i) {
            d3.select(d.toElement).style('stroke-width', '4');
            text.text(i.data.name + ": " + i.data.score);
        })
        .on('mouseout', function(d, i) {
            d3.select(d.fromElement).style('stroke-width', '1');
            text.text('');
        });
}

function draw_chart_2() {
    var select_cpu_2 = document.getElementById("cpu_2").selectedIndex;
    var select_gpu_2 = document.getElementById("gpu_2").selectedIndex;
    var select_ram_2 = document.getElementById("ram_2").selectedIndex;

    var aggScore = cpu_data[select_cpu_2]["Benchmark"] + gpu_data[select_gpu_2]["Benchmark"] + ram_data[select_ram_2]["Benchmark"];
    document.getElementById("agg_score_2").textContent = aggScore;


    //d3 stuff
    var data = [
        { name: 'CPU Score', score : cpu_data[select_cpu_2]["Benchmark"]},
        { name: 'GPU Score', score : gpu_data[select_gpu_2]["Benchmark"]},
        { name: 'RAM Score', score : ram_data[select_ram_2]["Benchmark"]}
    ];

    var padding = 60;
    var width = 480;
    var height = 400;
    var radius = ((Math.min(width, height) - padding) / 2);
    var donutWidth = 60;

    var color = d3.scaleOrdinal(d3.schemeSet3);

    var svg = d3.select('#pie_svg_2')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
          
    var pie = d3.pie()
        .value(function(d) { return d.score; })
        .sort(null);

    var text = svg.append('text')
        .attr('text-anchor', 'middle')
        .text('');

    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .style('stroke', 'black')
        .style('stroke-width', '1')
        .attr('fill', function(d, i) { 
          return color(d.data.name);
        })
        .on('mouseover', function(d, i) {
            d3.select(d.toElement).style('stroke-width', '4');
            text.text(i.data.name + ": " + i.data.score);
        })
        .on('mouseout', function(d, i) {
            d3.select(d.fromElement).style('stroke-width', '1');
            text.text('');
        });
}
